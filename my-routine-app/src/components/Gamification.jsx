import { useGamification } from "../context/GamificationContext";

export default function Gamification() {
  const { streak, badges, completeTraining } = useGamification();

  return (
    <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-xl font-semibold text-center mb-4">🏆 Gamification</h2>
      <p className="text-lg font-medium">🔥 Giorni consecutivi: {streak}</p>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">🏅 Badge:</h3>
        {badges.length > 0 ? (
          <ul className="flex gap-2 mt-2">
            {badges.map((badge, index) => (
              <li key={index} className="text-3xl">{badge}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Nessun badge ancora guadagnato...</p>
        )}
      </div>

      <button
        onClick={completeTraining}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        ✅ Ho completato l'allenamento!
      </button>
    </div>
  );
}
