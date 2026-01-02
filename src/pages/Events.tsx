import { Header } from "@/components/layout/Header";
import { EventCard } from "@/components/feed/EventCard";
import { mockEvents } from "@/data/mockData";
import { CalendarDays } from "lucide-react";

const Events = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <CalendarDays className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Eventos</h1>
        </div>

        <div className="space-y-4">
          {mockEvents.map((event) => (
            <div key={event.id} className="card-interactive p-4">
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Events;
