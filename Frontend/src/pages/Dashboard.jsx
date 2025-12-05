import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import EventTable from "../components/EventTable";
import TicketTable from "../components/TicketTable";
import { useState } from "react";
import NewsletterTable from "../components/NewsletterTable";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("events");

  const renderContent = () => {
    switch (activeSection) {
      case "events":
        return <EventTable />;
      case "tickets":
        return <TicketTable />;
      case "news":
        return <NewsletterTable />;
      default:
        return <div>Sélectionnez une section</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <div className="flex-1 overflow-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Tickets Purchased"
              value="12,456"
              icon="🎫"
              backgroundColor="bg-green-50"
              iconColor="text-green-600"
            />
            <StatCard
              title="Remaining Capacity"
              value="38,720"
              icon="🎟️"
              backgroundColor="bg-blue-50"
              iconColor="text-blue-600"
            />
            <StatCard
              title="Newsletter Subscribers"
              value="8,312"
              icon="📧"
              backgroundColor="bg-purple-50"
              iconColor="text-purple-600"
            />
          </div>

          {renderContent()}
        </div>
      </div>
    </div>
  );
}
