import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Phone, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { sendWelcomeEmail } from '../utils/emailService';

const AuthModal = ({ isOpen, onClose, initialView = 'login' }) => {
    const [view, setView] = useState(initialView);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Login State
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    // Signup State
    const [signupName, setSignupName] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPhone, setSignupPhone] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupConfirm, setSignupConfirm] = useState('');

    const { login, signup } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            setView(initialView);
            setError('');
            // Reset forms could go here
        }
    }, [isOpen, initialView]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(loginEmail, loginPassword);
            onClose(); // Close modal on success
            navigate('/dashboard'); // Optional: redirect to dashboard or stay
        } catch (err) {
            setError('Failed to login: ' + err.message);
        }
        setLoading(false);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (signupPassword !== signupConfirm) {
            return setError('Passwords do not match');
        }

        // Phone Validation
        if (!/^\+?[0-9]{10,15}$/.test(signupPhone)) {
            return setError("Please enter a valid phone number (10-15 digits).");
        }

        setError('');
        setLoading(true);
        try {
            await signup(signupEmail, signupPassword, signupName, signupPhone);
            await sendWelcomeEmail({ name: signupName, email: signupEmail });
            onClose();
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to sign up: ' + err.message);
        }
        setLoading(false);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="modal-overlay" onClick={onClose}>
                    <motion.div
                        className="modal-content"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="close-btn" onClick={onClose}><X size={24} /></button>

                        <div className="auth-header">
                            <h2>{view === 'login' ? 'Welcome Back' : 'Join AETE'}</h2>
                            <p>
                                {view === 'login'
                                    ? 'Access your professional dashboard.'
                                    : 'Start your journey with us today.'}
                            </p>
                        </div>

                        {error && <div className="error-alert">{error}</div>}

                        {view === 'login' ? (
                            <form onSubmit={handleLogin} className="auth-form">
                                <div className="input-group">
                                    <Mail size={20} className="input-icon" />
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <Lock size={20} className="input-icon" />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="forgot-pass">
                                    <Link to="/forgot-password" onClick={onClose}>Forgot Password?</Link>
                                </div>

                                <button type="submit" className="submit-btn" disabled={loading}>
                                    {loading ? 'Logging In...' : 'Login'} <ArrowRight size={18} />
                                </button>

                                <div className="switch-view">
                                    Don't have an account? <button type="button" onClick={() => setView('signup')}>Sign Up</button>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={handleSignup} className="auth-form">
                                <div className="input-group">
                                    <User size={20} className="input-icon" />
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        value={signupName}
                                        onChange={(e) => setSignupName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <Phone size={20} className="input-icon" />
                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        value={signupPhone}
                                        onChange={(e) => setSignupPhone(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <Mail size={20} className="input-icon" />
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        value={signupEmail}
                                        onChange={(e) => setSignupEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <Lock size={20} className="input-icon" />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={signupPassword}
                                        onChange={(e) => setSignupPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <Lock size={20} className="input-icon" />
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={signupConfirm}
                                        onChange={(e) => setSignupConfirm(e.target.value)}
                                        required
                                    />
                                </div>

                                <button type="submit" className="submit-btn" disabled={loading}>
                                    {loading ? 'Creating Account...' : 'Sign Up'} <ArrowRight size={18} />
                                </button>

                                <div className="switch-view">
                                    Already have an account? <button type="button" onClick={() => setView('login')}>Log In</button>
                                </div>
                            </form>
                        )}
                    </motion.div>
                </div>
            )}

            <style jsx="true">{`
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(8px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .modal-content {
          background: white;
          width: 100%;
          max-width: 550px; /* Increased width */
          border-radius: 20px;
          padding: 2.5rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          position: relative;
        }

        .close-btn {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          transition: color 0.2s;
        }
        .close-btn:hover { color: #0f172a; }

        .auth-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .auth-header h2 {
          font-size: 1.75rem;
          color: var(--color-primary);
          margin-bottom: 0.5rem;
        }
        
        .auth-header p {
          color: #64748b;
          font-size: 0.95rem;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .input-group {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
        }

        .input-group input {
          width: 100%;
          padding: 0.85rem 1rem 0.85rem 3rem;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          font-size: 1rem;
          transition: all 0.2s;
        }

        .input-group input:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
        }

        .forgot-pass {
          text-align: right;
          font-size: 0.85rem;
        }
        .forgot-pass a { color: var(--color-primary); opacity: 0.8; }
        .forgot-pass a:hover { opacity: 1; }

        .submit-btn {
          background: var(--color-primary);
          color: white;
          border: none;
          padding: 1rem;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          margin-top: 0.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: background 0.2s;
        }

        .submit-btn:hover {
          background: #001f44;
        }

        .switch-view {
          text-align: center;
          font-size: 0.9rem;
          color: #64748b;
          margin-top: 1rem;
        }

        .switch-view button {
          background: none;
          border: none;
          color: var(--color-secondary);
          font-weight: 600;
          cursor: pointer;
          margin-left: 0.3rem;
        }
        
        .error-alert {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #ef4444;
          padding: 0.75rem;
          border-radius: 8px;
          font-size: 0.9rem;
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .roles-section {
            margin-top: 0.5rem;
        }
        .roles-label {
            display: block;
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
            font-weight: 600;
            color: #4a5568;
        }
        .roles-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            max-height: 150px;
            overflow-y: auto;
            border: 1px solid #e2e8f0;
            padding: 0.5rem;
            border-radius: 8px;
        }
        .role-chip {
            background: #f7fafc;
            border: 1px solid #cbd5e0;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 0.8rem;
            cursor: pointer;
            transition: all 0.2s;
            user-select: none;
        }
        .role-chip:hover {
            background: #edf2f7;
        }
        .role-chip.selected {
            background: var(--color-primary);
            color: white;
            border-color: var(--color-primary);
        }
      `}</style>
        </AnimatePresence>
    );
};

export default AuthModal;
