import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer select-none">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <div className="brand-logo">
              <span className="logo-text">AETE</span>
            </div>
            <p className="brand-desc">
              The Association of Engineers for Technology and Education is a premier professional body (MSME Regd.) bridging the gap between industry and academia.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon"><Linkedin size={20} /></a>
              <a href="#" className="social-icon"><Twitter size={20} /></a>
              <a href="#" className="social-icon"><Facebook size={20} /></a>
              <a href="#" className="social-icon"><Instagram size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4 className="footer-heading">Quick Links</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/resource-persons">Resource Network</Link></li>
              <li><Link to="/verify">Verify Membership</Link></li>
              <li><Link to="/membership">Membership</Link></li>
              <li><Link to="/programs">Programs</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-links">
            <h4 className="footer-heading">Services</h4>
            <ul>
              <li><Link to="/collaborations">Industrial Consultancy</Link></li>
              <li><Link to="/programs">Faculty Development</Link></li>
              <li><Link to="/certifications">Certifications</Link></li>
              <li><Link to="/campus-chapters">Campus Chapters</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-contact">
            <h4 className="footer-heading">Contact Us</h4>
            <div className="contact-item">
              <MapPin size={18} className="contact-icon" />
              <span>AETE Headquarters,<br />Bitsky, Kerala, India</span>
            </div>
            <div className="contact-item">
              <Mail size={18} className="contact-icon" />
              <a href="mailto:aete.india@gmail.com">aete.india@gmail.com</a>
            </div>
            <div className="contact-item">
              <Phone size={18} className="contact-icon" />
              <a href="tel:+918113997771">+918113997771</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="partner-credits mb-2">
            Implementation Partner: <strong>BitSky (MSME – Udyam Registered)</strong>
          </div>
          <p>&copy; {new Date().getFullYear()} AETE. All rights reserved.</p>
          <div className="footer-legal">
            <Link to="/disclaimer">Legal Disclaimer</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>

      <style jsx="true">{`
                .footer {
                    background-color: #0f172a; /* Dark Slate */
                    color: #94a3b8; /* Slate 400 */
                    padding: 5rem 0 2rem;
                    font-size: 0.95rem;
                    margin-top: auto;
                }

                .footer-grid {
                    display: grid;
                    grid-template-columns: 2fr 1fr 1fr 1.5fr;
                    gap: 4rem;
                    margin-bottom: 4rem;
                }

                .footer-heading {
                    color: white;
                    font-size: 1.1rem;
                    margin-bottom: 1.5rem;
                    font-family: var(--font-heading);
                    letter-spacing: 0.02em;
                }

                .brand-logo {
                    margin-bottom: 1rem;
                }

                .logo-text {
                    font-family: var(--font-heading);
                    font-size: 2rem;
                    font-weight: 700;
                    color: white;
                    letter-spacing: -0.02em;
                }

                .brand-desc {
                    margin-bottom: 2rem;
                    line-height: 1.7;
                    max-width: 300px;
                }

                .social-links {
                    display: flex;
                    gap: 1rem;
                }

                .social-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.05);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    transition: all 0.3s ease;
                }

                .social-icon:hover {
                    background: var(--color-secondary);
                    transform: translateY(-3px);
                }

                .footer-links ul {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }

                .footer-links a {
                    transition: color 0.2s;
                }

                .footer-links a:hover {
                    color: var(--color-secondary);
                    padding-left: 5px;
                }

                .contact-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 1rem;
                    margin-bottom: 1rem;
                }

                .contact-icon {
                    color: var(--color-secondary);
                    flex-shrink: 0;
                    margin-top: 3px;
                }

                .footer-bottom {
                    border-top: 1px solid rgba(255,255,255,0.1);
                    padding-top: 2rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 1rem;
                }

                .footer-legal {
                    display: flex;
                    gap: 1.5rem;
                    flex-wrap: wrap;
                    justify-content: center;
                }

                .partner-credits {
                    width: 100%;
                    text-align: center;
                    margin-bottom: 1rem;
                    color: #64748b;
                    font-size: 0.85rem;
                }
                
                .partner-credits strong {
                    color: #94a3b8;
                }

                .footer-legal a:hover {
                    color: white;
                }

                @media (max-width: 900px) {
                    .footer-grid {
                        grid-template-columns: 1fr 1fr;
                        gap: 2rem;
                    }
                }

                @media (max-width: 600px) {
                    .footer-grid {
                        grid-template-columns: 1fr;
                    }
                    .footer-bottom {
                        flex-direction: column;
                        text-align: center;
                    }
                }
            `}</style>
    </footer>
  );
};

export default Footer;
