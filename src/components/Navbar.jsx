import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, userData, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Membership', path: '/membership' },
    { name: 'Chapters', path: '/campus-chapters' },
    { name: 'Resource Persons', path: '/resource-persons' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="logo">
          AETE<span className="reg-mark">®</span>
        </Link>

        {/* Desktop Menu */}
        <div className="desktop-menu">
          {navLinks.map((link) => {
            let path = link.path;
            if (link.name === 'Resource Persons' && (userData?.membershipType === 'professional' || userData?.membershipType === 'institutional')) {
              path = '/resource-network';
            }
            return (
              <NavLink
                key={link.name}
                to={path}
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              >
                {link.name}
              </NavLink>
            );
          })}

          {currentUser ? (
            <div className="auth-links">
              <Link to="/dashboard" className="nav-link"><User size={18} /> Dashboard</Link>
              <button
                onClick={async () => {
                  await logout();
                  navigate('/login');
                }}
                className="btn-link nav-link"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="btn btn-primary btn-sm">Sign Up</Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {navLinks.map((link) => {
                let path = link.path;
                if (link.name === 'Resource Persons' && (userData?.membershipType === 'professional' || userData?.membershipType === 'institutional')) {
                  path = '/resource-network';
                }
                return (
                  <NavLink
                    key={link.name}
                    to={path}
                    className="mobile-link"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </NavLink>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx="true">{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          background: transparent;
          transition: background 0.3s ease, box-shadow 0.3s ease;
          padding: 1.5rem 0;
          color: var(--color-white);
        }
        
        .navbar.scrolled {
          background: var(--color-primary);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          padding: 1rem 0;
        }

        /* If on a white page without scroll, we might need text color adjustment or always use a dark header. 
           For now, let's assume hero sections are dark or we use a dark header by default. 
           Actually, let's make the default background dark blue for consistency if not scrolled, 
           or ensure the hero image handles it. Safest is solid background or gradient. 
           Let's go with solid primary for now to ensure readability everywhere. */
        .navbar {
          background: var(--color-primary);
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--color-white);
          letter-spacing: -0.02em;
        }

        .reg-mark {
          font-size: 0.8rem;
          vertical-align: super;
        }

        .desktop-menu {
          display: flex;
          gap: 2.5rem;
          align-items: center;
        }

        .auth-links {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-left: 1.5rem;
          padding-left: 1.5rem;
          border-left: 1px solid rgba(255,255,255,0.2);
        }
        .btn-link {
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
        }
        .btn-sm {
          padding: 0.5rem 1rem;
          font-size: 0.9rem;
        }

        .nav-link {
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
          font-size: 0.9rem;
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
        }

        .nav-link:hover, .nav-link.active {
          color: var(--color-white);
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 2px;
          background: var(--color-secondary);
        }

        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
        }

        .mobile-menu {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background: var(--color-primary);
          overflow: hidden;
          flex-direction: column;
          padding: 0 1rem;
        }

        .mobile-link {
          display: block;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          color: white;
        }

        @media (max-width: 768px) {
          .desktop-menu {
            display: none;
          }
          .mobile-toggle {
            display: block;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
