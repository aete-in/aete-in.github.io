import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authModalView, setAuthModalView] = useState(null); // 'login', 'signup', or null
  const { currentUser, userData, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboard = location.pathname === '/dashboard';

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Plans', path: '/membership' },
    { name: 'Clubs', path: '/campus-clubs' },
    { name: 'Academic Pool', path: '/resource-persons' },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled || isDashboard ? 'scrolled' : ''} ${isDashboard ? 'dashboard-active' : ''}`}>
        <div className="container nav-container">
          <Link to="/" className="logo">
            AETE<span className="reg-mark">®</span>
          </Link>

          {/* Desktop Menu */}
          <div className="desktop-menu">
            {navLinks.map((link) => {
              let path = link.path;
              if (link.name === 'Academic Pool') {
                if (userData?.membershipType === 'professional' || userData?.membershipType === 'institution') {
                  path = '/academic-pool';
                }
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
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                  <User size={18} /> Dashboard
                </NavLink>
                <button
                  onClick={async () => {
                    await logout();
                    navigate('/'); // Navigate to home usually
                  }}
                  className="logout-btn nav-link"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="auth-links">
                <button
                  onClick={() => setAuthModalView('login')}
                  className="btn-link nav-link"
                >
                  Login
                </button>
                <button
                  onClick={() => setAuthModalView('signup')}
                  className="btn btn-primary btn-sm"
                >
                  Sign Up
                </button>
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
                  if (link.name === 'Academic Pool' && (userData?.membershipType === 'professional' || userData?.membershipType === 'institutional')) {
                    path = '/academic-pool';
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


                {/* Mobile Auth Buttons */}
                {currentUser ? (
                  <div className="mobile-auth-buttons" style={{ padding: '1rem 0' }}>
                    <NavLink
                      to="/dashboard"
                      className="mobile-link"
                      onClick={() => setIsOpen(false)}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      <User size={18} /> Dashboard
                    </NavLink>
                    <button
                      onClick={async () => {
                        setIsOpen(false);
                        await logout();
                        navigate('/');
                      }}
                      className="mobile-link"
                      style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', fontSize: '1rem' }}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="mobile-auth-buttons" style={{ padding: '1rem 0' }}>
                    <button
                      onClick={() => { setIsOpen(false); setAuthModalView('login'); }}
                      className="mobile-link" style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', fontSize: '1rem' }}
                    >
                      Login
                    </button>
                    <button
                      onClick={() => { setIsOpen(false); setAuthModalView('signup'); }}
                      className="mobile-link" style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', fontSize: '1rem' }}
                    >
                      Sign Up
                    </button>
                  </div>
                )}


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
            background: transparent; /* Seamless integration */
            transition: background 0.3s ease, padding 0.3s ease, box-shadow 0.3s ease;
            padding: 1.25rem 0; /* Constant Padding */
          }
          
          .navbar.scrolled {
             background: var(--color-primary); /* Solid on scroll */
             box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
          
          .navbar.scrolled {
            /* Only shadow change if needed, usually shadow is always good or on scroll */
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
          }

          .navbar.dashboard-active {
            transition: none !important;
            background: var(--color-primary); /* Ensure it's solid immediately */
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
          
          /* Explicit Logout Button Style */
          .logout-btn {
            background: none;
            border: none;
            cursor: pointer;
            font-family: inherit;
            color: rgba(255, 255, 255, 0.8); /* Match nav-link default */
            padding: 0;
            text-decoration: none !important; /* Force remove underline */
          }
          .logout-btn:hover {
            color: var(--color-white);
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
            background: #002D62; /* Solid dark blue for visibility */
            overflow: hidden;
            display: flex; /* Added display: flex to make flex-direction work */
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

      {/* Auth Modal */}
      <AuthModal
        isOpen={!!authModalView}
        onClose={() => setAuthModalView(null)}
        initialView={authModalView || 'login'}
      />
    </>
  );
};

export default Navbar;
