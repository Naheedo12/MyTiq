import { Link } from "react-router-dom";

function NavBar() {
  return (
    <header className="w-full flex items-center justify-between px-8 py-4 shadow-sm bg-white">
      <div className="flex items-center gap-2 font-bold text-xl">
        <span className="text-[#40916C]">MyTiq</span>
      </div>

      <nav className="hidden md:flex items-center gap-8 text-sm">
        <Link to="/" className="hover:text-[#40916C] font-medium">
          Home
        </Link>
        <Link to="/about" className="hover:text-[#40916C] font-medium">
          About Us
        </Link>
        <Link to="/ticket" className="hover:text-[#40916C] font-medium">
          Tickets
        </Link>
        <Link to="/dashboard" className="hover:text-[#40916C] font-medium">
          Dashboard
        </Link>
      </nav>

      <div className="flex items-center gap-4 text-sm">
        <Link to="/login" className="hover:text-[#40916C] font-medium">
          Log In
        </Link>

        <Link
          to="/signup"
          className="px-4 py-2 bg-[#40916C] text-white rounded-xl hover:bg-[#2d6a50] transition font-medium"
        >
          Sign Up
        </Link>
      </div>
    </header>
  );
}

export default NavBar;