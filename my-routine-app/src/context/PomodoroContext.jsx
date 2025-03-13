import { createContext, useContext, useState, useEffect } from "react";

const PomodoroContext = createContext(null);

export const usePomodoro = () => {
  const context = useContext(PomodoroContext);
  if (!context) {
    throw new Error("usePomodoro deve essere usato dentro un PomodoroProvider");
  }
  return context;
};

export function PomodoroProvider({ children }) {
  const WORK_TIME = 25 * 60;
  const SHORT_BREAK = 5 * 60;
  const LONG_BREAK = 15 * 60;
  const CYCLES_BEFORE_LONG_BREAK = 4;

  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState("Lavoro");
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const [startTimestamp, setStartTimestamp] = useState(null);

  // 🔹 Recupera lo stato salvato su localStorage all'avvio
  useEffect(() => {
    const savedTimestamp = localStorage.getItem("pomodoroStartTimestamp");

    if (savedTimestamp) {
      const now = Date.now();
      const elapsed = Math.floor((now - parseInt(savedTimestamp)) / 1000);
      let remainingTime = WORK_TIME - elapsed;

      if (remainingTime <= 0) {
        handleSessionEnd();
      } else {
        setTimeLeft(remainingTime);
        setIsRunning(true);
        setStartTimestamp(parseInt(savedTimestamp));
      }
    }
  }, []);

  // 🔹 Aggiorna `timeLeft` ogni secondo SENZA usare `setInterval`
  useEffect(() => {
    if (!isRunning || !startTimestamp) return;

    const updateTimer = () => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTimestamp) / 1000);
      const remainingTime = Math.max(WORK_TIME - elapsed, 0);

      setTimeLeft(remainingTime);

      if (remainingTime <= 0) {
        handleSessionEnd();
      }
    };

    // 🔹 Chiama `updateTimer` ogni secondo
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [isRunning, startTimestamp]);

  // 🔊 Suono all'inizio del timer (tono acuto breve)
  const playStartSound = () => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = context.createOscillator();
    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(1000, context.currentTime);
    oscillator.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.2);
  };

   // 🔊 Suono alla fine del timer (tono grave più lungo)
   const playEndSound = () => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = context.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(440, context.currentTime);
    oscillator.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.5);
  };

  // 🔹 Avvia il timer
  const startTimer = () => {
    const now = Date.now();
    setStartTimestamp(now);
    setIsRunning(true);
    setTimeLeft(WORK_TIME);

    localStorage.setItem("pomodoroStartTimestamp", now.toString());
    playStartSound(); // 🔊 Suono all'avvio del timer
  };

  // 🔹 Resetta il timer e lo riavvia
  const resetTimer = () => {
    localStorage.removeItem("pomodoroStartTimestamp");
    startTimer();
  };

  // 🔹 Gestisce il cambio di sessione al termine del timer
  const handleSessionEnd = () => {
    setStartTimestamp(null);
    localStorage.removeItem("pomodoroStartTimestamp");
    
    playEndSound(); // 🔊 Suono alla fine del timer

    if (sessionType === "Lavoro") {
      setCyclesCompleted((prev) => prev + 1);
      setSessionType(cyclesCompleted + 1 === CYCLES_BEFORE_LONG_BREAK ? "Pausa lunga" : "Pausa");
      setTimeLeft(cyclesCompleted + 1 === CYCLES_BEFORE_LONG_BREAK ? LONG_BREAK : SHORT_BREAK);
    } else {
      setSessionType("Lavoro");
      setTimeLeft(WORK_TIME);
    }

    if (Notification.permission === "granted") {
      new Notification(`⏳ ${sessionType === "Lavoro" ? "Pausa" : "Lavoro"} iniziato!`);
    }

    startTimer();
  };

  return (
    <PomodoroContext.Provider value={{ timeLeft, isRunning, sessionType, setIsRunning, startTimestamp, startTimer, resetTimer }}>
      {children}
    </PomodoroContext.Provider>
  );
}
