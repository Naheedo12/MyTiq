import { Route, Routes, Navigate } from "react-router-dom"
import Footer from "./components/Footer"
import NavBar from "./components/NavBar"
import Home from "./pages/Home"
import Signup from './pages/Signup';
import Login from './pages/Login';
import EventDetail from "./pages/EventDetail";
import Dashboard from "./pages/Dashboard";
import Ticket from "./pages/Ticket";
import PageLayout from "./pages/Propos"; 
import { isAuthenticated, getCurrentUser } from "./services/auth";
import TicketTable from "./components/TicketTable";

// Evaluates auth on every render, so it reacts to localStorage changes
function ProtectedRoute({ children, adminOnly = false }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  if (adminOnly) {
    const user = getCurrentUser();
    if (!user || user.role !== "admin") {
      return <Navigate to="/" replace />;
    }
  }
  return children;
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<><NavBar /><Home /><Footer /></>} />
        <Route path="/signup" element={<><NavBar /><Signup /><Footer /></>} />
        <Route path="/login" element={<><NavBar /><Login /><Footer /></>} />
        <Route path="/eventDetail/:id" element={<><NavBar /><EventDetail /><Footer /></>} />
        <Route path="/about" element={<><NavBar /><PageLayout /><Footer /></>} />
        
        <Route path="/ticket" element={
          <ProtectedRoute>
            <NavBar /><Ticket /><Footer />
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard" element={
          <ProtectedRoute adminOnly>
            <Dashboard />
          </ProtectedRoute>
        } />

      </Routes>
    </>
  )
}

export default App