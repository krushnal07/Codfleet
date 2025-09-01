const mongoose = require('mongoose');

const companyProfileSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  companyName: { type: String },
  businessID: { type: String },
  vatNumber: { type: String },
  industry: { type: String },
  contactPerson: { type: String },
  emailAddress: { type: String },
  phoneNumber: { type: String },
  billingAddress: { type: String },
  preferredPaymentMethod: { type: String },
  estimatedWorkforceNeeds: { type: String },
  preferredWorkSectors: { type: String },
  taxDebtCertificateFilename: { type: String }, // Store filename only
  pensionInsuranceCertificateFilename: { type: String },
  workersCompensationInsuranceFilename: { type: String },
  // You might want to store the S3 URLs here as well for direct access
});

module.exports = mongoose.model('CompanyProfile', companyProfileSchema);