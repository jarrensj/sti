'use client'

import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "" 
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || ""
const supabase = createClient(supabaseUrl, supabaseKey)

async function record(phoneNumber:string, note:string) {
    const { data, error } = await supabase
      .from('notes')
      .insert([
        {phone_number: phoneNumber, note },
      ])
      .select()
}

const Form = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    record(phoneNumber, note);

    // clear form after submit
    setPhoneNumber(''); 
    setNote('');
    setSubmitted(true);
  };

  const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '300px',
    margin: '0 auto',
  };

  const descriptionStyle = {
    fontSize: '12px',
    color: '#696969',
  };

  const labelStyle = {
    display: 'block',
  };

  const inputStyle = {
    marginBottom: '1rem',
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
  };

  const textareaStyle = {
    ...inputStyle,
    height: '100px',
    width: '300px' 
  };

  return (
    <div style={formStyle}>
      <h1>Form</h1>
      <p style={descriptionStyle}>
        Enter their phone number and what message you want to send. <br />
        They will have to verify with their number to be able to view messages sent to that number.
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="phoneNumber" style={labelStyle}>Their phone number: </label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label htmlFor="note" style={labelStyle}>Message: </label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={textareaStyle}
            required
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
            width: '100px'
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