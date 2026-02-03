import { useState } from 'react';
import { db } from '../firebase';
import { ref, query, orderByChild, equalTo, get } from 'firebase/database';
import { Search, CheckCircle, XCircle, ShieldCheck } from 'lucide-react';
import PageHero from '../components/PageHero';
import SEO from '../components/SEO';

const VerifiedMember = () => {
    const [searchId, setSearchId] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);

    const handleVerify = async (e) => {
        e.preventDefault();
        if (!searchId.trim()) return;

        setLoading(true);
        setError(null);
        setResult(null);
        setHasSearched(true);

        try {
            const memberRef = ref(db, `public_memberships/${searchId.trim()}`);
            const snapshot = await get(memberRef);

            if (snapshot.exists()) {
                setResult(snapshot.val());
            } else {
                setResult(null);
            }
        } catch (err) {
            console.error("Verification error:", err);
            setError("Unable to verify at this moment. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="verify-page">
            <SEO title="Verify Membership" description="Verify AETE Membership Status" />
            <PageHero
                title="Membership Verification"
                subtitle="Validate the authenticity of an AETE Membership."
            />

            <div className="container section">
                <div className="verification-card">
                    <div className="search-box">
                        <form onSubmit={handleVerify}>
                            <label htmlFor="memberId">Enter Membership ID</label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    id="memberId"
                                    placeholder="e.g. LM0201"
                                    value={searchId}
                                    onChange={(e) => setSearchId(e.target.value)}
                                    className="form-input"
                                />
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? 'Verifying...' : 'Verify'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {hasSearched && !loading && (
                        <div className="result-area">
                            {result ? (
                                <div className="success-card">
                                    <div className="result-icon success">
                                        <CheckCircle size={48} />
                                    </div>
                                    <h3>Verified Member</h3>
                                    <div className="member-details">
                                        <p><strong>Name:</strong> {result.name}</p>
                                        <p><strong>Membership ID:</strong> {result.membershipId}</p>
                                        <p><strong>Type:</strong> <span style={{ textTransform: 'capitalize' }}>{result.membershipType}</span></p>
                                        <p><strong>Status:</strong> <span className="badge-active">Active</span></p>
                                        {result.membershipDate && (
                                            <p><strong>Member Since:</strong> {new Date(result.membershipDate).getFullYear()}</p>
                                        )}
                                    </div>
                                    <div className="seal">
                                        <ShieldCheck size={24} /> Official Record
                                    </div>
                                </div>
                            ) : (
                                <div className="error-card">
                                    <div className="result-icon error">
                                        <XCircle size={48} />
                                    </div>
                                    <h3>Record Not Found</h3>
                                    <p>No active membership found for ID: <strong>{searchId}</strong></p>
                                    <p className="help-text">Please check the ID and try again, or contact support.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {error && <p className="error-msg">{error}</p>}
                </div>
            </div>

            <style jsx="true">{`
                .verification-card {
                    max-width: 600px;
                    margin: 0 auto;
                }
                .search-box {
                    background: white;
                    padding: 2rem;
                    border-radius: 12px;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                    border: 1px solid #e2e8f0;
                    margin-bottom: 2rem;
                }
                .input-group {
                    display: flex;
                    gap: 1rem;
                    margin-top: 0.5rem;
                }
                .form-input {
                    flex: 1;
                    padding: 0.75rem 1rem;
                    border: 2px solid #e2e8f0;
                    border-radius: 8px;
                    font-size: 1rem;
                    outline: none;
                    transition: border-color 0.2s;
                }
                .form-input:focus {
                    border-color: var(--color-primary);
                }
                .btn-primary {
                    background: var(--color-primary);
                    color: white;
                    border: none;
                    padding: 0 1.5rem;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                }
                .btn-primary:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }
                
                .result-area {
                    animation: fadeIn 0.3s ease;
                }
                
                .success-card, .error-card {
                    background: white;
                    padding: 2rem;
                    border-radius: 12px;
                    text-align: center;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }
                
                .success-card {
                    border-top: 5px solid #10b981;
                }
                .error-card {
                    border-top: 5px solid #ef4444;
                }

                .result-icon {
                    margin-bottom: 1rem;
                }
                .result-icon.success { color: #10b981; }
                .result-icon.error { color: #ef4444; }

                .member-details {
                    text-align: left;
                    background: #f8fafc;
                    padding: 1.5rem;
                    border-radius: 8px;
                    margin: 1.5rem 0;
                }
                .member-details p {
                    margin-bottom: 0.5rem;
                    font-size: 1.05rem;
                    color: #334155;
                }
                .badge-active {
                    background: #dcfce7;
                    color: #166534;
                    padding: 2px 8px;
                    border-radius: 4px;
                    font-size: 0.85rem;
                    font-weight: 700;
                    text-transform: uppercase;
                }

                .seal {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    color: #64748b;
                    font-size: 0.9rem;
                    font-weight: 500;
                }

                .error-msg {
                    color: #ef4444;
                    text-align: center;
                    margin-top: 1rem;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 600px) {
                    .input-group {
                        flex-direction: column;
                    }
                    .btn-primary {
                        padding: 0.75rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default VerifiedMember;
