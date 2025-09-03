import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, CheckCircle, Lock, Shield } from 'lucide-react'; // Icons

// --- Reusable File Upload Component (Same as before) ---
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

const CompanyRegistration = () => {
    // --- State Management (Existing fields) ---
    const [companyName, setCompanyName] = useState('');
    const [businessID, setBusinessID] = useState('');
    const [vatNumber, setVatNumber] = useState('');
    const [industry, setIndustry] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [billingAddress, setBillingAddress] = useState('');
    const [preferredPaymentMethod, setPreferredPaymentMethod] = useState('');
    const [estimatedWorkforceNeeds, setEstimatedWorkforceNeeds] = useState('');
    const [preferredWorkSectors, setPreferredWorkSectors] = useState('');
    const [termsOfService, setTermsOfService] = useState(false);
    const [privacyPolicy, setPrivacyPolicy] = useState(false);
    
    // File states
    const [taxDebtCertificate, setTaxDebtCertificate] = useState(null);
    const [pensionInsuranceCertificate, setPensionInsuranceCertificate] = useState(null);
    const [workersCompensationInsurance, setWorkersCompensationInsurance] = useState(null);

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
            setEmailAddress(user.email); // Pre-fill email from logged-in user
        }
    }, [navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');

        const formData = new FormData();
        formData.append('companyName', companyName);
        formData.append('businessID', businessID);
        formData.append('vatNumber', vatNumber);
        formData.append('industry', industry);
        formData.append('contactPerson', contactPerson);
        formData.append('emailAddress', emailAddress);
        formData.append('phoneNumber', phoneNumber);
        formData.append('billingAddress', billingAddress);
        formData.append('preferredPaymentMethod', preferredPaymentMethod);
        formData.append('estimatedWorkforceNeeds', estimatedWorkforceNeeds);
        formData.append('preferredWorkSectors', preferredWorkSectors);
        formData.append('termsOfService', termsOfService);
        formData.append('privacyPolicy', privacyPolicy);

        if (taxDebtCertificate) formData.append('taxDebtCertificate', taxDebtCertificate);
        if (pensionInsuranceCertificate) formData.append('pensionInsuranceCertificate', pensionInsuranceCertificate);
        if (workersCompensationInsurance) formData.append('workersCompensationInsurance', workersCompensationInsurance);
        
        try {
            const token = localStorage.getItem('authToken');
            const backendURL = 'http://localhost:5000';
            const response = await axios.post(`${backendURL}/api/company/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                const user = JSON.parse(localStorage.getItem('user'));
                user.hasCompletedProfile = true;
                localStorage.setItem('user', JSON.stringify(user));

                setMessage('Company profile submitted successfully! Redirecting...');
                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000);
            } else {
                setMessage(response.data.message || 'Registration failed.');
            }
        } catch (error) {
            console.error('Company registration error:', error);
            setMessage(error.response?.data?.message || 'An unexpected error occurred.');
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
                
                {/* --- Left Column: Main Form --- */}
                <div className="lg:col-span-2">
                    <div className="relative rounded-lg overflow-hidden p-8 mb-8" style={{backgroundImage: "url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
                         <div className="absolute inset-0 bg-black opacity-60"></div>
                         <div className="relative">
                            <h1 className="text-3xl font-bold text-white">Register Your Company</h1>
                            <p className="mt-2 text-gray-200">Join CodFleet to find top-tier freelance talent for your projects.</p>
                         </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Section 1: Company Details */}
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="flex items-center justify-center w-8 h-8 bg-gray-800 text-white font-bold rounded-full">1</span>
                                <h2 className="text-xl font-bold text-gray-900">Company Details</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Company Name</label>
                                    <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Business ID</label>
                                    <input type="text" value={businessID} onChange={(e) => setBusinessID(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">VAT Number</label>
                                    <input type="text" value={vatNumber} onChange={(e) => setVatNumber(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Industry</label>
                                    <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required>
                                        <option value="">Select your industry</option>
                                        <option value="IT">Information Technology</option>
                                        <option value="Finance">Finance</option>
                                        <option value="Healthcare">Healthcare</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Contact Person</label>
                                    <input type="text" value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <input type="email" value={emailAddress} readOnly className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Legal & Compliance */}
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                             <div className="flex items-center gap-4 mb-6">
                                <span className="flex items-center justify-center w-8 h-8 bg-gray-800 text-white font-bold rounded-full">2</span>
                                <h2 className="text-xl font-bold text-gray-900">Legal & Compliance</h2>
                            </div>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FileUpload title="Tax Debt Certificate" file={taxDebtCertificate} onFileChange={setTaxDebtCertificate} />
                                    <FileUpload title="Pension Insurance Certificate" file={pensionInsuranceCertificate} onFileChange={setPensionInsuranceCertificate} />
                                </div>
                                <div>
                                    <FileUpload title="Worker's Compensation Insurance" file={workersCompensationInsurance} onFileChange={setWorkersCompensationInsurance} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Billing Address</label>
                                    <input type="text" value={billingAddress} onChange={(e) => setBillingAddress(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Preferred Payment Method</label>
                                    <select value={preferredPaymentMethod} onChange={(e) => setPreferredPaymentMethod(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required>
                                        <option value="">Select payment method</option>
                                        <option value="Credit Card">Credit Card</option>
                                        <option value="Bank Transfer">Bank Transfer</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Platform Use & Agreement */}
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="flex items-center justify-center w-8 h-8 bg-gray-800 text-white font-bold rounded-full">3</span>
                                <h2 className="text-xl font-bold text-gray-900">Platform Use & Agreement</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Estimated Workforce Needs</label>
                                    <select value={estimatedWorkforceNeeds} onChange={(e) => setEstimatedWorkforceNeeds(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required>
                                        <option value="">Select workforce size</option>
                                        <option value="Small">Small (1-10)</option>
                                        <option value="Medium">Medium (11-50)</option>
                                        <option value="Large">Large (50+)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Preferred Work Sectors</label>
                                    <select value={preferredWorkSectors} onChange={(e) => setPreferredWorkSectors(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required>
                                        <option value="">Select preferred sectors</option>
                                        <option value="Technology">Technology</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Design">Design</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mt-6 space-y-3">
                                <div className="flex items-start">
                                    <input type="checkbox" id="termsOfService" checked={termsOfService} onChange={(e) => setTermsOfService(e.target.checked)} className="h-4 w-4 text-red-600 border-gray-300 rounded mt-1" required />
                                    <label htmlFor="termsOfService" className="ml-2 block text-sm text-gray-900">I agree to the <a href="#" className="font-medium text-red-600 hover:text-red-500">Terms of Service</a>.</label>
                                </div>
                                <div className="flex items-start">
                                    <input type="checkbox" id="privacyPolicy" checked={privacyPolicy} onChange={(e) => setPrivacyPolicy(e.target.checked)} className="h-4 w-4 text-red-600 border-gray-300 rounded mt-1" required />
                                    <label htmlFor="privacyPolicy" className="ml-2 block text-sm text-gray-900">I consent to the <a href="#" className="font-medium text-red-600 hover:text-red-500">Privacy Policy</a>.</label>
                                </div>
                            </div>
                        </div>

                        {message && (
                            <div className={`p-4 rounded-md ${message.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {message}
                            </div>
                        )}
                        
                        <div className="flex justify-end">
                            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-sm">
                                Register & Verify Company
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
                                    <h4 className="font-semibold">Vetted Professionals</h4>
                                    <p className="text-sm text-gray-600">We verify our freelancers to ensure quality and compliance.</p>
                                </div>
                            </li>
                             <li className="flex gap-4">
                                <CheckCircle className="w-6 h-6 text-gray-500 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-semibold">Compliant & Insured</h4>
                                    <p className="text-sm text-gray-600">Our platform ensures all legal and insurance requirements are met.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CompanyRegistration;