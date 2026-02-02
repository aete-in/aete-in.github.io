import { motion } from 'framer-motion';

const PageHero = ({ title, subtitle, className = "" }) => {
  return (
    <div className={`page-hero ${className}`}>
      <div className="container hero-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="hero-title">{title}</h1>
          {subtitle && <p className="hero-subtitle">{subtitle}</p>}
        </motion.div>
      </div>

      <style jsx="true">{`
        .page-hero {
          background: linear-gradient(135deg, var(--color-primary) 0%, #001f44 100%);
          color: white;
          padding: 8rem 0 4rem; /* Increased top padding */
          position: relative;
          text-align: center;
          margin-bottom: 3rem;
        }

        .hero-title {
          font-size: 3rem;
          margin-bottom: 1rem;
          color: white;
          font-weight: 700;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--color-accent);
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.6;
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          .page-hero {
            padding: 6rem 0 3rem; /* Mobile padding adjustment */
          }
          .hero-title {
            font-size: 2.25rem;
          }
          .hero-subtitle {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PageHero;
