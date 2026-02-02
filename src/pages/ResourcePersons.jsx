import { motion } from 'framer-motion';
import { Users, Building2, GraduationCap, ArrowRight, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';

const ResourcePersons = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="resource-persons-page">
            <SEO title="Academic Resource Pool" description="Join AETE's elite directory of industry experts and academic leaders." />
            <PageHero
                title="Academic Resource Pool"
                subtitle="Bridging the gap between theory and practice through expert mentorship."
            />

            <div className="container section">
                <div className="intro-section center mb-5">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2>Empowering Education with Expertise</h2>
                        <p className="lead-text">
                            The AETE Academic Resource Pool is a <strong>voluntary directory</strong> of professionals willing to serve as resource persons.
                            Experts include engineers, faculty members, industry professionals, and researchers who have voluntarily listed themselves to facilitate knowledge sharing.
                        </p>
                        <div className="highlight-disclaimer">
                            <p>
                                <strong>Disclaimer:</strong> AETE® facilitates visibility and connection only.
                                <strong>AETE® does not appoint, authorize, certify, or recommend professionals in an official or statutory capacity.</strong>
                            </p>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    className="benefits-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.div variants={itemVariants} className="benefit-card">
                        <div className="icon-box">
                            <Users size={32} />
                        </div>
                        <h3>For Institutions</h3>
                        <p>Access a pool of verified experts for Guest Lectures, FDPs, and Technical Workshops. Enhance your curriculum with industry insights.</p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="benefit-card">
                        <div className="icon-box">
                            <Building2 size={32} />
                        </div>
                        <h3>For Industry</h3>
                        <p>Connect with academic talents, influence engineering curricula, and scout for potential recruits through direct engagement.</p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="benefit-card">
                        <div className="icon-box">
                            <GraduationCap size={32} />
                        </div>
                        <h3>For Professionals</h3>
                        <p>Share your knowledge, build your personal brand, and contribute to the next generation of engineers while collaborating with peers.</p>
                    </motion.div>
                </motion.div>

                <div className="domains-section mt-5">
                    <h2 className="center section-title">Domains Covered</h2>
                    <div className="domains-grid">
                        <div className="domain-chip">Artificial Intelligence & ML</div>
                        <div className="domain-chip">Android & Mobile Tech</div>
                        <div className="domain-chip">Internet of Things (IoT)</div>
                        <div className="domain-chip">Data Science & Analytics</div>
                        <div className="domain-chip">Cyber Security</div>
                        <div className="domain-chip">Cloud Computing & DevOps</div>
                        <div className="domain-chip">Educational Technology</div>
                        <div className="domain-chip">Research Methodology & Innovation</div>
                    </div>
                </div>

                <div className="access-section mt-5">
                    <div className="cta-card professional-access">
                        <h3><Lock size={20} className="inline-icon" /> Professional Members Access</h3>
                        <p>
                            Professional Members of AETE get <strong>exclusive, unlimited access</strong> to the full directory of Resource Persons.
                            Connect directly, view profiles, and request mentorship.
                        </p>
                        <div className="btn-group">
                            <Link to="/academic-pool" className="btn btn-primary">Access Directory</Link>
                            <span className="sub-text">Requires Login</span>
                        </div>
                    </div>

                    <div className="cta-card join-network">
                        <h3>Join as an Expert</h3>
                        <p>
                            Are you an industry professional or senior academician? Join our pool of experts to share your knowledge and impact engineering education.
                        </p>
                        <Link to="/membership" className="btn btn-outline">Apply for Membership</Link>
                    </div>
                </div>
            </div>

            <style jsx="true">{`
                .center { text-align: center; }
                .mb-5 { margin-bottom: 4rem; }
                .mt-5 { margin-top: 4rem; }

                .intro-section {
                    max-width: 800px;
                    margin: 0 auto 4rem;
                }

                .intro-section h2 {
                    font-size: 2.2rem;
                    color: var(--color-primary);
                    margin-bottom: 1rem;
                }

                .lead-text {
                    font-size: 1.2rem;
                    color: #4a5568;
                    line-height: 1.6;
                }

                .benefits-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                }

                .benefit-card {
                    background: white;
                    padding: 2.5rem;
                    border-radius: 12px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                    text-align: center;
                    border-top: 4px solid var(--color-secondary);
                    transition: transform 0.3s ease;
                }

                .benefit-card:hover {
                    transform: translateY(-5px);
                }

                .icon-box {
                    background: #f0f4f8;
                    color: var(--color-primary);
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1.5rem;
                }

                .benefit-card h3 {
                    font-size: 1.3rem;
                    margin-bottom: 1rem;
                    color: #2d3748;
                }

                .benefit-card p {
                    color: #718096;
                }

                .access-section {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2rem;
                }

                .cta-card {
                    padding: 3rem;
                    border-radius: 12px;
                }

                .professional-access {
                    background: #ebf8ff;
                    border: 1px solid #bee3f8;
                }

                .join-network {
                    background: #f7fafc;
                    border: 1px solid #e2e8f0;
                }

                .cta-card h3 {
                    font-size: 1.5rem;
                    margin-bottom: 1rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--color-primary);
                }

                .cta-card p {
                    margin-bottom: 2rem;
                    color: #4a5568;
                }

                .btn-group {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .sub-text {
                    font-size: 0.85rem;
                    color: #718096;
                }

                .btn-primary {
                    background: var(--color-primary);
                    color: white;
                    padding: 0.8rem 1.5rem;
                    border-radius: 6px;
                    text-decoration: none;
                    display: inline-block;
                    font-weight: 600;
                    transition: background 0.2s;
                    border: none;
                }

                .btn-primary:hover {
                    background: #1a365d;
                }

                .btn-outline {
                    background: transparent;
                    border: 2px solid var(--color-primary);
                    color: var(--color-primary);
                    padding: 0.8rem 1.5rem;
                    border-radius: 6px;
                    text-decoration: none;
                    display: inline-block;
                    font-weight: 600;
                    transition: all 0.2s;
                }

                .btn-outline:hover {
                    background: var(--color-primary);
                    color: white;
                }

                .highlight-disclaimer {
                    background: #fff5f5;
                    border: 1px solid #feb2b2;
                    color: #c53030;
                    padding: 1rem;
                    border-radius: 8px;
                    margin-top: 1.5rem;
                    font-size: 0.95rem;
                }

                .domains-grid {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 1rem;
                    margin-top: 2rem;
                }

                .domain-chip {
                    background: white;
                    border: 1px solid #e2e8f0;
                    padding: 0.75rem 1.5rem;
                    border-radius: 50px;
                    font-weight: 500;
                    color: #4a5568;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                }

                @media (max-width: 768px) {
                    .access-section {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
};

export default ResourcePersons;
