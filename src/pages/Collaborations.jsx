import { motion } from 'framer-motion';
import { Handshake, Landmark, ScrollText, Users2 } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';

const Collaborations = () => {
    const listVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <div className="collaborations-page">
            <SEO title="Collaborations" description="AETE collaborates with engineering colleges, industry, and training partners for mutual growth." />
            <PageHero
                title="Collaborations"
                subtitle="Building bridges between academia and industry."
            />

            <div className="container section">
                <div className="grid-2">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="section-title">Our Partners</h2>
                        <p className="mb-4">
                            AETE® collaborates with a diverse range of institutions and organizations to promote technical education and skill development.
                            Institutions may identify resource persons through the AETE® platform and <strong>coordinate</strong> with experts. Engagement terms are mutually decided; AETE® acts only as a facilitation platform.
                        </p>

                        <div className="partner-list">
                            <div className="partner-item">
                                <Landmark className="icon" size={24} />
                                <div>
                                    <h3>Engineering Colleges</h3>
                                    <p>Partnering for FDPs, workshops, and student chapters.</p>
                                </div>
                            </div>
                            <div className="partner-item">
                                <Users2 className="icon" size={24} />
                                <div>
                                    <h3>Industry Organizations</h3>
                                    <p>Driving innovation and providing practical exposure.</p>
                                </div>
                            </div>
                            <div className="partner-item">
                                <Handshake className="icon" size={24} />
                                <div>
                                    <h3>Training Partners</h3>
                                    <p>Delivering specialized technical training programs.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="mou-section"
                    >
                        <div className="card">
                            <h2 className="section-title">Focus Areas for MoUs</h2>
                            <ul className="custom-list">
                                <motion.li variants={listVariants} initial="hidden" whileInView="visible" transition={{ delay: 0.1 }}>
                                    <ScrollText size={18} /> Training Programs
                                </motion.li>
                                <motion.li variants={listVariants} initial="hidden" whileInView="visible" transition={{ delay: 0.2 }}>
                                    <ScrollText size={18} /> Joint Academic Activities
                                </motion.li>
                                <motion.li variants={listVariants} initial="hidden" whileInView="visible" transition={{ delay: 0.3 }}>
                                    <ScrollText size={18} /> Skill Development Initiatives
                                </motion.li>
                                <motion.li variants={listVariants} initial="hidden" whileInView="visible" transition={{ delay: 0.4 }}>
                                    <ScrollText size={18} /> Innovation & Technical Events
                                </motion.li>
                            </ul>
                        </div>

                        <div className="card mt-4 bg-primary">
                            <h3 className="text-white">Who Can Collaborate?</h3>
                            <ul className="white-list">
                                <li>Engineering Colleges</li>
                                <li>Universities & Autonomous Institutions</li>
                                <li>Faculty Associations</li>
                                <li>Innovation Cells</li>
                                <li>Startups & Industry Partners</li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>

            <style jsx="true">{`
                .grid-2 {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 4rem;
                }

                .section-title {
                    color: var(--color-primary);
                    font-size: 2rem;
                    margin-bottom: 1.5rem;
                }

                .mb-4 {
                    margin-bottom: 2rem;
                    color: #4a5568;
                }

                .partner-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .partner-item {
                    display: flex;
                    gap: 1rem;
                    padding: 1.5rem;
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                    border-left: 4px solid var(--color-secondary);
                }

                .partner-item .icon {
                    color: var(--color-secondary);
                    flex-shrink: 0;
                    margin-top: 4px;
                }

                .partner-item h3 {
                    font-size: 1.1rem;
                    margin-bottom: 0.5rem;
                    color: var(--color-primary);
                }

                .partner-item p {
                    font-size: 0.9rem;
                    color: #718096;
                    margin: 0;
                }

                .card {
                    background: white;
                    padding: 2rem;
                    border-radius: 12px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                }

                .bg-primary {
                    background: var(--color-primary);
                    color: white;
                }

                .text-white {
                    color: white;
                    margin-bottom: 1rem;
                    font-size: 1.5rem;
                }

                .mt-4 {
                    margin-top: 2rem;
                }

                .custom-list {
                    list-style: none;
                }

                .custom-list li {
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                    padding: 0.8rem 0;
                    border-bottom: 1px solid #f0f0f0;
                    color: #4a5568;
                }

                .custom-list li svg {
                    color: var(--color-secondary);
                }

                .white-list {
                    list-style: disc;
                    padding-left: 1.5rem;
                    border-left: 2px solid rgba(255,255,255,0.3);
                }

                .white-list li {
                    margin-bottom: 0.5rem;
                    opacity: 0.9;
                }

                @media (max-width: 900px) {
                    .grid-2 {
                        grid-template-columns: 1fr;
                        gap: 3rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default Collaborations;
