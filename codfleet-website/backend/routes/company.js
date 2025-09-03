const express = require('express');
const { body } = require('express-validator');
const { auth, authorize } = require('../middleware/auth');
const companyController = require('../controllers/companyController');
const upload = require('../middleware/upload');

const router = express.Router();

 router.post(
     '/register',
     auth,
     authorize('company'),
     upload('company-documents').fields([
         { name: 'taxDebtCertificate', maxCount: 1 },
         { name: 'pensionInsuranceCertificate', maxCount: 1 },
         { name: 'workersCompensationInsurance', maxCount: 1 }
     ]),
     companyController.registerCompany
 );

 router.put(
     '/company-profile/update',
     auth,
     authorize('company'),
     upload('company-documents').fields([
         { name: 'taxDebtCertificate', maxCount: 1 },
         { name: 'pensionInsuranceCertificate', maxCount: 1 },
         { name: 'workersCompensationInsurance', maxCount: 1 }
     ]),
     companyController.updateCompanyProfile
 );

 router.get('/company-profile', auth, authorize('company'), companyController.getCompanyProfile);
module.exports = router;