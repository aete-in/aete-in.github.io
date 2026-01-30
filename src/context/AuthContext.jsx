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
import { ref, set, get, child } from 'firebase/database';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
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
        function verifyEmail() {
            if (currentUser && !currentUser.emailVerified) {
                return sendEmailVerification(currentUser)
                    .catch(error => {
                        console.error("Email Verification Error:", error);
                        // Don't re-throw 'too-many-requests' to UI to avoid crash/alert spam, just log it.
                        if (error.code === 'auth/too-many-requests') {
                            console.warn("Too many verification requests. Please wait a moment.");
                            throw new Error("Too many requests. Please wait a few minutes before trying again.");
                        }
                        throw error;
                    });
            }
            return Promise.resolve();
        }
    };

    // Fetch User Data Logic
    const fetchUserData = async (user) => {
        if (!user) return;
        const dbRef = ref(db);
        try {
            const snapshot = await get(child(dbRef, `users/${user.uid}`));
            if (snapshot.exists()) {
                setUserData(snapshot.val());
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            if (user) {
                await fetchUserData(user);
            } else {
                setUserData(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        userData,
        signup,
        login,
        logout,
        logout,
        resetPassword,
        resendVerification,
        loading,
        fetchUserData: () => fetchUserData(currentUser)
    };

    return (
        <AuthContext.Provider value={value}>
            {loading ? <SplashScreen /> : children}
        </AuthContext.Provider>
    );
};
