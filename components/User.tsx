'use client'

import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js'

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

const User = ({ user }) => {

  return (
    <div>
      <h1>hi {user}</h1>
    </div>    
  );
};

export default User;