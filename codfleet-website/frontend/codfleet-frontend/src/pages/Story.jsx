import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import krushnal from "@/assets/krushnal.jpg"
import { TrendingUp, Users, FileCheck, Briefcase, Landmark, Handshake, ShieldCheck, Euro } from 'lucide-react';

const Story = () => {
  const stats = [
    {
      number: "20,000+",
      label: "riders in Finland",
      description: "Current gig economy workforce, often in the shadows."
    },
    {
      number: "40,000+",
      label: "open vacancies",
      description: "in logistics, care, construction industries."
    },
    {
      number: "1",
      label: "auditable invoice",
      description: " full compliance, zero liability."
    }
  ];

  const timeline = [
    {
      year: "2019",
      title: "The Problem Emerges",
      description: "Black market gig work becomes widespread, creating compliance issues and worker exploitation."
    },
    {
      year: "2020-2023",
      title: "Growing Awareness",
      description: "Government and businesses recognize the need for transparent, compliant workforce solutions."
    },
    {
      year: "2024",
      title: "CodFleet Founded",
      description: "We launch to create Finland's first compliance-first workforce network."
    },
    {
      year: "2025",
      title: "Building the Future",
      description: "Expanding our verified network and opening real career pathways for all workers."
    }
  ];
  const SectionHeader = ({ title }) => (
    <div className="text-center">
        <h2 className="text-3xl font-bold uppercase tracking-widest text-brand-navy">{title}</h2>
    </div>
);

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
              The CodFleet Story
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built to clean Finland's gig economy and open real career paths
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 1: The Beginning */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                The Beginning: Finland's Workforce Paradox
              </h2>
              <div className="space-y-6 text-gray-600">
                <p>
                  CodFleet was born to solve Finland’s toughest workforce paradox, a challenge where crucial needs and available talent struggled to connect in a compliant manner.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><span className="font-semibold text-gray-800">Companies can’t find workers:</span> Critical sectors face significant labor shortages.</li>
                  <li><span className="font-semibold text-gray-800">Immigrants can’t find legitimate jobs:</span> Thousands are stuck in survival gigs, lacking legal protection and career growth.</li>
                  <li><span className="font-semibold text-gray-800">Platforms collapsed under lawsuits & non-compliance:</span> The existing gig economy often led to legal issues and exploitation.</li>
                </ul>
                <p>
                  We recognized the urgent need for a solution that bridges this gap transparently and legally.
                </p>
                </div>
              </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Image related to the problem - e.g., a conceptual image of fragmented job market */}
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 flex items-center justify-center h-full min-h-[300px]">
                <div className="text-center">
                  <Handshake className="h-20 w-20 text-gray-500 mx-auto mb-4" />
                  <p className="text-lg text-gray-700 font-medium">The disconnect needed a solution.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: The Model */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Image related to the solution - e.g., a conceptual image of a bridge or a network */}
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 flex items-center justify-center h-full min-h-[300px]">
                <div className="text-center">
                  <ShieldCheck className="h-20 w-20 text-red-600 mx-auto mb-4" />
                  <p className="text-lg text-red-700 font-medium">A marketplace with a compliance firewall.</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                CodFleet's Unique Model: Marketplace + Compliance Firewall
              </h2>
              <div className="space-y-6 text-gray-600">
                <p>
                  CodFleet isn’t just another delivery platform or a traditional staffing agency. We’ve engineered a robust model designed for sustainability and legality.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><span className="font-semibold text-gray-800">Freelancers stay independent:</span> Empowering individuals while ensuring their legal standing.</li>
                  <li><span className="font-semibold text-gray-800">Companies stay safe under Contractor’s Obligations Act:</span> Providing peace of mind with full compliance.</li>
                  <li><span className="font-semibold text-gray-800">Government sees higher tax collection and faster immigrant integration:</span> A win-win for the Finnish economy and society.</li>
                </ul>
                <p>
                  Our platform ensures that every connection is secure, transparent, and beneficial for all parties involved.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: The Impact */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Impact: Strengthening Finland's Future
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              CodFleet is creating tangible benefits across the board, fostering a healthier, more dynamic workforce.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="h-full text-center">
                <CardContent className="p-8">
                  <Users className="h-12 w-12 text-red-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">For Freelancers</h3>
                  <p className="text-gray-600">Legal work + pathway to skills and career growth.</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full text-center">
                <CardContent className="p-8">
                  <Briefcase className="h-12 w-12 text-red-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">For Companies</h3>
                  <p className="text-gray-600">Zero liability + faster, pre-verified workforce access.</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="h-full text-center">
                <CardContent className="p-8">
                  <Landmark className="h-12 w-12 text-red-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">For Finland</h3>
                  <p className="text-gray-600">Stronger economy + reduced black-market work.</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center text-3xl font-bold text-red-600 mt-12"
          >
            “CodFleet isn’t just solving gigs. It’s strengthening Finland’s future.”
          </motion.p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600">
              From problem identification to solution implementation
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-red-200"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-600 rounded-full border-4 border-white"></div>

                  <Card className={`w-full max-w-md ${index % 2 === 0 ? 'mr-auto pr-8' : 'ml-auto pl-8'}`}>
                    <CardContent className="p-6">
                      <div className="text-red-600 font-bold text-lg mb-2">{item.year}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Now? The Numbers Tell Our Story
            </h2>
            <p className="text-xl text-gray-600">
              The urgency for CodFleet is clear when looking at the current landscape.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <CardContent className="p-8">
                    <div className="text-4xl md:text-5xl font-bold text-red-600 mb-4">
                      {stat.number}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {stat.label}
                    </h3>
                    <p className="text-gray-600">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
       

                        {/* Team Section */}
                        <section className="flex flex-col items-center gap-12">
                            <SectionHeader title="The CodFleet Team" />
                             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                                <div className="flex flex-col items-center text-center gap-4 rounded-lg bg-white border border-brand-border p-8 shadow-sm">
                                    <img className="w-32 h-32 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCu3_tb_upsUcoi5fatUOHeC9eBPRqxv-BxkDhHiUXvZz8Ai_gPS9yIOCXvY2SF132r82QPE9QX9XNWeS16d5haNmDETplFWgHzt5UpIxfRh2oA3hMvntPTH0eSbL3R13OZ2GNnFe6Nzd01BmeS5kaY2oaXlcUDP7VgimwyWLOIVI3NQozF9c-4QYFKdf9Gj_hq9PelOaT9-tBGCwnTocWdNb5zZha7xkzRAQYfuWbdTuztXkSY2ICeXvcDdHNqC3WoDfT7NRY7vzU" alt="Yash Panchal"/>
                                    <h4 className="text-brand-text-dark text-xl font-bold leading-tight mt-2">Yash Panchal</h4>
                                    <p className="text-brand-text-muted text-base font-medium">Founder &amp; CEO</p>
                                    <p className="text-brand-text-muted text-base">The visionary driving the mission. Yash combines firsthand experience with a passion for technology to build a more equitable workforce.</p>
                                </div>
                                <div className="flex flex-col items-center text-center gap-4 rounded-lg bg-white border border-brand-border p-8 shadow-sm">
                                    
                                     <img className="w-32 h-32 rounded-full object-cover" src={krushnal}
  alt="Krushnal"/>
                                    <h4 className="text-brand-text-dark text-xl font-bold leading-tight mt-2">Krushnal</h4>
                                    <p className="text-brand-text-muted text-base font-medium">AI Compliance Engine</p>
                                    <p className="text-brand-text-muted text-base">The intelligence behind our compliance. Kaizen is our proprietary AI, ensuring every contract and connection meets Finland's legal standards.</p>
                                </div>
                                <div className="flex flex-col items-center text-center gap-4 rounded-lg bg-white border border-brand-border p-8 shadow-sm">
                                    <div className="w-32 h-32 rounded-full bg-brand-card-icon-bg flex items-center justify-center"><span className="material-symbols-outlined text-6xl text-brand-navy">lightbulb</span></div>
                                    <h4 className="text-brand-text-dark text-xl font-bold leading-tight mt-2">Lumen</h4>
                                    <p className="text-brand-text-muted text-base font-medium">AI Matching &amp; Growth Partner</p>
                                    <p className="text-brand-text-muted text-base">The spark that connects talent with opportunity. Lumen analyzes skills and aspirations to create perfect matches and illuminate career paths.</p>
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
              Be Part of the Solution
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join us in building Finland's most trusted and compliant workforce network
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/register/freelancer">Join the Fleet</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
                <Link to="/register/company">Hire with CodFleet</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Story;
