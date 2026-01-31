import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
      {/* Deployment Verification Timestamp */}
      <div style={{ display: 'none' }}>{new Date().toISOString()}</div>
    </ErrorBoundary>
  </StrictMode>,
)
console.log('Deployment timestamp:', new Date().toISOString());
