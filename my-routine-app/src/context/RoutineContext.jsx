import { createContext, useContext, useState, useEffect } from "react";
import { db, doc, getDoc, setDoc } from "../firebase";
import { useUser } from "./UserContext";

const RoutineContext = createContext();

export function RoutineProvider({ children }) {
  const { userId } = useUser();
  const [tasks, setTasks] = useState([]);

  // 🔹 Attività di default giornaliere con la data corrente
  const getDefaultTasks = () => {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    return [
      { id: `task1-${today}`, activity: "Prendere pappa reale", completed: false, createdAt: today },
      { id: `task2-${today}`, activity: "Riscaldamento", completed: false, createdAt: today },
      { id: `task3-${today}`, activity: "Allenamento 30'", completed: false, createdAt: today },
    ];
  };

  // 🔹 Controlla se esistono già le attività di oggi
  useEffect(() => {
    if (!userId) return;

    const loadTasks = async () => {
      try {
        const userRef = doc(db, "routines", userId);
        const docSnap = await getDoc(userRef);
        const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

        let savedTasks = []; // Inizializziamo un array vuoto

        if (docSnap.exists() && docSnap.data().tasks) {
          savedTasks = Array.isArray(docSnap.data().tasks) ? docSnap.data().tasks : [];
        }

        // 🔹 Controlla se esiste già un'attività per oggi
        const alreadyExists = savedTasks.some(task => task.createdAt === today);

        if (!alreadyExists) {
          const updatedTasks = [...savedTasks, ...getDefaultTasks()];
          setTasks(updatedTasks);
          await setDoc(userRef, { tasks: updatedTasks });
        } else {
          setTasks(savedTasks); // Se esistono, carichiamo quelle salvate
        }
      } catch (error) {
        console.error("Errore nel caricamento delle attività:", error);
      }
    };

    loadTasks();
  }, [userId]);

  // 🔹 Salva le attività aggiornate su Firestore
  const saveTasks = async (newTasks) => {
    if (!userId) return;
    try {
      await setDoc(doc(db, "routines", userId), { tasks: newTasks });
    } catch (error) {
      console.error("Errore nel salvataggio delle attività:", error);
    }
  };

  // 🔹 Aggiunge una nuova attività
  const addTask = async (time, activity) => {
    if (!userId) return;
    const today = new Date().toISOString().split("T")[0];

    const newTask = {
      id: `custom-${Date.now()}`, // ID univoco
      activity,
      completed: false,
      createdAt: today,
      time, // 🔹 Aggiunge anche l'ora della nuova attività
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
  };

  // 🔹 Marca un'attività come completata
  const toggleTask = async (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
  };

  return (
    <RoutineContext.Provider value={{ tasks, toggleTask, addTask }}>
      {children}
    </RoutineContext.Provider>
  );
}

export function useRoutine() {
  return useContext(RoutineContext);
}
