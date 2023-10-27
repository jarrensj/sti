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
  return date.toLocaleDateString('en-us', {
    weekday:"long",
    year:"numeric",
    month:"short",
    day:"numeric",
    hour:"2-digit",
    minute:"2-digit",
    second:"2-digit"
  })
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
      {user && 
        <>
          <h1>Phone Number: {user}</h1>
          {notes?.length ? 
            <>
              <h2>Notes:</h2>
              <ul>
                {notes?.map((note, index) => (
                  <li key={index} className={styles.note}>
                    <div className={styles.card}>
                      <div className={styles.body}>
                      {note.note} 
                      </div>
                      <div className={styles.bottom}>
                        Message was sent on {formatDate(note.created_at)}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </> : (
              <h2>There are no notes.</h2>
            )
          }
        </> 
      }
    </div>
  );
};

type UserProps = {
  user: string;
};

export default User;

