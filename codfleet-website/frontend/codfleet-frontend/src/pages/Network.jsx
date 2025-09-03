import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Users, Building, FileText, CheckCircle, ArrowRight, School } from 'lucide-react';

const Network = () => {
  const freelancerRequirements = [
    "Passport/ID",
    "Residence permit", 
    "Y-tunnus (Business ID)",
    "Tax card",
    "Insurance/YEL documentation"
  ];

  const companyRequirements = [
    "Business ID",
    "Contact details",
    "Staffing needs description",
    "Compliance requirements"
  ];

  const educationRequirements = [
    "Official Institution Name",
    "Partnership Point of Contact",
    "Description of Partnership Goals",
    "Details on Relevant Student Programs",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Join the CodFleet Network
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose your path to Finland's most trusted workforce network
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Cards Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Freelancer Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full border-2 border-red-200 hover:border-red-400 transition-colors">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                      <Users className="h-10 w-10 text-red-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      For Freelancers
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                      Upload your documents, get verified, start tasks legally
                    </p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <h3 className="text-lg font-semibold text-gray-900">
                      What you'll get:
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-600">Legal work opportunities</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-600">Transparent payments</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-600">Career growth pathways</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-600">Compliance support</span>
                      </li>
                    </ul>
                  </div>

                  <Button asChild className="w-full bg-red-600 hover:bg-red-700" size="lg">
                    <Link to="/freelancer-profile">
                      Join as Freelancer
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Company Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full border-2 border-blue-200 hover:border-blue-400 transition-colors">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                      <Building className="h-10 w-10 text-blue-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      For Companies
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                      One invoice, compliant freelancers, transparent reporting
                    </p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <h3 className="text-lg font-semibold text-gray-900">
                      What you'll get:
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-600">Pre-verified freelancers</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-600">Single invoice compliance</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-600">Zero liability hiring</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-600">Transparent reporting</span>
                      </li>
                    </ul>
                  </div>

                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                    <Link to="/company-register">
                      Join as Company
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Education Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="h-full border-2 border-green-200 hover:border-green-400 transition-colors">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                      <School className="h-10 w-10 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      For Education
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                      Bridge the gap between academia and industry
                    </p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <h3 className="text-lg font-semibold text-gray-900">
                      What you'll get:
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-600">Internship placements</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-600">Guest lectures from experts</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-600">Real-world projects</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-600">Curriculum support</span>
                      </li>
                    </ul>
                  </div>

                  <Button asChild className="w-full bg-green-600 hover:bg-green-700" size="lg">
                    <Link to="/institute-register">
                      join as Institute
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What You'll Need
            </h2>
            <p className="text-xl text-gray-600">
              Prepare this information before you start
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Freelancer Requirements */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <FileText className="h-8 w-8 text-red-600 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      Freelancer Documents
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {freelancerRequirements.map((requirement, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        <span className="text-gray-700">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 p-4 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-800">
                      <strong>Note:</strong> All documents must be valid and up-to-date. 
                      We support PDF and JPG formats, max 10MB per file.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Company Requirements */}
            <motion.div
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="h-full">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <FileText className="h-8 w-8 text-blue-600 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      Company Information
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {companyRequirements.map((requirement, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> We'll contact you within 24-48 hours 
                      after registration to discuss your specific needs.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Education Partner Requirements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="h-full">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <School className="h-8 w-8 text-green-600 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      Education Partner Info
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {educationRequirements.map((requirement, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-gray-700">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Note:</strong> Our partnerships team will reach out to schedule
                      an introductory call and formalize our collaboration.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple Registration Process
            </h2>
            <p className="text-xl text-gray-600">
              Get started in just a few steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Create Account
              </h3>
              <p className="text-gray-600">
                Choose your role and create your account with email verification
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Complete Profile
              </h3>
              <p className="text-gray-600">
                Fill out your profile and upload required documents
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Get Verified
              </h3>
              <p className="text-gray-600">
                Our team reviews your information and activates your account
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Join?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Become part of Finland's most trusted workforce network today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/auth/register?role=freelancer">Start as Freelancer</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
                <Link to="/auth/register?role=company">Start as Company</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Network;