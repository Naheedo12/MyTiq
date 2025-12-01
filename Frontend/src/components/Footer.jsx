function Footer(){
    return(
        <footer className="py-10 px-6 md:px-12 mt-12">
<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
<div>
<h3 className="font-bold text-lg text-green-600">MyTiq</h3>
<p className="text-sm text-gray-600 mt-2">Your ticket to unforgettable experiences.</p>
</div>


<div>
<h4 className="font-semibold mb-3">Quick Links</h4>
<ul className="space-y-2 text-sm text-gray-600">
<li>Home</li>
<li>Events</li>
<li>About Us</li>
<li>Contact</li>
</ul>
</div>


<div>
<h4 className="font-semibold mb-3">Legal</h4>
<ul className="space-y-2 text-sm text-gray-600">
<li>Privacy Policy</li>
<li>Terms of Service</li>
</ul>
</div>


<div>
<h4 className="font-semibold mb-3">Follow Us</h4>
<div className="flex gap-4 text-gray-600 text-xl">
<i className="fab fa-facebook"></i>
<i className="fab fa-twitter"></i>
<i className="fab fa-instagram"></i>
</div>
</div>
</div>
</footer>
    )
}

export default Footer;