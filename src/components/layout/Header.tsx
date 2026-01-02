import { Link, useLocation } from "react-router-dom";
import { Home, User, LogIn, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
              <Trophy className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-gradient hidden sm:block">SportLink</span>
          </Link>

          <nav className="flex items-center gap-1">
            <Link to="/">
              <Button 
                variant={isActive("/") ? "secondary" : "ghost"} 
                size="icon"
                className="rounded-xl"
              >
                <Home className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/profile">
              <Button 
                variant={isActive("/profile") ? "secondary" : "ghost"} 
                size="icon"
                className="rounded-xl"
              >
                <User className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="outline" size="sm" className="ml-2">
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Entrar</span>
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
