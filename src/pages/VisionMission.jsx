import { motion } from 'framer-motion';
import { Target, Compass } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';

const VisionMission = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const missions = [
    "To promote technology-focused education and applied engineering learning",
    "To support faculty and students through structured training and development programs",
    "To encourage innovation, research orientation, and problem-solving skills",
    "To strengthen industry–academia collaboration across engineering disciplines",
    "To facilitate continuous professional growth through modern learning practices"
  ];

  return (
    <div className="vision-mission-page">
      <SEO title="Vision & Mission" description="Our vision is to empower engineers and educators. Explore AETE's mission statements." />
      <PageHero
        title="Vision & Mission"
        subtitle="Guiding principles for the future of engineering education."
      />

      <div className="container section">
        <motion.div
          className="grid-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Vision Section */}
          <motion.div variants={itemVariants} className="vm-card vision">
            <div className="icon-box">
              <Target size={40} />
            </div>
            <h2>Our Vision</h2>
            <p className="vision-text">
              To become a leading industry–academia collaboration platform that empowers engineers and educators through innovation, technology-driven learning, and skill development.
            </p>
          </motion.div>

          {/* Mission Section */}
          <motion.div variants={itemVariants} className="vm-card mission">
            <div className="icon-box">
              <Compass size={40} />
            </div>
            <h2>Our Mission</h2>
            <ul className="mission-list">
              {missions.map((mission, index) => (
                <li key={index}>{mission}</li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>

      <style jsx="true">{`
        .grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
        }

        .vm-card {
            background: white;
            padding: 3rem 2rem;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
            position: relative;
            overflow: hidden;
            border-top: 5px solid transparent;
        }

        .vm-card.vision {
            border-color: var(--color-accent);
        }

        .vm-card.mission {
            border-color: var(--color-secondary);
        }

        .icon-box {
            margin-bottom: 1.5rem;
            color: var(--color-primary);
            background: #f0f4f8;
            display: inline-flex;
            padding: 1rem;
            border-radius: 50%;
        }

        .vm-card h2 {
            font-size: 2rem;
            margin-bottom: 1.5rem;
            color: var(--color-primary);
        }

        .vision-text {
            font-size: 1.25rem;
            line-height: 1.6;
            color: #4a5568;
            font-style: italic;
        }

        .mission-list {
            list-style: none;
        }

        .mission-list li {
            margin-bottom: 1rem;
            position: relative;
            padding-left: 1.5rem;
            color: #4a5568;
        }

        .mission-list li::before {
            content: "•";
            color: var(--color-secondary);
            font-weight: bold;
            position: absolute;
            left: 0;
            font-size: 1.2rem;
        }

        @media(max-width: 900px) {
            .grid-2 {
                grid-template-columns: 1fr;
                gap: 2rem;
            }
        }
`}</style>
    </div>
  );
};

export default VisionMission;
