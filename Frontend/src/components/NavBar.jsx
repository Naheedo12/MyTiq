function NavBar(){
    return(
     <header className="w-full flex items-center justify-between px-8 py-4 shadow-sm bg-white">
<div className="flex items-center gap-2 font-bold text-xl">
<span className="text-[#40916C]">MyTiq</span>
</div>
<nav className="hidden md:flex items-center gap-8 text-sm">
<a href="#" className="hover:text-[#40916C] font-medium">Home</a>
<a href="#" className="hover:text-[#40916C] font-medium">About Us</a>
<a href="#" className="hover:text-[#40916C] font-medium">Events</a>
<a href="#" className="hover:text-[#40916C] font-medium">Contact</a>
</nav>
<div className="flex items-center gap-4 text-sm">
<button className="hover:text-[#40916C] font-medium">Log In</button>
<button className="px-4 py-2 bg-[#40916C] text-white rounded-xl hover:bg-[#40916C] transition font-medium">Sign Up</button>
</div>
</header>
    )
}
export default NavBar;