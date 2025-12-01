import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="bg-[#eef4ec] min-h-screen flex flex-col">
      <div className="flex flex-1 justify-center items-center py-10">
        <div className="bg-white shadow-lg rounded-xl p-10 w-[400px] text-center">

          <div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <span className="text-green-600 text-3xl">📝</span>
          </div>

          <h2 className="text-xl font-semibold">S’inscrire</h2>
          <p className="text-xs text-gray-500 mb-6">Créer votre compte</p>

          <form className="space-y-4">
            <div className="text-left">
              <label className="text-sm">Name :</label>
              <input className="border rounded-full w-full px-3 py-2 text-sm mt-1"
                placeholder="Votre name" />
            </div>

            <div className="text-left">
              <label className="text-sm">Email :</label>
              <input className="border rounded-full w-full px-3 py-2 text-sm mt-1"
                placeholder="votre@example.com" />
            </div>

            <div className="text-left">
              <label className="text-sm">Password :</label>
              <input
                type="password"
                className="border rounded-full w-full px-3 py-2 text-sm mt-1"
                placeholder="************"
              />
            </div>

            <div className="text-left">
              <label className="text-sm">Confirm password :</label>
              <input
                type="password"
                className="border rounded-full w-full px-3 py-2 text-sm mt-1"
                placeholder="************"
              />
            </div>

            <button className="bg-green-600 text-white w-full rounded-full py-2 hover:bg-green-700">
              S’inscrire
            </button>
          </form>
          <p className="text-xs mt-4">
            Vous avez déjà un compte ?{" "}
            <Link to="/login" className="text-green-700">Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
