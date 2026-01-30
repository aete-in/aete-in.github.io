import React from 'react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';

const Privacy = () => {
  return (
    <div className="page-container">
      <SEO title="Privacy Policy" description="Privacy Policy for AETE members and visitors." />
      <PageHero title="Privacy Policy" subtitle="How we handle your data." />

      <div className="container section">
        <div className="legal-content">
          <h3>1. Data Collection</h3>
          <p>AETE collects personal information (Review Name, Email, Institution, Professional details) solely for the purpose of maintaining our professional membership registry/directory and facilitating network activities.</p>

          <h3>2. Membership Fees</h3>
          <p>We do not store banking or credit card details. All membership fee transactions are processed through our technology partner, <strong>BitSky</strong>, which adheres to industry-standard security protocols.</p>

          <h3>3. Data Usage</h3>
          <p>Your data is used to:</p>
          <ul>
            <li>Issue membership certificates.</li>
            <li>Connect you with other professionals in the network.</li>
            <li>Inform you about upcoming FDPs, workshops, and events.</li>
          </ul>

          <h3>4. Third-Party Sharing</h3>
          <p>We do not sell or share member data with third parties for commercial marketing. Confirmed details may be shared with partner institutions only for the purpose of verifying credentials or coordinating joint events.</p>

          <h3>5. Contact</h3>
          <p>For privacy concerns, please contact our secretariat at <a href="mailto:privacy@aete.org">privacy@aete.org</a>.</p>
        </div>
      </div>

      <style jsx="true">{`
        .legal-content {
          max-width: 800px;
          margin: 0 auto;
        }
        .legal-content h3 {
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: var(--color-primary);
        }
        .legal-content ul {
          list-style: disc;
          padding-left: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .legal-content li {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default Privacy;
