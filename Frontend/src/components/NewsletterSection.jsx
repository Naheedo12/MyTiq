import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";

function NewsletterSection() {
  const [email, setEmail] = useState("");

  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const { addNew } = useContext(AppContext);

  const handelSupmit = async (e) => {
    e.preventDefault();
    setStatusMessage("");
    setIsError(false);
    if (!email) {
      setIsError(true);
      setStatusMessage("Veuillez entrer une adresse e-mail.");
      return;
    }
    try {
      await addNew(email);
      setEmail("");
      setIsError(false);
      setStatusMessage(
        " Votre adresse e-mail a été enregistrée avec succès !"
      );
      
      setTimeout(() => setStatusMessage(""), 5000);
    } catch (err) {
      console.error("Erreur lors de l'ajout :", err);
      setIsError(true);
      setStatusMessage(
        "❌ Enregistrement échoué : Email erroné ou déjà utilisé. Veuillez réessayer."
      );
    }
  };
  
  return (
    <section className="bg-green-50 py-16 text-center px-6">
      <h2 className="text-2xl font-bold mb-2">
        Abonnez-vous à notre newsletter
      </h2>
      <p className="text-gray-600 mb-6 text-sm">
        Recevez les dernières nouvelles et offres spéciales directement dans
        votre boîte de réception.
      </p>
      <form onSubmit={handelSupmit}>
        <div className="max-w-md mx-auto bg-white shadow rounded-full flex items-center p-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre adresse e-mail"
            className="flex-1 px-4 py-2 rounded-full outline-none"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-[#40916C] text-white rounded-full hover:bg-green-700 transition text-sm"
          >
            S'abonner
          </button>
        </div>
      </form>
      {statusMessage && (
        <p 
          className={`mt-4 max-w-md mx-auto p-3 rounded-lg font-medium text-sm transition-opacity duration-300
            ${isError 
              ? 'bg-red-100 text-red-700 border border-red-400' 
              : 'bg-green-100 text-green-700 border border-green-400'
            }`
          }
        >
          {statusMessage}
        </p>
      )}
    </section>
  );
}
export default NewsletterSection;