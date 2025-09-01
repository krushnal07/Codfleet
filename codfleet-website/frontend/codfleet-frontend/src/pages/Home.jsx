import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import FleetCounter from '@/components/FleetCounter';
import { motion } from 'framer-motion';
import { Users, Building, MapPin, ArrowRight, CheckCircle, Briefcase, Handshake, University } from 'lucide-react';

const Home = () => {
  const whyCodFleetPoints = [
    {
      title: "Verified Freelancers",
      description: "Legal, ready-to-work individuals, minimizing compliance risks.",
      icon: CheckCircle,
    },
    {
      title: "One Invoice Solution",
      description: "Streamlined billing with zero compliance headaches for companies.",
      icon: Briefcase,
    },
    {
      title: "Upskilling & Growth",
      description: "A clear path for freelancers to grow, benefiting companies and the government.",
      icon: University,
    }
  ];

  const steps = [
    { title: "Register", description: "Freelancer, Company, or Institute uploads details." },
    { title: "Verify", description: "CodFleet cross-checks with tax, YEL, visa, insurance." },
    { title: "Connect", description: "Tasks are assigned — legal, fast, auditable." }
  ];

  const blogPosts = [
    {
      title: "Building Finland's Compliant Workforce Network",
      date: "March 15, 2024",
      excerpt: "How CodFleet is revolutionizing the gig economy with transparency and compliance."
    },
    {
      title: "The Future of Work in Finland",
      date: "March 10, 2024",
      excerpt: "Exploring the intersection of technology, compliance, and workforce development."
    },
    {
      title: "Why Verification Matters",
      date: "March 5, 2024",
      excerpt: "The importance of document verification in creating a trusted workforce network."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                CodFleet: From Tasks <span className="text-red-600 block">to Careers</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Finland’s first compliance-secure workforce network — connecting companies, freelancers, and institutes for legal, scalable growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
                  <Link to="/register">
                    Join as Freelancer
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/register/company">Hire with CodFleet</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/register/institute">Partner as Institute</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {/* This is where your FleetCounter will now live, as per your request for a visual */}
              <FleetCounter />
              <div className="absolute inset-0 bg-red-50 rounded-2xl opacity-20 -z-10"></div> {/* Subtle background for the counter area */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why CodFleet? */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why CodFleet?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Finland faces unique challenges in its workforce, and CodFleet offers solutions:
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-left max-w-3xl mx-auto text-lg text-gray-700">
              <p>
                ● 40,000+ open jobs in Finland remain unfilled every year.
              </p>
              <p>
                ● Meanwhile, thousands of immigrants and freelancers are stuck in survival gigs.
              </p>
              <p>
                ● Companies face compliance risks, unions pressure, and worker shortages.
              </p>
            </div>
            <p className="text-2xl font-semibold text-red-600 mt-12 mb-8">
              CodFleet changes this.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyCodFleetPoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <point.icon className={`h-12 w-12 text-red-600 mx-auto mb-4`} />
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {point.title}
                    </h3>
                    <p className="text-gray-600">
                      {point.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works (Simplified to 3 Steps) */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to join Finland's most trusted workforce network
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest from Our Blog
            </h2>
            <p className="text-xl text-gray-600">
              Insights on workforce compliance and the future of work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="text-sm text-gray-500 mb-2">{post.date}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {post.excerpt}
                    </p>
                    <Button variant="ghost" className="text-red-600 hover:text-red-700 p-0">
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Ready to join the network?
          </h2>
          <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
            <Link to="/register">
              Register Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;