// RedirectModal.js
import React from 'react';

const RedirectModal = ({ isOpen, onRedirect }) => {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ backgroundColor: 'white', padding: 20, borderRadius: 5 }}>
        <p>You are being redirected...</p>
        <button onClick={onRedirect}>Redirect Now</button>
      </div>
    </div>
  );
};

export default RedirectModal;
