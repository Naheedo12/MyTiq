import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../services/auth";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    try {
      const result = await register(name, email, password, confirmPassword);

      if (result.success) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));

        console.log("Inscription réussie:", result.user);
        console.log("Token:", result.token);

        navigate("/");
      } else {
        setError(result.message || "Erreur lors de l'inscription");
      }
    } catch (err) {
      setError("Erreur réseau. Vérifiez votre connexion ou le backend.");
      console.error("Erreur inscription:", err);
    }
  };

  return (
    <div className="bg-[#eef4ec] min-h-screen flex flex-col">
      <div className="flex flex-1 justify-center items-center py-10">
        <div className="bg-white shadow-lg rounded-xl p-10 w-[400px] text-center">

          <div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <span className="text-green-800 text-3xl">
              <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"/>
              </svg>
            </span>
          </div>

          <h2 className="text-xl font-semibold">S'inscrire</h2>
          <p className="text-xs text-gray-500 mb-6">Créer votre compte</p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-left">
              <label className="text-sm">Name :</label>
              <input 
                type="text"
                className="border rounded-full w-full px-3 py-2 text-sm mt-1"
                placeholder="Votre nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="text-left">
              <label className="text-sm">Email :</label>
              <input 
                type="email"
                className="border rounded-full w-full px-3 py-2 text-sm mt-1"
                placeholder="votre@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="text-left">
              <label className="text-sm">Password :</label>
              <input
                type="password"
                className="border rounded-full w-full px-3 py-2 text-sm mt-1"
                placeholder="************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="text-left">
              <label className="text-sm">Confirm password :</label>
              <input
                type="password"
                className="border rounded-full w-full px-3 py-2 text-sm mt-1"
                placeholder="************"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit"
              className="bg-[#40916C] text-white w-full rounded-full py-2 hover:bg-green-800 font-medium"
            >
              S'inscrire
            </button>
          </form>
          
          <p className="text-xs mt-4">
            Vous avez déjà un compte ?{" "}
            <Link to="/login" className="text-green-800">Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
