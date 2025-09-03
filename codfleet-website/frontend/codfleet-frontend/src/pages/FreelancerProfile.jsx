import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, CheckCircle, Lock, Shield } from 'lucide-react'; // For icons

// --- Reusable File Upload Component ---
const FileUpload = ({ title, file, onFileChange }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{title}</label>
            <div className="flex justify-center items-center w-full h-32 px-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                    <UploadCloud className="mx-auto h-8 w-8 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                        <label htmlFor={title} className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none">
                            <span>Upload a file</span>
                            <input id={title} name={title} type="file" className="sr-only" onChange={(e) => onFileChange(e.target.files[0])} />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                    {file && <p className="text-xs text-green-600 pt-1">{file.name}</p>}
                </div>
            </div>
        </div>
    );
};


const FreelancerProfile = () => {
    // --- State Management (Existing fields + New file states) ---
    // Personal Details
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [citizenship, setCitizenship] = useState('');
    const [email, setEmail] = useState(''); // Assuming you get this from user context or have it
    const [phone, setPhone] = useState('');

    // Legal & Compliance
    const [inFinlandSince, setInFinlandSince] = useState('');
    const [visaType, setVisaType] = useState('');
    const [visaValidTill, setVisaValidTill] = useState('');
    const [businessId, setBusinessId] = useState(''); // Mapped from yTunnus
    const [taxId, setTaxId] = useState('');

    // File Uploads
    const [yelProofFile, setYelProofFile] = useState(null);
    const [insuranceProofFile, setInsuranceProofFile] = useState(null);
    const [idUploadFile, setIdUploadFile] = useState(null);

    // General Component State
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        const user = JSON.parse(localStorage.getItem('user'));

        if (!storedToken) {
            navigate('/login');
        }
        if (user) {
            setEmail(user.email); // Pre-fill email from logged-in user
        }
    }, [navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');

        const formData = new FormData();
        
        // Append all text fields
        formData.append('name', name);
        formData.append('dob', dob);
        formData.append('citizenship', citizenship);
        formData.append('phone', phone);
        formData.append('inFinlandSince', inFinlandSince);
        formData.append('visaType', visaType);
        formData.append('visaValidTill', visaValidTill);
        formData.append('businessId', businessId);
        formData.append('taxId', taxId);
        
        // Append files if they exist
        if (yelProofFile) formData.append('yelProof', yelProofFile);
        if (insuranceProofFile) formData.append('insuranceProof', insuranceProofFile);
        if (idUploadFile) formData.append('idUpload', idUploadFile);

        try {
            const token = localStorage.getItem('authToken');
            const backendURL = 'http://localhost:5000';
            
            // This endpoint needs to be created on your backend to handle FormData
            const response = await axios.post(`${backendURL}/api/freelancer/documents`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            
            if (response.data.success) {
                // IMPORTANT: Update user's profile status in localStorage
                const user = JSON.parse(localStorage.getItem('user'));
                user.hasCompletedProfile = true;
                localStorage.setItem('user', JSON.stringify(user));

                setMessage('Profile submitted successfully! Redirecting...');
                setTimeout(() => {
                    navigate('/dashboard'); // Redirect to dashboard
                }, 2000);
            } else {
                setMessage(response.data.message || 'Profile submission failed.');
            }
        } catch (error) {
            console.error('Profile submission error:', error);
            setMessage(error.response?.data?.message || 'An unexpected error occurred.');
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
                
                {/* --- Left Column: Main Form --- */}
                <div className="lg:col-span-2">
                    {/* Header */}
                    <div className="relative rounded-lg overflow-hidden p-8 mb-8" style={{backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
                         <div className="absolute inset-0 bg-black opacity-50"></div>
                         <div className="relative">
                            <h1 className="text-3xl font-bold text-white">Register as a Freelancer</h1>
                            <p className="mt-2 text-gray-200">Join our platform and connect with exciting projects. Complete the registration to start your journey.</p>
                         </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* --- Section 1: Personal Details --- */}
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="flex items-center justify-center w-8 h-8 bg-gray-800 text-white font-bold rounded-full">1</span>
                                <h2 className="text-xl font-bold text-gray-900">Personal Details</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input type="text" id="fullName" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                                </div>
                                <div>
                                    <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                    <input type="date" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                                </div>
                                <div>
                                    <label htmlFor="citizenship" className="block text-sm font-medium text-gray-700">Country of Citizenship</label>
                                    <input type="text" id="citizenship" value={citizenship} onChange={(e) => setCitizenship(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input type="email" id="email" value={email} readOnly className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed" />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                                </div>
                            </div>
                        </div>

                        {/* --- Section 2: Legal & Compliance Details --- */}
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                             <div className="flex items-center gap-4 mb-6">
                                <span className="flex items-center justify-center w-8 h-8 bg-gray-800 text-white font-bold rounded-full">2</span>
                                <h2 className="text-xl font-bold text-gray-900">Legal & Compliance Details</h2>
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="inFinlandSince" className="block text-sm font-medium text-gray-700">In Finland Since</label>
                                    <input type="date" id="inFinlandSince" value={inFinlandSince} onChange={(e) => setInFinlandSince(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                                </div>
                                <div>
                                    <label htmlFor="visaType" className="block text-sm font-medium text-gray-700">Visa Type</label>
                                    <input type="text" id="visaType" value={visaType} onChange={(e) => setVisaType(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                                </div>
                                 <div>
                                    <label htmlFor="visaValidTill" className="block text-sm font-medium text-gray-700">Visa Valid Until</label>
                                    <input type="date" id="visaValidTill" value={visaValidTill} onChange={(e) => setVisaValidTill(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                                </div>
                                 <div>
                                    <label htmlFor="businessId" className="block text-sm font-medium text-gray-700">Business ID</label>
                                    <input type="text" id="businessId" value={businessId} onChange={(e) => setBusinessId(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                                </div>
                                 <div>
                                    <label htmlFor="taxId" className="block text-sm font-medium text-gray-700">Tax ID</label>
                                    <input type="text" id="taxId" value={taxId} onChange={(e) => setTaxId(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                                </div>
                             </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                <FileUpload title="YEL Proof" file={yelProofFile} onFileChange={setYelProofFile} />
                                <FileUpload title="Insurance Proof" file={insuranceProofFile} onFileChange={setInsuranceProofFile} />
                             </div>
                        </div>

                         {/* --- Section 3: ID Upload --- */}
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                             <h2 className="text-xl font-bold text-gray-900 mb-4">ID Upload</h2>
                             <FileUpload title="ID Document" file={idUploadFile} onFileChange={setIdUploadFile} />
                        </div>

                        {message && (
                            <div className={`p-4 rounded-md ${message.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {message}
                            </div>
                        )}
                        
                        <div className="flex justify-end">
                            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-sm">
                                Submit Profile
                            </button>
                        </div>
                    </form>
                </div>

                {/* --- Right Column: Trust & Safety --- */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow-sm sticky top-8">
                        <h3 className="text-lg font-bold text-gray-900">Trust & Safety</h3>
                        <p className="text-sm text-gray-600 mt-1">Your information is safe with us.</p>
                        <ul className="mt-6 space-y-6">
                            <li className="flex gap-4">
                                <Lock className="w-6 h-6 text-gray-500 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-semibold">Secure Document Storage</h4>
                                    <p className="text-sm text-gray-600">Your documents are encrypted and stored securely.</p>
                                </div>
                            </li>
                             <li className="flex gap-4">
                                <Shield className="w-6 h-6 text-gray-500 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-semibold">Payments via Escrow</h4>
                                    <p className="text-sm text-gray-600">We protect your payments until the work is complete.</p>
                                </div>
                            </li>
                             <li className="flex gap-4">
                                <CheckCircle className="w-6 h-6 text-gray-500 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-semibold">Government-Recognized Compliance</h4>
                                    <p className="text-sm text-gray-600">Our processes are compliant with local regulations.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FreelancerProfile;