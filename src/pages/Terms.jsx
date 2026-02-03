import React from 'react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';

const Terms = () => {
  return (
    <div className="page-container">
      <SEO title="Terms & Conditions" description="Terms and Conditions for AETE Membership." />
      <PageHero title="Terms & Conditions" subtitle="Membership Bylaws and Usage Guidelines." />

      <div className="container section">
        <div className="legal-content">
          <div className="last-updated">Last Updated: February 1, 2026</div>

          <h3>1. Nature of Business & Association</h3>
          <p>
            <strong>Association of Engineers for Technology and Education (AETE)</strong> is a registered
            <strong> Educational Professional Association</strong>. AETE is strictly an academic and professional development body dedicated to the advancement of engineering education.
          </p>
          <div className="alert-box">
            <strong>IMPORTANT DISCLAIMER:</strong> AETE is <strong>NOT</strong> a networking platform, lead generation agency, contact brokerage, or social network. We do NOT sell data, leads, or facilitate commercial networking. All interactions are strictly for educational and research collaboration.
          </div>

          <h3>2. Educational Services & Offerings</h3>
          <p>The payments collected on this platform are strictly for specific educational services and professional memberships, including:</p>
          <ul>
            <li><strong>Professional Memberships:</strong> Annual or lifetime affiliation for academic recognition.</li>
            <li><strong>Certifications:</strong> Verifiable skill-based certifications and credentials.</li>
            <li><strong>Faculty Development Programs (FDP):</strong> Official training workshops for educators.</li>
            <li><strong>Conferences & Workshops:</strong> Registration for academic events and technical seminars.</li>
          </ul>

          <h3>3. Membership Rules & Code of Conduct</h3>
          <p>
            Membership is a privilege, not a right. Members must adhere to strict ethical standards.
            <strong>Prohibited Activities include:</strong>
          </p>
          <ul>
            <li>Using member directories for commercial solicitation or marketing.</li>
            <li>Sending unsolicited "leads" or business proposals to other members.</li>
            <li>Misrepresenting AETE affiliation for personal business gain.</li>
          </ul>
          <p>Any violation will result in immediate termination of membership without refund.</p>

          <h3>4. Payments & Billing</h3>
          <p>
            All payments are processed securely through our authorized payment partner, <strong>Razorpay</strong>.
            AETE does not store your credit/debit card details.
            All fees are quoted in Indian Rupees (INR) and are subject to applicable GST.
          </p>

          <h3>5. Intellectual Property</h3>
          <p>
            All educational materials, journals, publications, and certification content provided by AETE are the intellectual property of the association or its respective authors. Unauthorzied redistribution is prohibited.
          </p>

          <h3>6. Limitation of Liability</h3>
          <p>
            AETE facilitates academic collaboration but is not responsible for independent communications or agreements made between members outside of official AETE events. The association does not guarantee employment or business outcomes from membership.
          </p>

          <h3>7. Dispute Resolution</h3>
          <p>
            All disputes are subject to the exclusive jurisdiction of the courts in <strong>Thiruvananthapuram, Kerala, India</strong>.
          </p>
        </div>
      </div>

      <style jsx="true">{`
        .legal-content {
          max-width: 800px;
          margin: 0 auto;
          font-family: 'Inter', sans-serif;
          color: #333;
          line-height: 1.8;
          background: white;
          padding: 3rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .last-updated {
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 2rem;
          font-style: italic;
        }
        .legal-content h3 {
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          color: var(--color-primary);
          font-size: 1.5rem;
          font-weight: 700;
          border-bottom: 2px solid #eee;
          padding-bottom: 0.5rem;
        }
        .legal-content p {
          margin-bottom: 1rem;
          font-size: 1.05rem;
        }
        .legal-content ul {
          list-style: disc;
          padding-left: 2rem;
          margin-bottom: 1.5rem;
        }
        .legal-content li {
          margin-bottom: 0.5rem;
        }
        .alert-box {
          background-color: #fff3cd;
          border: 1px solid #ffeeba;
          color: #856404;
          padding: 1.5rem;
          border-radius: 8px;
          margin: 2rem 0;
          font-size: 1rem;
        }
        strong {
          font-weight: 600;
        }
        .legal-content a {
            color: var(--color-primary);
            text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default Terms;
