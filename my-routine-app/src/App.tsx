import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { RoutineProvider } from "./context/RoutineContext";
import { PomodoroProvider } from "./context/PomodoroContext";
import { GamificationProvider } from "./context/GamificationContext";
import { UserProvider, useUser } from "./context/UserContext";
import Home from "./pages/Home";
import AddActivityPage from "./pages/AddActivityPage";
import Gamification from "./components/Gamification";

function Navigation() {
  const { userId } = useUser();

  return (
    <nav className="bg-blue-600 text-white w-full p-4 flex justify-between items-center">
      <div className="flex gap-4">
        <Link to="/">🏠 Home</Link>
        <Link to="/add">➕ Aggiungi Attività</Link>
        <Link to="/gamification">🏆 Gamification</Link>
      </div>
      <span className="text-sm bg-white text-blue-600 px-3 py-1 rounded-lg ml-4">Ciao {userId}</span>
    </nav>
  );
}

function App() {
  return (
    <UserProvider>
      <RoutineProvider>
        <PomodoroProvider>
          <GamificationProvider>
            <Router>
              <div className="min-h-screen flex flex-col items-center bg-blue-100 p-4">
                <Navigation />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/add" element={<AddActivityPage />} />
                  <Route path="/gamification" element={<Gamification />} />
                </Routes>
              </div>
            </Router>
          </GamificationProvider>
        </PomodoroProvider>
      </RoutineProvider>
    </UserProvider>
  );
}

export default App;
