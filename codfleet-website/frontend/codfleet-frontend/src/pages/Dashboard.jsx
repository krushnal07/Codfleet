import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Upload, FileText, BookOpen, ArrowUp, ArrowDown } from 'lucide-react';

// --- Reusable Component for the Snapshot Cards ---
const SnapshotCard = ({ title, value, change, changeType }) => {
    const isPositive = changeType === 'up';
    const changeColor = isPositive ? 'text-green-500' : 'text-red-500';
    const ChangeIcon = isPositive ? ArrowUp : ArrowDown;

    return (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
            <div className={`mt-1 flex items-center text-sm ${changeColor}`}>
                <ChangeIcon className="w-4 h-4" />
                <span className="ml-1">{change}</span>
            </div>
        </div>
    );
};

// --- Helper Function for Task Status Styling ---
const getStatusClasses = (status) => {
    switch (status) {
        case 'In Progress':
            return 'bg-blue-100 text-blue-800';
        case 'Pending':
            return 'bg-yellow-100 text-yellow-800';
        case 'Completed':
            return 'bg-green-100 text-green-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

const DashboardPage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user data from localStorage to personalize the dashboard
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // --- Mock Data (Replace with API calls) ---
    const snapshotData = [
        { title: 'Profile Verification Status', value: '85%', change: '+10%', changeType: 'up' },
        { title: 'Earnings This Month', value: '€1,250', change: '+20%', changeType: 'up' },
        { title: 'Hours Logged', value: '120', change: '-5%', changeType: 'down' },
        { title: 'Active Tasks', value: '5', change: '+15%', changeType: 'up' },
    ];

    const tasksData = [
        { id: 1, name: 'Task 1: Data Entry', status: 'In Progress', dueDate: '2024-03-15' },
        { id: 2, name: 'Task 2: Content Review', status: 'Pending', dueDate: '2024-03-20' },
        { id: 3, name: 'Task 3: Market Research', status: 'Completed', dueDate: '2024-03-10' },
    ];

    const quickLinks = [
        { text: 'Upload Documents', icon: <Upload className="w-5 h-5 mr-2" />, href: '/documents/upload' },
        { text: 'View Invoices', icon: <FileText className="w-5 h-5 mr-2" />, href: '/invoices' },
        { text: 'Upskill – Training Catalog', icon: <BookOpen className="w-5 h-5 mr-2" />, href: '/training' },
    ];
    // --- End of Mock Data ---

    return (
        <div className="bg-gray-50 p-6 sm:p-8 min-h-full">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="pb-4 border-t-4 border-red-500 bg-white shadow-sm p-6 rounded-t-lg">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome back, {user ? user.name : 'User'}
                    </h1>
                </header>
                
                <main className="space-y-10 mt-6">
                    {/* Snapshot Section */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Snapshot</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {snapshotData.map((item) => (
                                <SnapshotCard key={item.title} {...item} />
                            ))}
                        </div>
                    </section>

                    {/* My Tasks Section */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">My Tasks</h2>
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {tasksData.map((task) => (
                                        <tr key={task.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{task.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusClasses(task.status)}`}>
                                                    {task.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.dueDate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                    
                    {/* Quick Links Section */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Links</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {quickLinks.map((link) => (
                                <Link
                                    key={link.text}
                                    to={link.href}
                                    className="flex items-center justify-center p-4 bg-white border border-gray-300 rounded-lg shadow-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
                                >
                                    {link.icon}
                                    {link.text}
                                </Link>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;