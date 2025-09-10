import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'; // Import Outlet
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
// import getRoleDetails from './components/ProfileDropdown'; // This import seems unused or misplaced
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
import InstituteRegister from './pages/InstituteRegister';
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

// A layout for public pages that includes the Navbar and Footer
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
      <Routes>
        {/* Public Routes with Navbar and Footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/story" element={<Story />} />
          <Route path="/network" element={<Network />} />
          <Route path="/join" element={<Network />} />
          <Route path="/fleet-strength" element={<div className="py-20 text-center"><h1 className="text-4xl font-bold">Fleet Strength - Coming Soon</h1></div>} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/legal" element={<LegalPage />} />
          {/* Note: I've removed the duplicate /auth/register and /auth/login as you have /register and /login */}
          {/* If you intend them to be separate, you'll need to adjust */}
          <Route path="/auth/register" element={<div className="py-20 text-center"><h1 className="text-4xl font-bold">Registration - Coming Soon</h1></div>} />
          <Route path="/auth/login" element={<div className="py-20 text-center"><h1 className="text-4xl font-bold">Login - Coming Soon</h1></div>} />

          {/* These also seem like public routes that should have Navbar/Footer */}
          <Route path="/getRoleDetails" element={<ProfileDropdown />} />
          <Route path="/freelancer-profile" element={<FreelancerProfile />} />
          <Route path="/company-register" element={<CompanyRegistration />} />
          <Route path="/institute-register" element={<InstituteRegister />} />
        </Route>

        {/* Profile Completion Guarded Routes (these will still get Navbar/Footer from PublicLayout if nested there) */}
        {/* If these should NOT have the PublicLayout, then they need to be outside the PublicLayout Route element */}
        <Route
          path="company-profile-setup"
          element={<ProfileCompletionGuard><CompanyRegistration /></ProfileCompletionGuard>}
        />
        <Route
          path="institute-register"
          element={<ProfileCompletionGuard><InstituteRegister /></ProfileCompletionGuard>}
        />

        {/* Protected Dashboard Routes (with DashboardLayout) */}
        <Route
          path="/" // You might want a more specific path like "/dashboard-base" or just make "dashboard" the entry point
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
