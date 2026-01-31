import { useAuth } from '../context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Edit } from 'lucide-react';
import SEO from '../components/SEO';
import MembershipApplication from '../components/MembershipApplication';
import EditProfileModal from '../components/EditProfileModal';
import CertificateGenerator from '../components/CertificateGenerator';

const Dashboard = () => {
    const { currentUser, userData, logout, resendVerification, fetchUserData } = useAuth();
    const navigate = useNavigate();
    const [verificationSent, setVerificationSent] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCertificate, setShowCertificate] = useState(false);

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
    }, [currentUser, navigate]);

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
        try {
            await resendVerification();
            setVerificationSent(true);
            setTimeout(() => setVerificationSent(false), 5000); // Reset after 5s
        } catch (error) {
            alert("Error sending email: " + error.message);
        }
    };

    const handleUpdateSuccess = async () => {
        await fetchUserData();
        // Optional: Show a success toast here
    };

    return (
        <div className="dashboard-page section container">
            <SEO title="Dashboard" description="User Dashboard" />

            {/* {!currentUser.emailVerified && (
                <div className="alert-warning mb-4">
                    <p>
                        Your email is not verified. Please check your inbox.
                        {!verificationSent ? (
                            <button onClick={handleResend} className="btn-link">Resend Verification Email</button>
                        ) : (
                            <span className="text-success ml-2"> Email Sent!</span>
                        )}
                    </p>
                </div>
            )} */}

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
                </div>
            </div>

            <div className="dashboard-content mt-4">
                <div className="card">
                    <h3>Membership Status</h3>
                    <p>Status: <strong style={{ textTransform: 'capitalize' }}>{userData?.membershipStatus || 'None'}</strong></p>
                    {userData?.membershipType && <p>Type: <strong style={{ textTransform: 'capitalize' }}>{userData?.membershipType}</strong></p>}
                    {userData?.membershipId && <p>Membership ID: <strong style={{ color: 'var(--color-primary)' }}>{userData?.membershipId}</strong></p>}

                    {(userData?.membershipStatus === 'none' || !userData?.membershipStatus) && (
                        <MembershipApplication />
                    )}

                    {userData?.membershipStatus === 'active' && (
                        <div style={{ marginTop: '1.5rem' }}>
                            <button
                                onClick={() => setShowCertificate(true)}
                                className="btn btn-outline"
                                style={{ width: '100%', justifyContent: 'center' }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                                Download Certificate
                            </button>
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
                @media (max-width: 600px) {
                    .dashboard-header { flex-direction: column; align-items: flex-start; }
                    .header-actions { width: 100%; justify-content: flex-end; }
                }
            `}</style>
        </div>
    );
};

export default Dashboard;
