import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ThankYou.css';

const ThankYou = ({ isOpen }) => {
    const CheckCircleIcon = () => (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="thankyou-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="thankyou-sparkles">
                        <div className="sparkle"></div>
                        <div className="sparkle"></div>
                        <div className="sparkle"></div>
                        <div className="sparkle"></div>
                        <div className="sparkle"></div>
                        <div className="sparkle"></div>
                    </div>

                    <motion.div
                        className="thankyou-content"
                        initial={{ scale: 0.8, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ delay: 0.2, type: "spring", damping: 20 }}
                    >
                        <div className="thankyou-icon-wrapper">
                            <div className="thankyou-rings">
                                <div className="thankyou-ring"></div>
                                <div className="thankyou-ring"></div>
                                <div className="thankyou-ring"></div>
                            </div>
                            <motion.div
                                className="thankyou-icon"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                            >
                                <CheckCircleIcon />
                            </motion.div>
                        </div>

                        <h1 className="thankyou-title">All Set!</h1>
                        <h2 className="thankyou-subtitle">Account Updated Successfully</h2>
                        <p className="thankyou-message">
                            Thank you for updating your information. Your account has been secured and all changes have been saved.
                            You can now enjoy a seamless experience with enhanced security.
                        </p>
                        <div className="thankyou-footer">
                            <span>Made with</span>
                            <span className="thankyou-heart">♥</span>
                            <span>by Uber Eats Team</span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ThankYou;
