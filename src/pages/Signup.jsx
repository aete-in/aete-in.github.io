import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { sendWelcomeEmail } from '../utils/emailService';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(''); // Added phone for membership
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    // Phone Validation
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!phoneRegex.test(phone)) {
      return setError("Please enter a valid phone number (10-15 digits).");
    }

    try {
      setError('');
      setLoading(true);
      const user = await signup(email, password, name, phone);

      // Send Welcome Email
      await sendWelcomeEmail({ name, email });

      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create an account: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <SEO title="Sign Up" description="Create an AETE account to apply for membership." />
      <div className="container auth-container">
        <motion.div
          className="auth-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h2>Create Account</h2>
          {error && <div className="alert alert-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                required
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                required
                className="form-control"
                value={phone}
                onChange={(e) => {
                  const val = e.target.value;
                  // Allow only digits and optional leading +
                  if (/^\+?[\d]*$/.test(val)) {
                    setPhone(val);
                  }
                }}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                required
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                required
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                required
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button disabled={loading} type="submit" className="btn btn-primary btn-block">
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
          <div className="auth-footer">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </motion.div>
      </div>
      <style jsx="true">{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, var(--color-primary) 0%, #001f44 100%);
          padding: 8rem 0 4rem;
        }
        .auth-container {
          display: flex;
          justify-content: center;
          padding: 0 1rem;
          width: 100%;
        }
        .auth-card {
           background: white;
           padding: 3rem;
           border-radius: 12px;
           box-shadow: 0 10px 25px rgba(0,0,0,0.05);
           width: 100%;
           max-width: 600px;
        }
        .auth-card h2 {
          text-align: center;
          margin-bottom: 2rem;
          color: var(--color-primary);
        }
        .form-group {
          margin-bottom: 1.5rem;
          text-align: left;
        }
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #4a5568;
        }
        .form-control {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          font-size: 1rem;
          transition: border-color 0.2s;
        }
        .form-control:focus {
          outline: none;
          border-color: var(--color-secondary);
          box-shadow: 0 0 0 3px rgba(0,128,128,0.1);
        }
        .btn-block {
          width: 100%;
          margin-top: 1rem;
          justify-content: center;
          align-items: center;
          display: flex;
        }
        .alert-error {
          background-color: #fed7d7;
          color: #c53030;
          padding: 0.75rem;
          border-radius: 4px;
          margin-bottom: 1rem;
          font-size: 0.9rem;
          text-align: center;
        }
        .auth-footer {
          margin-top: 1.5rem;
          text-align: center;
          font-size: 0.9rem;
        }
        .auth-footer a {
          color: var(--color-secondary);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default Signup;
