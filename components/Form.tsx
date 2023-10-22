'use client'

import React, { useState } from 'react';

const Form = () => {
  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ name, phoneNumber });

    // clear form after submit
    setName('');
    setPhoneNumber('');
    setSubmitted(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number (optional):</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <button 
          type="submit"
          style={{
            backgroundColor: '#4caf50',
            color: '#fff',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Submit
        </button>
      </form>
      {submitted && (
        <p style={{ marginTop: '1rem', color: '#228B22', textAlign: 'center' }}>
          Submitted! Thank you!
        </p>
      )}
    </div>

    
  );
};

export default Form;