import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db, initializationError } from '../firebase';
import SplashScreen from '../components/SplashScreen';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendEmailVerification,
    updateProfile,
    sendPasswordResetEmail
} from 'firebase/auth';
import { ref, set, get, child, update } from 'firebase/database';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    console.log("AuthProvider Mounted"); // Debugging
    // Catch initialization error from firebase.js and throw it here
    // so the ErrorBoundary in main.jsx can catch it.
    if (initializationError) {
        throw initializationError;
    }

    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Sign Up
    const signup = async (email, password, name, phone) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const user = result.user;

        // Update Auth Profile
        await updateProfile(user, { displayName: name });

        // Send Verification Email
        try {
            await sendEmailVerification(user);
        } catch (error) {
            console.error("Failed to send verification email:", error);
            // We verify visually on the dashboard, so we don't block signup
        }

        // Create User in Database
        await set(ref(db, 'users/' + user.uid), {
            name,
            email,
            phone,
            role: 'user',
            membershipStatus: 'none', // none, pending, active
            emailVerified: false,
            joinedAt: new Date().toISOString()
        });

        return user;
    };

    // Login
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Reset Password
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    // Logout
    const logout = () => {
        setUserData(null);
        return signOut(auth);
    };

    // Resend Verification
    const resendVerification = () => {
        if (currentUser && !currentUser.emailVerified) {
            return sendEmailVerification(currentUser)
                .catch(error => {
                    console.error("Email Verification Error:", error);
                    if (error.code === 'auth/too-many-requests') {
                        console.warn("Too many verification requests.");
                        throw new Error("Too many requests. Please wait a few minutes before trying again.");
                    }
                    throw error;
                });
        }
        return Promise.resolve();
    };

    // Fetch User Data Logic
    const fetchUserData = async (user) => {
        if (!user) return;
        const dbRef = ref(db);
        try {
            const snapshot = await get(child(dbRef, `users/${user.uid}`));
            if (snapshot.exists()) {
                const dbData = snapshot.val();

                // SYNC EMAIL VERIFICATION STATUS
                // If Auth says verified but DB doesn't (or mismatch), update DB
                if (user.emailVerified !== dbData.emailVerified) {
                    await update(ref(db, `users/${user.uid}`), {
                        emailVerified: user.emailVerified
                    });
                    // Update local state to reflect change immediately
                    setUserData({ ...dbData, emailVerified: user.emailVerified });
                } else {
                    setUserData(dbData);
                }
            } else {
                // User authenticated but DB record missing.
                // Could be a deleted user OR a brand new user during signup flow.

                // metadata.creationTime is a string, e.g., "Thu, 01 Jan 1970..."
                const creationTime = new Date(user.metadata.creationTime).getTime();
                const now = Date.now();
                const isNewUser = (now - creationTime) < 60000; // 1 minute buffer for signup latency

                if (!isNewUser) {
                    console.warn("User record missing from database. Account likely deleted. Signing out.");
                    alert("Your account has been deleted by the administrator.");
                    await signOut(auth);
                    setUserData(null);
                    // We don't throw here to avoid crashing the auth loop, but the user will be logged out.
                } else {
                    // It's a brand new user, DB record might be coming in a split second.
                    setUserData(null);
                }
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            try {
                setCurrentUser(user);
                if (user) {
                    await fetchUserData(user);
                } else {
                    setUserData(null);
                }
            } catch (error) {
                console.error("Auth state change error:", error);
            } finally {
                setLoading(false);
            }
        });

        return unsubscribe;
    }, []);

    // Delete Account (Self-Deletion)
    const deleteAccount = async () => {
        if (!currentUser) return;

        try {
            // 1. Prepare Atomic Delete
            const updates = {};
            updates[`/users/${currentUser.uid}`] = null;
            updates[`/memberships/${currentUser.uid}`] = null;
            updates[`/applications/${currentUser.uid}`] = null;

            // Remove public verification record if exists
            if (userData?.membershipId) {
                updates[`/public_memberships/${userData.membershipId}`] = null;
            }

            // Remove from counters/indexes if necessary (Optional, but we keep counters strict)

            await update(ref(db), updates);

            // 2. Delete Auth Account
            await currentUser.delete();

            // 3. Cleanup local state
            setUserData(null);
            setCurrentUser(null);

        } catch (error) {
            console.error("Delete Account Error:", error);
            if (error.code === 'auth/requires-recent-login') {
                alert("Security Update: Please log out and log in again to delete your account.");
            } else {
                throw error;
            }
        }
    };

    const value = {
        currentUser,
        userData,
        signup,
        login,
        logout,
        resetPassword,
        resendVerification,
        loading,
        fetchUserData: () => fetchUserData(currentUser),
        isAdmin: currentUser?.email === 'vishnurajan@sahrdaya.ac.in',
        deleteAccount // Exposed
    };

    return (
        <AuthContext.Provider value={value}>
            {loading ? <SplashScreen /> : children}
        </AuthContext.Provider>
    );
};
