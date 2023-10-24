'use client'

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "" 
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || ""
const supabase = createClient(supabaseUrl, supabaseKey)

async function getNotes(user) {
  try {
    let { data: notes, error } = await supabase.from('notes').select('*').eq('phone_number', user);
    console.log(notes);
    if (error) {
      throw error;
    }
    return notes;
  } catch (error) {
    console.error('Error fetching notes:', error.message);
    return [];
  }
}

const User = ({ user }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function fetchNotes(user) {
      const notesData = await getNotes(user);
      setNotes(notesData);
    }
    fetchNotes(user);
  }, [user]);

  return (
    <div>
      <h1>Hi {user}</h1>
      <h2>Notes:</h2>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>{note.note}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;