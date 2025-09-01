const express = require('express');
const User = require('../models/User');
const FreelancerProfile = require('../models/FreelancerProfile');
const CompanyProfile = require('../models/CompanyProfile');

const router = express.Router();

// @route   GET /api/stats/fleet
// @desc    Get fleet statistics
// @access  Public
router.get('/fleet', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalFreelancers = await User.countDocuments({ role: 'freelancer' });
    const totalCompanies = await User.countDocuments({ role: 'company' });
    const verifiedFreelancers = await FreelancerProfile.countDocuments({ kyc_status: 'approved' });
    
    // Get freelancers by city
    const freelancersByCity = await FreelancerProfile.aggregate([
      { $match: { city: { $exists: true, $ne: null } } },
      { $group: { _id: '$city', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      stats: {
        total_users: totalUsers,
        total_freelancers: totalFreelancers,
        total_companies: totalCompanies,
        verified_count: verifiedFreelancers,
        by_city: freelancersByCity.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {})
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

