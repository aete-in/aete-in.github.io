import React from 'react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';

const Privacy = () => {
  return (
    <div className="page-container">
      <SEO title="Privacy Policy" description="Privacy Policy for AETE members and visitors." />
      <PageHero title="Privacy Policy" subtitle="Your Privacy & Data Protection." />

      <div className="container section">
        <div className="legal-content">
          <div className="last-updated">Last Updated: February 1, 2026</div>

          <p>
            At <strong>AETE (Association of Engineers for Technology and Education)</strong>, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your information in compliance with the Information Technology Act, 2000.
          </p>

          <h3>1. Information We Collect</h3>
          <p>We collect only the essential information required for membership verification and certification:</p>
          <ul>
            <li><strong>Personal Information:</strong> Name, Email Address, Phone Number.</li>
            <li><strong>Professional Information:</strong> Institution/Company Name, Designation, Department, Qualifications.</li>
            <li><strong>Payment Information:</strong> Transaction IDs (We do NOT store credit/debit card numbers. All payments are processed by Razorpay).</li>
          </ul>

          <h3>2. Purpose of Collection</h3>
          <p>Your data is used strictly for the following educational purposes:</p>
          <ul>
            <li>To verify your professional credentials for membership approval.</li>
            <li>To issue verifiable digital certificates and ID cards.</li>
            <li>To communicate official updates regarding FDPs, conferences, and workshops.</li>
            <li>To maintain the official register of members as required by association bylaws.</li>
          </ul>

          <h3>3. NO Commercial Data Sharing</h3>
          <div className="alert-box">
            <strong>STRICT POLICY:</strong> AETE does <strong>NOT</strong> sell, rent, trade, or share your personal data with third-party advertisers, lead generation agencies, or marketing firms.
          </div>
          <p>
            Data is only shared with:
          </p>
          <ul>
            <li><strong>Razorpay:</strong> Securely for payment processing.</li>
            <li><strong>Partner Institutions:</strong> Only when you explicitly register for a joint certification program, solely for the purpose of certificate issuance.</li>
          </ul>

          <h3>4. Data Security</h3>
          <p>
            We implement industry-standard security measures to protect your data. Access to member records is restricted to authorized association administrators.
          </p>

          <h3>5. Cookies</h3>
          <p>
            Our website uses session cookies to maintain your login state. We do not use tracking cookies for behavioral advertising.
          </p>

          <h3>6. Your Rights</h3>
          <p>
            You have the right to request access to your data or request deletion of your account. For such requests, please contact our secretariat.
          </p>

          <h3>7. Contact Us</h3>
          <p>
            For any privacy-related concerns, please contact our Grievance Officer:
            <br /><br />
            <strong>AETE Secretariat</strong><br />
            Email: <a href="mailto:privacy@aete.org">privacy@aete.org</a><br />
            Address: Thiruvananthapuram, Kerala, India.
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
          background-color: #e3f2fd;
          border: 1px solid #bbdefb;
          color: #0d47a1;
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

export default Privacy;
