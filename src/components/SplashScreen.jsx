import { motion } from 'framer-motion';

const SplashScreen = () => {
    return (
        <div className="splash-screen">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="splash-content"
            >
                <div className="logo-container">
                    <h1 className="logo-text">AETE</h1>
                </div>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    style={{
                        width: '24px',
                        height: '24px',
                        border: '2px solid rgba(255,255,255,0.1)',
                        borderTopColor: 'var(--color-accent)',
                        borderRadius: '50%'
                    }}
                />
            </motion.div>

            <style jsx="true">{`
        .splash-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: var(--color-background-dark, #0f172a);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
        .splash-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
        }
        .logo-text {
            font-size: 2.5rem;
            font-weight: 800;
            letter-spacing: -0.05em;
            color: white;
            margin: 0;
        }
      `}</style>
        </div>
    );
};

export default SplashScreen;
