import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ErrorModal.css';

const ErrorModal = ({ isOpen, message, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="error-modal-overlay">
                    <motion.div
                        className="error-modal-card"
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                        <div className="error-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                        </div>
                        <h2 className="error-title">Error</h2>
                        <p className="error-message">{message}</p>
                        <button className="error-dismiss-btn" onClick={onClose}>
                            Try Again
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ErrorModal;
