import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Search, Briefcase, MapPin, Award, Lock, User as UserIcon, UserCheck, Mail, Phone, X, Trash2, MessageCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';


import { db } from '../firebase';
import { ref, onValue, update } from 'firebase/database';
import { getSmartSummary } from '../utils/smartSummary';
import ResourceMap from '../components/ResourceMap';

const AcademicPool = () => {
    const { currentUser, userData, loading, isAdmin } = useAuth();
    const navigate = useNavigate();

    const [persons, setPersons] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPerson, setSelectedPerson] = useState(null);

    // Delete Logic
    const handleDeleteMember = async (uid) => {
        if (!uid) return;
        if (window.confirm("Are you sure you want to delete this member? This action cannot be undone.")) {
            try {
                // Delete from /users node
                // Note: We are setting it to null to delete it
                const updates = {};
                updates[`/users/${uid}`] = null;
                updates[`/memberships/${uid}`] = null;

                await update(ref(db), updates);

                alert("Member deleted successfully.");
                setSelectedPerson(null);
            } catch (error) {
                console.error("Deletion failed:", error);
                alert("Failed to delete member: " + error.message);
            }
        }
    };

    // Filter Logic based on Visibility Rules
    // P1: Paid Profile -> Visible to Everyone
    // P2: Free Profile -> Visible ONLY to Payment/Tier Users (Paid Professional / Institutional)
    // P2: Free Profile -> Visible ONLY to Payment/Tier Users (Paid Professional / Institutional)
    // Fix: Check for 'active' status and ensure tier is NOT 'free'. This handles Legacy users (tier=undefined) as Paid.
    const isViewerPaid = userData?.membershipStatus === 'active' && userData?.tier !== 'free';

    useEffect(() => {
        const usersRef = ref(db, 'users');
        const unsubscribe = onValue(usersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Fetch ALL active professionals (free or paid)
                // Convert object to array but KEEP KEYS (uid)
                const loadedPersons = Object.entries(data).map(([key, user]) => ({
                    ...user,
                    id: key
                })).filter(user => {
                    // Include:
                    // 1. Professionals (Active)
                    // 2. Paid Students (tier !== 'free') (Active)
                    if (user.membershipStatus !== 'active') return false;

                    // Filter Unverified Emails
                    if (user.emailVerified !== true) return false;

                    const isPaidStudent = user.membershipType === 'student' && user.tier !== 'free';
                    const isProfessional = user.membershipType === 'professional';

                    return isProfessional || isPaidStudent;
                });
                setPersons(loadedPersons);
            }
        });
        return unsubscribe;
    }, []);

    // Access Denied / Redirect Logic REMOVED. Public access allowed for filtered list.
    // If we wanted to block the page entirely for non-logged in users, we could keep it used, but
    // the requirement implies "visible if logged in user is a paid type user" for unpaid profiles,
    // and "open to all" for paid profiles. This implies the page itself must be accessible.

    if (loading) return null;

    // Helper function to determine if a card should be locked
    const isCardLocked = (profile) => {
        if (!currentUser) return true; // Not logged in = locked
        if (isViewerPaid) return false; // Paid users see everything unlocked

        const profileEffectiveTier = profile.tier || 'paid'; // Legacy users default to paid
        return profileEffectiveTier === 'free'; // Free viewing free = locked
    };

    // NEW: Show ALL profiles to logged-in users (but lock them in UI if needed)
    // If not logged in, show NOTHING (empty list)
    const filteredPersons = !currentUser ? [] : persons.filter(person => {
        const term = searchTerm.toLowerCase();

        // For locked cards, only search by name (since other fields are hidden)
        if (isCardLocked(person)) {
            return person.name?.toLowerCase().includes(term);
        }

        // For unlocked cards, search all fields
        return (
            person.name?.toLowerCase().includes(term) ||
            person.designation?.toLowerCase().includes(term) ||
            person.organization?.toLowerCase().includes(term) ||
            person.expertise?.toLowerCase().includes(term) ||
            person.location?.toLowerCase().includes(term)
        );
    });

    return (
        <div className="resource-network-page">
            <SEO title="Academic Resource Pool" description="Access industry experts and academic leaders for educational programs." />
            <PageHero
                title="Academic Resource Pool"
                subtitle="Exclusive directory of experts for our members."
            />

            <div className="container section pt-0 mobile-section-adjust">

                {/* Map Section - Only if Logged In and Verified */}
                {currentUser && currentUser.emailVerified ? (
                    <ResourceMap persons={persons} onMarkerClick={setSelectedPerson} />
                ) : (
                    <div className="limit-banner mb-5" style={{ background: '#ebf8ff', borderColor: '#bee3f8' }}>
                        <div className="banner-content">
                            <Lock size={20} className="banner-icon" style={{ color: '#3182ce' }} />
                            <p style={{ color: '#2c5282' }}>
                                {currentUser ? (
                                    <>
                                        <strong>Email Verification Required:</strong> Your email is not verified. Please check your inbox.
                                        Only after verification will your profile be shown in the pool and you will be able to see others.
                                    </>
                                ) : (
                                    <>
                                        <strong>Access Restricted:</strong> You must be logged in to view the Academic Resource Pool.
                                    </>
                                )}
                            </p>
                        </div>
                        {!currentUser && <button className="btn-upgrade" style={{ background: '#3182ce' }} onClick={() => navigate('/login')}>Login Now</button>}
                    </div>
                )}

                {currentUser && currentUser.emailVerified && !isViewerPaid && (
                    <div className="limit-banner mb-4">
                        <div className="banner-content">
                            <Lock size={20} className="banner-icon" />
                            <p>
                                <strong>Limited View:</strong> You can see all Resource Persons, but profiles with locked cards are hidden.
                                <br className="mobile-break" />
                                Upgrade to a <strong>Paid Membership</strong> to unlock all profiles and view complete details.
                            </p>
                        </div>
                        <button className="btn-upgrade" onClick={() => navigate('/membership')}>Upgrade Now</button>
                    </div>
                )}


                {currentUser && currentUser.emailVerified && (
                    <>
                        <div className="search-filter mb-4 mobile-mb-3">
                            <input
                                type="text"
                                placeholder="Search by name, expertise, or location..."
                                className="search-bar"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="experts-grid">
                            {filteredPersons.length > 0 ? (
                                filteredPersons.map((person, index) => {
                                    const locked = isCardLocked(person);
                                    return (
                                        <motion.div
                                            key={index}
                                            className={`expert-card ${locked ? 'locked-card' : ''}`}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            onClick={() => {
                                                if (locked) {
                                                    // Show upgrade prompt instead of opening modal
                                                    navigate('/membership');
                                                } else {
                                                    setSelectedPerson(person);
                                                }
                                            }}
                                        >
                                            <div className="expert-card-content">
                                                <div className="avatar-large">
                                                    {person.photoUrl ? (
                                                        <img src={person.photoUrl} alt={person.name} />
                                                    ) : (
                                                        <UserIcon size={80} color="#cbd5e0" />
                                                    )}
                                                </div>

                                                {locked ? (
                                                    <>
                                                        <div className="locked-content-wrapper">
                                                            <div className="lock-overlay">
                                                                <Lock size={32} className="lock-icon" />
                                                                <h4 className="lock-title">Upgrade to Unlock</h4>
                                                                <p className="lock-text">View full profile details</p>
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <h3 className="expert-name">{person.name}</h3>
                                                        <p className="expert-designation">{person.designation}</p>
                                                        <p className="expert-org">{person.organization}</p>

                                                        <div className="expert-divider"></div>

                                                        <div className="expert-meta">
                                                            <div className="meta-item">
                                                                <MapPin size={14} />
                                                                <span>{person.location}</span>
                                                            </div>
                                                            <div className="meta-item top-align">
                                                                <Award size={14} className="mt-1 flex-shrink-0" />
                                                                <div className="expertise-chips">
                                                                    {person.expertise?.split(',').slice(0, 3).map((tech, i) => (
                                                                        <span key={i} className="chip">{tech.trim()}</span>
                                                                    ))}
                                                                    {person.expertise?.split(',').length > 3 && (
                                                                        <span className="chip-more">+{person.expertise.split(',').length - 3}</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            {person.experience && (
                                                                <div className="meta-item">
                                                                    <Briefcase size={14} />
                                                                    <span>Exp: {person.experience}</span>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {person.bio && (
                                                            <p className="expert-bio">
                                                                {getSmartSummary(person.bio)}
                                                            </p>
                                                        )}

                                                        <div className="contact-buttons-card">
                                                            {person.email && (
                                                                <a href={`mailto:${person.email}`} className="contact-btn" onClick={(e) => e.stopPropagation()}>
                                                                    <Mail size={16} /> Email
                                                                </a>
                                                            )}
                                                            {person.phone && (
                                                                <a href={`tel:${person.phone}`} className="contact-btn" onClick={(e) => e.stopPropagation()}>
                                                                    <Phone size={16} /> Call
                                                                </a>
                                                            )}
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                })
                            ) : (
                                <div className="no-access col-span-full">
                                    <p>No resource persons found matching your criteria.</p>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>

            <AnimatePresence>
                {selectedPerson && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedPerson(null)}
                    >
                        <motion.div
                            className="modal-content"
                            initial={{ y: "100vh", opacity: 0 }}
                            animate={{ y: "0", opacity: 1 }}
                            exit={{ y: "100vh", opacity: 0 }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="close-button" onClick={() => setSelectedPerson(null)}>
                                <X size={24} />
                            </button>

                            <div className="modal-body">
                                <div className="modal-sidebar">
                                    <div className="modal-avatar">
                                        {selectedPerson.photoUrl ? (
                                            <img src={selectedPerson.photoUrl} alt={selectedPerson.name} />
                                        ) : (
                                            <UserIcon size={80} color="#cbd5e0" />
                                        )}
                                    </div>
                                    <h2 className="modal-header-name">{selectedPerson.name}</h2>
                                    <p className="modal-designation">{selectedPerson.designation}</p>
                                    <p className="modal-org">{selectedPerson.organization}</p>

                                    <div className="sidebar-meta">
                                        <div className="sidebar-meta-item">
                                            <MapPin size={16} className="meta-icon-sidebar" />
                                            <span>{selectedPerson.location}</span>
                                        </div>
                                        {selectedPerson.experience && (
                                            <div className="sidebar-meta-item">
                                                <Briefcase size={16} className="meta-icon-sidebar" />
                                                <span>{selectedPerson.experience} Exp</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="modal-contact-buttons">
                                        {selectedPerson.email && (
                                            <a href={`mailto:${selectedPerson.email}`} className="btn-full" onClick={(e) => e.stopPropagation()}>
                                                <Mail size={18} /> {selectedPerson.email}
                                            </a>
                                        )}
                                        {selectedPerson.phone && (
                                            <>
                                                <a href={`tel:${selectedPerson.phone}`} className="btn-full" onClick={(e) => e.stopPropagation()}>
                                                    <Phone size={18} /> {selectedPerson.phone}
                                                </a>
                                                <a
                                                    href={`https://wa.me/${selectedPerson.phone.replace(/[^0-9]/g, '')}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn-full"
                                                    style={{ background: '#25D366', marginTop: '0.2rem' }}
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <MessageCircle size={18} /> WhatsApp
                                                </a>
                                            </>
                                        )}

                                        {isAdmin && (
                                            <button
                                                className="btn-full btn-delete"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteMember(selectedPerson.id);
                                                }}
                                            >
                                                <Trash2 size={18} /> Delete Member
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="modal-main">
                                    <span className="modal-section-title">Details</span>
                                    <div className="modal-meta-grid">
                                        <div className="modal-meta-item">
                                            <MapPin size={18} className="meta-icon" />
                                            <div className="meta-content">
                                                <span className="meta-label">Location</span>
                                                <span className="meta-value">{selectedPerson.location}</span>
                                            </div>
                                        </div>
                                        <div className="modal-meta-item">
                                            <Briefcase size={18} className="meta-icon" />
                                            <div className="meta-content">
                                                <span className="meta-label">Experience</span>
                                                <span className="meta-value">{selectedPerson.experience || 'Not specified'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Resource Roles Section */}
                                    {selectedPerson.resourceRoles && selectedPerson.resourceRoles.length > 0 && (
                                        <>
                                            <span className="modal-section-title">Resource Roles</span>
                                            <div className="expertise-chips mb-5" style={{ justifyContent: 'flex-start', marginBottom: '2rem' }}>
                                                {Array.isArray(selectedPerson.resourceRoles) ? selectedPerson.resourceRoles.map((role, i) => (
                                                    <span key={i} className="chip role-chip-display" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem', borderColor: '#4299e1', color: '#2b6cb0', background: '#ebf8ff' }}>{role}</span>
                                                )) : (
                                                    // Handle case where it might be saved as non-array legacy
                                                    <span className="chip">{selectedPerson.resourceRoles}</span>
                                                )}
                                            </div>
                                        </>
                                    )}

                                    <span className="modal-section-title">Expertise</span>
                                    {/* Using same chip functionality but perhaps larger or just normal chips in a container */}
                                    <div className="expertise-chips mb-5" style={{ justifyContent: 'flex-start', marginBottom: '2rem' }}>
                                        {selectedPerson.expertise?.split(',').map((tech, i) => (
                                            <span key={i} className="chip" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>{tech.trim()}</span>
                                        ))}
                                    </div>

                                    {selectedPerson.bio && (
                                        <>
                                            <span className="modal-section-title">Biography</span>
                                            <p className="modal-bio">{selectedPerson.bio}</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx="true">{`
                .resource-network-page .limit-banner {
                    background: #fff5f5;
                    border: 1px solid #feb2b2;
                    border-radius: 8px;
                    padding: 1rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 1rem;
                }
                .resource-network-page .banner-content {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    color: #c53030;
                }
                .resource-network-page .banner-icon { flex-shrink: 0; }
                .resource-network-page .btn-upgrade {
                    background: #c53030;
                    color: white;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 6px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-size: 0.9rem;
                    width: auto;
                }
                .resource-network-page .btn-upgrade:hover { background: #9b2c2c; }
                .resource-network-page .mobile-break { display: none; }
                
                @media (max-width: 600px) {
                    .resource-network-page .mobile-break { display: block; }
                    .resource-network-page .limit-banner { flex-direction: column; align-items: flex-start; text-align: left; }
                    .resource-network-page .btn-upgrade { width: 100%; }
                }

                .resource-network-page .mobile-section-adjust {
                    padding-top: 1rem;
                }
                .resource-network-page .mobile-mb-3 {
                    margin-bottom: 1.5rem;
                }
                .resource-network-page .mb-4 { margin-bottom: 2rem; }
                .resource-network-page .mb-5 { margin-bottom: 3rem; }
                
                @media (min-width: 768px) {
                    .resource-network-page .mobile-section-adjust { padding-top: var(--spacing-xl); }
                    .resource-network-page .mobile-mb-3 { margin-bottom: 3rem; }
                }
                
                .resource-network-page .search-bar {
                    max-width: 600px;
                    width: 100%;
                    padding: 0.75rem 1.25rem;
                    border: 1px solid #e2e8f0;
                    border-radius: 50px;
                    font-size: 1rem;
                    display: block;
                    margin: 0 auto;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.03);
                    transition: all 0.2s;
                }
                .resource-network-page .search-bar:focus {
                    outline: none;
                    border-color: var(--color-secondary);
                    box-shadow: 0 0 0 3px rgba(0, 128, 128, 0.1);
                }

                /* Scoped Button Primary to avoid leaking to Navbar */
                .resource-network-page .btn-primary {
                    background-color: var(--color-primary);
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 6px;
                    border: none;
                    cursor: pointer;
                    transition: background 0.2s;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    text-decoration: none;
                }
                .resource-network-page .btn-primary:hover { background-color: #1a365d; }

                .resource-network-page .experts-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 1.5rem;
                }
                
                @media (min-width: 768px) {
                    .resource-network-page .experts-grid {
                         gap: 2.5rem;
                    }
                }

                .resource-network-page .expert-card {
                    background: white;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    border: 1px solid #f0f0f0;
                    display: flex;
                    flex-direction: column;
                    cursor: pointer;
                    height: 100%;
                }

                .resource-network-page .expert-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                }

                .resource-network-page .expert-card-content {
                    padding: 1.25rem;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    height: 100%;
                }

                @media (min-width: 768px) {
                    .resource-network-page .expert-card-content {
                        padding: 2rem;
                    }
                }

                .resource-network-page .avatar-large {
                    width: 120px; 
                    height: 120px;
                    border-radius: 50%;
                    overflow: hidden;
                    margin-bottom: 1.25rem;
                    border: 3px solid #fff;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    background: #f7fafc;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .resource-network-page .avatar-large img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .resource-network-page .expert-name {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #2d3748;
                    margin-bottom: 0.25rem;
                    line-height: 1.3;
                }

                .resource-network-page .expert-designation {
                    color: var(--color-secondary);
                    font-weight: 600;
                    font-size: 0.95rem;
                    margin-bottom: 0.25rem;
                    line-height: 1.4;
                }

                .resource-network-page .expert-org {
                    color: #718096;
                    font-size: 0.9rem;
                    margin-bottom: 1.25rem;
                    line-height: 1.4;
                }

                .resource-network-page .expert-divider {
                    width: 40px;
                    height: 3px;
                    background: #e2e8f0;
                    margin-bottom: 1.25rem;
                    border-radius: 2px;
                }

                .resource-network-page .expert-meta {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    margin-bottom: 1.5rem;
                    width: 100%;
                }

                .resource-network-page .meta-item {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    color: #4a5568;
                    font-size: 0.9rem;
                }
                .resource-network-page .meta-item.top-align {
                    align-items: flex-start;
                }
                .resource-network-page .mt-1 { margin-top: 0.25rem; }
                .resource-network-page .flex-shrink-0 { flex-shrink: 0; }

                .resource-network-page .expertise-chips {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.3rem;
                    justify-content: center;
                }
                .resource-network-page .chip {
                    background: #edf2f7;
                    color: #2d3748;
                    padding: 2px 8px;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    border: 1px solid #e2e8f0;
                }
                .resource-network-page .chip-more {
                    font-size: 0.75rem;
                    color: #718096;
                    align-self: center;
                }
                
                .resource-network-page .expert-bio {
                    font-size: 0.9rem;
                    color: #718096;
                    line-height: 1.6;
                    margin-top: auto; 
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    margin-bottom: 1.5rem;
                    text-align: justify; /* Justify text */
                }

                /* Locked Card Styles */
                .resource-network-page .locked-card {
                    position: relative;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .resource-network-page .locked-card:hover {
                    transform: translateY(-5px) scale(1.02);
                    box-shadow: 0 25px 30px -5px rgba(0, 0, 0, 0.15), 0 15px 15px -5px rgba(0, 0, 0, 0.08);
                }

                .resource-network-page .locked-content-wrapper {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-grow: 1;
                    padding: 2rem 1rem;
                }

                .resource-network-page .lock-overlay {
                    text-align: center;
                    z-index: 10;
                    background: rgba(255, 255, 255, 0.95);
                    padding: 1.5rem 2rem;
                    border-radius: 12px;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                    backdrop-filter: blur(10px);
                    border: 2px dashed #e2e8f0;
                }

                .resource-network-page .lock-icon {
                    color: var(--color-secondary);
                    margin-bottom: 0.5rem;
                    animation: lockPulse 2s ease-in-out infinite;
                }

                @keyframes lockPulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }

                .resource-network-page .lock-title {
                    font-size: 1rem;
                    font-weight: 700;
                    color: var(--color-primary);
                    margin-bottom: 0.25rem;
                }

                .resource-network-page .lock-text {
                    font-size: 0.85rem;
                    color: #718096;
                    margin: 0;
                }

                .resource-network-page .blurred-text {
                    filter: blur(6px);
                    user-select: none;
                    pointer-events: none;
                    color: #cbd5e0;
                }

                .resource-network-page .locked-card .expert-card-content {
                    position: relative;
                }

                .resource-network-page .locked-card .avatar-large {
                    filter: none; /* Photo stays clear */
                    position: relative;
                    z-index: 5;
                }

                .resource-network-page .contact-buttons-card {
                    display: flex;
                    gap: 1rem;
                    margin-top: auto;
                }

                .resource-network-page .contact-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                    background-color: var(--color-secondary);
                    color: white;
                    text-decoration: none;
                    font-size: 0.85rem;
                    transition: background-color 0.2s ease;
                }

                .resource-network-page .contact-btn:hover {
                    background-color: #005656;
                }

                /* Modal Styles - Modal is usually appended to body (portals), 
                   but in this code it seems inline? 
                   If inline: strictly scope. 
                   If portal: standard scoping fails but generic classes might leak.
                   Assuming AnimatePresence renders inline or portal. 
                   If portal, we need specific classes. 
                   But let's assume inline since framed-motion usually animates inline unless Portal used.
                   The 'modal-overlay' is fixed, so it acts like a modal.
                   I will scope it under .resource-network-page assuming it is rendered inside it (it is in JSX).
                */
                .resource-network-page .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.7);
                    backdrop-filter: blur(4px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2000; /* Increased to stay above navbar if needed */
                    padding: 1rem;
                }

                .resource-network-page .modal-content {
                    background: white;
                    border-radius: 20px;
                    width: 100%;
                    max-width: 900px;
                    height: 100%;
                    max-height: 100vh;
                    overflow-y: auto;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    border-radius: 0;
                }

                @media (min-width: 768px) {
                    .resource-network-page .modal-content {
                        height: auto;
                        max-height: 90vh;
                        border-radius: 20px;
                        width: 95%;
                    }
                }

                .resource-network-page .close-button {
                    position: absolute;
                    top: 1.5rem;
                    right: 1.5rem;
                    background: #f7fafc;
                    border: none;
                    cursor: pointer;
                    color: #718096;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0.5rem;
                    border-radius: 50%;
                    z-index: 10;
                }

                .resource-network-page .close-button:hover {
                    color: #2d3748;
                    background: #edf2f7;
                }

                .resource-network-page .modal-body {
                    display: flex;
                    flex-direction: column;
                }

                /* Sidebar Style for Details */
                .resource-network-page .modal-sidebar {
                    padding: 1.5rem 1.25rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    background: white;
                    border-bottom: 1px solid #edf2f7;
                }

                .resource-network-page .modal-main {
                    padding: 1.5rem 1.25rem;
                    background: white;
                    flex: 1;
                }

                .resource-network-page .modal-avatar {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    overflow: hidden;
                    margin-bottom: 1rem;
                    border: 4px solid white;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                    background: #f7fafc;
                }
                .resource-network-page .modal-avatar img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .resource-network-page .modal-designation {
                    color: var(--color-secondary);
                    font-weight: 600;
                    font-size: 1rem;
                    margin-bottom: 0.25rem;
                    line-height: 1.3;
                }

                .resource-network-page .modal-org {
                    color: #718096;
                    font-size: 0.9rem;
                    margin-bottom: 1rem;
                    line-height: 1.3;
                }

                /* Responsive Desktop layout */
                @media (min-width: 768px) {
                    .resource-network-page .modal-body {
                        flex-direction: row;
                        align-items: stretch;
                    }
                    .resource-network-page .modal-sidebar {
                        width: 350px;
                        flex-shrink: 0;
                        border-right: 1px solid #edf2f7;
                        border-bottom: none;
                        padding: 4rem 2.5rem; /* Spacing for close button */
                    }
                    .resource-network-page .modal-main {
                        padding: 4rem 2.5rem;
                    }
                    .resource-network-page .modal-avatar {
                        width: 160px;
                        height: 160px;
                    }
                    .resource-network-page .modal-meta-grid {
                         grid-template-columns: repeat(2, 1fr);
                    }
                }

                .resource-network-page .modal-header-name {
                    font-size: 2rem;
                    font-weight: 800;
                    color: #1a202c;
                    margin-bottom: 0.5rem;
                    line-height: 1.2;
                }

                .resource-network-page .modal-section-title {
                    font-size: 0.85rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    color: #a0aec0;
                    font-weight: 700;
                    margin-bottom: 1rem;
                    margin-top: 1.5rem;
                    display: block;
                    text-align: left;
                }
                .resource-network-page .modal-section-title:first-child { margin-top: 0; }

                .resource-network-page .modal-meta-grid {
                    display: grid;
                    grid-template-columns: 1fr; 
                    gap: 1rem;
                    margin-bottom: 2rem;
                }

                .resource-network-page .modal-meta-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 0.75rem;
                    padding: 1rem;
                    background: #f8fafc;
                    border-radius: 12px;
                    border: 1px solid #edf2f7;
                }
                
                .resource-network-page .meta-icon {
                    color: var(--color-secondary);
                    margin-top: 0.1rem;
                    flex-shrink: 0;
                }

                .resource-network-page .meta-content {
                    display: flex;
                    flex-direction: column;
                    text-align: left;
                }
                .resource-network-page .meta-label {
                    font-size: 0.75rem;
                    color: #718096;
                    margin-bottom: 0.25rem;
                }
                .resource-network-page .meta-value {
                    font-size: 0.95rem;
                    color: #2d3748;
                    font-weight: 500;
                    line-height: 1.4;
                }

                .resource-network-page .modal-bio {
                    font-size: 1rem;
                    color: #4a5568;
                    line-height: 1.8;
                    text-align: justify; /* Justify text */
                    margin-bottom: 2rem;
                    white-space: pre-wrap; /* Preserve paragraphs */
                }

                .resource-network-page .sidebar-meta {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    margin-bottom: 0.5rem;
                    width: 100%;
                }
                .resource-network-page .sidebar-meta-item {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    color: #4a5568;
                    font-size: 0.9rem;
                    background: #f7fafc;
                    padding: 0.5rem;
                    border-radius: 6px;
                    border: 1px solid #edf2f7;
                }
                .resource-network-page .meta-icon-sidebar {
                    color: var(--color-secondary);
                    flex-shrink: 0;
                }

                .resource-network-page .modal-contact-buttons {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    width: 100%;
                    margin-top: 1.5rem;
                }
                
                .resource-network-page .btn-full {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.75rem;
                    padding: 0.75rem 1rem;
                    border-radius: 8px;
                    font-weight: 600;
                    background: var(--color-secondary);
                    color: white;
                    text-decoration: none;
                    transition: all 0.2s;
                }
                .resource-network-page .btn-full:hover {
                    background: #2c5282;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }
                .resource-network-page .btn-delete {
                    background: #e53e3e;
                    margin-top: 1rem;
                }
                .resource-network-page .btn-delete:hover {
                    background: #c53030;
                }
            `}</style>
        </div>
    );
};

export default AcademicPool;
