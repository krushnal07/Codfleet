import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Home from './pages/Home';
import Story from './pages/Story';
import Network from './pages/Network';
import RegistrationPage from './pages/RegistrationPage';
import FreelancerProfile from './pages/FreelancerProfile';
import CompanyRegistration from './pages/CompanyRegistration';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/freelancer-profile" element={<FreelancerProfile />} />
            <Route path="/company-register" element={<CompanyRegistration />} /> 
            <Route path="/" element={<Home />} />
            <Route path="/story" element={<Story />} />
            <Route path="/network" element={<Network />} />
            <Route path="/join" element={<Network />} />
            <Route path="/fleet-strength" element={<div className="py-20 text-center"><h1 className="text-4xl font-bold">Fleet Strength - Coming Soon</h1></div>} />
            <Route path="/blog" element={<div className="py-20 text-center"><h1 className="text-4xl font-bold">Blog - Coming Soon</h1></div>} />
            <Route path="/contact" element={<div className="py-20 text-center"><h1 className="text-4xl font-bold">Contact - Coming Soon</h1></div>} />
            <Route path="/legal" element={<div className="py-20 text-center"><h1 className="text-4xl font-bold">Legal - Coming Soon</h1></div>} />
            <Route path="/auth/register" element={<div className="py-20 text-center"><h1 className="text-4xl font-bold">Registration - Coming Soon</h1></div>} />
            <Route path="/auth/login" element={<div className="py-20 text-center"><h1 className="text-4xl font-bold">Login - Coming Soon</h1></div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

