import React from 'react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';

const Terms = () => {
  return (
    <div className="page-container">
      <SEO title="Terms of Service" description="Terms and Conditions for AETE Membership." />
      <PageHero title="Terms of Service" subtitle="Membership Bylaws and Guidelines." />

      <div className="container section">
        <div className="legal-content">
          <h3>1. Nature of Association</h3>
          <p>AETE (Association of Engineers for Technology and Education) is a voluntary professional body. Membership does not confer any statutory authority or government rank.</p>

          <h3>2. Code of Conduct</h3>
          <p>Members are expected to actively contribute to the engineering community and maintain high professional standards. Any member found engaging in unethical practices may have their membership revoked without refund.</p>

          <h3>3. Fees and Payments</h3>
          <p>Membership fees are collected annually. All payments are non-refundable. Fee collection is handled by our authorized partner, <strong>BitSky</strong>. AETE® does not collect cash or direct bank transfers into personal accounts.</p>

          <h3>4. Intellectual Property</h3>
          <p>Content contributed to the AETE resource network remains the intellectual property of the respective authors, with a license granted to AETE for dissemination within the network.</p>

          <h3>5. Amendments</h3>
          <p>AETE reserves the right to amend these terms. Members will be notified of significant changes.</p>
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
      `}</style>
    </div>
  );
};

export default Terms;
