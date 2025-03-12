import RoutineDashboard from "../components/RoutineDashboard";
import MoodTracker from "../components/MoodTracker";
import PomodoroTimer from "../components/PomodoroTimer";

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 text-center mt-4">
        Assistente Routine
      </h1>
      <PomodoroTimer />
      <RoutineDashboard />
      <MoodTracker />
    </div>
  );
}
