import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { useAuth } from "@/contexts/AuthContext";
import { EditProfileDialog } from "@/components/profile/EditProfileDialog";
import { Shield, User, MapPin, Calendar, Ruler, Footprints } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container max-w-2xl mx-auto px-4 py-6">
          <div className="text-center text-muted-foreground">Carregando perfil...</div>
        </main>
      </div>
    );
  }

  const isClub = profile.user_type === "club";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-2xl mx-auto px-4 py-6">
        <div className="card-interactive p-6 mb-6">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-2xl bg-secondary flex items-center justify-center overflow-hidden">
              {profile.avatar_url ? (
                <img src={profile.avatar_url} alt={profile.name} className="w-full h-full object-cover" />
              ) : isClub ? (
                <Shield className="w-12 h-12 text-primary" />
              ) : (
                <User className="w-12 h-12 text-muted-foreground" />
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-foreground">{profile.name}</h1>
                {isClub && (
                  <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                    Clube
                  </span>
                )}
              </div>
              <p className="text-muted-foreground mb-3">@{profile.username}</p>
              {profile.bio && (
                <p className="text-foreground mb-4">{profile.bio}</p>
              )}
              <EditProfileDialog />
            </div>
          </div>

          {/* Player specific info */}
          {!isClub && (
            <div className="mt-6 pt-6 border-t border-border grid grid-cols-2 gap-4">
              {profile.position && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{profile.position}</span>
                </div>
              )}
              {profile.age && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{profile.age} anos</span>
                </div>
              )}
              {profile.height && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Ruler className="w-4 h-4" />
                  <span className="text-sm">{profile.height}</span>
                </div>
              )}
              {profile.preferred_foot && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Footprints className="w-4 h-4" />
                  <span className="text-sm">
                    Pé {profile.preferred_foot === "right" ? "direito" : profile.preferred_foot === "left" ? "esquerdo" : "ambos"}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Club specific info */}
          {isClub && (
            <div className="mt-6 pt-6 border-t border-border grid grid-cols-2 gap-4">
              {profile.location && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{profile.location}</span>
                </div>
              )}
              {profile.founded_year && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Fundado em {profile.founded_year}</span>
                </div>
              )}
              {profile.stadium && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm">{profile.stadium}</span>
                </div>
              )}
              {profile.colors && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="w-4 h-4 rounded-full bg-gradient-to-r from-primary to-accent" />
                  <span className="text-sm">{profile.colors}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;
