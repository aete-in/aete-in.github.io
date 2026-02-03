import { motion } from 'framer-motion';
import { PRICING_PLANS } from '../data/pricing';
import { User, Users, Building, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';

const Membership = () => {
  const navigate = useNavigate();
  const { currentUser, userData } = useAuth();

  const handleApply = (member, isUpgrade = false) => {
    // Navigate to Dashboard (where Application Form lives)
    // Pass selectedType in state so the form pre-selects it
    // Logic: 
    // If logged in -> Go to /dashboard
    // If NOT logged in -> Go to /login, with 'from' set to /dashboard (and state preserved if possible, or just default to dashboard)

    if (currentUser) {
      navigate('/dashboard', { state: { selectedType: member.role.toLowerCase(), upgradeMode: isUpgrade } });
    } else {
      // Authenticated redirect flow
      navigate('/login', {
        state: {
          from: '/dashboard',
          selectedType: member.role.toLowerCase(),
          upgradeMode: isUpgrade
          // If login page doesn't forward state, user lands on dashboard default tabs. 
          // Enhanced Experience: We could pass it in URL query param? 
          // kept simple for now. 
        }
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  /* 
   * Mapping logic to render icons based on string names from data 
   */
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'User': return <User size={40} />;
      case 'Briefcase': return <Briefcase size={40} />;
      case 'Building': return <Building size={40} />;
      default: return <User size={40} />;
    }
  };

  return (
    <div className="membership-page">
      <SEO title="Membership" description="Join AETE as a Student, Professional, or Institutional Partner." />
      <PageHero
        title="Professional Engineering Association"
        subtitle="Join a collaborative community of engineers and educators."
      />

      <div className="container section">
        <div className="intro-text center">
          <p>
            Joining the AETE Community is a statement of professional commitment. Join a distinguished cadre of engineers and educators
            dedicated to shaping the future of technology. Gain recognition, influence curricula, and access an exclusive community of scholars.
          </p>
        </div>

        <motion.div
          className="membership-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {PRICING_PLANS.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="member-card"
              style={{ borderTopColor: plan.ui.color }}
            >
              {plan.ui.isOffer && <div className="launch-badge">Launch Offer</div>}

              <div className="icon-box" style={{ color: plan.ui.color }}>
                {getIcon(plan.ui.iconName)}
              </div>
              <h3 style={{ color: plan.ui.color }}>{plan.title}</h3>

              <div className="lifetime-badge">
                {plan.ui.period === "Lifetime" ? "LIFETIME ACCESS PLAN" : "ANNUAL PARTNER PLAN"}
              </div>

              <div className="price-tag mb-3">
                <span className="fee-label">PLATFORM & ACCESS FEE</span>

                <div className="pricing-stack">
                  {/* Show Strikethrough if it's an offer */}
                  <span
                    className="original-price-row"
                    style={{
                      visibility: plan.ui.isOffer ? 'visible' : 'hidden',
                      opacity: plan.ui.isOffer ? 1 : 0,
                      display: plan.ui.isOffer ? 'block' : 'none'
                    }}
                  >
                    <span className="strike">{plan.originalPrice || "₹0,000"}</span>
                    <span className="gst-suffix"></span>
                  </span>

                  <span className="final-price" style={{ color: plan.ui.color }}>
                    {plan.price} <span className="gst-small">{plan.ui.isOffer ? "" : "+ GST"}</span>
                  </span>
                </div>
              </div>

              {plan.subtitle === "FREE TIER AVAILABLE" ? (
                <div className="free-tier-badge">
                  {plan.subtitle}
                </div>
              ) : (
                <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  {plan.subtitle}
                </h4>
              )}
              <p>{plan.description}</p>

              <ul className="benefits-list">
                {plan.features.map((benefit, i) => (
                  <li
                    key={i}
                    style={benefit.includes("Academic Resource Pool") ? { fontWeight: '700', color: plan.ui.color } : {}}
                  >
                    <svg
                      className="check-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={benefit.includes("Academic Resource Pool") ? { color: plan.ui.color } : {}}
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>

              {/* Logic: Show Active if type matches AND (tier is not free OR it's institutional). 
                  If type matches AND tier is free, show Upgrade. 
                  If type doesn't match, show Apply/Join button. 
              */}
              {(userData?.membershipType === plan.role.toLowerCase() || (userData?.membershipType === 'professional' && plan.role === 'Professional')) ? (
                (userData?.tier === 'free' && plan.role !== 'Institutional Partner') ? (
                  <button onClick={() => handleApply({ ...plan, ...plan.ui, type: plan.role }, true)} className="btn btn-sm btn-primary" style={{ backgroundColor: '#c05621', borderColor: '#c05621', color: 'white' }}>
                    Upgrade Plan
                  </button>
                ) : (
                  <button disabled className="btn btn-sm btn-success" style={{ borderColor: 'transparent', background: '#dcfce7', color: '#166534' }}>
                    Active Plan
                  </button>
                )
              ) : (
                <button onClick={() => handleApply({ ...plan, ...plan.ui, type: plan.role })} className="btn btn-sm btn-outline-primary" style={{ borderColor: plan.ui.color, color: plan.ui.color }}>
                  {plan.buttonText}
                </button>
              )}
            </motion.div>
          ))}
        </motion.div>


        <div className="payment-disclaimer">
          <p className="disclaimer-lead">
            <strong>Important Financial Disclosure:</strong>
          </p>
          <p>
            Membership administration, digital profile creation, directory hosting, communication services, and platform maintenance are facilitated by AETE®’s implementation partner, <strong>BitSky (MSME – Udyam Registered)</strong>.
          </p>
          <p>
            All payments are collected exclusively by <strong>BitSky</strong> for administrative and digital services.
            <strong>AETE® itself does not directly collect membership fees or public funds.</strong>
          </p>
        </div>
      </div>

      <style jsx="true">{`
        .intro-text {
          max-width: 800px;
          margin: 0 auto 4rem;
          text-align: center;
          font-size: 1.1rem;
          color: var(--color-text-secondary);
          line-height: 1.8;
        }

        .price-tag {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 1.5rem;
            height: 120px; /* Fixed height accommodating largest stack */
            justify-content: flex-start; /* Keep label at top */
            padding-top: 0.5rem;
            width: 100%;
        }

        .pricing-stack {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.25rem;
            margin-top: auto; /* Push to bottom of container */
            margin-bottom: auto; /* Center vertically in remaining space */
        }

        .original-price-row {
            color: #94a3b8;
            font-size: 0.95rem;
            font-weight: 500;
        }
        
        .strike {
            text-decoration: line-through;
            margin-right: 4px;
        }

        .gst-suffix {
            font-size: 0.8em;
            opacity: 0.8;
        }

        .final-price {
            font-size: 2rem;
            font-weight: 800;
            line-height: 1.1;
        }

        .gst-small {
            font-size: 0.4em;
            font-weight: 600;
            color: #64748b;
            vertical-align: middle;
            margin-left: 2px;
        }

        .fee-label {
            font-size: 0.75rem;
            color: #64748b;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 0.5rem;
            align-self: center; /* Ensure centered horizontally */
        }

        .payment-disclaimer {
            margin-top: 4rem;
            padding: 1.5rem;
            background: #f8fafc;
            border-radius: 8px;
            text-align: center;
            font-size: 0.9rem;
            color: #64748b;
            border: 1px solid #e2e8f0;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
        }

        .membership-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          justify-content: center;
        }

        .member-card {
          position: relative;
          background: white;
          padding: 3.5rem 2rem 3rem; /* Extra top padding for badge */
          border-radius: 16px;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-top: 5px solid; /* color set inline */
          border-left: 1px solid #f1f5f9;
          border-right: 1px solid #f1f5f9;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow: hidden;
        }

        .launch-badge {
            position: absolute;
            top: 20px;
            right: -30px;
            background: #f59e0b;
            color: white;
            padding: 5px 30px;
            transform: rotate(45deg);
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            z-index: 10;
        }

        .lifetime-badge {
            display: inline-block;
            background: #9f1239;
            color: white;
            padding: 4px 12px;
            border-radius: 50px;
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            margin-bottom: 0.75rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            letter-spacing: 0.5px;
        }

        .free-tier-badge {
            display: inline-block;
            background: #dcfce7; /* Light Green */
            color: #166534;      /* Dark Green */
            padding: 4px 12px;
            border-radius: 6px;
            font-size: 0.8rem;
            font-weight: 700;
            text-transform: uppercase;
            margin-bottom: 0.75rem;
            border: 1px solid #bbf7d0;
        }

        .member-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        }

        .icon-box {
          margin-bottom: 1rem;
        }

        .member-card h3 {
          margin-bottom: 1rem;
          font-size: 1.35rem;
          font-weight: 700;
          min-height: 3.5rem; /* Force 2-line height alignment */
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .member-card p {
          color: var(--color-text-muted);
          margin-bottom: 2rem;
          font-size: 0.95rem;
          line-height: 1.6;
          min-height: 80px; /* Increased to accommodate longer text safely */
          display: flex;
          align-items: center; /* Center text vertically if short */
          justify-content: center;
        }

        .benefits-list {
            list-style: none;
            padding: 0;
            margin: 0 0 2rem 0;
            text-align: left;
            font-size: 0.9rem;
            color: #475569;
        }

        .benefits-list li {
            display: flex;
            align-items: flex-start;
            margin-bottom: 0.8rem;
            line-height: 1.4;
        }

        .check-icon {
            width: 16px;
            height: 16px;
            color: var(--color-secondary);
            margin-right: 10px;
            flex-shrink: 0;
            margin-top: 2px;
        }

        
        .member-card button {
            margin-top: auto;
            border-radius: 50px;
            font-weight: 600;
            padding: 0.75rem 2rem;
        }

        .btn-outline-primary {
          background: transparent;
          border-width: 2px;
          border-style: solid;
          transition: all 0.2s;
        }

        .btn-outline-primary:hover {
          background-color: #f8fafc; 
        }
      `}</style>
    </div >
  );
};

export default Membership;
