'use client'

import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js'
import { Roboto } from 'next/font/google';
const roboto = Roboto({ weight: "400", subsets: ['latin'] })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "" 
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || ""
const supabase = createClient(supabaseUrl, supabaseKey)

async function record(name:string, phoneNumber:string, note:string) {
    const { data, error } = await supabase
      .from('notes')
      .insert([
        { name, phone_number: phoneNumber, note },
      ])
      .select()
}

const Form = () => {
  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ name, phoneNumber, note });
    record(name, phoneNumber, note);

    // clear form after submit
    setName('');
    setPhoneNumber(''); 
    setNote('');
    setSubmitted(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={roboto.className}>
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
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
            required
          />
        </div>
        <div>
          <label htmlFor="note">Note:</label>
          <input
            type="text"
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
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