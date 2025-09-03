const express = require('express');
const { body } = require('express-validator');
const { auth, authorize } = require('../middleware/auth');
const instituteProfileController = require('../controllers/instituteProfileController');

const router = express.Router();

router.post(
    '/register',
    auth,
    authorize('institute'),
    [
        body('instituteName', 'Institute Name is required').notEmpty(),
        body('primaryContact', 'Primary contact is required').notEmpty(),
        body('emailAddress', 'Valid email is required').isEmail(),
    ],
    instituteProfileController.registerInstitute
);

router.put(
    '/update',
    auth,
    authorize('institute'),
    instituteProfileController.updateInstitute
);

module.exports = router;