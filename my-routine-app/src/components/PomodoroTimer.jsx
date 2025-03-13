import { usePomodoro } from "../context/PomodoroContext";

export default function PomodoroTimer() {
  const { timeLeft, isRunning, sessionType, cyclesCompleted,setIsRunning, startTimestamp, startTimer, resetTimer } = usePomodoro();

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  function getTimeFromTimestamp(timestamp) {
    if (!timestamp) return "N/A"; // 🔹 Evita errori se il timestamp è null

    const date = new Date(parseInt(timestamp));
    
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
          onClick={resetTimer}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          🔄 Reset
        </button>
        <p className="text-gray-700 mt-2">🔄 Cicli completati: {cyclesCompleted}</p>
        <p>⏱ Ultimo Timer Iniziato alle: {getTimeFromTimestamp(startTimestamp)}</p>
    </div>
  );
}
