import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Lock, Shield } from 'lucide-react'; // Icons

const InstituteRegister = () => {
    // --- State Management (Unchanged) ---
    const [formData, setFormData] = useState({
        instituteName: '',
        businessID: '',
        accreditationType: '',
        primaryContact: '',
        emailAddress: '',
        phoneNumber: '',
        websiteURL: '',
    });
    const [accreditationTypes, setAccreditationTypes] = useState([]);
    const [currentStep, setCurrentStep] = useState(1);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // --- Data Fetching Logic (Unchanged) ---
    useEffect(() => {
        const fetchAccreditationTypes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/accreditation-types');
                setAccreditationTypes(response.data);
            } catch (error) {
                console.error('Error fetching accreditation types:', error);
            }
        };

        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (!token) {
                    navigate('/login');
                    return;
                }
                const response = await axios.get('http://localhost:5000/api/institute-profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.data.profile) {
                    setFormData(response.data.profile); // Includes _id
                    // Logic to decide which step to start on based on profile completeness can be added here
                    // For now, we'll assume if profile exists, they start at step 2.
                    setCurrentStep(2); 
                }
            } catch (error) {
                console.error('No existing profile found or error fetching:', error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAccreditationTypes();
        fetchProfile();
    }, [navigate]);
    
    // --- Form Handling (Unchanged) ---
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // --- Submission Logic (MODIFIED for better multi-step UX) ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        const token = localStorage.getItem('authToken');
        
        const isUpdate = !!formData._id;
        const url = isUpdate ? 'http://localhost:5000/api/institute-profile/update' : 'http://localhost:5000/api/institute-profile/register';
        const method = isUpdate ? 'PUT' : 'POST';

        try {
            const response = await axios({ method, url, data: formData, headers: { Authorization: `Bearer ${token}` } });

            if (response.data.success) {
                setFormData(response.data.profile); // Store updated profile with _id
                setMessage({ type: 'success', text: 'Step saved successfully!' });

                if (currentStep < 3) {
                    setCurrentStep(currentStep + 1); // Go to the next step
                } else {
                    // This is the final step
                    const user = JSON.parse(localStorage.getItem('user'));
                    user.hasCompletedProfile = true;
                    localStorage.setItem('user', JSON.stringify(user));

                    setMessage({ type: 'success', text: 'Profile complete! Redirecting...' });
                    setTimeout(() => navigate('/dashboard'), 2000);
                }
            } else {
                setMessage({ type: 'error', text: response.data.message });
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Something went wrong';
            setMessage({ type: 'error', text: errorMsg });
            console.error('Error during submission:', error.response?.data || error.message);
        }
    };
    
    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
                
                {/* --- Left Column: Main Form --- */}
                <div className="lg:col-span-2">
                    <div className="relative rounded-lg overflow-hidden p-8 mb-8" style={{backgroundImage: "url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
                         <div className="absolute inset-0 bg-black opacity-60"></div>
                         <div className="relative">
                            <h1 className="text-3xl font-bold text-white">Register Your Institute</h1>
                            <p className="mt-2 text-gray-200">Partner with CodFleet to connect your students with real-world opportunities.</p>
                         </div>
                    </div>
                    
                    {/* --- Step Indicator --- */}
                    <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
                        <nav className="flex justify-around">
                            <div className={`text-center ${currentStep >= 1 ? 'text-red-600 font-semibold' : 'text-gray-500'}`}>1. Institute Details</div>
                            <div className={`text-center ${currentStep >= 2 ? 'text-red-600 font-semibold' : 'text-gray-500'}`}>2. Courses & Compliance</div>
                            <div className={`text-center ${currentStep >= 3 ? 'text-red-600 font-semibold' : 'text-gray-500'}`}>3. Agreement</div>
                        </nav>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {currentStep === 1 && (
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="flex items-center justify-center w-8 h-8 bg-gray-800 text-white font-bold rounded-full">1</span>
                                    <h2 className="text-xl font-bold text-gray-900">Institute Details</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Institute Name</label>
                                        <input type="text" name="instituteName" value={formData.instituteName} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Business ID</label>
                                        <input type="text" name="businessID" value={formData.businessID} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Accreditation Type</label>
                                        <select name="accreditationType" value={formData.accreditationType} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required>
                                            <option value="">Select accreditation type</option>
                                            {accreditationTypes.map((type) => (<option key={type._id} value={type.name}>{type.name}</option>))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Primary Contact</label>
                                        <input type="text" name="primaryContact" value={formData.primaryContact} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                        <input type="email" name="emailAddress" value={formData.emailAddress} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                        <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">Website URL</label>
                                        <input type="url" name="websiteURL" value={formData.websiteURL} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {currentStep === 2 && (
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <h2 className="text-xl font-bold text-gray-900">Step 2: Courses & Compliance (Content to be added)</h2>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <h2 className="text-xl font-bold text-gray-900">Step 3: Agreement & Integration (Content to be added)</h2>
                            </div>
                        )}

                        {message && (
                            <div className={`p-4 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {message.text}
                            </div>
                        )}
                        
                        <div className="flex justify-end">
                            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-sm">
                                {currentStep < 3 ? 'Save & Continue' : 'Submit & Finish'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* --- Right Column: Trust & Safety --- */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow-sm sticky top-8">
                        <h3 className="text-lg font-bold text-gray-900">Our Partnership Promise</h3>
                        <p className="text-sm text-gray-600 mt-1">We value our institutional partners.</p>
                        <ul className="mt-6 space-y-6">
                            <li className="flex gap-4">
                                <Lock className="w-6 h-6 text-gray-500 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-semibold">Secure Data Handling</h4>
                                    <p className="text-sm text-gray-600">Your institute's information is handled with the utmost confidentiality and security.</p>
                                </div>
                            </li>
                             <li className="flex gap-4">
                                <Shield className="w-6 h-6 text-gray-500 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-semibold">Verified Opportunities</h4>
                                    <p className="text-sm text-gray-600">We connect your students to vetted companies and projects.</p>
                                </div>
                            </li>
                             <li className="flex gap-4">
                                <CheckCircle className="w-6 h-6 text-gray-500 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-semibold">Compliance First</h4>
                                    <p className="text-sm text-gray-600">Our platform ensures all collaborations meet industry and legal standards.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default InstituteRegister;