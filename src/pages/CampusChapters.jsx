import { motion } from 'framer-motion';
import { Network, GraduationCap, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';

const CampusChapters = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const chapters = [
    {
      title: "Student Innovation Chapters",
      icon: <Network size={40} />,
      desc: "Platforms for students to collaborate, innovate, and participate in technical challenges."
    },
    {
      title: "Faculty Coordination Units",
      icon: <GraduationCap size={40} />,
      desc: "Dedicated units for faculty members to drive academic initiatives and development programs."
    },
    {
      title: "Institutional Collaboration Cells",
      icon: <Building2 size={40} />,
      desc: "Centers within institutions to facilitate industry-academia interactions and joint activities."
    }
  ];

  return (
    <div className="chapters-page">
      <SEO title="Campus Chapters" description="Establish an AETE chapter at your institution: Student Innovation Chapters & Collaboration Cells." />
      <PageHeader
        title="Campus Chapters"
        subtitle="Extending our reach through institutional partnerships."
      />

      <div className="container section">
        <div className="intro-text center">
          <p>
            AETE facilitates the establishment of campus chapters to foster a culture of innovation and continuous learning. These chapters operate through mutual understanding and strictly institutional collaboration.
          </p>
        </div>

        <motion.div
          className="chapters-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {chapters.map((chapter, index) => (
            <motion.div key={index} variants={itemVariants} className="chapter-card">
              <div className="icon-wrapper">
                {chapter.icon}
              </div>
              <h3>{chapter.title}</h3>
              <p>{chapter.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="cta-box">
          <h2>Start a Chapter</h2>
          <p>Interested in establishing an AETE chapter at your institution?</p>
          <a
            href="mailto:aete.india@gmail.com?subject=Inquiry: Establish AETE Campus Chapter&body=To AETE India Team,%0A%0AWe are interested in establishing an AETE Campus Chapter at our institution.%0A%0AInstitution Name:%0ALocation:%0AContact Person:%0ADesignation:%0APhone Number:%0A%0ARegards,"
            className="btn btn-secondary"
          >
            Email Us with Details
          </a>
        </div>
      </div>

      <style jsx="true">{`
        .intro-text {
          max-width: 800px;
          margin: 0 auto 4rem;
          text-align: center;
          font-size: 1.1rem;
          color: #4a5568;
        }

        .chapters-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 5rem;
        }

        .chapter-card {
          background: white;
          padding: 3rem 2rem;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          transition: transform 0.3s ease;
          border-top: 5px solid var(--color-secondary);
        }

        .chapter-card:hover {
          transform: translateY(-5px);
        }

        .icon-wrapper {
          color: var(--color-primary);
          margin-bottom: 1.5rem;
          background: #f0f4f8;
          display: inline-flex;
          padding: 1rem;
          border-radius: 50%;
        }

        .chapter-card h3 {
          margin-bottom: 1rem;
          color: var(--color-primary);
        }

        .chapter-card p {
           color: var(--color-text-muted);
        }

        .cta-box {
          background: var(--color-primary);
          color: white;
          text-align: center;
          padding: 3rem;
          border-radius: 12px;
        }

        .cta-box h2 {
          color: white;
          margin-bottom: 1rem;
        }

        .cta-box p {
          color: rgba(255,255,255,0.9);
          margin-bottom: 2rem;
        }
      `}</style>
    </div>
  );
};

export default CampusChapters;
