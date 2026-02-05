import { useAuth } from '../context/AuthContext';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Edit } from 'lucide-react';
import SEO from '../components/SEO';
import MembershipApplication from '../components/MembershipApplication';
import EditProfileModal from '../components/EditProfileModal';
import CertificateGenerator from '../components/CertificateGenerator';

const Dashboard = () => {
    const { currentUser, userData, logout, resendVerification, fetchUserData, deleteAccount } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [verificationSent, setVerificationSent] = useState(false);
    const [verificationError, setVerificationError] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCertificate, setShowCertificate] = useState(false);
    const [showUpgrade, setShowUpgrade] = useState(false);
    const [cooldown, setCooldown] = useState(0);

    useEffect(() => {
        // Check for existing cooldown on mount
        const lastSent = localStorage.getItem('emailVerificationLastSent');
        if (lastSent) {
            const timePassed = Math.floor((Date.now() - parseInt(lastSent)) / 1000);
            if (timePassed < 60) {
                setCooldown(60 - timePassed);
            }
        }
    }, []);

    useEffect(() => {
        // Countdown timer
        let timer;
        if (cooldown > 0) {
            timer = setInterval(() => {
                setCooldown(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [cooldown]);

    // POLL / FOCUS CHECK for Email Verification
    useEffect(() => {
        const checkVerification = async () => {
            if (currentUser && !currentUser.emailVerified) {
                try {
                    await currentUser.reload();
                    if (currentUser.emailVerified) {
                        // Force refresh of user data to update UI + DB sync
                        await fetchUserData();
                    }
                } catch (e) {
                    console.error("Auto-reload auth error", e);
                }
            }
        };

        window.addEventListener('focus', checkVerification);
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') checkVerification();
        });

        return () => {
            window.removeEventListener('focus', checkVerification);
            document.removeEventListener('visibilitychange', checkVerification);
        };
    }, [currentUser, fetchUserData]);

    // SELF-HEALING: Ensure public_memberships record exists if user has ID
    useEffect(() => {
        if (userData?.membershipId && userData?.membershipStatus === 'active') {
            import('firebase/database').then(({ centered, ref, get, update }) => {
                import('../firebase').then(({ db }) => {
                    const pubRef = ref(db, `public_memberships/${userData.membershipId}`);
                    get(pubRef).then((snap) => {
                        if (!snap.exists()) {
                            console.log("Self-healing: Creating missing public record for " + userData.membershipId);
                            update(ref(db), {
                                [`public_memberships/${userData.membershipId}`]: {
                                    name: userData.name || currentUser.displayName || 'Member',
                                    membershipId: userData.membershipId,
                                    membershipType: userData.membershipType,
                                    status: userData.membershipStatus,
                                    membershipDate: userData.joinedAt || new Date().toISOString(),
                                    uid: currentUser.uid
                                }
                            });
                        }
                    });
                });
            });
        }
    }, [userData, currentUser]);



    useEffect(() => {
        // Reset scroll position on mount/navigation
        window.scrollTo(0, 0);

        if (!currentUser) {
            navigate('/login');
        } else if (location.state?.upgradeMode) {
            setShowUpgrade(true);
        }
    }, [currentUser, navigate, location]);

    if (!currentUser) return <Navigate to="/login" replace />;

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch {
            console.error("Failed to log out");
        }
    }

    const handleResend = async () => {
        if (cooldown > 0) return;
        setVerificationError(''); // Clear previous errors

        try {
            await resendVerification();
            setVerificationSent(true);

            // Set 60s cooldown
            setCooldown(60);
            localStorage.setItem('emailVerificationLastSent', Date.now().toString());

            setTimeout(() => setVerificationSent(false), 5000); // Hide success msg after 5s
        } catch (error) {
            setVerificationError(error.message);
        }
    };

    const handleUpdateSuccess = async () => {
        await fetchUserData();
        // Optional: Show a success toast here
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to PERMANENTLY delete your account? This action cannot be undone and will remove all your data.")) {
            try {
                await deleteAccount();
                navigate('/'); // Redirect to home after deletion
            } catch (error) {
                console.error(error);
                alert("Failed to delete account. Please try again.");
            }
        }
    };

    return (
        <div className="dashboard-page section container">
            <SEO title="Dashboard" description="User Dashboard" />

            {!currentUser.emailVerified && (
                <div className="alert-warning mb-4">
                    <p>
                        Your email is not verified. Please check your inbox. Only after verification your profile will be shown in the pool and you will be able to see others.
                        {!verificationSent ? (
                            <button
                                onClick={handleResend}
                                className="btn-link"
                                disabled={cooldown > 0}
                                style={{ opacity: cooldown > 0 ? 0.5 : 1, cursor: cooldown > 0 ? 'not-allowed' : 'pointer' }}
                            >
                                {cooldown > 0 ? `Resend available in ${cooldown}s` : "Resend Verification Email"}
                            </button>
                        ) : (
                            <span className="text-success ml-2"> Email Sent!</span>
                        )}
                        {verificationError && (
                            <span className="text-error ml-2" style={{ display: 'block', marginTop: '0.5rem', fontSize: '0.9em' }}>
                                ⚠️ {verificationError}
                            </span>
                        )}
                    </p>
                </div>
            )}

            <div className="dashboard-header">
                <div>
                    <h1>Welcome, {userData?.name || currentUser.email}</h1>
                    <p className="text-muted">{userData?.designation}{userData?.organization && ` at ${userData.organization}`}</p>
                </div>
                <div className="header-actions">
                    <button onClick={() => setShowEditModal(true)} className="btn btn-secondary">
                        <Edit size={16} /> Edit Profile
                    </button>
                    <button onClick={handleLogout} className="btn btn-outline">Logout</button>
                    <button onClick={handleDelete} className="btn btn-danger">Delete Account</button>
                </div>
            </div>

            <div className="dashboard-content mt-4">
                <div className="card">
                    <h3>Membership Status</h3>
                    <p>Status: <strong style={{ textTransform: 'capitalize' }}>{userData?.membershipStatus || 'None'}</strong></p>
                    {userData?.membershipType && <p>Type: <strong style={{ textTransform: 'capitalize' }}>{userData?.membershipType}</strong></p>}
                    {userData?.membershipId && <p>Membership Number: <strong style={{ color: 'var(--color-primary)' }}>{userData?.membershipId}</strong></p>}

                    {/* Free Tier Upgrade Option */}
                    {userData?.membershipStatus === 'active' && userData?.tier === 'free' && !showUpgrade && (
                        <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                            <h4 className="text-orange-800 font-semibold mb-2">Upgrade to Paid Membership</h4>
                            <p className="text-sm text-orange-700 mb-4">
                                {userData?.membershipType === 'student' ? (
                                    <>Get a verified certificate, <strong>be visible in the Academic Resource Pool directory</strong>, and unlock full access to connect with professionals and other paid members.</>
                                ) : (
                                    <>Get a verified certificate, full access to the Academic Resource Pool, and more benefits.</>
                                )}
                            </p>
                            <button
                                onClick={() => setShowUpgrade(true)}
                                className="btn btn-primary"
                                style={{ background: '#c05621', color: 'white', width: '100%', justifyContent: 'center' }}
                            >
                                Upgrade Now
                            </button>
                        </div>
                    )}

                    {(userData?.membershipStatus === 'none' || !userData?.membershipStatus || showUpgrade) && (
                        <div className={showUpgrade ? "mt-6 border-t pt-6" : ""}>
                            {showUpgrade && (
                                <div className="flex justify-between items-center mb-4">
                                    <h3>Upgrade Membership</h3>
                                    <button onClick={() => setShowUpgrade(false)} className="text-gray-500 hover:text-gray-700">Cancel</button>
                                </div>
                            )}
                            <MembershipApplication />
                        </div>
                    )}


                    {userData?.membershipStatus === 'active' && (
                        <div style={{ marginTop: '1.5rem' }}>
                            {userData?.tier !== 'free' ? (
                                <button
                                    onClick={() => setShowCertificate(true)}
                                    className="btn btn-outline"
                                    style={{ width: '100%', justifyContent: 'center' }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                                    Download/Print Certificate
                                </button>
                            ) : (
                                <button
                                    disabled
                                    className="btn"
                                    style={{ width: '100%', justifyContent: 'center', background: '#e2e8f0', color: '#718096', border: '1px solid #cbd5e0', cursor: 'not-allowed' }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                    Certificate Locked (Upgrade)
                                </button>
                            )}
                        </div>
                    )}
                </div>


            </div>

            {showEditModal && (
                <EditProfileModal
                    currentUser={currentUser}
                    userData={userData}
                    onClose={() => setShowEditModal(false)}
                    onUpdateSuccess={handleUpdateSuccess}
                />
            )}

            {showCertificate && (
                <CertificateGenerator
                    userData={userData}
                    onClose={() => setShowCertificate(false)}
                />
            )}

            <style jsx="true">{`
                .dashboard-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #e2e8f0;
                    padding-bottom: 1rem;
                    gap: 1rem;
                    flex-wrap: wrap;
                }
                .text-muted { color: #718096; margin-top: 0.25rem; font-size: 0.95rem; }
                .header-actions {
                    display: flex; gap: 1rem; align-items: center;
                }
                .card {
                    background: white;
                    padding: 2rem;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                    border: 1px solid #e2e8f0;
                }
                .btn {
                    padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; border: none;
                    display: flex; align-items: center; gap: 0.5rem; font-weight: 500;
                    font-size: 0.95rem;
                }
                .btn-secondary { background: #edf2f7; color: #4a5568; }
                .btn-secondary:hover { background: #e2e8f0; }
                .btn-outline {
                    background: transparent;
                    border: 1px solid var(--color-primary);
                    color: var(--color-primary);
                }
                .btn-outline:hover {
                    background: var(--color-primary); color: white;
                }
                .alert-warning {
                    background-color: #fffaf0;
                    border: 1px solid #fbd38d;
                    color: #9c4221;
                    padding: 0.75rem;
                    border-radius: 8px;
                    margin-bottom: 1.5rem;
                    text-align: center;
                    font-size: 0.9rem;
                }
                .btn-link {
                    background: none;
                    border: none;
                    color: var(--color-secondary);
                    text-decoration: underline;
                    cursor: pointer;
                    margin-left: 0.5rem;
                    font-weight: 600;
                }
                .text-success {
                    color: #2f855a;
                    font-weight: 600;
                }
                .text-error {
                     color: #e53e3e;
                     font-weight: 600;
                }

                /* Dashboard specific padding override */
                .dashboard-page {
                    padding-top: 8rem !important;
                }

                @media (max-width: 600px) {
                    .dashboard-header { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
                    
                    .header-actions { 
                        width: 100%; 
                        flex-direction: column; /* STACK VERTICALLY */
                        gap: 0.75rem; 
                    }
                    .header-actions button {
                        width: 100%;
                        justify-content: center;
                    }
                    
                    .dashboard-page { padding-top: 6rem !important; }
                    
                    .alert-warning {
                        text-align: left;
                        padding: 1rem;
                    }
                    .alert-warning button {
                        display: block;
                        margin-left: 0;
                        margin-top: 0.5rem;
                    }
                }

                .btn-danger {
                    background-color: #dc2626;
                    color: white;
                    border: none;
                }
                .btn-danger:hover {
                    background-color: #b91c1c;
                }
                .text-muted { color: #718096; margin-top: 0.25rem; font-size: 0.95rem; }
                .header-actions {
                    display: flex; gap: 1rem; align-items: center;
                }
                .card {
                    background: white;
                    padding: 2rem;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                    border: 1px solid #e2e8f0;
                }
                .btn {
                    padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; border: none;
                    display: flex; align-items: center; gap: 0.5rem; font-weight: 500;
                }
                .btn-secondary { background: #edf2f7; color: #4a5568; }
                .btn-secondary:hover { background: #e2e8f0; }
                .btn-outline {
                    background: transparent;
                    border: 1px solid var(--color-primary);
                    color: var(--color-primary);
                }
                .btn-outline:hover {
                    background: var(--color-primary); color: white;
                }
                .alert-warning {
                    background-color: #fffaf0;
                    border: 1px solid #fbd38d;
                    color: #9c4221;
                    padding: 0.75rem;
                    border-radius: 8px;
                    margin-bottom: 1.5rem;
                    text-align: center;
                    font-size: 0.9rem;
                }
                .btn-link {
                    background: none;
                    border: none;
                    color: var(--color-secondary);
                    text-decoration: underline;
                    cursor: pointer;
                    margin-left: 0.5rem;
                    font-weight: 600;
                }
                .text-success {
                    color: #2f855a;
                    font-weight: 600;
                }
                
                /* Dashboard specific padding override */
                .dashboard-page {
                    padding-top: 8rem !important;
                }

                @media (max-width: 600px) {
                    .dashboard-header { flex-direction: column; align-items: flex-start; }
                    .header-actions { width: 100%; justify-content: flex-end; flex-wrap: wrap; gap: 0.5rem; }
                    .dashboard-page { padding-top: 6rem !important; }
                }

                .btn-danger {
                    background-color: #dc2626;
                    color: white;
                    border: none;
                }
                .btn-danger:hover {
                    background-color: #b91c1c;
                }
            `}</style>
        </div>
    );
};

export default Dashboard;
