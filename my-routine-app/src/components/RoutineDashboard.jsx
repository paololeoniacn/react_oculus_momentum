import { useRoutine } from "../context/RoutineContext";

export default function RoutineDashboard() {
  const { tasks, toggleTask } = useRoutine();

  return (
    <div id="RoutineDashboard" className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-xl font-semibold text-center mb-4">📋 Routine Giornaliera</h2>

      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">Nessuna attività aggiunta.</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id} // 🔹 Ora usiamo Firestore ID invece dell'index
              className={`flex flex-col items-start justify-between p-3 rounded-lg cursor-pointer transition ${
                task.completed ? "bg-gray-300 text-gray-600 line-through" : "bg-blue-100 hover:bg-blue-200"
              }`}
              onClick={() => toggleTask(task.id)}
            >
              <span className="break-words whitespace-normal w-full">
                {task.createdAt
                  ? new Date(task.createdAt).toLocaleDateString("it-IT", { day: "2-digit", month: "short" }) + " - "
                  : "noDate "}
                {/* 🔹 Se il contenuto ha un link, renderizzalo come HTML */}
                <span dangerouslySetInnerHTML={{ __html: task.activity }} />
              </span>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="w-5 h-5 mt-2 self-end"
              />
            </li>
          ))}
        </ul>
      )}
    </div>

  );
}
