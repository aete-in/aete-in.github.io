import { motion } from 'framer-motion';
import { CheckCircle, Users, BookOpen, Lightbulb, Zap, ShieldCheck, Target, Award } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';

const About = () => {
  const features = [
    {
      icon: <Users size={28} />,
      title: "Industry-Academia Collaboration",
      desc: "Bridging the divide between theoretical knowledge and practical industry requirements through strategic partnerships."
    },
    {
      icon: <BookOpen size={28} />,
      title: "Faculty Development",
      desc: "Empowering educators with cutting-edge skills and pedagogies to nurture the next generation of engineers."
    },
    {
      icon: <Lightbulb size={28} />,
      title: "Innovation Challenges",
      desc: "Fostering a culture of creativity and problem-solving through hackathons and technical competitions."
    },
    {
      icon: <Zap size={28} />,
      title: "Student Bootcamps",
      desc: "Intensive skill-building sessions designed to make students industry-ready from day one."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="about-page">
      <SEO title="About Us" description="AETE is an MSME-registered Industry-Academia organization. Learn about our legal status and objectives." />
      <PageHero
        title="About Us"
        subtitle="Bridging the gap between theory and practice through technology."
      />

      <div className="container section">

        {/* Who We Are Section */}
        <div className="who-we-are mb-5">
          <motion.div
            className="grid-2-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <div className="section-label">Who We Are</div>
              <h2 className="section-title">A Community of <br />Innovators & Educators</h2>
              <p className="lead-text">
                AETE is a registered <strong>Educational Professional Association</strong> (MSME Registered). Managed by Bitsky, we operate strictly as an academic body dedicated to technical excellence and faculty development.
              </p>
              <p className="secondary-text">
                We are dedicated to facilitating <strong>educational collaboration</strong> among engineers and educators. Our primary mission is to advance engineering education through FDPs, workshops, and certification programs.
                <br /><br />
                <em>Disclaimer: AETE is NOT a networking platform, contact brokerage, or lead generation service.</em>
              </p>
            </div>
            <div className="stats-grid">
              <div className="stat-card">
                <Target size={32} className="stat-icon" />
                <h3>Mission Driven</h3>
                <p>Focused on outcome-based education and practical exposure.</p>
              </div>
              <div className="stat-card">
                <Award size={32} className="stat-icon" />
                <h3>Excellence</h3>
                <p>Promoting future-ready competencies aligned with industry trends.</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* What We Do Section */}
        <div className="what-we-do mb-5">
          <div className="text-center mb-5">
            <div className="section-label center">Our Focus</div>
            <h2 className="section-title">Empowering the Ecosystem</h2>
          </div>

          <motion.div
            className="features-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div key={index} className="feature-card" variants={itemVariants}>
                <div className="icon-wrapper">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Legal Status Section */}
        <div className="legal-section">
          <div className="legal-header">
            <ShieldCheck size={32} className="shield-icon" />
            <h3>Legal Status & Compliance</h3>
          </div>
          <div className="legal-body">
            <p>
              <strong>Association of Engineers for Technology and Education (AETE)</strong> is a registered Micro, Small & Medium Enterprise (MSME) under the Government of India.
            </p>
            <p>
              <strong>Nature of Operation:</strong> Professional Association / Educational Trust.
            </p>
            <div className="disclaimer-box">
              <strong>Regulatory Compliance:</strong> AETE complies with all relevant sections of the Indian IT Act 2000 regarding data privacy and content dissemination. We maintain a strict zero-tolerance policy towards commercial solicitation and unauthorized data harvesting on our platform.
            </div>
          </div>
        </div>

      </div>

      <style jsx="true">{`
        .section-label {
            font-size: 0.85rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--color-secondary);
            margin-bottom: 1rem;
        }

        .section-label.center {
            margin-left: auto;
            margin-right: auto;
            width: fit-content;
        }

        .section-title {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 2rem;
            line-height: 1.2;
            color: var(--color-primary);
        }

        .grid-2-col {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
        }

        .lead-text {
            font-size: 1.25rem;
            line-height: 1.6;
            color: #2d3748;
            margin-bottom: 1.5rem;
        }

        .secondary-text {
            color: var(--color-text-secondary);
            line-height: 1.8;
            font-size: 1.05rem;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }

        .stat-card {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
            border: 1px solid #f1f5f9;
            transition: transform 0.3s ease;
        }

        .stat-card:hover {
            transform: translateY(-5px);
            border-color: var(--color-secondary);
        }

        .stat-icon {
            color: var(--color-secondary);
            margin-bottom: 1rem;
        }

        .stat-card h3 {
            font-size: 1.2rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            color: var(--color-primary);
        }

        .stat-card p {
            font-size: 0.95rem;
            color: var(--color-text-muted);
            line-height: 1.5;
            margin: 0;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 2rem;
        }

        .feature-card {
            background: white;
            padding: 2.5rem 2rem;
            border-radius: 16px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
            text-align: center;
            transition: all 0.3s ease;
            border: 1px solid transparent;
        }

        .feature-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            border-color: #e2e8f0;
        }

        .icon-wrapper {
            background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            color: white;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .feature-card h3 {
            font-size: 1.25rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: var(--color-primary);
        }

        .feature-card p {
            color: var(--color-text-muted);
            font-size: 0.95rem;
            line-height: 1.6;
        }

        .legal-section {
            margin-top: 6rem;
            background: #f8fafc;
            border-radius: 12px;
            padding: 3rem;
            border: 1px solid #e2e8f0;
        }

        .legal-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }

        .shield-icon {
            color: var(--color-secondary);
        }

        .legal-header h3 {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--color-primary);
            margin: 0;
        }

        .legal-body {
            color: var(--color-text-secondary);
            line-height: 1.7;
        }

        .disclaimer-box {
            margin-top: 1.5rem;
            padding: 1rem 1.5rem;
            background: #fff;
            border-left: 4px solid #cbd5e0;
            border-radius: 4px;
            font-size: 0.95rem;
            color: #4a5568;
        }

        .mb-5 { margin-bottom: 5rem; }

        @media (max-width: 768px) {
            .grid-2-col {
                grid-template-columns: 1fr;
                gap: 3rem;
            }
            
            .section-title {
                font-size: 2rem;
            }

            .legal-section {
                padding: 2rem;
            }
        }
      `}</style>
    </div>
  );
};

export default About;
