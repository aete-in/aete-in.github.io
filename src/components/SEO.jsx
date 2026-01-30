import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = ({ title, description }) => {
    const location = useLocation();

    useEffect(() => {
        // Update Title
        document.title = `${title} | AETE`;

        // Update Meta Description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', description);
        } else {
            const newMetaDesc = document.createElement('meta');
            newMetaDesc.name = 'description';
            newMetaDesc.content = description;
            document.head.appendChild(newMetaDesc);
        }

        // Scroll to top on route change
        window.scrollTo(0, 0);
    }, [title, description, location]);

    return null;
};

export default SEO;
