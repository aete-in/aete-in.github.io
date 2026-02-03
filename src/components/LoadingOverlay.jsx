const LoadingOverlay = ({ message = "Loading..." }) => {
    return (
        <div className="upload-overlay">
            <div className="spinner"></div>
            <p>{message}</p>
            <style jsx="true">{`
                .upload-overlay {
                    position: fixed; inset: 0; background: rgba(0,0,0,0.75);
                    z-index: 3000 !important;
                    display: flex; flex-direction: column;
                    align-items: center; justify-content: center;
                    color: white; backdrop-filter: blur(4px);
                }
                .spinner {
                    width: 50px; height: 50px;
                    border: 4px solid rgba(255,255,255,0.3);
                    border-radius: 50%;
                    border-top-color: white;
                    animation: spin 1s ease-in-out infinite;
                    margin-bottom: 1rem;
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default LoadingOverlay;
