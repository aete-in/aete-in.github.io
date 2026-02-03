import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import SEO from '../components/SEO';

import PageHero from '../components/PageHero';

const Contact = () => {
    return (
        <div className="contact-page">
            <SEO title="Contact Us" description="Get in touch with AETE for collaborations and inquiries." />
            <PageHero
                title="Contact Us"
                subtitle="Get in touch with us for collaborations and queries."
            />

            <div className="container section">
                <div className="grid-2">
                    <motion.div
                        className="contact-info"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2>Get In Touch</h2>
                        <p className="mb-4">
                            We are always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                        </p>

                        <div className="info-item">
                            <Mail className="icon" size={24} />
                            <div>
                                <h3>Email Us</h3>
                                <p>aete.india@gmail.com</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <Phone className="icon" size={24} />
                            <div>
                                <h3>Call Us</h3>
                                <p>+918113997771</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <MapPin className="icon" size={24} />
                            <div>
                                <h3>Visit Us</h3>
                                <p>AETE Headquarters,</p>
                                <p>Bitsky, Kerala, India</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="contact-form-wrapper"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" placeholder="Your Name" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" placeholder="Your Email" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Subject</label>
                                <input type="text" placeholder="Subject" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea rows="5" placeholder="Your Message" className="form-control"></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">
                                Send Message <Send size={18} style={{ marginLeft: '8px' }} />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>

            <style jsx="true">{`
                .grid-2 {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 4rem;
                    align-items: start;
                }

                .contact-info h2 {
                    color: var(--color-primary);
                    margin-bottom: 1rem;
                }

                .mb-4 {
                    margin-bottom: 2rem;
                    color: #4a5568;
                }

                .info-item {
                    display: flex;
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                }

                .icon {
                    color: var(--color-secondary);
                    flex-shrink: 0;
                    margin-top: 5px;
                }

                .info-item h3 {
                    font-size: 1.1rem;
                    margin-bottom: 0.5rem;
                    color: var(--color-primary);
                }

                .info-item p {
                    color: #718096;
                    margin-bottom: 0.2rem;
                }

                .contact-form-wrapper {
                    background: white;
                    padding: 2.5rem;
                    border-radius: 12px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.05);
                }

                .form-group {
                    margin-bottom: 1.5rem;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 0.5rem;
                    color: #4a5568;
                    font-weight: 500;
                }

                .form-control {
                    width: 100%;
                    padding: 0.8rem;
                    border: 1px solid #e2e8f0;
                    border-radius: 6px;
                    transition: border-color 0.2s;
                }

                .form-control:focus {
                    outline: none;
                    border-color: var(--color-secondary);
                }

                .btn-block {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                @media (max-width: 768px) {
                    .grid-2 {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default Contact;
