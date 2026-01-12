import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ProcessingModal.css';

const ProcessingModal = ({ isOpen, messages }) => {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        if (isOpen && messages && messages.length > 0) {
            setCurrentStep(0);
            const interval = setInterval(() => {
                setCurrentStep((prev) => {
                    if (prev < messages.length - 1) {
                        return prev + 1;
                    }
                    return prev;
                });
            }, 1500);

            return () => clearInterval(interval);
        }
    }, [isOpen, messages]);

    const CheckIcon = () => (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="processing-modal-overlay">
                    <motion.div
                        className="processing-modal-card"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                        <div className="processing-spinner-wrapper">
                            <div className="processing-spinner"></div>
                            <div className="processing-dots">
                                <div className="processing-dot"></div>
                                <div className="processing-dot"></div>
                                <div className="processing-dot"></div>
                            </div>
                        </div>

                        <h2 className="processing-title">Processing</h2>
                        <p className="processing-message">Please wait while we verify your credentials...</p>

                        {messages && messages.length > 0 && (
                            <div className="processing-steps">
                                {messages.map((message, index) => (
                                    <motion.div
                                        key={index}
                                        className={`processing-step ${index < currentStep ? 'completed' : index === currentStep ? 'active' : ''
                                            }`}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <div className={`processing-step-icon ${index < currentStep ? 'completed' : index === currentStep ? 'active' : 'pending'
                                            }`}>
                                            {index < currentStep && <CheckIcon />}
                                        </div>
                                        <div className="processing-step-text">{message}</div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProcessingModal;
