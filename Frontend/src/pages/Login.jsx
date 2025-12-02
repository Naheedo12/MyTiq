import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="bg-[#eef4ec] min-h-screen flex flex-col">

      <div className="flex flex-1 justify-center items-center py-10">
        <div className="bg-white shadow-lg rounded-xl p-10 w-[400px] text-center">

          <div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <span className="text-green-800 text-3xl"><svg class="w-6 h-6 text-green-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
</svg></span>
          </div>

          <h2 className="text-xl font-semibold">Se connecter</h2>
          <p className="text-xs text-gray-500 mb-6">Connectez-vous à votre compte</p>

          <form className="space-y-4">
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

            <button className="bg-[#40916C] text-white w-full rounded-full py-2 hover:bg-green-800">
              se connecter
            </button>
          </form>
          <p className="text-xs mt-4">
            Vous n’avez pas de compte ?{" "}
            <Link to="/signup" className="text-green-800">S’inscrire</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
