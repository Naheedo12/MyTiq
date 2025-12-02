import { Route, Routes } from "react-router-dom"
import Footer from "./components/Footer"
import NavBar from "./components/NavBar"
import Home from "./pages/Home"
import Signup from './pages/Signup';
import Login from './pages/Login';
import EventDetail from "./pages/EventDetail";
import Dashboard from "./pages/Dashboard";

function App() {

  return (
    <>
  <Routes>
      <Route path="/" element={<><NavBar /><Home /><Footer /></>} />
      <Route path="/signup" element={<><NavBar /><Signup /><Footer /></>} />
      <Route path="/login" element={<><NavBar /><Login /><Footer /></>} />
      <Route path="/ticket" element={<><NavBar /><Ticket /><Footer /></>} />
      <Route path="/eventDetail" element={<><NavBar /><EventDetail /><Footer /></>} />

      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
    </>
  )
}

export default App
