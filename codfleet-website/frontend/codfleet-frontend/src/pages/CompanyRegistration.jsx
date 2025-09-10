
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
    const [formData, setFormData] = useState({
        _id: null, // For update/create detection
        companyName: '',
        businessID: '',
        vatNumber: '',
        industry: '',
        contactPerson: '',
        emailAddress: '',
        phoneNumber: '',
        billingAddress: '',
        preferredPaymentMethod: '',
        estimatedWorkforceNeeds: '',
        preferredWorkSectors: '',
        termsOfService: false,
        privacyPolicy: false,
        taxDebtCertificate: null,
        pensionInsuranceCertificate: null,
        workersCompensationInsurance: null,
    });

    const [validationErrors, setValidationErrors] = useState({}); // State for validation errors

    // General Component State
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get('http://localhost:5000/api/company/company-profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.data.profile) {
                    setFormData(response.data.profile); // Load existing profile data
                    setEditing(false); // Start in "view" mode
                }
            } catch (error) {
                console.error('Error fetching company profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;  // Handle checkbox

        setFormData({ ...formData, [name]: newValue });

        // Clear any existing validation error for this field
        setValidationErrors(prevErrors => ({ ...prevErrors, [name]: '' }));

        // Perform real-time validation (optional - can also just validate on submit)
        if (name === 'vatNumber') {
            validateVatNumber(value);
        } else if (name === 'phoneNumber') {
            validatePhoneNumber(value);
        } else if (name === 'emailAddress') {
            validateEmailAddress(value);
        }
    };

    const handleFileChange = (name, file) => {
        setFormData({ ...formData, [name]: file });
    };
    const validateVatNumber = (vatNumber) => {
        // Example: Validate for a 14-character VAT number starting with FI
        const vatNumberRegex = /^FI\d{12}$/;
        if (vatNumber && !vatNumberRegex.test(vatNumber)) {
            setValidationErrors(prevErrors => ({ ...prevErrors, vatNumber: 'VAT number must start with FI and be followed by 12 digits.' }));
            return false;
        }
        return true;
    };

    const validatePhoneNumber = (phoneNumber) => {
        // Example: Validate for a 10-digit phone number (adjust as needed)
        const phoneNumberRegex = /^\d{10}$/;
        if (!phoneNumberRegex.test(phoneNumber)) {
            setValidationErrors(prevErrors => ({ ...prevErrors, phoneNumber: 'Phone number must be 10 digits.' }));
            return false;
        }
        return true;
    };

    const validateEmailAddress = (emailAddress) => {
        // Basic email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailAddress)) {
            setValidationErrors(prevErrors => ({ ...prevErrors, emailAddress: 'Invalid email address.' }));
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        setValidationErrors({});

        const isVatNumberValid = validateVatNumber(formData.vatNumber);
        const isPhoneNumberValid = validatePhoneNumber(formData.phoneNumber);
        const isEmailAddressValid = validateEmailAddress(formData.emailAddress);

        if (!isVatNumberValid || !isPhoneNumberValid || !isEmailAddressValid) {
            setMessage("Please correct the errors in the form.");
            return;
        }

        const isUpdate = !!formData._id; // Determine if it's an update or a create
        const url = isUpdate ? 'http://localhost:5000/api/company/company-profile/update' : 'http://localhost:5000/api/company/register';
        const method = isUpdate ? 'PUT' : 'POST';

        const formDataToSend = new FormData();
        formDataToSend.append('companyName', formData.companyName);
        formDataToSend.append('businessID', formData.businessID);
        formDataToSend.append('vatNumber', formData.vatNumber);
        formDataToSend.append('industry', formData.industry);
        formDataToSend.append('contactPerson', formData.contactPerson);
        formDataToSend.append('emailAddress', formData.emailAddress);
        formDataToSend.append('phoneNumber', formData.phoneNumber);
        formDataToSend.append('billingAddress', formData.billingAddress);
        formDataToSend.append('preferredPaymentMethod', formData.preferredPaymentMethod);
        formDataToSend.append('estimatedWorkforceNeeds', formData.estimatedWorkforceNeeds);
        formDataToSend.append('preferredWorkSectors', formData.preferredWorkSectors);
        formDataToSend.append('termsOfService', formData.termsOfService); //boolean value
        formDataToSend.append('privacyPolicy', formData.privacyPolicy);   //boolean value


        if (formData.taxDebtCertificate) formDataToSend.append('taxDebtCertificate', formData.taxDebtCertificate);
        if (formData.pensionInsuranceCertificate) formDataToSend.append('pensionInsuranceCertificate', formData.pensionInsuranceCertificate);
        if (formData.workersCompensationInsurance) formDataToSend.append('workersCompensationInsurance', formData.workersCompensationInsurance);

        try {
            const token = localStorage.getItem('authToken');
            const response = await axios({
                method: method,
                url: url,
                data: formDataToSend,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                // Update formData with the updated profile (including _id)
                setFormData(response.data.profile);
                setMessage(isUpdate ? 'Company profile updated successfully! Redirecting...' : 'Company profile submitted successfully! Redirecting...');

                const user = JSON.parse(localStorage.getItem('user'));
                user.hasCompletedProfile = true;
                localStorage.setItem('user', JSON.stringify(user));

                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000);
                setEditing(false);
            } else {
                setMessage(response.data.message || 'Registration failed.');
            }
        } catch (error) {
            console.error('Company registration error:', error);
            setMessage(error.response?.data?.message || 'An unexpected error occurred.');
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    // --------------------------
    // VIEW MODE (Profile exists)
    // --------------------------
    if (formData._id && !editing) {
        return (
            <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* --- Left Column: Main Form --- */}
                    <div className="lg:col-span-2">
                        <div className="relative rounded-lg overflow-hidden p-8 mb-8" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            <div className="absolute inset-0 bg-black opacity-60"></div>
                            <div className="relative">
                                <h1 className="text-3xl font-bold text-white">Your Company Profile</h1>
                                <p className="mt-2 text-gray-200">View and manage your company details.</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Company Name</label>
                                    <p className="mt-1">{formData.companyName}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Business ID</label>
                                    <p className="mt-1">{formData.businessID}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">VAT Number</label>
                                    <p className="mt-1">{formData.vatNumber}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Industry</label>
                                    <p className="mt-1">{formData.industry}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Contact Person</label>
                                    <p className="mt-1">{formData.contactPerson}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <p className="mt-1">{formData.emailAddress}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <p className="mt-1">{formData.phoneNumber}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Billing Address</label>
                                    <p className="mt-1">{formData.billingAddress}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Preferred Payment Method</label>
                                    <p className="mt-1">{formData.preferredPaymentMethod}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Estimated Workforce Needs</label>
                                    <p className="mt-1">{formData.estimatedWorkforceNeeds}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Preferred Work Sectors</label>
                                    <p className="mt-1">{formData.preferredWorkSectors}</p>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end">
                                <button
                                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-sm"
                                    onClick={() => setEditing(true)}
                                >
                                    Edit Profile
                                </button>
                            </div>
                        </div>
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
    }

    // --------------------------
    // EDIT/REGISTER FORM
    // --------------------------
    return (
        <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* --- Left Column: Main Form --- */}
                <div className="lg:col-span-2">
                    <div className="relative rounded-lg overflow-hidden p-8 mb-8" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <div className="absolute inset-0 bg-black opacity-60"></div>
                        <div className="relative">
                            <h1 className="text-3xl font-bold text-white">{formData._id ? "Edit Company Profile" : "Register Your Company"}</h1>
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
                                    <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Business ID</label>
                                    <input type="text" name="businessID" value={formData.businessID} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">VAT Number</label>
                                    <input type="text" name="vatNumber" value={formData.vatNumber} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                                    {validationErrors.vatNumber && (
                                        <p className="text-red-500 text-xs mt-1">{validationErrors.vatNumber}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Industry</label>
                                    <select name="industry" value={formData.industry} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required>
                                        <option value="">Select your industry</option>
                                        <option value="IT">Information Technology</option>
                                        <option value="Finance">Finance</option>
                                        <option value="Healthcare">Healthcare</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Contact Person</label>
                                    <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <input type="email" name="emailAddress" value={formData.emailAddress} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                                    {validationErrors.emailAddress && (
                                        <p className="text-red-500 text-xs mt-1">{validationErrors.emailAddress}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                                    {validationErrors.phoneNumber && (
                                        <p className="text-red-500 text-xs mt-1">{validationErrors.phoneNumber}</p>
                                    )}
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
                                    <FileUpload title="Tax Debt Certificate" file={formData.taxDebtCertificate} onFileChange={(file) => handleFileChange('taxDebtCertificate', file)} />
                                    <FileUpload title="Pension Insurance Certificate" file={formData.pensionInsuranceCertificate} onFileChange={(file) => handleFileChange('pensionInsuranceCertificate', file)} />
                                </div>
                                <div>
                                    <FileUpload title="Worker's Compensation Insurance" file={formData.workersCompensationInsurance} onFileChange={(file) => handleFileChange('workersCompensationInsurance', file)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Billing Address</label>
                                    <input type="text" name="billingAddress" value={formData.billingAddress} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Preferred Payment Method</label>
                                    <select name="preferredPaymentMethod" value={formData.preferredPaymentMethod} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required>
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
                                    <select name="estimatedWorkforceNeeds" value={formData.estimatedWorkforceNeeds} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required>
                                        <option value="">Select workforce size</option>
                                        <option value="Small">Small (1-10)</option>
                                        <option value="Medium">Medium (11-50)</option>
                                        <option value="Large">Large (50+)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Preferred Work Sectors</label>
                                    <select name="preferredWorkSectors" value={formData.preferredWorkSectors} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required>
                                        <option value="">Select preferred sectors</option>
                                        <option value="Technology">Technology</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Design">Design</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mt-6 space-y-3">
                                <div className="flex items-start">
                                    <input type="checkbox" id="termsOfService" name="termsOfService" checked={formData.termsOfService} onChange={handleChange} className="h-4 w-4 text-red-600 border-gray-300 rounded mt-1" required />
                                    <label htmlFor="termsOfService" className="ml-2 block text-sm text-gray-900">I agree to the <a href="#" className="font-medium text-red-600 hover:text-red-500">Terms of Service</a>.</label>
                                </div>
                                <div className="flex items-start">
                                    <input type="checkbox" id="privacyPolicy" name="privacyPolicy" checked={formData.privacyPolicy} onChange={handleChange} className="h-4 w-4 text-red-600 border-gray-300 rounded mt-1" required />
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
                                {formData._id ? "Update Profile" : "Register & Verify Company"}
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
