
 import React, { useState, useEffect } from "react";
 import axios from "axios";
 import { useNavigate } from "react-router-dom";
 import { CheckCircle, Lock, Shield } from 'lucide-react'; // Icons

 const InstituteRegister = () => {
     const [formData, setFormData] = useState({
         _id: null,
         instituteName: "",
         businessID: "",
         accreditationType: "",
         primaryContact: "",
         emailAddress: "",
         phoneNumber: "",
         websiteURL: "",
     });

     const [validationErrors, setValidationErrors] = useState({}); // State for validation errors

     const [accreditationTypes, setAccreditationTypes] = useState([]);
     const [loading, setLoading] = useState(true);
     const [editing, setEditing] = useState(false); // new state
     const navigate = useNavigate();

     useEffect(() => {
         const fetchAccreditationTypes = async () => {
             try {
                 const res = await axios.get("http://localhost:5000/api/accreditation-types");
                 setAccreditationTypes(res.data);
             } catch (error) {
                 console.error("Error fetching accreditation types:", error);
             }
         };

         const fetchProfile = async () => {
             try {
                 console.log("fetchProfile called");
                 const token = localStorage.getItem("authToken");
                 console.log("Token:", token);

                 const res = await axios.get("http://localhost:5000/api/institute-profile/profile", {
                     headers: { Authorization: `Bearer ${token}` },
                 });
                 console.log("API Response:", res);

                 if (res.data.profile) {
                     console.log("Profile data:", res.data.profile);
                     setFormData(res.data.profile); // load profile
                     setEditing(false); // show "View Profile" first
                 }
             } catch (error) {
                 console.error("Error fetching profile:", error.response?.data || error.message);
             } finally {
                 setLoading(false);
             }
         };

         fetchAccreditationTypes();
         fetchProfile();
     }, []);

     const handleChange = (e) => {
         const { name, value } = e.target;
         setFormData({ ...formData, [name]: value });

         // Clear any existing validation error for this field
         setValidationErrors(prevErrors => ({ ...prevErrors, [name]: '' }));

         // Perform real-time validation (optional - can also just validate on submit)
         if (name === 'businessID') {
             validateBusinessID(value);
         } else if (name === 'emailAddress') {
             validateEmailAddress(value);
         } else if (name === 'phoneNumber') {
             validatePhoneNumber(value);
         } else if (name === 'websiteURL') {
             validateWebsiteURL(value);
         }
     };
     const validateBusinessID = (businessID) => {
         // Example: Validate for a 9-digit business ID
         const businessIDRegex = /^\d{9}$/; // Adjust regex as needed
         if (!businessIDRegex.test(businessID)) {
             setValidationErrors(prevErrors => ({ ...prevErrors, businessID: 'Business ID must be 9 digits.' }));
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
     const validateWebsiteURL = (websiteURL) => {
         // Basic URL format validation
         const websiteURLRegex = /^(ftp|http|https):\/\/[^ "]+$/;
         if (websiteURL && !websiteURLRegex.test(websiteURL)) {
             setValidationErrors(prevErrors => ({ ...prevErrors, websiteURL: 'Invalid website URL.' }));
             return false;
         }
         return true;
     };

     const handleSubmit = async (e) => {
         e.preventDefault();

         // Clear previous errors on submit
         setValidationErrors({});

         // Perform final validation before submitting
         const isBusinessIDValid = validateBusinessID(formData.businessID);
         const isEmailAddressValid = validateEmailAddress(formData.emailAddress);
         const isPhoneNumberValid = validatePhoneNumber(formData.phoneNumber);
         const isWebsiteURLValid = validateWebsiteURL(formData.websiteURL);

         if (!isBusinessIDValid || !isEmailAddressValid || !isPhoneNumberValid || !isWebsiteURLValid) {
             alert("Please correct the errors in the form.");
             return;
         }
         const token = localStorage.getItem("authToken");

         const isUpdate = !!formData._id;
         const url = isUpdate
             ? "http://localhost:5000/api/institute-profile/update"
             : "http://localhost:5000/api/institute-profile/register";
         const method = isUpdate ? "PUT" : "POST";

         try {
             const res = await axios({
                 method,
                 url,
                 data: formData,
                 headers: { Authorization: `Bearer ${token}` },
             });

             if (res.data.success) {
                 setFormData(res.data.profile);
                 alert(isUpdate ? "Profile updated successfully!" : "Profile created successfully!");
                 setEditing(false); // back to view mode
                 navigate("/institute-dashboard");
             } else {
                 alert(res.data.message);
             }
         } catch (error) {
             console.error("Error during submission:", error.response?.data || error.message);
             alert(error.response?.data?.message || "Something went wrong");
         }
     };

     if (loading) return <div>Loading...</div>;

     // --------------------------
     // VIEW MODE (Profile exists)
     // --------------------------
     if (formData._id && !editing) {
         return (
             <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
                 <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

                     {/* --- Left Column: Main Form --- */}
                     <div className="lg:col-span-2">
                         <div className="relative rounded-lg overflow-hidden p-8 mb-8" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                             <div className="absolute inset-0 bg-black opacity-60"></div>
                             <div className="relative">
                                 <h1 className="text-3xl font-bold text-white">Your Institute Profile</h1>
                                 <p className="mt-2 text-gray-200">View and manage your institute details.</p>
                             </div>
                         </div>

                         <div className="bg-white p-6 rounded-lg shadow-sm">
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                 <div>
                                     <label className="block text-sm font-medium text-gray-700">Institute Name</label>
                                     <p className="mt-1">{formData.instituteName}</p>
                                 </div>
                                 <div>
                                     <label className="block text-sm font-medium text-gray-700">Business ID</label>
                                     <p className="mt-1">{formData.businessID}</p>
                                 </div>
                                 <div>
                                     <label className="block text-sm font-medium text-gray-700">Accreditation Type</label>
                                     <p className="mt-1">{formData.accreditationType}</p>
                                 </div>
                                 <div>
                                     <label className="block text-sm font-medium text-gray-700">Primary Contact</label>
                                     <p className="mt-1">{formData.primaryContact}</p>
                                 </div>
                                 <div>
                                     <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                     <p className="mt-1">{formData.emailAddress}</p>
                                 </div>
                                 <div>
                                     <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                     <p className="mt-1">{formData.phoneNumber}</p>
                                 </div>
                                 <div className="md:col-span-2">
                                     <label className="block text-sm font-medium text-gray-700">Website URL</label>
                                     <p className="mt-1">{formData.websiteURL}</p>
                                 </div>
                             </div>

                             <div className="mt-8 flex justify-end">
                                 <button
                                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-sm"
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
     }

     // --------------------------
     // EDIT/REGISTER FORM
     // --------------------------
     return (
         <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
             <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

                 {/* --- Left Column: Main Form --- */}
                 <div className="lg:col-span-2">
                     <div className="relative rounded-lg overflow-hidden p-8 mb-8" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                         <div className="absolute inset-0 bg-black opacity-60"></div>
                         <div className="relative">
                             <h1 className="text-3xl font-bold text-white">{formData._id ? "Edit Institute Profile" : "Register Institute"}</h1>
                             <p className="mt-2 text-gray-200">Manage your institute details.</p>
                         </div>
                     </div>

                     <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm space-y-6">
                         <div>
                             <label className="block text-sm font-medium text-gray-700">Institute Name</label>
                             <input
                                 type="text"
                                 name="instituteName"
                                 value={formData.instituteName}
                                 onChange={handleChange}
                                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                 required
                             />
                         </div>

                         <div>
                             <label className="block text-sm font-medium text-gray-700">Business ID</label>
                             <input
                                 type="text"
                                 name="businessID"
                                 value={formData.businessID}
                                 onChange={handleChange}
                                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                 required
                             />
                             {validationErrors.businessID && (
                                 <p className="text-red-500 text-xs mt-1">{validationErrors.businessID}</p>
                             )}
                         </div>

                         <div>
                             <label className="block text-sm font-medium text-gray-700">Accreditation Type</label>
                             <input
                                 type="text"
                                 name="accreditationType"
                                 value={formData.accreditationType}
                                 onChange={handleChange}
                                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                 required
                             />

                         </div>

                         <div>
                             <label className="block text-sm font-medium text-gray-700">Primary Contact</label>
                             <input
                                 type="text"
                                 name="primaryContact"
                                 value={formData.primaryContact}
                                 onChange={handleChange}
                                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                 required
                             />
                         </div>

                         <div>
                             <label className="block text-sm font-medium text-gray-700">Email Address</label>
                             <input
                                 type="email"
                                 name="emailAddress"
                                 value={formData.emailAddress}
                                 onChange={handleChange}
                                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                 required
                             />
                             {validationErrors.emailAddress && (
                                 <p className="text-red-500 text-xs mt-1">{validationErrors.emailAddress}</p>
                             )}
                         </div>

                         <div>
                             <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                             <input
                                 type="tel"
                                 name="phoneNumber"
                                 value={formData.phoneNumber}
                                 onChange={handleChange}
                                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                 required
                             />
                             {validationErrors.phoneNumber && (
                                 <p className="text-red-500 text-xs mt-1">{validationErrors.phoneNumber}</p>
                             )}
                         </div>

                         <div>
                             <label className="block text-sm font-medium text-gray-700">Website URL</label>
                             <input
                                 type="url"
                                 name="websiteURL"
                                 value={formData.websiteURL}
                                 onChange={handleChange}
                                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                             />
                             {validationErrors.websiteURL && (
                                 <p className="text-red-500 text-xs mt-1">{validationErrors.websiteURL}</p>
                             )}
                         </div>

                         <div className="flex justify-end">
                             <button
                                 type="submit"
                                 className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-sm"
                             >
                                 {formData._id ? "Update Profile" : "Register"}
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

