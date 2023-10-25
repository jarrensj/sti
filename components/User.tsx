"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

async function getNotes(user: string) {
  try {
    let { data: notes, error } = await supabase
      .from("notes")
      .select("*")
      .eq("phone_number", user);
    console.log(notes);
    if (error) {
      throw error;
    }
    return notes;
  } catch (error) {
    console.error("Error fetching notes:", error);
    return [];
  }
}

const User = ({ user }: UserProps) => {
  const [notes, setNotes] = useState<any[] | null>([]);

  useEffect(() => {
    async function fetchNotes(user: string) {
      const notesData = await getNotes(user);
      setNotes(notesData);
    }
    fetchNotes(user);
  }, [user]);

  return (
    <div className="bg-blue-100 rounded-md p-6">
      <h1 className="mt-0">Hi {user}</h1>
      <h2>Notes:</h2>
      <ul>
        {notes?.map((note, index) => (
          <li className="my-3" key={index}>
            {note.note}
          </li>
        ))}
      </ul>
    </div>
  );
};

type UserProps = {
  user: string;
};

export default User;
