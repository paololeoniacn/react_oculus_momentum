import { usePomodoro } from "../context/PomodoroContext";

export default function PomodoroTimer() {
  const { timeLeft, isRunning, sessionType, setIsRunning, startTimestamp } = usePomodoro();

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  function getTimeFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    
    // Recupera ore, minuti e secondi
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    // Ritorna una stringa nel formato "HH:MM:SS"
    return `${hours}:${minutes}:${seconds}`;
  }

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg mt-6 text-center">
      <h2 className="text-xl font-semibold">🍅 Pomodoro Timer</h2>
      <p className={`text-2xl font-bold ${sessionType === "Lavoro" ? "text-red-500" : "text-green-500"}`}>
        {sessionType} - {formatTime(timeLeft)}
      </p>
      <button
        onClick={() => setIsRunning(!isRunning)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        {isRunning ? "⏸ Pausa" : "▶ Riprendi"}
      </button>
      <p>{getTimeFromTimestamp(startTimestamp)}</p>
    </div>
  );
}
