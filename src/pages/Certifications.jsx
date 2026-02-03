import { motion } from 'framer-motion';
import { ShieldCheck, Search, Award, FileCheck, CheckCircle, Zap } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';

const Certifications = () => {
    return (
        <div className="certifications-page">
            <SEO title="Certifications" description="Verify AETE issued certificates. Authorized by a professional organization." />
            <PageHero
                title="Certifications & Validation"
                subtitle="Recognized credentials for your professional journey."
            />

            <div className="container section">

                {/* Official Trust Badge Section */}
                <motion.div
                    className="trust-badge-container"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="badge-icon">
                        <ShieldCheck size={48} />
                    </div>
                    <div className="badge-content">
                        <h2>Official Certification Statement</h2>
                        <p className="declaration">
                            “Issued by AETE – Industry–Academia Technology & Education Organization.”
                        </p>
                        <p className="sub-text">
                            All certificates issued by AETE® bear this offical validation statement to ensure authenticity and recognition.
                        </p>
                    </div>
                </motion.div>

                {/* Verification Section */}
                <div className="verification-section">
                    <div className="verify-card">
                        <div className="verify-header">
                            <h3>Verify a Certificate</h3>
                            <p>Enter the unique certificate ID found on your document to validate its authenticity.</p>
                        </div>
                        <div className="verify-form-wrapper">
                            <div className="input-group">
                                <Search className="input-icon" size={20} />
                                <input type="text" placeholder="Certificate ID (e.g., AETE-2025-XXXX)" />
                                <button className="btn-verify">Verify Now</button>
                            </div>
                        </div>
                        <div className="secure-note">
                            <CheckCircle size={14} />
                            <span>Secured Verification System</span>
                        </div>
                    </div>
                </div>

                {/* Categories Grid */}
                <div className="categories-section">
                    <div className="section-header">
                        <h2>Credential Categories</h2>
                        <p>We issue verfiable credentials for various professional development activities.</p>
                    </div>

                    <div className="categories-grid">
                        <motion.div
                            className="cat-card"
                            whileHover={{ y: -5 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="cat-icon color-1"><Award size={28} /></div>
                            <h3>Faculty Development</h3>
                            <p>FDPs designed to enhance pedagogical skills and technical knowledge.</p>
                        </motion.div>

                        <motion.div
                            className="cat-card"
                            whileHover={{ y: -5 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="cat-icon color-2"><Zap size={28} /></div>
                            <h3>Skill Bootcamps</h3>
                            <p>Intensive training programs for students to master certified industry skills.</p>
                        </motion.div>

                        <motion.div
                            className="cat-card"
                            whileHover={{ y: -5 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="cat-icon color-3"><FileCheck size={28} /></div>
                            <h3>Workshops & Events</h3>
                            <p>Certificates of participation for technical workshops and conferences.</p>
                        </motion.div>
                    </div>
                </div>

            </div>

            <style jsx="true">{`
                .trust-badge-container {
                    background: linear-gradient(135deg, #fff 0%, #f9fafb 100%);
                    border: 1px solid #e5e7eb;
                    border-radius: 16px;
                    padding: 3rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    margin-bottom: 4rem;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.05);
                    border-top: 6px solid #b7791f; /* Gold/Bronze accent */
                }

                .badge-icon {
                    color: #b7791f;
                    margin-bottom: 1.5rem;
                    background: #fdf3c8;
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }

                .badge-content h2 {
                    color: #744210;
                    font-size: 1.75rem;
                    font-weight: 800;
                    margin-bottom: 1rem;
                    letter-spacing: -0.02em;
                }

                .badge-content .declaration {
                    font-size: 1.25rem;
                    font-family: serif; /* Elegant touch */
                    font-style: italic;
                    color: #2d3748;
                    margin-bottom: 1.5rem;
                    max-width: 800px;
                    line-height: 1.6;
                }

                .badge-content .sub-text {
                    font-size: 0.95rem;
                    color: #718096;
                }

                .verification-section {
                    margin-bottom: 5rem;
                }

                .verify-card {
                    background: var(--color-primary);
                    border-radius: 20px;
                    padding: 4rem 2rem;
                    text-align: center;
                    color: white;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
                    background-image: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070');
                    background-size: cover;
                    background-position: center;
                }

                .verify-header h3 {
                    font-size: 2rem;
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                }

                .verify-header p {
                    opacity: 0.9;
                    margin-bottom: 2rem;
                    font-size: 1.1rem;
                }

                .verify-form-wrapper {
                    max-width: 600px;
                    margin: 0 auto 1.5rem;
                }

                .input-group {
                    display: flex;
                    background: white;
                    border-radius: 50px;
                    padding: 0.5rem;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
                }

                .input-icon {
                    color: #a0aec0;
                    margin: auto 0 auto 1rem;
                }

                .input-group input {
                    flex: 1;
                    border: none;
                    padding: 1rem;
                    font-size: 1rem;
                    outline: none;
                    color: #2d3748;
                    background: transparent;
                }

                .btn-verify {
                    background: var(--color-secondary);
                    color: white;
                    border: none;
                    padding: 0 2rem;
                    border-radius: 50px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: transform 0.2s;
                }

                .btn-verify:hover {
                    transform: scale(1.05);
                }

                .secure-note {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    font-size: 0.85rem;
                    opacity: 0.8;
                }

                .section-header {
                    text-align: center;
                    margin-bottom: 3rem;
                }
                
                .section-header h2 {
                    font-size: 2rem;
                    font-weight: 700;
                    color: var(--color-primary);
                    margin-bottom: 0.5rem;
                }

                .categories-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                }

                .cat-card {
                    background: white;
                    padding: 2rem;
                    border-radius: 16px;
                    border: 1px solid #e2e8f0;
                    transition: all 0.3s ease;
                }

                .cat-card:hover {
                    border-color: var(--color-secondary);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.05);
                }

                .cat-icon {
                    width: 50px;
                    height: 50px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1.5rem;
                    color: white;
                }

                .color-1 { background: #3182ce; }
                .color-2 { background: #d69e2e; }
                .color-3 { background: #38a169; }

                .cat-card h3 {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: var(--color-primary);
                    margin-bottom: 0.75rem;
                }

                .cat-card p {
                    color: var(--color-text-muted);
                    font-size: 0.95rem;
                    line-height: 1.6;
                }

                @media (max-width: 768px) {
                    .trust-badge-container {
                        padding: 2rem;
                    }
                    .verify-card {
                        padding: 3rem 1.5rem;
                    }
                    .input-group {
                        flex-direction: column;
                        border-radius: 12px;
                        padding: 1rem;
                    }
                    .btn-verify {
                        width: 100%;
                        padding: 1rem;
                        margin-top: 0.5rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default Certifications;
