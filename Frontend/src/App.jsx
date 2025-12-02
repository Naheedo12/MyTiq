import { Route, Routes } from "react-router-dom"
import Footer from "./components/Footer"
import NavBar from "./components/NavBar"
import Home from "./pages/Home"
import Signup from './pages/Signup';
import Login from './pages/Login';
import EventDetail from "./pages/EventDetail";
import Ticket from "./pages/Ticket";

function App() {

  return (
    <>
      <NavBar/>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
         <Route path="/EventDetail" element={<EventDetail/>}/>
         <Route path="/Ticket" element={<Ticket/>}/>
      </Routes>
      
      <Footer/>
    </>
  )
}

export default App
