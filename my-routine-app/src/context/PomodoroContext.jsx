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
  const [isRunning, setIsRunning] = useState(true);
  const [sessionType, setSessionType] = useState("Lavoro");
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const [startTimestamp, setStartTimestamp] = useState(null);

  useEffect(() => {
    if (!isRunning) return;

    console.log("Countdown iniziato!");
    const now = new Date().toISOString();
    setStartTimestamp(now);
    localStorage.setItem("pomodoroStartTimestamp", now); // 🔹 Salva il timestamp in localStorage
    console.log(`⏳ Timer avviato alle: ${now}`);

    playStartSound();  // 🔊 Suono all'inizio del timer

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        //console.log(prevTime);
        
        if (prevTime === 0) {
          playEndSound();  // 🔊 Suono alla fine del timer
          handleSessionEnd();
          return sessionType === "Lavoro" ? SHORT_BREAK : WORK_TIME;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, sessionType]);

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

  const handleSessionEnd = () => {
    if (sessionType === "Lavoro") {
      setCyclesCompleted((prev) => prev + 1);
      setSessionType(cyclesCompleted + 1 === CYCLES_BEFORE_LONG_BREAK ? "Pausa lunga" : "Pausa");
      setTimeLeft(cyclesCompleted + 1 === CYCLES_BEFORE_LONG_BREAK ? LONG_BREAK : SHORT_BREAK);
    } else {
      setSessionType("Lavoro");
      setTimeLeft(WORK_TIME);
    }

    // Notifica quando cambia sessione
    if (Notification.permission === "granted") {
      new Notification(`⏳ ${sessionType === "Lavoro" ? "Pausa" : "Lavoro"} iniziato!`);
    }
  };

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <PomodoroContext.Provider value={{ timeLeft, isRunning, sessionType, setIsRunning, startTimestamp }}>
      {children}
    </PomodoroContext.Provider>
  );
}
