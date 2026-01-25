import React from 'react';
import './Loader.css';

function Loader({ text }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2em' }}>
      <div className="loader"></div>
      {text && (
        <div style={{ color: '#888', fontSize: '1rem', marginTop: '0.5em', textAlign: 'center' }}>{text}</div>
      )}
    </div>
  );
}

export default Loader;
