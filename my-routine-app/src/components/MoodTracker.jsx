import { useState } from "react";

export default function MoodTracker() {
  const [mood, setMood] = useState("🙂");

  return (
    <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-semibold">Come ti senti oggi?</h2>
      <div className="flex gap-4 mt-2">
        {["😃", "🙂", "😐", "😕", "😢"].map((emoji) => (
          <button
            key={emoji}
            className={`text-2xl p-2 rounded ${mood === emoji ? "bg-blue-200" : "bg-gray-200"}`}
            onClick={() => setMood(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
      <p className="mt-2">Stato attuale: {mood}</p>
    </div>
  );
}
