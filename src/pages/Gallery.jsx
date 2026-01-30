import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';

const Gallery = () => {
    // Placeholder for gallery images
    const images = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <div className="gallery-page">
            <SEO title="Gallery" description="Photo gallery of AETE activities and events." />
            <PageHero
                title="Gallery"
                subtitle="Glimpses of our events, workshops, and interactions."
            />

            <div className="container section">
                <motion.div
                    className="gallery-grid"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    {images.map((item) => (
                        <motion.div
                            key={item}
                            className="gallery-item"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="placeholder-image">
                                <span>Image {item}</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <style jsx="true">{`
                .gallery-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 1.5rem;
                }

                .gallery-item {
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    cursor: pointer;
                }

                .placeholder-image {
                    background-color: #e2e8f0;
                    height: 200px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #718096;
                    font-weight: 500;
                }
            `}</style>
        </div>
    );
};

export default Gallery;
