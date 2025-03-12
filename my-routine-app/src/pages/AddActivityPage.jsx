import { useState, useEffect } from "react";
import { useRoutine } from "../context/RoutineContext";
import { useNavigate } from "react-router-dom";

export default function AddActivityPage() {
  const { addTask } = useRoutine();
  const [time, setTime] = useState("");
  const [activity, setActivity] = useState("");
  const navigate = useNavigate();

  // Aggiorna automaticamente l'ora attuale quando il componente viene caricato
  useEffect(() => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" });
    setTime(formattedTime);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (time && activity) {
      addTask(time, activity);
      navigate("/"); // Torna alla home
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-semibold">Aggiungi Nuova Attività</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        {/* <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          required
        /> */}
        {/* 👇 Input nascosto con ora attuale */}
        <input 
          type="time" 
          value={time} 
          onChange={(e) => setTime(e.target.value)} 
          hidden 
        />

        <input
          type="text"
          placeholder="Descrizione attività"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Aggiungi Attività
        </button>
      </form>
    </div>
  );
}
