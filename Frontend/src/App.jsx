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
import { isAuthenticated } from "./services/auth";

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
          isAuthenticated() ? (
            <><NavBar /><Ticket /><Footer /></>
          ) : (
            <Navigate to="/login" replace />
          )
        } />
        
        <Route path="/dashboard" element={
          isAuthenticated() ? (
            <Dashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        } />
      </Routes>
    </>
  )
}

export default App