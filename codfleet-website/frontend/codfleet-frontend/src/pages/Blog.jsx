import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

// --- Icon Components (converted from HTML) ---

const TwitterIcon = () => <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z"></path></svg>;
const FacebookIcon = () => <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"></path></svg>;
const LinkedInIcon = () => <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"></path></svg>;



const ArticleCard = ({ image, title, excerpt, link }) => (
    <div className="p-4 @container group">
        <div className="flex flex-col items-stretch justify-start rounded-2xl @xl:flex-row @xl:items-start gap-8">
            <div className="w-full @xl:w-1/2 aspect-video bg-cover bg-center rounded-2xl overflow-hidden" style={{ backgroundImage: `url("${image}")` }}></div>
            <div className="flex w-full @xl:w-1/2 min-w-72 grow flex-col items-stretch justify-center gap-3 py-4">
                <p className="text-slate-900 text-2xl font-bold leading-tight tracking-[-0.015em]">{title}</p>
                <p className="text-slate-600 text-base font-normal leading-normal">{excerpt}</p>
                <Link className="inline-flex items-center gap-2 text-brand-blue font-bold group-hover:underline" to={link}>
                    Read More <ArrowRight size={18} />
                </Link>
            </div>
        </div>
    </div>
);

const SidebarWidget = ({ title, children }) => (
     <div className="bg-slate-100 p-6 rounded-2xl">
        <h3 className="text-slate-900 text-xl font-bold leading-tight tracking-[-0.015em] mb-4">{title}</h3>
        {children}
    </div>
);

const Pagination = () => (
    <div className="flex items-center justify-center p-4 mt-8">
        <Link className="flex size-10 items-center justify-center text-slate-500 hover:text-slate-900 transition-colors" to="#"><ChevronLeft /></Link>
        <Link className="text-sm font-bold leading-normal tracking-[0.015em] flex size-10 items-center justify-center text-white rounded-full bg-brand-blue" to="#">1</Link>
        <Link className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-slate-600 rounded-full hover:bg-slate-200 transition-colors" to="#">2</Link>
        <Link className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-slate-600 rounded-full hover:bg-slate-200 transition-colors" to="#">3</Link>
        <span className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-slate-600 rounded-full">...</span>
        <Link className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-slate-600 rounded-full hover:bg-slate-200 transition-colors" to="#">10</Link>
        <Link className="flex size-10 items-center justify-center text-slate-500 hover:text-slate-900 transition-colors" to="#"><ChevronRight /></Link>
    </div>
);


