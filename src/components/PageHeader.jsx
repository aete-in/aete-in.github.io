import { motion } from 'framer-motion';
import './PageHeader.css';

const PageHeader = ({ title, subtitle, bgImage }) => {
    return (
        <div className="page-header">
            <div className="container header-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="header-title">{title}</h1>
                    {subtitle && <p className="header-subtitle">{subtitle}</p>}
                </motion.div>
            </div>
        </div>
    );
};

export default PageHeader;
