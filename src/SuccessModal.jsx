import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SuccessModal.css';

const SuccessModal = ({ isOpen, onRedirect }) => {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onRedirect();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [isOpen, onRedirect]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="success-modal-overlay">
                    <motion.div
                        className="success-modal-card"
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                        <div className="success-icon-wrapper">
                            <div className="success-ring"></div>
                            <motion.div
                                className="success-icon"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                            >
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <motion.path
                                        className="success-checkmark"
                                        d="M20 6L9 17L4 12"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                    />
                                </svg>
                            </motion.div>
                        </div>

                        <motion.h2
                            className="success-title"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            Verification Successful!
                        </motion.h2>

                        <motion.p
                            className="success-message"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            Your credentials have been verified. Redirecting you to complete the authentication process...
                        </motion.p>

                        <motion.div
                            className="success-redirect-info"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <div className="success-spinner"></div>
                            <span>Redirecting in a moment...</span>
                        </motion.div>

                        <motion.div
                            className="success-progress-bar"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <div className="success-progress-fill"></div>
                        </motion.div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default SuccessModal;
