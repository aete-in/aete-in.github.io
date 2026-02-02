import React from 'react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';

const RefundPolicy = () => {
    return (
        <div className="page-container">
            <SEO title="Refund & Cancellation Policy" description="Refund and Cancellation Policy for AETE." />
            <PageHero title="Refund & Cancellation Policy" subtitle="Terms regarding fee reversals." />

            <div className="container section">
                <div className="legal-content">
                    <div className="last-updated">Last Updated: February 1, 2026</div>

                    <h3>1. General Policy</h3>
                    <p>
                        <strong>AETE (Association of Engineers for Technology and Education)</strong> operates as a non-profit professional association.
                        In general, membership fees, certification fees, and event registration fees are <strong>Non-Refundable</strong> once paid, as they cover administrative costs, immediate access to digital resources, and certification processing.
                    </p>

                    <h3>2. Cancellation of Membership</h3>
                    <ul>
                        <li>Members may choose to cancel their membership subscription at any time by contacting the secretariat.</li>
                        <li>Cancellation implies that your membership will not be renewed for the next cycle.</li>
                        <li>No refunds will be provided for the remaining period of an active membership term.</li>
                    </ul>

                    <h3>3. Exceptional Circumstances for Refunds</h3>
                    <p>Refunds will be considered ONLY under the following circumstances:</p>
                    <ul>
                        <li><strong>Double Payment:</strong> If a user is accidentally charged twice for the same transaction due to a technical error.</li>
                        <li><strong>Service Unavailability:</strong> If a scheduled FDP, workshop, or conference is officially cancelled by AETE.</li>
                    </ul>

                    <h3>4. Refund Process</h3>
                    <p>
                        If you are eligible for a refund under the exceptions listed above:
                    </p>
                    <ul>
                        <li>Please email <a href="mailto:support@aete.org">support@aete.org</a> within 3 days of the transaction.</li>
                        <li>Include your Transaction ID and proof of payment.</li>
                        <li>Approved refunds will be processed within <strong>5-7 business days</strong> and credited back to the original source of payment via Razorpay.</li>
                    </ul>

                    <h3>5. Contact for Billing Issues</h3>
                    <p>
                        For any billing discrepancies, please contact us immediately at <a href="mailto:finance@aete.org">finance@aete.org</a>.
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
        a {
            color: var(--color-primary);
            text-decoration: underline;
        }
      `}</style>
        </div>
    );
};

export default RefundPolicy;
