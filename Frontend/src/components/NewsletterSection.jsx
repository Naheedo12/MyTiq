function NewsletterSection(){
    return(
        <section className="bg-green-50 py-16 text-center px-6">
<h2 className="text-2xl font-bold mb-2">Abonnez-vous à notre newsletter</h2>
<p className="text-gray-600 mb-6 text-sm">
Recevez les dernières nouvelles et offres spéciales directement dans votre boîte de réception.
</p>
<div className="max-w-md mx-auto bg-white shadow rounded-full flex items-center p-2">
<input
type="email"
placeholder="Votre adresse e-mail"
className="flex-1 px-4 py-2 rounded-full outline-none"
/>
<button className="px-6 py-2 bg-[#40916C] text-white rounded-full hover:bg-green-700 transition text-sm">
S'abonner
</button>
</div>
</section>
    )
}
export default NewsletterSection;