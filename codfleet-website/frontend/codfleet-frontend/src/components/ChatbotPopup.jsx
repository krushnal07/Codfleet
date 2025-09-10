import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X } from 'lucide-react';

const ChatbotPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const chatbotUrl = "https://92f644fcc43e16603c.gradio.live/";

    // Animation variants for the popup window
    const popupVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: { opacity: 1, y: 0, scale: 1 },
    };

    return (
        <>
            {/* --- The Floating Action Button (Chat Bubble) --- */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-colors"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        title="Open Chat Assistant"
                    >
                        <Bot size={32} />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* --- The Chatbot Popup Window --- */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 bg-white rounded-xl shadow-2xl w-[calc(100%-3rem)] sm:w-96 h-[70vh] max-h-[600px] flex flex-col overflow-hidden border border-gray-200"
                        variants={popupVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
                            <h3 className="text-lg font-semibold text-gray-800">Chat with Assistant</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-800"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Iframe Content */}
                        <div className="flex-1 overflow-auto">
                            <iframe
                                src={chatbotUrl}
                                title="CodFleet Chatbot"
                                className="w-full h-full border-0"
                                allow="microphone; camera"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatbotPopup;