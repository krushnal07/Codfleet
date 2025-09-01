import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FreelancerProfile = () => {
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [citizenship, setCitizenship] = useState('');
    const [inFinlandSince, setInFinlandSince] = useState('');
    const [visaType, setVisaType] = useState('');
    const [visaValidTill, setVisaValidTill] = useState('');
    const [yTunnus, setYTunnus] = useState('');
    const [taxId, setTaxId] = useState('');
    const [insuranceStatus, setInsuranceStatus] = useState('');
    const [yelStatus, setYelStatus] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [languages, setLanguages] = useState('');
    const [categories, setCategories] = useState('');
    const [availability, setAvailability] = useState('');
    const [notes, setNotes] = useState('');
    const [docType, setDocType] = useState('');
    const [document, setDocument] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [isProfileSubmitted, setIsProfileSubmitted] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (!storedToken) {
            setMessage('Unauthorized: No token found. Please log in.');
            navigate('/login'); // Redirect to login if no token
        } else {
            setToken(storedToken);
        }
    }, [navigate]);

    const handleProfileSubmit = async (event) => {
        event.preventDefault();
        try {
            const backendURL = 'http://localhost:5000';
            const response = await axios.post(
                `${backendURL}/api/freelancer/profile`,
                {
                    name,
                    dob,
                    citizenship,
                    in_finland_since: inFinlandSince,
                    visa_type: visaType,
                    visa_valid_till: visaValidTill,
                    y_tunnus: yTunnus,
                    tax_id: taxId,
                    insurance_status: insuranceStatus,
                    yel_status: yelStatus,
                    phone,
                    city,
                    languages: languages.split(',').map(item => item.trim()),
                    categories: categories.split(',').map(item => item.trim()),
                    availability: availability.split(',').map(item => item.trim()),
                    notes,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                setMessage('Profile created/updated successfully!');
                setIsProfileSubmitted(true);
                // Optionally, redirect the user to a dashboard or another page
            } else {
                setMessage('Profile update failed. Please check the form.');
            }
        } catch (error) {
            console.error('Profile update error:', error);
            if (error.response && error.response.data && error.response.data.errors) {
                const errorMessages = error.response.data.errors.map((err) => err.msg).join('\n');
                setMessage(`Profile update failed:\n${errorMessages}`);
            } else if (error.response && error.response.data && error.response.data.message) {
                setMessage(`Profile update failed: ${error.response.data.message}`);
            } else {
                setMessage('An unexpected error occurred. Please try again later.');
            }
        }
    };

    const handleDocumentChange = (event) => {
        setDocument(event.target.files[0]);
    };

    const handleDocumentSubmit = async (event) => {
        event.preventDefault();

        if (!document) {
            setMessage('Please select a document to upload.');
            return;
        }

        try {
            const token = localStorage.getItem('authToken');
            const formData = new FormData();
            formData.append('document', document);
            formData.append('doc_type', docType);

            const backendURL = 'http://localhost:5000';

            const response = await axios.post(
                `${backendURL}/api/freelancer/documents`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                setMessage('Document uploaded successfully!');
                setDocument(null); // Clear the selected file after successful upload
            } else {
                setMessage('Document upload failed. Please try again.');
            }
        } catch (error) {
            console.error('Document upload error:', error);

            if (error.response && error.response.data && error.response.data.message) {
                setMessage(`Document upload failed: ${error.response.data.message}`);
            } else {
                setMessage('An unexpected error occurred during document upload. Please try again later.');
            }
        }
    };

    if (!token) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                    <h2 className="text-center text-2xl font-bold mb-6 text-gray-800">Unauthorized</h2>
                    {message && (
                        <div
                            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                            role="alert"
                        >
                            <span className="block sm:inline">{message}</span>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                <h2 className="text-center text-2xl font-bold mb-6 text-gray-800">Freelancer Profile</h2>
                {message && (
                    <div
                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                        role="alert"
                    >
                        <span className="block sm:inline">{message}</span>
                    </div>
                )}

                <form onSubmit={handleProfileSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">
                            Date of Birth:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="dob"
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="citizenship">
                            Citizenship:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="citizenship"
                            type="text"
                            placeholder="Citizenship"
                            value={citizenship}
                            onChange={(e) => setCitizenship(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inFinlandSince">
                            In Finland Since (MM/YYYY):
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="inFinlandSince"
                            type="text"
                            placeholder="MM/YYYY"
                            value={inFinlandSince}
                            onChange={(e) => setInFinlandSince(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="visaType">
                            Visa Type:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="visaType"
                            type="text"
                            placeholder="Visa Type"
                            value={visaType}
                            onChange={(e) => setVisaType(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="visaValidTill">
                            Visa Valid Till:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="visaValidTill"
                            type="date"
                            value={visaValidTill}
                            onChange={(e) => setVisaValidTill(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="yTunnus">
                            Y-Tunnus:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="yTunnus"
                            type="text"
                            placeholder="Y-Tunnus"
                            value={yTunnus}
                            onChange={(e) => setYTunnus(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taxId">
                            Tax ID:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="taxId"
                            type="text"
                            placeholder="Tax ID"
                            value={taxId}
                            onChange={(e) => setTaxId(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="insuranceStatus">
                            Insurance Status:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="insuranceStatus"
                            type="text"
                            placeholder="Insurance Status"
                            value={insuranceStatus}
                            onChange={(e) => setInsuranceStatus(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="yelStatus">
                            YEL Status:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="yelStatus"
                            type="text"
                            placeholder="YEL Status"
                            value={yelStatus}
                            onChange={(e) => setYelStatus(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                            Phone:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="phone"
                            type="text"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                            City:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="city"
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="languages">
                            Languages (Comma Separated):
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="languages"
                            type="text"
                            placeholder="Languages"
                            value={languages}
                            onChange={(e) => setLanguages(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categories">
                            Categories (Comma Separated):
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="categories"
                            type="text"
                            placeholder="Categories"
                            value={categories}
                            onChange={(e) => setCategories(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="availability">
                            Availability (Comma Separated):
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="availability"
                            type="text"
                            placeholder="Availability"
                            value={availability}
                            onChange={(e) => setAvailability(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="notes">
                            Notes:
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="notes"
                            placeholder="Notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Submit Profile
                        </button>
                    </div>
                </form>
                                {/* Document Upload Form */}
                {isProfileSubmitted && (
                    <form onSubmit={handleDocumentSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="docType">
                                Document Type:
                            </label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="docType"
                                value={docType}
                                onChange={(e) => setDocType(e.target.value)}
                            >
                                <option value="">Select Document Type</option>
                                <option value="passport">Passport</option>
                                <option value="permit">Permit</option>
                                <option value="y_tunnus">Y-Tunnus</option>
                                <option value="tax">Tax</option>
                                <option value="insurance">Insurance</option>
                                <option value="yel">YEL</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="document">
                                Upload Document:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="document"
                                type="file"
                                onChange={handleDocumentChange}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Upload
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default FreelancerProfile;