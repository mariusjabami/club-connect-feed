import { useState } from "react";
import ClubProfile from "./ClubProfile";
import PlayerProfile from "./PlayerProfile";

// This component would normally check auth state to determine user type
// For demo purposes, we'll show a toggle

const Profile = () => {
  const [userType, setUserType] = useState<"club" | "player">("club");

  return (
    <>
      {/* Demo toggle - remove in production */}
      <div className="fixed bottom-4 right-4 z-50 bg-card p-2 rounded-xl shadow-lg border border-border">
        <div className="flex gap-1 text-xs">
          <button
            onClick={() => setUserType("club")}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              userType === "club" 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            Clube
          </button>
          <button
            onClick={() => setUserType("player")}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              userType === "player" 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            Jogador
          </button>
        </div>
      </div>

      {userType === "club" ? <ClubProfile /> : <PlayerProfile />}
    </>
  );
};

export default Profile;
