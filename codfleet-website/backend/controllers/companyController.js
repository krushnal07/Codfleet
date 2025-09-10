const { validationResult } = require('express-validator');
const CompanyProfile = require('../models/CompanyProfile');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/company-documents/'); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

exports.registerCompany = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { companyName, businessID, vatNumber, industry, contactPerson, emailAddress, phoneNumber, billingAddress, preferredPaymentMethod, estimatedWorkforceNeeds, preferredWorkSectors } = req.body; // Extract required fields

    const profileData = {
      user_id: req.user.id, // Assuming you have auth middleware
      companyName,
      businessID,
      vatNumber,
      industry,
      contactPerson,
      emailAddress,
      phoneNumber,
      billingAddress,
      preferredPaymentMethod,
      estimatedWorkforceNeeds,
      preferredWorkSectors,
    };

     if (req.files['taxDebtCertificate'] && req.files['taxDebtCertificate'][0]) {
            profileData.taxDebtCertificateFilename = req.files['taxDebtCertificate'][0].filename;
        }
        if (req.files['pensionInsuranceCertificate'] && req.files['pensionInsuranceCertificate'][0]) {
            profileData.pensionInsuranceCertificateFilename = req.files['pensionInsuranceCertificate'][0].filename;
        }
        if (req.files['workersCompensationInsurance'] && req.files['workersCompensationInsurance'][0]) {
            profileData.workersCompensationInsuranceFilename = req.files['workersCompensationInsurance'][0].filename;
        }

    const newCompany = new CompanyProfile(profileData);
    await newCompany.save();
   await User.findByIdAndUpdate(req.user.id, { hasCompletedOnboarding: true });
    res.status(201).json({
      success: true,
      message: 'Company profile created successfully'
    });
  } catch (error) {
    console.error('Company registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCompanyProfile = async (req, res) => {
     try {
         const userId = req.user.id; // Get user ID from auth middleware

         const companyProfile = await CompanyProfile.findOne({ user_id: userId });

         if (!companyProfile) {
             return res.status(200).json({ success: true, profile: null, message: 'No company profile found for this user.' }); // Or a 404 if you prefer.
         }

         res.status(200).json({ success: true, profile: companyProfile });
     } catch (error) {
         console.error('Error fetching company profile:', error);
         res.status(500).json({ message: 'Server error' });
     }
 };

 exports.updateCompanyProfile = async (req, res) => {
     try {
         const userId = req.user.id;
         const { companyName, businessID, vatNumber, industry, contactPerson, emailAddress, phoneNumber, billingAddress, preferredPaymentMethod, estimatedWorkforceNeeds, preferredWorkSectors } = req.body;

         const profileData = {
             companyName,
             businessID,
             vatNumber,
             industry,
             contactPerson,
             emailAddress,
             phoneNumber,
             billingAddress,
             preferredPaymentMethod,
             estimatedWorkforceNeeds,
             preferredWorkSectors,
         };

         if (req.files['taxDebtCertificate'] && req.files['taxDebtCertificate'][0]) {
             profileData.taxDebtCertificateFilename = req.files['taxDebtCertificate'][0].filename;
         }
         if (req.files['pensionInsuranceCertificate'] && req.files['pensionInsuranceCertificate'][0]) {
             profileData.pensionInsuranceCertificateFilename = req.files['pensionInsuranceCertificate'][0].filename;
         }
         if (req.files['workersCompensationInsurance'] && req.files['workersCompensationInsurance'][0]) {
             profileData.workersCompensationInsuranceFilename = req.files['workersCompensationInsurance'][0].filename;
         }

         const updatedProfile = await CompanyProfile.findOneAndUpdate({ user_id: userId }, profileData, { new: true, runValidators: true });

         if (!updatedProfile) {
             return res.status(404).json({ success: false, message: 'Company profile not found.' });
         }

         res.status(200).json({ success: true, message: 'Company profile updated successfully', profile: updatedProfile });
     } catch (error) {
         console.error('Error updating company profile:', error);
         res.status(500).json({ message: 'Server error' });
     }
 };