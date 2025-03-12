import { usePomodoro } from "../context/PomodoroContext";

export default function PomodoroTimer() {
  const { timeLeft, isRunning, sessionType, setIsRunning } = usePomodoro();

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

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
    </div>
  );
}
