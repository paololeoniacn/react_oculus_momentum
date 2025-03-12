import { useRoutine } from "../context/RoutineContext";

export default function RoutineDashboard() {
  const { tasks, toggleTask } = useRoutine();

  return (
    <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-xl font-semibold text-center mb-4">📋 Routine Giornaliera</h2>

      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">Nessuna attività aggiunta.</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id} // 🔹 Ora usiamo Firestore ID invece dell'index
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition ${
                task.completed ? "bg-gray-300 text-gray-600 line-through" : "bg-blue-100 hover:bg-blue-200"
              }`}
              onClick={() => toggleTask(task.id)}
            >
              <span>
                {task.createdAt ? new Date(task.createdAt).toLocaleDateString("it-IT", { day: "2-digit", month: "short" }) + " - " : "noDate "}
                {task.activity}
              </span>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="w-5 h-5"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
