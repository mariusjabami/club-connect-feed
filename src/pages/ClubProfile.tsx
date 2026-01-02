import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/feed/PostCard";
import { EventCard } from "@/components/feed/EventCard";
import { mockClub, mockPosts, mockEvents, mockPlayers } from "@/data/mockData";
import { 
  Shield, MapPin, Calendar, Users, Trophy, Edit2, Plus, 
  User, Settings, CalendarDays 
} from "lucide-react";

type TabType = "posts" | "players" | "events" | "settings";

const ClubProfile = () => {
  const [activeTab, setActiveTab] = useState<TabType>("posts");
  const [isEditing, setIsEditing] = useState(false);
  const [clubInfo, setClubInfo] = useState({
    name: mockClub.name,
    bio: mockClub.bio || "",
    location: mockClub.location || "",
    stadium: mockClub.stadium || "",
    colors: mockClub.colors || "",
    foundedYear: mockClub.foundedYear?.toString() || "",
  });

  const tabs = [
    { id: "posts", label: "Posts", icon: Trophy },
    { id: "players", label: "Jogadores", icon: Users },
    { id: "events", label: "Eventos", icon: CalendarDays },
    { id: "settings", label: "Configurações", icon: Settings },
  ] as const;

  const clubPosts = mockPosts.filter(p => p.authorType === "club");

  const handleSaveInfo = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container max-w-4xl mx-auto px-4 py-6">
        {/* Profile Header */}
        <div className="card-interactive p-6 mb-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-24 h-24 rounded-2xl gradient-primary flex items-center justify-center shadow-glow flex-shrink-0 mx-auto sm:mx-0">
              <Shield className="w-12 h-12 text-primary-foreground" />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                <h1 className="text-2xl font-bold text-foreground">{mockClub.name}</h1>
                <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full w-fit mx-auto sm:mx-0">
                  Clube Verificado
                </span>
              </div>
              <p className="text-muted-foreground mb-3">@{mockClub.username}</p>
              <p className="text-foreground mb-4">{mockClub.bio}</p>

              <div className="flex flex-wrap gap-4 justify-center sm:justify-start text-sm text-muted-foreground">
                {mockClub.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{mockClub.location}</span>
                  </div>
                )}
                {mockClub.foundedYear && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Fundado em {mockClub.foundedYear}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{mockClub.players.length} jogadores</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-muted rounded-xl mb-6 overflow-x-auto">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                activeTab === id
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === "posts" && (
            <div className="space-y-4">
              {clubPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {activeTab === "players" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-foreground">Elenco</h2>
                <Button size="sm">
                  <Plus className="w-4 h-4" />
                  Adicionar Jogador
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {mockPlayers.map((player) => (
                  <div key={player.id} className="card-interactive p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                      <User className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{player.name}</h3>
                      <p className="text-sm text-muted-foreground">{player.position}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{player.age} anos</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "events" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-foreground">Eventos & Jogos</h2>
                <Button size="sm">
                  <Plus className="w-4 h-4" />
                  Novo Evento
                </Button>
              </div>

              <div className="space-y-3">
                {mockEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="card-interactive p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-foreground">Informações do Clube</h2>
                {!isEditing ? (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit2 className="w-4 h-4" />
                    Editar
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                      Cancelar
                    </Button>
                    <Button size="sm" onClick={handleSaveInfo}>
                      Salvar
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1 block">
                    Nome do Clube
                  </label>
                  <input
                    type="text"
                    value={clubInfo.name}
                    onChange={(e) => setClubInfo({ ...clubInfo, name: e.target.value })}
                    disabled={!isEditing}
                    className="w-full input-field disabled:opacity-60"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1 block">
                    Localização
                  </label>
                  <input
                    type="text"
                    value={clubInfo.location}
                    onChange={(e) => setClubInfo({ ...clubInfo, location: e.target.value })}
                    disabled={!isEditing}
                    className="w-full input-field disabled:opacity-60"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1 block">
                    Estádio/Campo
                  </label>
                  <input
                    type="text"
                    value={clubInfo.stadium}
                    onChange={(e) => setClubInfo({ ...clubInfo, stadium: e.target.value })}
                    disabled={!isEditing}
                    className="w-full input-field disabled:opacity-60"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1 block">
                    Cores do Clube
                  </label>
                  <input
                    type="text"
                    value={clubInfo.colors}
                    onChange={(e) => setClubInfo({ ...clubInfo, colors: e.target.value })}
                    disabled={!isEditing}
                    className="w-full input-field disabled:opacity-60"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1 block">
                    Ano de Fundação
                  </label>
                  <input
                    type="text"
                    value={clubInfo.foundedYear}
                    onChange={(e) => setClubInfo({ ...clubInfo, foundedYear: e.target.value })}
                    disabled={!isEditing}
                    className="w-full input-field disabled:opacity-60"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-muted-foreground mb-1 block">
                    Biografia
                  </label>
                  <textarea
                    value={clubInfo.bio}
                    onChange={(e) => setClubInfo({ ...clubInfo, bio: e.target.value })}
                    disabled={!isEditing}
                    rows={3}
                    className="w-full input-field disabled:opacity-60 resize-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ClubProfile;
