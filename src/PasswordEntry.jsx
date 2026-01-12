import React, { useState } from 'react';
import './PasswordEntry.css';

const PasswordEntry = ({ email, onBack, onSubmit, password, setPassword }) => {
    // Arrow Left Icon (SVG)
    const ArrowLeft = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    // Arrow Right Icon (SVG)
    const ArrowRight = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    const isNextActive = password.length > 0;

    return (
        <div className="password-screen-container">
            <h2>Enter your password</h2>
            <p>
                for <strong>{email}</strong>
            </p>

            <div className="input-wrapper">
                <input
                    type="password"
                    className="password-input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && isNextActive) {
                            onSubmit(e);
                        }
                    }}
                />
            </div>

            <div style={{ fontSize: '14px', color: '#555', marginBottom: '20px' }}>
                Tip: Make sure it's your Uber password
            </div>

            {/* <div style={{ marginBottom: 'auto' }}>
                 <button className="resend-btn" style={{ background: '#f6f6f6', border: 'none', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '500' }}>
                    I forgot my password
                 </button>
            </div> */}

            <div className="password-actions">
                <button type="button" className="back-btn" onClick={onBack}>
                    <ArrowLeft />
                </button>
                <button
                    type="button"
                    className={`next-btn ${isNextActive ? 'active' : ''}`}
                    onClick={(e) => isNextActive && onSubmit(e)}
                    disabled={!isNextActive}
                >
                    Next <ArrowRight />
                </button>
            </div>
        </div>
    );
};

export default PasswordEntry;
