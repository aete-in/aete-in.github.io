import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import VisionMission from './pages/VisionMission';
import Programs from './pages/Programs';
import Membership from './pages/Membership';
import CampusChapters from './pages/CampusChapters';
import Collaborations from './pages/Collaborations';
import ResourceNetwork from './pages/ResourceNetwork';
import ResourcePersons from './pages/ResourcePersons';
import Certifications from './pages/Certifications';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Disclaimer from './pages/Disclaimer';

import VerifiedMember from './pages/VerifiedMember';



function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="vision-mission" element={<VisionMission />} />
            <Route path="programs" element={<Programs />} />
            <Route path="membership" element={<Membership />} />
            <Route path="campus-clubs" element={<CampusChapters />} />
            <Route path="collaborations" element={<Collaborations />} />
            <Route path="resource-persons" element={<ResourcePersons />} />
            <Route path="resource-network" element={<ResourceNetwork />} />
            <Route path="certifications" element={<Certifications />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="signup" element={<Signup />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="disclaimer" element={<Disclaimer />} />
            <Route path="verify" element={<VerifiedMember />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
