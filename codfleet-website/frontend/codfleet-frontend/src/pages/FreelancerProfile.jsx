import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, CheckCircle, Lock, Shield } from 'lucide-react';

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
                            <input id={title} name={title} type="file" className="sr-only" onChange={(e) => onFileChange(e.target.files[0], title)} />
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
    // --- State Management ---
    const [formData, setFormData] = useState({
        _id: null, // For update/create detection
        name: '',
        dob: '',
        citizenship: '',
        email: '',
        phone: '',
        inFinlandSince: '',
        visaType: '',
        visaValidTill: '',
        businessId: '',
        taxId: '',
        city: '',
        yelProof: null,
        insuranceProof: null,
        idUpload: null,
    });

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false); // new state
    const navigate = useNavigate();

     useEffect(() => {
      const fetchProfile = async () => {
          try {
              const token = localStorage.getItem('authToken');
              const response = await axios.get('http://localhost:5000/api/freelancer/profile', {
                  headers: { Authorization: `Bearer ${token}` },
              });

              if (response.data.profile) {
                   const user = JSON.parse(localStorage.getItem('user'));
                     response.data.profile.email = user.email;
                  setFormData(response.data.profile); // load profile
                  setEditing(false); // show "View Profile" first
              }
          } catch (error) {
              console.error("Error fetching profile:", error.response?.data || error.message);
          } finally {
              setLoading(false);
          }
      };

      fetchProfile();
  }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (file, type) => {
        setFormData({ ...formData, [type]: file });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');

        const isUpdate = !!formData._id;
        const url = isUpdate ? 'http://localhost:5000/api/freelancer/profile/update' : 'http://localhost:5000/api/freelancer/profile'; // Adjust the URL
        const method = isUpdate ? 'PUT' : 'POST'; // Adjust the method


        try {
            const token = localStorage.getItem('authToken');

            const profileData = {
                name: formData.name,
                dob: formData.dob,
                citizenship: formData.citizenship,
                phone: formData.phone,
                inFinlandSince: formData.inFinlandSince,
                visaType: formData.visaType,
                visaValidTill: formData.visaValidTill,
                businessId: formData.businessId,
                taxId: formData.taxId,
                city: formData.city,
            };

            const response = await axios({
                method: method,
                url: url,
                data: profileData,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.data.success) {
                setMessage(response.data.message || 'Profile submission failed.');
                return;
            }

            // If the profile submission was successful, proceed with the document uploads
            const uploadDocument = async (file, docType) => {
                if (file) {
                    const formDataDoc = new FormData();
                    formDataDoc.append('document', file);
                    formDataDoc.append('doc_type', docType);

                    const documentResponse = await axios.post('http://localhost:5000/api/freelancer/documents', formDataDoc, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (!documentResponse.data.success) {
                        setMessage(`Document upload failed for ${docType}: ${documentResponse.data.message || 'Unknown error'}`);
                        return false;
                    }
                    return true;
                }
                return true;
            };

          const yelUploadSuccess = await uploadDocument(formData.yelProof, 'yel');
const insuranceUploadSuccess = await uploadDocument(formData.insuranceProof, 'insurance');
const idUploadSuccess = await uploadDocument(formData.idUpload, 'passport');

            if (!yelUploadSuccess || !insuranceUploadSuccess || !idUploadSuccess) {
                return;
            }
            setFormData(response.data.profile);
            // If everything is successful:
            const user = JSON.parse(localStorage.getItem('user'));
            user.hasCompletedProfile = true;
            localStorage.setItem('user', JSON.stringify(user));

            setMessage('Profile submitted successfully! Redirecting...');
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
            setEditing(false);

        } catch (error) {
            console.error('Profile submission error:', error);
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
                        {/* Header */}
                        <div className="relative rounded-lg overflow-hidden p-8 mb-8" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            <div className="absolute inset-0 bg-black opacity-50"></div>
                            <div className="relative">
                                <h1 className="text-3xl font-bold text-white">Your Freelancer Profile</h1>
                                <p className="mt-2 text-gray-200">View and manage your profile details.</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            {/* --- Section 1: Personal Details --- */}
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Personal Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <p className="mt-1">{formData.name}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                    <p className="mt-1">{formData.dob}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Country of Citizenship</label>
                                    <p className="mt-1">{formData.citizenship}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <p className="mt-1">{formData.email}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <p className="mt-1">{formData.phone}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">City</label>
                                    <p className="mt-1">{formData.city}</p>
                                </div>
                            </div>

                             {/* --- Section 2: Legal & Compliance Details --- */}
 <h2 className="text-xl font-bold text-gray-900 mb-4">Legal & Compliance Details</h2>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
     <div>
         <label className="block text-sm font-medium text-gray-700">In Finland Since</label>
         <p className="mt-1">{formData.in_finland_since}</p>
     </div>
     <div>
         <label className="block text-sm font-medium text-gray-700">Visa Type</label>
         <p className="mt-1">{formData.visa_type}</p>
     </div>
     <div>
         <label className="block text-sm font-medium text-gray-700">Visa Valid Until</label>
         <p className="mt-1">{formData.visa_valid_till}</p>
     </div>
     <div>
         <label className="block text-sm font-medium text-gray-700">Business ID</label>
         <p className="mt-1">{formData.y_tunnus}</p>
     </div>
     <div>
         <label className="block text-sm font-medium text-gray-700">Tax ID</label>
         <p className="mt-1">{formData.tax_id}</p>
     </div>
 </div>

                            {/* --- Section 3: Documents --- */}
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Uploaded Documents</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">YEL Proof</label>
                                    <p className="mt-1">{formData.yelProof ? formData.yelProof.name : 'No file uploaded'}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Insurance Proof</label>
                                    <p className="mt-1">{formData.insuranceProof ? formData.insuranceProof.name : 'No file uploaded'}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">ID Document</label>
                                    <p className="mt-1">{formData.idUpload ? formData.idUpload.name : 'No file uploaded'}</p>
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
    }

    // --------------------------
    // EDIT/REGISTER FORM
    // --------------------------
    return (
        <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* --- Left Column: Main Form --- */}
                <div className="lg:col-span-2">
                    {/* Header */}
                    <div className="relative rounded-lg overflow-hidden p-8 mb-8" style={{ backgroundImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
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
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                                </div>
                                <div>
                                    <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                    <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                                </div>
                                <div>
                                    <label htmlFor="citizenship" className="block text-sm font-medium text-gray-700">Country of Citizenship</label>
                                    <input type="text" id="citizenship" name="citizenship" value={formData.citizenship} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input type="email" id="email" name="email" value={formData.email} readOnly className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed" />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                                </div>
                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                    <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
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
                                    <input type="date" id="inFinlandSince" name="inFinlandSince" value={formData.inFinlandSince} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                                </div>
                                <div>
                                    <label htmlFor="visaType" className="block text-sm font-medium text-gray-700">Visa Type</label>
                                    <input type="text" id="visaType" name="visaType" value={formData.visaType} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                                </div>
                                <div>
                                    <label htmlFor="visaValidTill" className="block text-sm font-medium text-gray-700">Visa Valid Until</label>
                                    <input type="date" id="visaValidTill" name="visaValidTill" value={formData.visaValidTill} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                                </div>
                                <div>
                                    <label htmlFor="businessId" className="block text-sm font-medium text-gray-700">Business ID</label>
                                    <input type="text" id="businessId" name="businessId" value={formData.businessId} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                                </div>
                                <div>
                                    <label htmlFor="taxId" className="block text-sm font-medium text-gray-700">Tax ID</label>
                                    <input type="text" id="taxId" name="taxId" value={formData.taxId} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                <FileUpload title="YEL Proof" file={formData.yelProof} onFileChange={(file) => handleFileChange(file, 'yelProof')} />
                                <FileUpload title="Insurance Proof" file={formData.insuranceProof} onFileChange={(file) => handleFileChange(file, 'insuranceProof')} />
                            </div>
                        </div>

                        {/* --- Section 3: ID Upload --- */}
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">ID Upload</h2>
                            <FileUpload title="ID Document" file={formData.idUpload} onFileChange={(file) => handleFileChange(file, 'idUpload')} />
                        </div>

                        {message && (
                            <div className={`p-4 rounded-md ${message.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {message}
                            </div>
                        )}

                        <div className="flex justify-end">
                            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-sm">
                                {formData._id ? "Update Profile" : "Submit Profile"}
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