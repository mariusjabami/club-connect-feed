import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/feed/PostCard";
import { mockPlayer, mockPosts } from "@/data/mockData";
import { User, MapPin, Calendar, Shield, Edit2, Trophy } from "lucide-react";

const PlayerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
const [playerInfo, setPlayerInfo] = useState({
    name: mockPlayer.name,
    bio: mockPlayer.bio || "",
    position: mockPlayer.position || "",
    age: mockPlayer.age?.toString() || "",
    height: mockPlayer.height || "",
    preferredFoot: mockPlayer.preferredFoot || "right" as "left" | "right" | "both",
  });

  const playerPosts = mockPosts.filter(p => p.authorType === "player");

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
            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
              <User className="w-12 h-12 text-muted-foreground" />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                <h1 className="text-2xl font-bold text-foreground">{mockPlayer.name}</h1>
                {mockPlayer.clubId && (
                  <div className="flex items-center gap-1 text-sm text-primary mx-auto sm:mx-0">
                    <Shield className="w-4 h-4" />
                    <span>FC Estrela</span>
                  </div>
                )}
              </div>
              <p className="text-muted-foreground mb-3">@{mockPlayer.username}</p>
              <p className="text-foreground mb-4">{mockPlayer.bio}</p>

              <div className="flex flex-wrap gap-4 justify-center sm:justify-start text-sm text-muted-foreground">
                {mockPlayer.position && (
                  <div className="flex items-center gap-1">
                    <Trophy className="w-4 h-4" />
                    <span>{mockPlayer.position}</span>
                  </div>
                )}
                {mockPlayer.age && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{mockPlayer.age} anos</span>
                  </div>
                )}
                {mockPlayer.height && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{mockPlayer.height}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex sm:flex-col gap-2 justify-center">
              <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                <Edit2 className="w-4 h-4" />
                Editar
              </Button>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <div className="card-interactive p-6 mb-6 animate-fade-in">
            <h2 className="text-xl font-bold text-foreground mb-6">Editar Perfil</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">
                  Nome
                </label>
                <input
                  type="text"
                  value={playerInfo.name}
                  onChange={(e) => setPlayerInfo({ ...playerInfo, name: e.target.value })}
                  className="w-full input-field"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">
                  Posição
                </label>
                <input
                  type="text"
                  value={playerInfo.position}
                  onChange={(e) => setPlayerInfo({ ...playerInfo, position: e.target.value })}
                  className="w-full input-field"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">
                  Idade
                </label>
                <input
                  type="number"
                  value={playerInfo.age}
                  onChange={(e) => setPlayerInfo({ ...playerInfo, age: e.target.value })}
                  className="w-full input-field"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">
                  Altura
                </label>
                <input
                  type="text"
                  value={playerInfo.height}
                  onChange={(e) => setPlayerInfo({ ...playerInfo, height: e.target.value })}
                  className="w-full input-field"
                  placeholder="Ex: 1.78m"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">
                  Pé Preferido
                </label>
                <select
                  value={playerInfo.preferredFoot}
                  onChange={(e) => setPlayerInfo({ ...playerInfo, preferredFoot: e.target.value as "left" | "right" | "both" })}
                  className="w-full input-field"
                >
                  <option value="right">Direito</option>
                  <option value="left">Esquerdo</option>
                  <option value="both">Ambos</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-muted-foreground mb-1 block">
                  Biografia
                </label>
                <textarea
                  value={playerInfo.bio}
                  onChange={(e) => setPlayerInfo({ ...playerInfo, bio: e.target.value })}
                  rows={3}
                  className="w-full input-field resize-none"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-6 justify-end">
              <Button variant="ghost" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveInfo}>
                Salvar Alterações
              </Button>
            </div>
          </div>
        )}

        {/* Posts */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground mb-4">Publicações</h2>
          {playerPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default PlayerProfile;
