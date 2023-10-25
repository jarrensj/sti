"use client";

import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="name">Name:</Label>
          <Input
            className="mb-4 border-gray-600"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="phoneNumber">Phone Number:</Label>
          <Input
            className="mb-4 border-gray-600"
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="note">Note:</Label>
          <Input
            className="mb-4 border-gray-600"
            type="text"
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-[#4285F4] text-white hover:bg-blue-700 py-6"
          variant="outline"
        >
          Submit
        </Button>
      </form>
      {submitted && (
        <p style={{ marginTop: "1rem", color: "#228B22", textAlign: "center" }}>
          Submitted! Thank you!
        </p>
      )}
    </div>
  );
};

export default Form;
