'use client'

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js'
import styles from './notes.module.css'
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

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const yyyy = date.getFullYear();
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');
  return `${mm}/${dd}/${yyyy} ${hh}:${min}:${ss}`;
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
    <div className={`${roboto.className} ${styles.userNotes}`}>
      <h1>Hi {user}</h1>
      <h2>Notes:</h2>
      <ul>
        {notes?.map((note, index) => (
          <li key={index} className={styles.note}>{note.note} {formatDate(note.created_at)}</li>
        ))}
      </ul>
    </div>
  );
};

type UserProps = {
  user: string;
};

export default User;

