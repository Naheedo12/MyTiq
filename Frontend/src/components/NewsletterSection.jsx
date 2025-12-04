import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";

function NewsletterSection(){
    const [email,setEmail]=useState('');
    const { addNew }=useContext(AppContext);

    const handelSupmit= async(e)=>{
         e.preventDefault();
if (!email) return alert("Veuillez entrer un email");
try{
await addNew(email);

         setEmail('');
} catch (err) {
      console.error("Erreur lors de l'ajout :", err);
      alert("Une erreur est survenue lors de l'ajout email.");
    
}
    }
    return(
        <section className="bg-green-50 py-16 text-center px-6">
<h2 className="text-2xl font-bold mb-2">Abonnez-vous à notre newsletter</h2>
<p className="text-gray-600 mb-6 text-sm">
Recevez les dernières nouvelles et offres spéciales directement dans votre boîte de réception.
</p>
<form onSubmit={handelSupmit}>
<div className="max-w-md mx-auto bg-white shadow rounded-full flex items-center p-2">
<input
type="email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
placeholder="Votre adresse e-mail"
className="flex-1 px-4 py-2 rounded-full outline-none"
/>
<button type="submit" className="px-6 py-2 bg-[#40916C] text-white rounded-full hover:bg-green-700 transition text-sm">
S'abonner
</button>
</div>
</form>
</section>
    )
}
export default NewsletterSection;