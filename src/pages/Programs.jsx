import { motion } from 'framer-motion';
import { BookOpen, Users, Cpu, Code, Lightbulb, Presentation, Share2, Award } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';

const Programs = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const programs = [
    {
      title: "Faculty Development Programs (FDPs)",
      icon: <Users size={32} />,
      desc: "Comprehensive training sessions designed to upgrade faculty skills in emerging technologies and modern teaching methodologies."
    },
    {
      title: "Workshops & Hands-on Training",
      icon: <BookOpen size={32} />,
      desc: "Practical, skill-based workshops focusing on real-world applications and industry standard tools."
    },
    {
      title: "Student Bootcamps",
      icon: <Code size={32} />,
      desc: "Intensive training programs for students to master specific technologies like AI, Web Dev, and Cloud Computing."
    },
    {
      title: "Technology Awareness Sessions",
      icon: <Cpu size={32} />,
      desc: "Seminars and webinars to keep the academic community updated with the latest technological trends."
    },
    {
      title: "Hackathons & Innovation Challenges",
      icon: <Lightbulb size={32} />,
      desc: "Competitions designed to foster creativity and problem-solving skills among students."
    },
    {
      title: "Technical Events",
      icon: <Award size={32} />,
      desc: "National and institutional level events providing a platform for technical showcase and collaboration."
    },
    {
      title: "Expert Talks",
      icon: <Presentation size={32} />,
      desc: "Knowledge sharing sessions by industry experts and renowned academicians."
    },
    {
      title: "Industry Interaction",
      icon: <Share2 size={32} />,
      desc: "Programs meant to bridge the gap between academia and industry through direct interaction and collaboration."
    }
  ];

  return (
    <div className="programs-page">
      <SEO title="Programs & Activities" description="Explore our FDPs, Workshops, Hackathons, and Student Training programs." />
      <PageHero
        title="Programs & Activities"
        subtitle="Empowering the academic community through structured learning initiatives."
      />

      <div className="container section">
        <motion.div
          className="programs-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {programs.map((program, index) => (
            <motion.div key={index} variants={itemVariants} className="program-card">
              <div className="icon-wrapper">
                {program.icon}
              </div>
              <h3>{program.title}</h3>
              <p>{program.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx="true">{`
        .programs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .program-card {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid #f0f0f0;
        }

        .program-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 20px rgba(0,0,0,0.1);
          border-color: var(--color-secondary);
        }

        .icon-wrapper {
          color: var(--color-secondary);
          margin-bottom: 1.5rem;
          background: #e6ffFA;
          display: inline-flex;
          padding: 1rem;
          border-radius: 50%;
        }

        .program-card h3 {
          margin-bottom: 1rem;
          font-size: 1.25rem;
          color: var(--color-primary);
        }

        .program-card p {
          color: #4a5568;
          font-size: 0.95rem;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
};

export default Programs;
