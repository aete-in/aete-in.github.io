import { motion } from 'framer-motion';
import { User, Users, Building, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';

import { handlePayment } from '../utils/payment';
import { db } from '../firebase';
import { ref, update, runTransaction } from 'firebase/database';

const Membership = () => {
  const navigate = useNavigate();
  const { currentUser, userData, fetchUserData } = useAuth();

  const handleApply = (member) => {
    if (!currentUser) {
      // Redirect to login, preserving the intent to apply for this specific membership
      navigate('/login', { state: { from: '/membership' } });
      return;
    }

    // Trigger Razorpay Payment
    handlePayment(
      currentUser.displayName || currentUser.email,
      currentUser.email,
      userData?.phone || currentUser.phoneNumber || "", // Prioritize database phone, then auth phone
      member.price,
      async (paymentId) => {
        // On Success
        console.log("Payment Successful:", paymentId);

        // Update DB
        try {
          // Generate Membership ID atomically
          const counterRef = ref(db, 'counters/membershipId');
          let newMembershipId = "PENDING";

          await runTransaction(counterRef, (currentValue) => {
            return (currentValue || 200) + 1; // Start from 200 -> First ID 201
          })
            .then((result) => {
              if (result.committed) {
                const count = result.snapshot.val();
                // Format: LM + 4 digits (e.g., LM0201)
                newMembershipId = `LM${String(count).padStart(4, '0')}`;
              }
            });

          const userRef = ref(db, 'users/' + currentUser.uid);
          await update(userRef, {
            membershipStatus: 'active',
            membershipType: member.type,
            membershipId: newMembershipId,
            lastPaymentId: paymentId,
            membershipDate: new Date().toISOString()
          });

          // Refresh local state
          await fetchUserData();

          navigate('/dashboard', {
            state: {
              paymentSuccess: true,
              paymentId: paymentId,
              membershipType: member.type
            }
          });
        } catch (error) {
          console.error("Failed to update membership:", error);
          alert("Payment successful but failed to update profile. Please contact support.");
        }
      }
    );
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

  const members = [
    {
      type: "Student Member",
      icon: <User size={40} />,
      desc: "For engineering students keen on upgrading skills and innovation. Access to student chapters and competitions.",
      color: "var(--color-primary)",
      price: 1.5,
      isOffer: true,
      originalPrice: "₹150",
      offerPrice: "99% OFF", // Changed from ₹1.5
      period: "Lifetime",
      benefits: [
        "Access to Resource Persons Network",
        "Official Student Membership Certificate",
        "Discounts on workshops & hackathons",
        "Access to Technical Chapters"
      ]
    },
    {
      type: "Professional Member",
      icon: <Briefcase size={40} />,
      desc: "For Faculty, Academicians, and Industry Professionals. Unlocks unlimited access to the Resource Persons Network.",
      color: "var(--color-secondary)",
      price: 10,
      isOffer: true,
      originalPrice: "₹1,000",
      offerPrice: "99% OFF", // Changed from ₹10
      period: "Lifetime",
      benefits: [
        "Access to Resource Persons Network",
        "Professional Membership Certificate",
        "Voting rights in AETE Elections",
        "Eligibility for 'Fellow' upgrade"
      ]
    },
    {
      type: "Institutional Partner",
      icon: <Building size={40} />,
      desc: "For Engineering Colleges and Universities. Establish chapters and gain direct access to expert speakers.",
      color: "#2b6cb0",
      price: 1000,
      isOffer: false,
      offerPrice: "₹1,000",
      period: "Yearly",
      benefits: [
        "Access to Resource Persons Network",
        "Certificate of Institutional Partnership",
        "Eligibility for AETE Funding Grants",
        "Host Official AETE Events"
      ]
    }
  ];

  return (
    <div className="membership-page">
      <SEO title="Membership" description="Join AETE as a Student, Professional, or Institutional Partner." />
      <PageHero
        title="Membership Network"
        subtitle="Join a collaborative community of engineers and educators."
      />

      <div className="container section">
        <div className="intro-text center">
          <p>
            Membership with AETE is a statement of professional commitment. Join a distinguished cadre of engineers and educators
            dedicated to shaping the future of technology. Gain recognition, influence curricula, and access an exclusive network of peers.
          </p>
        </div>

        <motion.div
          className="membership-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {members.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="member-card"
              style={{ borderTopColor: member.color }}
            >
              {member.isOffer && <div className="launch-badge">Launch Offer</div>}

              <div className="icon-box" style={{ color: member.color }}>
                {member.icon}
              </div>
              <h3 style={{ color: member.color }}>{member.type}</h3>

              <div className="lifetime-badge">
                {member.period === "Lifetime" ? "Lifetime Membership" : "Annual Membership"}
              </div>

              <div className="price-tag mb-3">
                <span className="fee-label">Platform & Membership Fee</span>

                <div className="pricing-stack">
                  <span
                    className="original-price-row"
                    style={{
                      visibility: member.isOffer ? 'visible' : 'hidden',
                      opacity: member.isOffer ? 1 : 0
                    }}
                  >
                    <span className="strike">{member.originalPrice || "₹0,000"}</span>
                    <span className="gst-suffix">+ GST</span>
                  </span>

                  <span className="final-price" style={{ color: member.color }}>
                    {member.offerPrice} <span className="gst-small">{member.isOffer ? "" : "+ GST"}</span>
                  </span>
                </div>
              </div>

              <p>{member.desc}</p>

              <ul className="benefits-list">
                {member.benefits.map((benefit, i) => (
                  <li
                    key={i}
                    style={benefit.includes("Resource Persons Network") ? { fontWeight: '700', color: member.color } : {}}
                  >
                    <svg
                      className="check-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={benefit.includes("Resource Persons Network") ? { color: member.color } : {}}
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>

              {userData?.membershipType === member.type ? (
                <button disabled className="btn btn-sm btn-success" style={{ borderColor: 'transparent', background: '#dcfce7', color: '#166534' }}>
                  Active Plan
                </button>
              ) : (
                <button onClick={() => handleApply(member)} className="btn btn-sm btn-outline-primary" style={{ borderColor: member.color, color: member.color }}>
                  Apply for Membership
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
            min-height: 80px;
            justify-content: flex-start;
        }

        .pricing-stack {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.25rem;
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
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
        }

        .member-card p {
          color: var(--color-text-muted);
          margin-bottom: 2rem;
          font-size: 0.95rem;
          line-height: 1.6;
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
