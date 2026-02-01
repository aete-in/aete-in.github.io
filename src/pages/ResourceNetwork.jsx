import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Search, Briefcase, MapPin, Award, Lock, User as UserIcon, UserCheck, Mail, Phone, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';
import { getSmartSummary } from '../utils/smartSummary';
import ResourceMap from '../components/ResourceMap';

const ResourceNetwork = () => {
    const { currentUser, userData, loading } = useAuth();
    const navigate = useNavigate();

    const [persons, setPersons] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPerson, setSelectedPerson] = useState(null);

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
                const loadedPersons = Object.values(data).filter(user => {
                    // Include:
                    // 1. Professionals (Active)
                    // 2. Paid Students (tier !== 'free') (Active)
                    if (user.membershipStatus !== 'active') return false;

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

    const filteredPersons = persons.filter(person => {
        // Visibility Check
        const isProfilePaid = person.tier === 'paid'; // Assumes 'tier' is set. If undefined, treat as free? 
        // Logic: Visible if (Profile is Paid) OR (Viewer is Paid/Institutional)
        // Note: If existing users don't have 'tier', we might need to assume they are paid or free.
        // Let's assume 'paid' for safety if they were migrated, or 'free' if strict. 
        // Plan said: "Existing active members are Paid".
        // So: const effectiveTier = person.tier || 'paid';
        const effectiveTier = person.tier || 'paid'; // Default to paid for legacy active users

        const isVisible = (effectiveTier === 'paid') || isViewerPaid;

        if (!isVisible) return false;

        const term = searchTerm.toLowerCase();
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
            <SEO title="Resource Persons Network" description="Connect with industry experts and academic leaders." />
            <PageHeader
                title="Resource Persons Network"
                subtitle="Connect with a voluntary network of experts and mentors."
            />

            <div className="container section pt-0 mobile-section-adjust">

                {/* Map Section */}
                <ResourceMap persons={persons} onMarkerClick={setSelectedPerson} />

                {!isViewerPaid && (
                    <div className="limit-banner mb-4">
                        <div className="banner-content">
                            <Lock size={20} className="banner-icon" />
                            <p>
                                <strong>Limited View:</strong> You are viewing a restricted list of Resource Persons.
                                <br className="mobile-break" />
                                Upgrade to a <strong>Paid Membership</strong> to access the full network.
                            </p>
                        </div>
                        <button className="btn-upgrade" onClick={() => navigate('/membership')}>Upgrade Now</button>
                    </div>
                )}


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
                        filteredPersons.map((person, index) => (
                            <motion.div
                                key={index}
                                className="expert-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => setSelectedPerson(person)}
                            >
                                <div className="expert-card-content">
                                    <div className="avatar-large">
                                        {person.photoUrl ? (
                                            <img src={person.photoUrl} alt={person.name} />
                                        ) : (
                                            <UserIcon size={80} color="#cbd5e0" />
                                        )}
                                    </div>

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
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="no-access col-span-full">
                            <p>No resource persons found matching your criteria.</p>
                        </div>
                    )}
                </div>
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

                                    <div className="modal-contact-buttons">
                                        {selectedPerson.email && (
                                            <a href={`mailto:${selectedPerson.email}`} className="btn-full" onClick={(e) => e.stopPropagation()}>
                                                <Mail size={18} /> Send Email
                                            </a>
                                        )}
                                        {selectedPerson.phone && (
                                            <a href={`tel:${selectedPerson.phone}`} className="btn-full" onClick={(e) => e.stopPropagation()}>
                                                <Phone size={18} /> Call Now
                                            </a>
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

                .limit-banner {
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
                .banner-content {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    color: #c53030;
                }
                .banner-icon { flex-shrink: 0; }
                .btn-upgrade {
                    background: #c53030;
                    color: white;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 6px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-size: 0.9rem;
                }
                .btn-upgrade:hover { background: #9b2c2c; }
                .mobile-break { display: none; }
                @media (max-width: 600px) {
                    .mobile-break { display: block; }
                    .limit-banner { flex-direction: column; align-items: flex-start; text-align: left; }
                    .btn-upgrade { width: 100%; }
                }

                .mobile-section-adjust {
                    padding-top: 1rem;
                }
                .mobile-mb-3 {
                    margin-bottom: 1.5rem;
                }
                .mb-4 { margin-bottom: 2rem; }
                .mb-5 { margin-bottom: 3rem; }
                
                @media (min-width: 768px) {
                    .mobile-section-adjust { padding-top: var(--spacing-xl); }
                    .mobile-mb-3 { margin-bottom: 3rem; }
                }
                
                .search-bar {
                    width: 100%;
                    max-width: 600px;
                    width: 100%;
                    max-width: 600px;
                    padding: 0.75rem 1.25rem;
                    border: 1px solid #e2e8f0;
                    border-radius: 50px;
                    font-size: 1rem;
                    display: block;
                    margin: 0 auto;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.03);
                    transition: all 0.2s;
                }
                .search-bar:focus {
                    outline: none;
                    border-color: var(--color-secondary);
                    box-shadow: 0 0 0 3px rgba(0, 128, 128, 0.1);
                }

                .btn-primary {
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
                .btn-primary:hover { background-color: #1a365d; }

                .experts-grid {
                    display: grid;
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 1.5rem;
                }
                
                @media (min-width: 768px) {
                    .experts-grid {
                         gap: 2.5rem;
                    }
                }

                .expert-card {
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

                .expert-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                }

                .expert-card-content {
                    padding: 1.25rem;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    height: 100%;
                }

                @media (min-width: 768px) {
                    .expert-card-content {
                        padding: 2rem;
                    }
                }

                .avatar-large {
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
                .avatar-large img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .expert-name {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #2d3748;
                    margin-bottom: 0.25rem;
                    line-height: 1.3;
                }

                .expert-designation {
                    color: var(--color-secondary);
                    font-weight: 600;
                    font-size: 0.95rem;
                    margin-bottom: 0.25rem;
                    line-height: 1.4;
                }

                .expert-org {
                    color: #718096;
                    font-size: 0.9rem;
                    margin-bottom: 1.25rem;
                    line-height: 1.4;
                }

                .expert-divider {
                    width: 40px;
                    height: 3px;
                    background: #e2e8f0;
                    margin-bottom: 1.25rem;
                    border-radius: 2px;
                }

                .expert-meta {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    margin-bottom: 1.5rem;
                    width: 100%;
                }

                .meta-item {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    color: #4a5568;
                    font-size: 0.9rem;
                }
                .meta-item.top-align {
                    align-items: flex-start;
                }
                .mt-1 { margin-top: 0.25rem; }
                .flex-shrink-0 { flex-shrink: 0; }

                .expertise-chips {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.3rem;
                    justify-content: center;
                }
                .chip {
                    background: #edf2f7;
                    color: #2d3748;
                    padding: 2px 8px;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    border: 1px solid #e2e8f0;
                }
                .chip-more {
                    font-size: 0.75rem;
                    color: #718096;
                    align-self: center;
                }
                
                .expert-bio {
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

                .contact-buttons-card {
                    display: flex;
                    gap: 1rem;
                    margin-top: auto;
                }

                .contact-btn {
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

                .contact-btn:hover {
                    background-color: #005656;
                }

                /* Modal Styles */
                .modal-overlay {
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
                    z-index: 1000;
                    padding: 1rem;
                }

                .modal-content {
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
                    .modal-content {
                        height: auto;
                        max-height: 90vh;
                        border-radius: 20px;
                        width: 95%;
                    }
                }

                .close-button {
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

                .close-button:hover {
                    color: #2d3748;
                    background: #edf2f7;
                }

                .modal-body {
                    display: flex;
                    flex-direction: column;
                }

                /* Sidebar Style for Details */
                .modal-sidebar {
                    padding: 1.5rem 1.25rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    background: white;
                    border-bottom: 1px solid #edf2f7;
                }

                .modal-main {
                    padding: 1.5rem 1.25rem;
                    background: white;
                    flex: 1;
                }

                .modal-avatar {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    overflow: hidden;
                    margin-bottom: 1rem;
                    border: 4px solid white;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                    background: #f7fafc;
                }
                .modal-avatar img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .modal-designation {
                    color: var(--color-secondary);
                    font-weight: 600;
                    font-size: 1rem;
                    margin-bottom: 0.25rem;
                    line-height: 1.3;
                }

                .modal-org {
                    color: #718096;
                    font-size: 0.9rem;
                    margin-bottom: 1rem;
                    line-height: 1.3;
                }

                /* Responsive Desktop layout */
                @media (min-width: 768px) {
                    .modal-body {
                        flex-direction: row;
                        align-items: stretch;
                    }
                    .modal-sidebar {
                        width: 350px;
                        flex-shrink: 0;
                        border-right: 1px solid #edf2f7;
                        border-bottom: none;
                        padding: 4rem 2.5rem; /* Spacing for close button */
                    }
                    .modal-main {
                        padding: 4rem 2.5rem;
                    }
                    .modal-avatar {
                        width: 160px;
                        height: 160px;
                    }
                    .modal-meta-grid {
                         grid-template-columns: repeat(2, 1fr);
                    }
                    /* Align text left in sidebar for readability if needed, or keep centered */
                }

                .modal-header-name {
                    font-size: 2rem;
                    font-weight: 800;
                    color: #1a202c;
                    margin-bottom: 0.5rem;
                    line-height: 1.2;
                }

                .modal-section-title {
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
                .modal-section-title:first-child { margin-top: 0; }

                .modal-meta-grid {
                    display: grid;
                    grid-template-columns: 1fr; 
                    gap: 1rem;
                    margin-bottom: 2rem;
                }

                .modal-meta-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 0.75rem;
                    padding: 1rem;
                    background: #f8fafc;
                    border-radius: 12px;
                    border: 1px solid #edf2f7;
                }
                
                .meta-icon {
                    color: var(--color-secondary);
                    margin-top: 0.1rem;
                    flex-shrink: 0;
                }

                .meta-content {
                    display: flex;
                    flex-direction: column;
                    text-align: left;
                }
                .meta-label {
                    font-size: 0.75rem;
                    color: #718096;
                    margin-bottom: 0.25rem;
                }
                .meta-value {
                    font-size: 0.95rem;
                    color: #2d3748;
                    font-weight: 500;
                    line-height: 1.4;
                }

                .modal-bio {
                    font-size: 1rem;
                    color: #4a5568;
                    line-height: 1.8;
                    text-align: justify; /* Justify text */
                    margin-bottom: 2rem;
                    white-space: pre-wrap; /* Preserve paragraphs */
                }

                .modal-contact-buttons {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    width: 100%;
                    margin-top: 1.5rem;
                }
                
                .btn-full {
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
                .btn-full:hover {
                    background: #2c5282;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }
            `}</style>
        </div>
    );
};

export default ResourceNetwork;
