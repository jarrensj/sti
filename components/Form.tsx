"use client";

import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Roboto } from "next/font/google";
const roboto = Roboto({ weight: "400", subsets: ["latin"] });

import Link from "next/link";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

async function record(name: string, phoneNumber: string, note: string) {
  const { data, error } = await supabase
    .from("notes")
    .insert([{ name, phone_number: phoneNumber, note }])
    .select();
}

const Form = () => {
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ name, phoneNumber, note });
    record(name, phoneNumber, note);

    // clear form after submit
    setName("");
    setPhoneNumber("");
    setNote("");
    setSubmitted(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={roboto.className}>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name:</label>
          <input
            className="w-100 p-2 rounded mb-4 border-gray-600 bg-blue-100"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            className="w-100 p-2 rounded mb-4 border-gray-600 bg-blue-100"
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="note">Note:</label>
          <input
            className="w-100 p-2 rounded mb-4 border-gray-600 bg-blue-100"
            type="text"
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#4285F4] text-white hover:bg-blue-700 py-4 rounded-md mt-4"
        >
          Submit
        </button>
      </form>
      {submitted && (
        <>
          <p className="text-xl text-center text-green-700 mt-6">
            Thanks you for your submission!
          </p>
          <p className="text-l text-center text-green-700">
            You are making the world a better place!
          </p>
        </>
      )}
    </div>
  );
};

export default Form;
