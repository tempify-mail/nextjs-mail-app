'use client';

import { useState } from "react";

type FormData = {
  rank: string;
  win_teams: string;
  entry: string;
  spots: string;
  team_1: string;
  team_2: string;
  id: string;
  name: string;
  contest: string;
  prices: string;
  prize_pool: string;
  email: string;
  subject: string;
  message: string;
};

export default function HomePage() {
  const [form, setForm] = useState<FormData>({
    rank: "",
    win_teams: "",
    entry: "",
    spots: "",
    prize_pool: "",
    name: "",
    email: "",
    subject: "",
    message: "",
    team_1: "",
    team_2: "",
    id: "",
    contest: "",
    prices: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("Mail sent successfully!");
        setForm({
          rank: "",
          win_teams: "",
          entry: "",
          spots: "",
          prize_pool: "",
          name: "",
          email: "",
          subject: "",
          message: "",
          team_1: "",
          team_2: "",
          id: "",
          contest: "",
          prices: "",
        });
      } else {
        setStatus(data.error || "Failed to send mail");
      }
    } catch (error) {
      console.error(error);
      setStatus("Error sending mail");
    }
  };

  const fields = [
    { name: 'team_1', label: 'Team 1' },
    { name: 'team_2', label: 'Team 2' },
    { name: 'name', label: 'Your Name' },
    { name: 'id', label: 'ID' },
    { name: 'contest', label: 'Contest' },
    { name: 'prices', label: 'Prices' },
    { name: 'prize_pool', label: 'Prize Pool' },
    { name: 'spots', label: 'Spots' },
    { name: 'entry', label: 'Entry' },
    { name: 'win_teams', label: 'Winning Teams' },
    { name: 'rank', label: 'Rank' },
    { name: 'email', label: 'Email Address', type: 'email' },
    { name: 'subject', label: 'Subject' , isTextarea: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-200 to-purple-300 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-6 sm:p-10 border-4 border-pink-400">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-10 text-pink-700 drop-shadow-lg">
          🎨 Enter Contest Details
        </h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {fields.map((field) => (
            <div key={field.name} className="col-span-1">
              <label
                htmlFor={field.name}
                className="block text-sm font-bold text-gray-800 mb-2"
              >
                {field.label}
              </label>
              {field.isTextarea ? (
                <textarea
                  name={field.name}
                  id={field.name}
                  value={form[field.name as keyof FormData]}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-3 border-2 border-purple-300 bg-yellow-50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  required
                />
              ) : (
                <input
                  type={field.type || "text"}
                  name={field.name}
                  id={field.name}
                  value={(form as any)[field.name]}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-purple-300 bg-yellow-50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  required
                />
              )}
            </div>
          ))}
          <div className="col-span-1 sm:col-span-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white py-3 rounded-xl font-extrabold text-lg hover:opacity-95 transition duration-300 shadow-md"
            >
              🚀 Send Now
            </button>
          </div>
        </form>
        {status && (
          <p className="text-center mt-6 text-base text-purple-700 animate-pulse font-semibold">
            {status}
          </p>
        )}
      </div>
    </div>
  );
}
