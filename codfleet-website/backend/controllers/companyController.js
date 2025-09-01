const { validationResult } = require('express-validator');
const CompanyProfile = require('../models/CompanyProfile');
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

    res.status(201).json({
      success: true,
      message: 'Company profile created successfully'
    });
  } catch (error) {
    console.error('Company registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};