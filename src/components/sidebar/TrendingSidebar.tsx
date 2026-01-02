import { Calendar, TrendingUp } from "lucide-react";
import { EventCard } from "@/components/feed/EventCard";
import { Event } from "@/types";

const mockEvents: Event[] = [
  {
    id: "1",
    clubId: "c1",
    clubName: "FC Estrela",
    title: "Campeonato Regional",
    opponent: "União FC",
    date: new Date(Date.now() + 86400000 * 2),
    location: "Estádio Municipal",
    type: "game",
  },
  {
    id: "2",
    clubId: "c2",
    clubName: "Atlético Jovem",
    title: "Amistoso",
    opponent: "Sport Club",
    date: new Date(Date.now() + 86400000 * 5),
    location: "Campo do Atlético",
    type: "game",
  },
  {
    id: "3",
    clubId: "c1",
    clubName: "FC Estrela",
    title: "Treino Aberto",
    date: new Date(Date.now() + 86400000),
    location: "CT Estrela",
    type: "training",
  },
];

export const TrendingSidebar = () => {
  return (
    <aside className="hidden lg:block w-80 flex-shrink-0">
      <div className="sticky top-20 space-y-6">
        <div className="card-interactive p-5">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-foreground">Próximos Eventos</h3>
          </div>
          <div className="space-y-3">
            {mockEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>

        <div className="card-interactive p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-foreground">Trending</h3>
          </div>
          <div className="space-y-3">
            {["#Campeonato2024", "#FutebolAmador", "#NovasContratações"].map((tag) => (
              <div key={tag} className="group cursor-pointer">
                <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {tag}
                </p>
                <p className="text-sm text-muted-foreground">1.2k posts</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
