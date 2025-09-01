import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CompanyRegistration = () => {
  const [companyName, setCompanyName] = useState('');
  const [businessID, setBusinessID] = useState('');
  const [vatNumber, setVatNumber] = useState('');
  const [industry, setIndustry] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [taxDebtCertificate, setTaxDebtCertificate] = useState(null);
  const [pensionInsuranceCertificate, setPensionInsuranceCertificate] = useState(null);
  const [workersCompensationInsurance, setWorkersCompensationInsurance] = useState(null);
  const [billingAddress, setBillingAddress] = useState('');
  const [preferredPaymentMethod, setPreferredPaymentMethod] = useState('');
  const [estimatedWorkforceNeeds, setEstimatedWorkforceNeeds] = useState('');
  const [preferredWorkSectors, setPreferredWorkSectors] = useState('');
  const [termsOfService, setTermsOfService] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (!storedToken) {
            setMessage('Unauthorized: No token found. Please log in.');
            navigate('/login'); // Redirect to login if no token
        } else {
            setToken(storedToken);
        }
    }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

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
      const backendURL = 'http://localhost:5000';
      const response = await axios.post(
        `${backendURL}/api/company/register`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
               Authorization: `Bearer ${token}`,
            // Add Authorization header if needed
          },
        }
      );

      if (response.data.success) {
        setMessage('Company registration successful!');
      } else {
        setMessage('Company registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Company registration error:', error);
      setMessage('An error occurred during registration. Please try again later.');
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
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-3xl">
        <h2 className="text-center text-2xl font-bold mb-6 text-gray-800">Register Your Company with CodFleet</h2>
        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{message}</span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {/* Section 1: Company Details */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">1. Company Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyName">Company Name:</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="companyName" type="text" placeholder="Enter your company name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="businessID">Business ID:</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="businessID" type="text" placeholder="Enter your business ID" value={businessID} onChange={(e) => setBusinessID(e.target.value)} required />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vatNumber">VAT Number:</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="vatNumber" type="text" placeholder="Enter your VAT number" value={vatNumber} onChange={(e) => setVatNumber(e.target.value)} />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="industry">Industry:</label>
                <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="industry" value={industry} onChange={(e) => setIndustry(e.target.value)} required>
                  <option value="">Select your industry</option>
                  <option value="IT">Information Technology</option>
                  <option value="Finance">Finance</option>
                  <option value="Healthcare">Healthcare</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactPerson">Contact Person:</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="contactPerson" type="text" placeholder="Enter contact person's name" value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} required />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="emailAddress">Email Address:</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="emailAddress" type="email" placeholder="Enter your email address" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} required />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">Phone Number:</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phoneNumber" type="tel" placeholder="Enter your phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
              </div>
            </div>
          </div>

          {/* Section 2: Legal & Compliance */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">2. Legal & Compliance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taxDebtCertificate">Tax Debt Certificate (PNG, JPG, PDF up to 10MB):</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="taxDebtCertificate" type="file" onChange={(e) => setTaxDebtCertificate(e.target.files[0])} />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pensionInsuranceCertificate">Pension Insurance Certificate (PNG, JPG, PDF up to 10MB):</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="pensionInsuranceCertificate" type="file" onChange={(e) => setPensionInsuranceCertificate(e.target.files[0])} />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="workersCompensationInsurance">Worker's Compensation Insurance (PNG, JPG, PDF up to 10MB):</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="workersCompensationInsurance" type="file" onChange={(e) => setWorkersCompensationInsurance(e.target.files[0])} />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="billingAddress">Billing Address:</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="billingAddress" type="text" placeholder="Enter your billing address" value={billingAddress} onChange={(e) => setBillingAddress(e.target.value)} required />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="preferredPaymentMethod">Preferred Payment Method:</label>
              <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="preferredPaymentMethod" value={preferredPaymentMethod} onChange={(e) => setPreferredPaymentMethod(e.target.value)} required>
                <option value="">Select payment method</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
                {/* Add more options as needed */}
              </select>
            </div>
          </div>

          {/* Section 3: Platform Use & Agreement */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">3. Platform Use & Agreement</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estimatedWorkforceNeeds">Estimated Workforce Needs:</label>
                <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="estimatedWorkforceNeeds" value={estimatedWorkforceNeeds} onChange={(e) => setEstimatedWorkforceNeeds(e.target.value)} required>
                  <option value="">Select estimated workforce size</option>
                  <option value="Small">Small (1-10)</option>
                  <option value="Medium">Medium (11-50)</option>
                  <option value="Large">Large (50+)</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="preferredWorkSectors">Preferred Work Sectors:</label>
                <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="preferredWorkSectors" value={preferredWorkSectors} onChange={(e) => setPreferredWorkSectors(e.target.value)} required>
                  <option value="">Select preferred sectors</option>
                  <option value="Technology">Technology</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Design">Design</option>
                  {/* Add more options as needed */}
                </select>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <input className="mr-2 leading-tight" type="checkbox" id="termsOfService" checked={termsOfService} onChange={(e) => setTermsOfService(e.target.checked)} required />
              <label className="text-sm text-gray-700" htmlFor="termsOfService">I agree to the <a href="#" className="text-red-600 hover:text-red-800">Terms of Service</a>.</label>
            </div>
            <div className="mt-2 flex items-center">
              <input className="mr-2 leading-tight" type="checkbox" id="privacyPolicy" checked={privacyPolicy} onChange={(e) => setPrivacyPolicy(e.target.checked)} required />
              <label className="text-sm text-gray-700" htmlFor="privacyPolicy">I consent to the <a href="#" className="text-red-600 hover:text-red-800">Privacy Policy</a>.</label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-center">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Register & Verify Company</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyRegistration;

