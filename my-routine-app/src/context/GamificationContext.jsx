import { createContext, useContext, useState, useEffect } from "react";
import { db, collection, getDoc, setDoc, doc } from "../firebase";
import { useUser } from "./UserContext";

const GamificationContext = createContext();

export function GamificationProvider({ children }) {
  const { userId } = useUser();
  const [streak, setStreak] = useState(0);
  const [badges, setBadges] = useState([]);

  // 🔹 Carica i progressi da Firestore
  useEffect(() => {
    if (!userId) return;

    const loadProgress = async () => {
      try {
        const userRef = doc(db, "users", userId);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setStreak(data.streak);
          setBadges(data.badges);
        }
      } catch (error) {
        console.error("Errore nel caricamento dei dati:", error);
      }
    };

    loadProgress();
  }, [userId]);

  // 🔹 Salva i progressi in Firestore
  const saveProgress = async (newStreak, newBadges) => {
    if (!userId) return;
    try {
      await setDoc(doc(db, "users", userId), {
        streak: newStreak,
        badges: newBadges,
      });
    } catch (error) {
      console.error("Errore nel salvataggio:", error);
    }
  };

  // 🔹 Incrementa streak e assegna badge
  const completeTraining = async () => {
    const newStreak = streak + 1;
    let newBadges = [...badges];

    if (newStreak === 7 && !newBadges.includes("🏅 Disciplina")) {
      newBadges.push("🏅 Disciplina");
    }
    if (newStreak === 30 && !newBadges.includes("🔥 Hardcore")) {
      newBadges.push("🔥 Hardcore");
    }

    setStreak(newStreak);
    setBadges(newBadges);
    await saveProgress(newStreak, newBadges);
  };

  return (
    <GamificationContext.Provider value={{ streak, badges, completeTraining }}>
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification() {
  return useContext(GamificationContext);
}
