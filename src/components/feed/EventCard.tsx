import { Calendar, MapPin, Trophy } from "lucide-react";
import { Event } from "@/types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface EventCardProps {
  event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
  const typeColors = {
    game: "bg-primary/10 text-primary border-primary/20",
    training: "bg-accent/10 text-accent-foreground border-accent/20",
    other: "bg-secondary text-secondary-foreground border-secondary",
  };

  const typeLabels = {
    game: "Jogo",
    training: "Treino",
    other: "Evento",
  };

  return (
    <div className="card-interactive p-4 animate-fade-in">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl gradient-primary flex flex-col items-center justify-center text-primary-foreground flex-shrink-0">
          <span className="text-xs font-medium uppercase">
            {format(event.date, "MMM", { locale: ptBR })}
          </span>
          <span className="text-xl font-bold leading-none">
            {format(event.date, "dd")}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${typeColors[event.type]}`}>
              {typeLabels[event.type]}
            </span>
          </div>
          
          <h4 className="font-semibold text-foreground mb-1 truncate">{event.title}</h4>
          
          {event.opponent && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Trophy className="w-4 h-4" />
              <span>vs {event.opponent}</span>
            </div>
          )}
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{format(event.date, "HH:mm")}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span className="truncate">{event.location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
