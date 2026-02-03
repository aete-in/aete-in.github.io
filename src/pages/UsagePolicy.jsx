import React from 'react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';

const UsagePolicy = () => {
  return (
    <div className="page-container">
      <SEO title="Platform Usage Policy" description="Acceptable Use Policy for AETE Platform." />
      <PageHero title="Platform Usage Policy" subtitle="Guidelines for permissible use." />

      <div className="container section">
        <div className="legal-content">
          <div className="last-updated">Last Updated: February 1, 2026</div>

          <p>
            This Acceptable Use Policy outlines the permissible and prohibited activities on the AETE platform.
            By accessing our services, you agree to strictly comply with these guidelines.
          </p>

          <h3>1. Permissible Use</h3>
          <p>The AETE platform is strictly for:</p>
          <ul>
            <li><strong>Educational Advancement:</strong> Accessing learning materials, research journals, and technical resources.</li>
            <li><strong>Professional Verification:</strong> Validating your skills and membership status.</li>
            <li><strong>Academic Collaboration:</strong> engaging in research projects and faculty exchanges officially coordinated by AETE.</li>
          </ul>

          <h3>2. Prohibited Activities</h3>
          <div className="alert-box">
            <strong>ZERO TOLERANCE POLICY:</strong> The following activities are strictly prohibited and will result in immediate termination of account.
          </div>
          <ul>
            <li><strong>Commercial Solicitation:</strong> Using the member directory to send unsolicited sales pitches, marketing emails, or "spam".</li>
            <li><strong>Lead Generation:</strong> Harvesting member data to build leads lists or contact databases for sale.</li>
            <li><strong>Headhunting/Recruitment:</strong> Using the platform as a job board or recruitment tool without explicit authorization.</li>
            <li><strong>Misinformation:</strong> Posting false academic credentials or plagiarized content.</li>
          </ul>

          <h3>3. Content Standards</h3>
          <p>
            Members contributing to the Resource Network must ensure that their content:
          </p>
          <ul>
            <li>Is accurate, scientific, and educational in nature.</li>
            <li>Does not violate any copyright or intellectual property rights.</li>
            <li>Is strictly professional and free from offensive or political material.</li>
          </ul>

          <h3>4. Enforcement</h3>
          <p>
            AETE reserves the right to monitor platform usage. We may suspend or terminate accounts found to be in violation of this policy without prior notice.
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
            background-color: #f8d7da;
            border: 1px solid #f5c6cb;
            color: #721c24;
            padding: 1.5rem;
            border-radius: 8px;
            margin: 2rem 0;
            font-size: 1rem;
        }
        strong {
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default UsagePolicy;
