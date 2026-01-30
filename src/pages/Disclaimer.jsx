import React from 'react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';

const Disclaimer = () => {
    return (
        <div className="page-container">
            <SEO title="Legal Disclaimer" description="Important legal information regarding AETE's status and operations." />
            <PageHero title="Legal Disclaimer" subtitle="Non-Statutory & Voluntary Association Declaration." />

            <div className="container section">
                <div className="legal-content">
                    <div className="alert-box">
                        <h3>Important Legal Notice</h3>
                        <ul className="disclaimer-points">
                            <li>
                                <strong>Voluntary Association:</strong> AETE® is a voluntary, membership-based professional association and networking forum.
                            </li>
                            <li>
                                <strong>Non-Statutory Status:</strong> AETE® is <strong>not aka statutory body</strong>, regulatory authority, or government-recognized organization. We do not possess the authority to grant government ranks or statutory licenses.
                            </li>
                            <li>
                                <strong>Facilitation Only:</strong> AETE® functions solely as a facilitation and networking platform. AETE® does not appoint, authorize, certify, or employ any listed individual in an official capacity.
                            </li>
                            <li>
                                <strong>Financial Operations:</strong> Any financial transactions related to membership administration or digital services are handled independently by AETE®’s implementation partner, <strong>BitSky (MSME–Udyam registered)</strong>. AETE® itself does not collect public funds.
                            </li>
                            <li>
                                <strong>No Liability:</strong> AETE® bears no responsibility for contractual, financial, or professional outcomes arising from engagements between institutions and individuals listed in our network.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <style jsx="true">{`
        .legal-content {
          max-width: 900px;
          margin: 0 auto;
        }

        .alert-box {
            background: #fffafa;
            border: 1px solid #e2e8f0;
            border-left: 5px solid #e53e3e;
            padding: 2rem;
            border-radius: 8px;
        }

        .alert-box h3 {
            color: #c53030;
            margin-bottom: 1.5rem;
            font-size: 1.5rem;
        }

        .disclaimer-points {
            list-style: none;
            padding: 0;
        }

        .disclaimer-points li {
            margin-bottom: 1.5rem;
            line-height: 1.7;
            padding-left: 1.5rem;
            position: relative;
            color: #2d3748;
        }

        .disclaimer-points li::before {
            content: "•";
            color: #e53e3e;
            font-weight: bold;
            position: absolute;
            left: 0;
            font-size: 1.2rem;
        }

        .disclaimer-points strong {
            color: #1a202c;
        }
      `}</style>
        </div>
    );
};

export default Disclaimer;
