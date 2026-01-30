import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
                    <h1 style={{ color: '#002D62' }}>Something went wrong.</h1>
                    <p style={{ color: '#e53e3e' }}>{this.state.error && this.state.error.toString()}</p>
                    <div style={{ marginTop: '1rem', padding: '1rem', background: '#f7fafc', borderRadius: '8px', textAlign: 'left', display: 'inline-block' }}>
                        <strong>Possible Fixes:</strong>
                        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                            <li>Did you create the <code>.env</code> file?</li>
                            <li>Are your Firebase config keys correct?</li>
                            <li>Check the browser console for more details.</li>
                        </ul>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
