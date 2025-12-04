import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../services/auth";

function NavBar() {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="w-full flex items-center justify-between px-8 py-4 shadow-sm bg-white">
      <div className="flex items-center gap-2 font-bold text-xl">
        <Link to="/" className="text-[#40916C]">MyTiq</Link>
      </div>

      <nav className="hidden md:flex items-center gap-8 text-sm">
        <Link to="/" className="hover:text-[#40916C] font-medium">Home</Link>
        <Link to="/about" className="hover:text-[#40916C] font-medium">About Us</Link>
        <Link to="/ticket" className="hover:text-[#40916C] font-medium">Tickets</Link>

        {authenticated && (
          <Link to="/dashboard" className="hover:text-[#40916C] font-medium">
            Dashboard
          </Link>
        )}
      </nav>

      <div className="flex items-center gap-4 text-sm">
        {authenticated ? (
          <>
            <span className="text-gray-600">
              Bonjour, {user?.name ?? "Utilisateur"}
            </span>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition font-medium"
            >
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-[#40916C] font-medium">
              Log In
            </Link>

            <Link
              to="/signup"
              className="px-4 py-2 bg-[#40916C] text-white rounded-xl hover:bg-[#2d6a50] transition font-medium"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default NavBar;
