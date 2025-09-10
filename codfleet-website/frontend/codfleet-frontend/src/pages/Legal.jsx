import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// --- Reusable Accordion Item Component (Unchanged) ---
const AccordionItem = ({ title, content, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border border-gray-200 rounded-lg">
            <h2>
                <button
                    type="button"
                    className="flex items-center justify-between w-full p-5 font-semibold text-left text-gray-800"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                >
                    <span>{title}</span>
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                </button>
            </h2>
            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-96' : 'max-h-0'
                }`}
            >
                <div className="p-5 border-t border-gray-200">
                    <p className="text-gray-600">
                        {content}
                    </p>
                </div>
            </div>
        </div>
    );
};

// --- Mock Content for the Tabs (Unchanged) ---
const legalContent = {
    terms: [
        { title: "1. Acceptance of Terms", content: "By accessing or using the CodFleet platform and services, you ('User,' 'you') acknowledge that you have read, understood, and agree to be bound by these Terms of Service ('Terms'), along with our Privacy Policy. If you do not agree with these Terms, you must not access or use our services." },
        { title: "2. Service Description", content: "CodFleet provides a platform to connect freelancers with companies for project-based work. We facilitate communication, project management, and payment processing but are not a party to the direct contractual relationship between a freelancer and a company." },
        { title: "3. User Responsibilities", content: "Users are responsible for maintaining the confidentiality of their account information, including their password. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate." },
        { title: "4. Intellectual Property", content: "All content on the CodFleet platform, including text, graphics, logos, and software, is the property of CodFleet or its licensors and is protected by copyright and other intellectual property laws. You retain ownership of the content you create, but grant CodFleet a license to display it on the platform." },
        { title: "5. Termination", content: "We may terminate or suspend your account and access to the services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms." },
    ],
    privacy: [
        { title: "1. Information We Collect", content: "We collect personal information you provide directly to us, such as your name, email address, payment information, and professional details. We also collect information automatically as you navigate the site, such as your IP address and browsing behavior." },
        { title: "2. How We Use Your Information", content: "Your information is used to operate, maintain, and improve our services, process transactions, communicate with you, and for security and fraud prevention purposes." },
        { title: "3. Data Security", content: "We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet is 100% secure." },
    ],
    notices: [
        { title: "1. Copyright Infringement", content: "If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement and is accessible on this site, please notify our copyright agent as set forth in the DMCA." },
        { title: "2. Disclaimers", content: "The services are provided on an 'as is' and 'as available' basis. CodFleet makes no warranties, expressed or implied, and hereby disclaims all other warranties." },
    ],
};


const LegalPage = () => {
    const [activeTab, setActiveTab] = useState('terms');
    const [isDownloading, setIsDownloading] = useState(false);

    const TABS = [
        { id: 'terms', title: 'Terms of Service' },
        { id: 'privacy', title: 'Privacy Policy' },
        { id: 'notices', title: 'Legal Notices' },
    ];
    
    const handleDownload = () => {
        setIsDownloading(true);
        const input = document.getElementById('pdf-content');

        html2canvas(input, { 
            scale: 2,
            backgroundColor: '#ffffff' // --- THIS IS THE FIX ---
            // This tells html2canvas to use a simple white background and ignore parsing the body's oklch() color.
        })
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4'); 
                
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save(`CodFleet-${TABS.find(t => t.id === activeTab).title}.pdf`);
                setIsDownloading(false);
            })
            .catch(err => {
                console.error("PDF generation error:", err);
                setIsDownloading(false);
            });
    };

    return (
        <div className="bg-white py-12 sm:py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header (Unchanged) */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Legal & Compliance
                    </h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Our commitment to transparency and protecting your rights.
                    </p>
                </div>

                {/* Tab Navigation (Unchanged) */}
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === tab.id
                                        ? 'border-gray-800 text-gray-900'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                {tab.title}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Accordion Content (Unchanged) */}
                <div className="mt-8 space-y-4">
                    {legalContent[activeTab].map((item, index) => (
                        <AccordionItem
                            key={item.title}
                            title={item.title}
                            content={item.content}
                            defaultOpen={index === 0}
                        />
                    ))}
                </div>

                {/* Download Button (Unchanged from your working version) */}
                <div className="mt-10">
                    <button 
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className="inline-flex items-center gap-2 px-5 py-3 border border-gray-300 text-sm font-semibold rounded-lg text-gray-800 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Download className="w-5 h-5" />
                        {isDownloading ? 'Generating PDF...' : 'Download PDF'}
                    </button>
                </div>
            </div>

            {/* Hidden div for PDF generation (Unchanged) */}
            <div id="pdf-content" style={{ position: 'absolute', left: '-9999px', width: '800px', padding: '20px', background: 'white' }}>
                 <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
                    {TABS.find(t => t.id === activeTab).title}
                </h1>
                {legalContent[activeTab].map(item => (
                    <div key={item.title} style={{ marginBottom: '20px' }}>
                        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>{item.title}</h2>
                        <p style={{ fontSize: '14px', lineHeight: '1.6' }}>{item.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LegalPage;