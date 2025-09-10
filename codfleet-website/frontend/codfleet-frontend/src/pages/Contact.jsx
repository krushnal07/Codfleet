import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

// --- Reusable Component for the top info cards ---
const ContactCard = ({ icon, title, children }) => (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 text-center flex flex-col items-center">
        {/* --- Changed --- */}
        <div className="bg-red-100 text-red-600 rounded-full p-3 mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <div className="mt-2 text-sm text-gray-600 space-y-1">
            {children}
        </div>
    </div>
);

const ContactPage = () => {
    // State for the contact form
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        role: '',
        message: '',
    });
    const [statusMessage, setStatusMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setStatusMessage('Thank you! Your message has been sent.');
        setFormData({ name: '', email: '', phone: '', role: '', message: '' });
    };

    return (
        <div className="bg-gray-50 py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Get in Touch with CodFleet
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                        We're here to help. Whether you have a question about our services, need support, or want to explore partnership opportunities, please reach out to us using the options below.
                    </p>
                </div>

                {/* Contact Info Cards */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <ContactCard icon={<Mail size={28} />} title="Email Us">
                        {/* --- Changed --- */}
                        <p><strong>General:</strong> <a href="mailto:support@codfleet.com" className="text-red-600 hover:underline">support@codfleet.com</a></p>
                        <p><strong>Press/Media:</strong> <a href="mailto:media@codfleet.com" className="text-red-600 hover:underline">media@codfleet.com</a></p>
                    </ContactCard>
                    <ContactCard icon={<Phone size={28} />} title="Call Us">
                        {/* --- Changed --- */}
                        <p><a href="tel:5551234567" className="hover:text-red-600">(555) 123-4567</a></p>
                        <p>Mon-Fri, 9 AM - 5 PM (EST)</p>
                    </ContactCard>
                    <ContactCard icon={<MapPin size={28} />} title="Headquarters">
                        <p>123 Innovation Drive,</p>
                        <p>Tech City, CA 90210</p>
                    </ContactCard>
                </div>

                {/* Main Content: Form and Map Section */}
                <div className="mt-16 bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        
                        {/* Left Side: Contact Form */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Send us a Message</h2>
                            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                        {/* --- Changed --- */}
                                        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                        {/* --- Changed --- */}
                                        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number (Optional)</label>
                                        {/* --- Changed --- */}
                                        <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" />
                                    </div>
                                    <div>
                                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">I am a...</label>
                                        {/* --- Changed --- */}
                                        <select name="role" id="role" value={formData.role} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500">
                                            <option value="">Select an option</option>
                                            <option value="freelancer">Freelancer</option>
                                            <option value="company">Company</option>
                                            <option value="institute">Institute</option>
                                            <option value="other">Other Inquiry</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                    {/* --- Changed --- */}
                                    <textarea name="message" id="message" rows="5" value={formData.message} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"></textarea>
                                </div>
                                <div>
                                    {/* --- Changed --- */}
                                    <button type="submit" className="w-full py-3 px-6 bg-red-600 text-white font-semibold rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                        Send Message
                                    </button>
                                </div>
                                {statusMessage && <p className="text-center text-green-600">{statusMessage}</p>}
                            </form>
                        </div>

                        {/* Right Side: Map and Info */}
                        <div className="space-y-8">
                            <div>
                                <img
                                    className="w-full h-64 object-cover rounded-lg shadow-md border border-gray-200"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-v2mFPBWGd-QBbuU_GZG9yh19bhpM-h2sPpgTAmgZHXfzZMvSeHEJ62gtIyQjKliX3c3bm-OZ5KxTkjyW_c0-zGsFdVceQnLrV-rQ-FYtxGvuQ6YMuHhtnfitCt0INv_vQ6j226Hq4RlApuKKO0RFnhRZlaEAljBfmRqcEL4NmuO1dfXYemUx9emxkVywCt91PjMT9fw3qtQF1A_QDBdLLXTCpjt1bUjzddJlhPZ-UL1nb42NH_bIOifUzZVWgzivHiTT2EAjtiA" // Placeholder map image
                                    alt="Map showing company location"
                                />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Support Note</h3>
                                <p className="mt-2 text-sm text-gray-600">
                                    If you are a registered user and need support, please submit a ticket through your dashboard for faster assistance.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Trust & Response Statement</h3>
                                <p className="mt-2 text-sm text-gray-600">
                                    We value your time and strive to respond to all inquiries within 24-48 hours. Your feedback and questions are important to us.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;