const BlogPage = () => {
    const [activeTab, setActiveTab] = useState('press');
    
    const articles = [
        { image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDInAZNepzB4pxQGGzEj2O9-AIYXQwzrk-5zP7Q3AWgix2gRn-r4D9wlOMYKasyrN0ThMTfZGxaV08XydPisq10adRSG_8Np3mCnmtpEJOGL2jFZn65NACZ0MEcBQoJ8mkVmP0i_sNMCUKOsoXudAXEnskW9tkvMAduizPZC8FHObde0x1lZpsO_v-JW0zbCSE8YYqk6-I0HCKwylMlJUOev4cLqW6Iv6jSYal_OPyumnSZJHnMMFQSF1TQptUeIu0U7hMjWt97DzM", title: "CodFleet Announces Strategic Partnership with Global Tech Innovator", excerpt: "CodFleet, a leading provider of workforce management solutions, today announced a strategic partnership with TechGlobal, a global technology innovator. This collaboration will enable CodFleet to expand its reach and offer enhanced solutions to its clients.", link: "#" },
        { image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdCKIUCu0QPKLLrMBNgZO9wtFYSdfJsmes0W3XiVd96vBwBrmCOZevLbAf2663Pv4aRywNQ2o_hUECD0zNFFhxiRMGqIWJQ3blcmPQRgG_6nZZ-2nViJyH9Q_xiMHY1UfVUSuAwaWL6ZkJOV7nU-psvo5VHkJT3Gq94yTlu9VB53Ow-wOYp1RSJvdA_giUTme_0DZkBqnIMzHvTRDu7lGwbas7fk2DIpaEntDwqceHf2Zn9IArVcc6-pTRi7gz21pf0AuCYEA8mIQ", title: "Market Update: The Rise of the Freelance Economy in 2024", excerpt: "The freelance economy continues to grow at an unprecedented pace, with more professionals opting for flexible work arrangements. This report analyzes the key trends driving this growth and the opportunities it presents for businesses and individuals.", link: "#" },
        { image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqzf6wot9XbVImcKFXav-iGa1NO1PfTa1PbTZxatdoNh2u2B_QVZylrd_sa-K1C8GB4KANTkMVbWNR02XxnjgWQb4f2oP4no0qB3XfD8aLRoFRFZ5eIeezhcHgA0HC7O44sJ1q1d1Tfz6muiPy4yEDekbQJ-4f6x2Qa1wqCdclKWps_fs2y0RN-7EVoRpiYxUL_n2xNwnJkO0S9t2NGS_ozAPphhlcKQZBakbOw10TSLDG995JKpedFR6et54U3_-K5rJX9YKU6K8", title: "Integration Story: How a Government Agency Streamlined Operations with CodFleet", excerpt: "A government agency responsible for managing a large workforce faced challenges with manual processes and inefficient workflows. By implementing CodFleet's solutions, they were able to streamline operations, improve efficiency, and reduce costs.", link: "#" },
    ];
    
    const tabs = [
        { id: 'press', title: 'Press Releases' },
        { id: 'market', title: 'Market Updates' },
        { id: 'integration', title: 'Integration Stories' },
    ];

    return (
        <div className="relative flex size-full min-h-screen flex-col bg-slate-50 font-newsreader">
            <div className="layout-container flex h-full grow flex-col">
                
                <div className="gap-12 px-6 flex flex-1 justify-center py-10">
                    {/* Main Content */}
                    <div className="layout-content-container flex flex-col max-w-[920px] flex-1">
                        <div className="@container">
                            <div className="p-4">
                                <div className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-2xl items-start justify-end px-10 pb-10" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAv5B8RWN91ACb2Ngm8xqnrJ8H8FverEadw-ewg-VgfgmQ_9tSYLev5iV8LDtzzSwY12WfinxkXcYb6IOAddwvQj9BtHZmeetdVQUruAEr9FbVrXj1cNyRl1Bjzi3ar_C6U0WHEPuyiGDew3NxsBUgCZvqb0nZeadQ2ONkzeifFTQvdYWDu0No7ux7Yu53Br0yVwwyHAZmk51CBrr7x_eFx2ogHhj_T17_q3KgI5JAi4dE-A6JIOQK1SZiZ-Pl_vVcBLj_h4Wkiaec")` }}>
                                    <div className="flex flex-col gap-4 text-left">
                                        <h1 className="text-white text-5xl font-extrabold leading-tight tracking-[-0.033em]">CodFleet Insights &amp; Updates</h1>
                                        <h2 className="text-white text-lg font-normal leading-normal max-w-3xl">Stay informed with the latest news, market trends, and success stories from CodFleet. Discover how we're empowering freelancers, companies, and government agencies to achieve their goals.</h2>
                                    </div>
                                    <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-brand-blue text-slate-50 text-base font-bold leading-normal tracking-[0.015em] hover:bg-brand-blue-hover transition-colors">
                                        <span className="truncate">Explore Featured Article</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="pb-3 mt-8">
                            <div className="flex border-b border-slate-300 px-4 gap-8">
                                {tabs.map(tab => (
                                    <button 
                                        key={tab.id} 
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 transition-all duration-200 ${activeTab === tab.id ? 'border-b-brand-blue text-slate-900' : 'border-b-transparent text-slate-500 hover:border-b-brand-blue hover:text-slate-900'}`}
                                    >
                                        <p className="text-base font-bold leading-normal tracking-[0.015em]">{tab.title}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                        {articles.map((article, index) => <ArticleCard key={index} {...article} />)}
                        <Pagination />
                    </div>

                    {/* Sidebar */}
                    <div className="layout-content-container flex-col w-[360px] space-y-8 pt-8 hidden lg:flex">
                        <SidebarWidget title="Newsletter">
                             <div className="flex flex-col gap-4">
                                <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 focus:outline-0 focus:ring-2 focus:ring-brand-blue border border-slate-300 bg-white h-12 placeholder:text-slate-500 px-4 text-base font-normal leading-normal" placeholder="Your email address" />
                                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 flex-1 bg-brand-blue text-slate-50 text-base font-bold leading-normal tracking-[0.015em] hover:bg-brand-blue-hover transition-colors">
                                    <span className="truncate">Subscribe</span>
                                </button>
                            </div>
                        </SidebarWidget>
                        <SidebarWidget title="Trending Articles">
                            <div className="space-y-4">
                                <Link className="block text-slate-900 text-base font-normal leading-normal hover:text-brand-blue transition-colors" to="#">The Future of Work: Trends Shaping the Industry</Link>
                                <Link className="block text-slate-900 text-base font-normal leading-normal hover:text-brand-blue transition-colors" to="#">Best Practices for Managing Remote Teams</Link>
                                <Link className="block text-slate-900 text-base font-normal leading-normal hover:text-brand-blue transition-colors" to="#">Maximizing Productivity with CodFleet's Tools</Link>
                            </div>
                        </SidebarWidget>
                        <SidebarWidget title="Categories">
                             <div className="space-y-4">
                                <Link className="block text-slate-900 text-base font-normal leading-normal hover:text-brand-blue transition-colors" to="#">Press Releases</Link>
                                <Link className="block text-slate-900 text-base font-normal leading-normal hover:text-brand-blue transition-colors" to="#">Market Updates</Link>
                                <Link className="block text-slate-900 text-base font-normal leading-normal hover:text-brand-blue transition-colors" to="#">Integration Stories</Link>
                            </div>
                        </SidebarWidget>
                        <SidebarWidget title="Share">
                            <div className="gap-2 grid-cols-[repeat(auto-fit,minmax(80px,1fr))] grid">
                                <Link className="flex flex-col items-center gap-2 py-2.5 text-center group" to="#">
                                    <div className="rounded-full bg-slate-200 p-3 group-hover:bg-brand-blue transition-colors">
                                        <div className="text-slate-800 group-hover:text-white transition-colors"><TwitterIcon /></div>
                                    </div>
                                    <p className="text-slate-900 text-sm font-medium leading-normal">Twitter</p>
                                </Link>
                                <Link className="flex flex-col items-center gap-2 py-2.5 text-center group" to="#">
                                    <div className="rounded-full bg-slate-200 p-3 group-hover:bg-brand-blue transition-colors">
                                        <div className="text-slate-800 group-hover:text-white transition-colors"><FacebookIcon /></div>
                                    </div>
                                    <p className="text-slate-900 text-sm font-medium leading-normal">Facebook</p>
                                </Link>
                                <Link className="flex flex-col items-center gap-2 py-2.5 text-center group" to="#">
                                    <div className="rounded-full bg-slate-200 p-3 group-hover:bg-brand-blue transition-colors">
                                        <div className="text-slate-800 group-hover:text-white transition-colors"><LinkedInIcon /></div>
                                    </div>
                                    <p className="text-slate-900 text-sm font-medium leading-normal">LinkedIn</p>
                                </Link>
                            </div>
                        </SidebarWidget>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;