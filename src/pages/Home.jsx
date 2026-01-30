import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Users, Cpu, Award, Star, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const focusAreas = [
    { icon: <Users size={28} />, title: "Expert Lectures", desc: "Curated sessions by subject matter experts to bridge the gap between curriculum and industry practice." },
    { icon: <BookOpen size={28} />, title: "Professional Development", desc: "Advanced technical training and upskilling programs designed to empower engineers and academic leaders." },
    { icon: <Cpu size={28} />, title: "Technical Workshops", desc: "Intensive, hands-on certification modules on cutting-edge technologies and frameworks." },
    { icon: <Award size={28} />, title: "Industrial Consultancy", desc: "Deploying our network's specialized expertise to solve complex industrial and research challenges." }
  ];

  return (
    <div className="home-page">
      <SEO
        title="Home"
        description="AETE (Association of Engineers for Technology and Education) is a leading industry-academia organization empowering engineers through innovation and skill development."
      />

      {/* Unified Landing Section */}
      <section className="landing-wrapper">
        <div className="animated-bg">
          <div className="blob b1"></div>
          <div className="blob b2"></div>
        </div>
        <div className="tech-grid"></div>

        <div className="container hero-content-wrapper">
          <div className="hero-grid">
            <motion.div
              className="hero-text-area"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h1 className="main-title">
                  Association of Engineers for <br />
                  <span className="gradient-text">Technology and Education</span>
                </h1>
              </motion.div>

              <motion.p
                className="hero-subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                AETE® connects institutions with experienced engineers and educators through its structured Resource Person Network.
              </motion.p>

              <motion.div
                className="action-buttons"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Link to="/resource-persons" className="btn-glow">
                  Find an Expert <ArrowRight size={18} />
                </Link>
                <Link to="/membership" className="btn-glass">
                  Join AETE
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="hero-visual-area"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="orbital-system">
                <div className="orbit-c1"></div>
                <div className="orbit-c2"></div>
                <div className="center-logo">
                  <span>AETE<sup className="tiny-reg">®</sup></span>
                </div>

                {/* Floating Stats Cards */}
                <motion.div
                  className="float-card top-right"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Users size={20} className="icon-teal" />
                  <div className="txt"><span className="bold">500+</span> Experts</div>
                </motion.div>

                <motion.div
                  className="float-card bottom-left"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <Award size={20} className="icon-amber" />
                  <div className="txt"><span className="bold">Pro</span> Standards</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Integrated Stats Bar */}
        <motion.div
          className="stats-dock"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="container">
            <div className="dock-grid">
              <div className="dock-item">
                <h3>500+</h3>
                <p>Professional Members</p>
              </div>
              <div className="dock-item">
                <h3>120+</h3>
                <p>Partner Institutions</p>
              </div>
              <div className="dock-item">
                <h3>50k+</h3>
                <p>Students Impacted</p>
              </div>
              <div className="dock-item">
                <h3>25+</h3>
                <p>Active Chapters</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="section bg-soft mobile-pad-top">
        <div className="container">
          <div className="split-layout">
            <div className="split-content">
              <span className="sub-heading">Who We Are</span>
              <h2 className="section-title">Cultivating the Next Gen of Engineers</h2>
              <p className="lead-text">
                AETE stands at the forefront of the Industry-Academia interface. We are a collective of thought leaders committed to elevating the standards of technical education in India.
              </p>
              <ul className="feature-list">
                <li><CheckCircle size={20} className="check-icon" /> Curriculum Development Support</li>
                <li><CheckCircle size={20} className="check-icon" /> NAAC/NBA Accreditation Guidance</li>
                <li><CheckCircle size={20} className="check-icon" /> Faculty Upskilling Programs</li>
              </ul>
              <Link to="/about" className="btn btn-secondary text-sm">Learn More About Us</Link>
            </div>
            <div className="split-image relative-box">
              <div className="image-block block-1"></div>
              <div className="image-block block-2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas - Glassmorphism */}
      <section className="section bg-gradient">
        <div className="container">
          <div className="center-header">
            <span className="sub-heading white">Our Pillars</span>
            <h2 className="section-title white">Core Activities</h2>
            <p className="section-desc white">Empowering the ecosystem through three strategic pillars of engagement.</p>
          </div>

          <motion.div
            className="grid-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {focusAreas.map((area, index) => (
              <motion.div key={index} variants={itemVariants} className="glass-card feature-hover">
                <div className="icon-box">{area.icon}</div>
                <h3>{area.title}</h3>
                <p>{area.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials / Trust */}
      <section className="section">
        <div className="container">
          <div className="center-header">
            <span className="sub-heading">Testimonials</span>
            <h2 className="section-title">Trusted by Leaders</h2>
          </div>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <div className="stars"><Star size={16} fill="#f59e0b" color="#f59e0b" /> <Star size={16} fill="#f59e0b" color="#f59e0b" /> <Star size={16} fill="#f59e0b" color="#f59e0b" /> <Star size={16} fill="#f59e0b" color="#f59e0b" /> <Star size={16} fill="#f59e0b" color="#f59e0b" /></div>
              <p className="quote">"AETE has been instrumental in connecting us with industry experts for our FDPs. The quality of resource persons is unmatched."</p>
              <div className="author">
                <div className="author-avatar av-1"></div>
                <div>
                  <h4>Dr. S. Kumar</h4>
                  <span>Principal, GEC Trivandrum</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="stars"><Star size={16} fill="#f59e0b" color="#f59e0b" /> <Star size={16} fill="#f59e0b" color="#f59e0b" /> <Star size={16} fill="#f59e0b" color="#f59e0b" /> <Star size={16} fill="#f59e0b" color="#f59e0b" /> <Star size={16} fill="#f59e0b" color="#f59e0b" /></div>
              <p className="quote">"The technical workshops provided by AETE members gave our students real-world insights that textbooks couldn't offer."</p>
              <div className="author">
                <div className="author-avatar av-2"></div>
                <div>
                  <h4>Prof. Anita Raj</h4>
                  <span>HOD CSE, NIT Calicut</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container center-text">
          <h2>Ready to Transform the Society?</h2>
          <p>Join India's fastest growing network of engineering professionals.</p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn btn-white">Partner with Us</Link>
            <Link to="/membership" className="btn btn-outline-white">Become a Member</Link>
          </div>
        </div>
      </section>

      <style jsx="true">{`
        /* --- GLOBAL LAYOUT --- */
        :global(body) { margin: 0; padding: 0; overflow-x: hidden; }

        .landing-wrapper {
          position: relative;
          width: 100%;
          /* SUBTRACT NAV HEIGHT (Layout adds 80px margin-top, plus buffer) */
          height: calc(100dvh - 85px); 
          overflow: hidden; 
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
          padding-top: 0; 
        }

        /* Animated Background */
        .animated-bg {
          position: absolute;
          width: 100%; height: 100%;
          top: 0; left: 0; pointer-events: none;
          z-index: 0;
        }
        .blob {
          position: absolute;
          filter: blur(60px); /* Reduced from 80px for performance */
          opacity: 0.3;
          animation: floatBlob 10s infinite alternate;
          will-change: transform;
          transform: translate3d(0,0,0); /* Force GPU */
        }
        .b1 { width: 300px; height: 300px; background: #4f46e5; top: -50px; left: -50px; }
        .b2 { width: 400px; height: 400px; background: #0ea5e9; bottom: -50px; right: -50px; animation-delay: -5s; }
        @keyframes floatBlob {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          100% { transform: translate3d(50px, 50px, 0) scale(1.1); }
        }
        
        .tech-grid {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background-image: 
                linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
            background-size: 40px 40px;
            pointer-events: none;
            z-index: 1;
            mask-image: radial-gradient(circle at center, black 40%, transparent 90%);
        }

        /* --- HERO MIDDLE SECTION --- */
        .hero-content-wrapper {
          flex: 1 1 auto; /* SHRINK AND GROW */
          min-height: 0; /* CRITICAL for flexbox shrinking */
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          width: 100%;
          padding: 0 1.5rem;
          /* overflow: hidden;  Safety check */
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          align-items: center;
          gap: clamp(1rem, 2vh, 2rem);
          width: 100%;
          max-width: 1200px;
          height: 100%; /* Fill the flexible wrapper */
          max-height: 100%;
        }

        /* Text Area */
        .hero-text-area {
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 100%;
            /* Allow text to compress if needed */
            justify-content: space-evenly; 
        }

        .main-title {
          /* Smaller base, smaller dynamic growth */
          font-size: clamp(2rem, 4vh, 3.5rem);
          font-weight: 800;
          color: white;
          line-height: 1.1;
          margin-bottom: clamp(0.5rem, 1.5vh, 1.25rem);
          letter-spacing: -0.03em;
        }
        .gradient-text {
          background: linear-gradient(90deg, #38bdf8, #818cf8, #c084fc, #38bdf8);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 8s linear infinite;
        }
        
        @keyframes shine {
            to { background-position: 200% center; }
        }
        
        .hero-subtitle {
          font-size: clamp(0.9rem, 1.8vh, 1.15rem);
          color: #cbd5e1;
          margin-bottom: clamp(1rem, 2.5vh, 1.75rem);
          line-height: 1.4;
          max-width: 600px;
        }

        .action-buttons {
          display: flex;
          gap: 0.75rem;
        }

        .btn-glow, .btn-glass {
          padding: clamp(0.6rem, 1.5vh, 0.75rem) 1.5rem;
          border-radius: 50px;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s;
          font-size: clamp(0.85rem, 1.5vh, 1rem);
          white-space: nowrap;
        }
        
        .btn-glow {
          background: white; color: #0f172a;
          box-shadow: 0 0 20px rgba(255,255,255,0.2);
        }
        .btn-glass {
          background: rgba(255,255,255,0.15); color: white;
          border: 1px solid rgba(255,255,255,0.2);
          /* backdrop-filter: blur(10px); REMOVED for performance */
        }

        /* Visual Area */
        .hero-visual-area {
            display: flex; align-items: center; justify-content: center;
            position: relative;
            height: 100%;
            /* Ensure it doesn't blow up the layout */
            max-height: 50vh; 
        }
        .orbital-system {
            height: clamp(250px, 35vh, 450px);
            aspect-ratio: 1/1;
            position: relative;
            display: flex; justify-content: center; align-items: center;
        }
        .orbit-c1, .orbit-c2 { 
            position: absolute; border-radius: 50%; 
            will-change: transform;
        }
        .orbit-c1 { width: 100%; height: 100%; border: 1px solid rgba(255,255,255,0.1); animation: spin 20s linear infinite; }
        .orbit-c1::after { content: ''; position: absolute; top: 0; left: 50%; width: 10px; height: 10px; background: #38bdf8; border-radius: 50%; box-shadow: 0 0 10px #38bdf8; }
        .orbit-c2 { width: 70%; height: 70%; border: 1px solid rgba(255,255,255,0.15); animation: spin 15s linear infinite reverse; }
        
        .center-logo { font-size: clamp(2rem, 5vh, 4rem); font-weight: 900; color: white; letter-spacing: -0.05em; z-index: 2; }
        .tiny-reg { font-size: 0.4em; vertical-align: super; font-weight: 400; opacity: 0.8; }
        
        @keyframes spin { 
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); } 
        }

        .float-card {
            position: absolute; background: rgba(255,255,255,0.95);
            padding: 0.5rem 0.8rem; border-radius: 12px;
            display: flex; align-items: center; gap: 0.5rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2); z-index: 5;
            will-change: transform;
            transform: translate3d(0,0,0);
        }
        .top-right { top: 5%; right: 0; }
        .bottom-left { bottom: 5%; left: 0; }
        .float-card .bold { font-weight: 800; color: #0f172a; }
        .float-card .txt { font-size: 0.75rem; color: #475569; white-space: nowrap; }

        /* --- STATS DOCK (Pinned Bottom) --- */
        .stats-dock {
            flex: 0 0 auto; /* Never shrink the stats */
            width: 100%;
            background: rgba(15, 23, 42, 0.9); /* Solid dark instead of blur */
            border-top: 1px solid rgba(255,255,255,0.1);
            /* backdrop-filter: blur(20px); REMOVED for performance */
            padding: clamp(0.75rem, 2vh, 1.5rem) 0;
            z-index: 20;
        }
        .dock-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1rem;
            text-align: center;
        }
        .dock-item h3 {
             font-size: clamp(1.6rem, 3.5vh, 2.5rem);
             font-weight: 700; color: white; margin-bottom: 0.1rem;
             line-height: 1;
        }
        .dock-item p {
             font-size: clamp(0.65rem, 1.2vh, 0.85rem);
             color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em;
        }


        /* --- MOBILE LAYOUT --- */
        
        @media (max-width: 960px) {
            .landing-wrapper {
                height: calc(100dvh - 85px); /* Subtract Nav Height */
                overflow: hidden;
                /* Ensure stats stay at bottom even if content is small */
                justify-content: flex-end; 
            }

            .hero-content-wrapper {
                /* Center content in remaining space */
                flex: 1 1 auto;
                justify-content: center; 
                padding: 0 1rem;
                padding-bottom: 0.5rem;
            }

            .hero-grid {
                display: flex;
                flex-direction: column;
                justify-content: center;
                gap: 0;
                text-align: center;
                height: 100%;
            }

            .hero-visual-area { display: none; } /* HIDDEN */

            .hero-text-area {
                width: 100%;
                height: auto;
                justify-content: center;
                align-items: center;
            }

            /* Ultra Compact Text */
            .main-title {
                font-size: clamp(1.8rem, 4vh, 2.4rem);
                margin-bottom: 0.5rem;
            }
            .hero-subtitle {
                font-size: 0.9rem;
                line-height: 1.35;
                margin-bottom: 1.25rem;
            }
            
            .action-buttons {
                justify-content: center;
                gap: 0.5rem;
            }

            /* Compact 2x2 Stats */
            .stats-dock {
                padding: 1rem 0;
                /* Solid dark for mobile performance */
                background: rgba(15, 23, 42, 0.95); 
            }
            .dock-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 0.5rem;
                row-gap: 0.8rem;
            }
            .dock-item h3 { font-size: 1.5rem; }
            .dock-item p { font-size: 0.65rem; }
        }

        /* --- ULTRA COMPACT MOBILE FIX (<750px Height) --- */
        @media (max-height: 750px) and (max-width: 600px) {
             .landing-wrapper { justify-content: space-between; }
             /* Shift content UP to make room for stats */
             .hero-content-wrapper { 
                 justify-content: flex-start !important; 
                 padding-top: 5vh !important; 
                 padding-bottom: 0; 
             }
             
             .main-title { font-size: 1.35rem !important; margin-bottom: 0.5rem !important; }
             .hero-subtitle { font-size: 0.8rem !important; margin-bottom: 0.75rem !important; line-height: 1.25 !important; }
             
             .stats-dock { padding: 0.5rem 0 !important; }
             .dock-grid { row-gap: 0.5rem !important; }
             .dock-item h3 { font-size: 1.2rem !important; margin-bottom: 0 !important; }
             .dock-item p { font-size: 0.6rem !important; margin-top: 0 !important; }
             
             .btn-glow, .btn-glass { padding: 0.5rem 1rem !important; font-size: 0.8rem !important; }
        }

        /* --- OTHER SECTIONS --- */
        .section { padding: 5rem 0; }
        .bg-soft { background: #f8fafc; }
        .split-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
        .sub-heading { display: inline-block; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-secondary); margin-bottom: 1rem; }
        .section-title { font-size: 2.5rem; margin-bottom: 1.5rem; }
        .lead-text { font-size: 1.1rem; color: #475569; margin-bottom: 2rem; line-height: 1.7; }
        .feature-list li { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; font-weight: 500; color: #334155; }
        .check-icon { color: var(--color-secondary); }
        .relative-box { position: relative; height: 400px; }
        .image-block { position: absolute; background-color: #cbd5e1; border-radius: 16px; }
        .block-1 { top: 0; right: 0; width: 80%; height: 80%; background-image: url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80'); background-size: cover; box-shadow: 0 20px 40px rgba(0,0,0,0.1); z-index: 2; }
        .block-2 { bottom: 0; left: 0; width: 60%; height: 60%; background-image: url('https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80'); background-size: cover; z-index: 1; opacity: 0.8; }
        
        .bg-gradient { background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%); color: white; padding-bottom: 6rem; }
        .white { color: white !important; }
        .section-desc { max-width: 600px; margin: 0 auto 3rem; text-align: center; font-size: 1.1rem; opacity: 0.8; }
        .center-header { text-align: center; margin-bottom: 3rem; }
        .grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; }
        .glass-card { 
            background: rgba(255,255,255,0.08); /* More opacity */
            border: 1px solid rgba(255,255,255,0.1); 
            /* backdrop-filter: blur(10px); REMOVED for performance */
            padding: 2.5rem 2rem; color: white; transition: all 0.3s ease; 
        }
        .feature-hover:hover { 
            background: rgba(255,255,255,0.12); 
            transform: translateY(-5px); 
            border-color: var(--color-secondary); 
            box-shadow: 0 0 25px rgba(56, 189, 248, 0.15); /* Tech Glow */
        }
        .icon-box { background: rgba(13, 148, 136, 0.2); width: 60px; height: 60px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--color-accent); margin-bottom: 1.5rem; }
        .glass-card h3 { color: white; font-size: 1.35rem; margin-bottom: 1rem; }
        .glass-card p { opacity: 0.7; font-size: 0.95rem; line-height: 1.6; }
        
        .testimonial-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 2rem; }
        .testimonial-card { background: white; padding: 2.5rem; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        .stars { margin-bottom: 1rem; display: flex; gap: 0.2rem; }
        .quote { font-size: 1.1rem; color: #334155; font-style: italic; margin-bottom: 2rem; }
        .author { display: flex; align-items: center; gap: 1rem; }
        .author-avatar { width: 50px; height: 50px; border-radius: 50%; background-color: #cbd5e1; background-size: cover; }
        .av-1 { background-image: url('https://randomuser.me/api/portraits/men/32.jpg'); }
        .av-2 { background-image: url('https://randomuser.me/api/portraits/women/44.jpg'); }
        .author h4 { font-size: 1rem; margin-bottom: 0.1rem; color: #0f172a; }
        .author span { font-size: 0.85rem; color: #64748b; }

        .cta-section { background: var(--color-secondary); color: white; padding: 6rem 0; background-image: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80'); background-size: cover; background-attachment: scroll; position: relative; }
        .cta-section h2 { color: white; margin-bottom: 1rem; font-size: 2.5rem; }
        .cta-section p { color: rgba(255,255,255,0.9); font-size: 1.25rem; margin-bottom: 2.5rem; }
        .cta-buttons { display: flex; justify-content: center; gap: 1rem; }
        .btn-outline-white { border: 2px solid white; color: white; padding: 0.75rem 2rem; border-radius: 50px; font-weight: 700; }
        .btn-outline-white:hover { background: white; color: var(--color-primary); }

        @media (max-width: 900px) {
            .split-layout { grid-template-columns: 1fr; }
            .image-block { display: none; }
            .stats-grid { flex-wrap: wrap; gap: 2rem; }
            .stat-divider { display: none; }
            .stat-item { width: 45%; }
        }
      `}</style>
    </div>
  );
};

export default Home;
