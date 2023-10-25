'use client'

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js'
import { Roboto } from 'next/font/google';
const roboto = Roboto({ weight: "400", subsets: ['latin'] })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "" 
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || ""
const supabase = createClient(supabaseUrl, supabaseKey)

async function getNotes(user:string) {
  try {
    let { data: notes, error } = await supabase.from('notes').select('*').eq('phone_number', user);
    console.log(notes);
    if (error) {
      throw error;
    }
    return notes;
  } catch (error) {
    console.error('Error fetching notes:', error);
    return [];
  }
}

const User = ({ user }: UserProps ) => {
  const [notes, setNotes] = useState<any[] | null>([]);

  useEffect(() => {
    async function fetchNotes(user:string) {
      const notesData = await getNotes(user);
      setNotes(notesData);
    }
    fetchNotes(user);
  }, [user]);

  return (
    <div className={roboto.className}>
      {user ? (<h1>Hi {user}</h1>) : ''}
      {notes?.length == null ? (
        <div>
          <h2>Notes:</h2>
          <ul>
            {notes?.map((note, index) => (
              <li key={index}>{note.note}</li>
            ))}
          </ul>
        </div>
      ) : (
        <h2>Please verify your number to view your notes.</h2>
      )}
      
    </div>
  );
};

type UserProps = {
  user: string;
};

export default User;

