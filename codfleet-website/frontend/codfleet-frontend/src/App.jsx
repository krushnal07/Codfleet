import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import getRoleDetails from './components/ProfileDropdown';
import Home from './pages/Home';
import Story from './pages/Story';
import Network from './pages/Network';
import ContactPage from './pages/Contact';
import LegalPage from './pages/Legal';
import RegistrationPage from './pages/RegistrationPage';
import FreelancerProfile from './pages/FreelancerProfile';
import CompanyRegistration from './pages/CompanyRegistration';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import InstituteRegister from './pages/InstituteRegister'
import './App.css';
import ProfileDropdown from './components/ProfileDropdown';

import ProfileCompletionGuard from './components/ProfileCompletionGuard'; 
import ChatbotPopup from './components/ChatbotPopup';

// --- Create Placeholder Pages for the Dashboard ---
import DashboardPage from './pages/Dashboard';
import BlogPage from './pages/Blog';

const TasksPage = () => <h1 className="text-3xl font-bold">Tasks</h1>;
const FreelancersPage = () => <h1 className="text-3xl font-bold">Freelancers</h1>;
const InvoicesPage = () => <h1 className="text-3xl font-bold">Invoices</h1>;
const CompliancePage = () => <h1 className="text-3xl font-bold">Compliance</h1>;
// ---

// A layout for public pages that includes the Navbar
const PublicLayout = () => (
  
   <div className="min-h-screen flex flex-col">
    <Navbar />
     <main className="flex-grow">
    <Outlet /> {/* Child routes will render here */}
    </main>
        <Footer />
      </div>
    
  
);

function App() {
  return (
    <Router>
     
        <Navbar />
       
          <Routes>
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/login" element={<Login />} />
             <Route 
            path="company-profile-setup" 
            element={<ProfileCompletionGuard><CompanyRegistration /></ProfileCompletionGuard>} 
          />
          <Route 
            path="institute-register" 
            element={<ProfileCompletionGuard><InstituteRegister /></ProfileCompletionGuard>} 
          />
        
            <Route path="/getRoleDetails" element={<ProfileDropdown />} />
            <Route path="/freelancer-profile" element={<FreelancerProfile />} />
            <Route path="/company-register" element={<CompanyRegistration />} />  
              <Route path="/institute-register" element={<InstituteRegister />} />
            <Route path="/" element={<Home />} />
            <Route path="/story" element={<Story />} />
            <Route path="/network" element={<Network />} />
            <Route path="/join" element={<Network />} />
            <Route path="/fleet-strength" element={<div className="py-20 text-center"><h1 className="text-4xl font-bold">Fleet Strength - Coming Soon</h1></div>} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/legal" element={<LegalPage />} />
            <Route path="/auth/register" element={<div className="py-20 text-center"><h1 className="text-4xl font-bold">Registration - Coming Soon</h1></div>} />
            <Route path="/auth/login" element={<div className="py-20 text-center"><h1 className="text-4xl font-bold">Login - Coming Soon</h1></div>} />

            <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="freelancers" element={<FreelancersPage />} />
          <Route path="invoices" element={<InvoicesPage />} />
          <Route path="compliance" element={<CompliancePage />} />
        </Route>
          </Routes>
          <ChatbotPopup />
        
    </Router>
  );
}

export default App;

