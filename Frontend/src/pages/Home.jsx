import { useState } from "react";
import EventCard from "../components/EventCard";
import HeroSection from "../components/HeroSection";
import NewsletterSection from "../components/NewsletterSection";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (query) => {
        setSearchQuery(query);
        // Scroll vers la section des événements
        const eventsSection = document.querySelector('section');
        if (eventsSection) {
            eventsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <>
            <HeroSection onSearch={handleSearch} />
            <EventCard searchQuery={searchQuery} />
            <NewsletterSection />
        </>
    );
}

export default Home;