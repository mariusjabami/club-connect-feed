import { useState } from "react";
import { Image, Send, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CreatePostProps {
  onPost: (content: string) => void;
}

export const CreatePost = ({ onPost }: CreatePostProps) => {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (content.trim()) {
      onPost(content);
      setContent("");
    }
  };

  return (
    <div className="card-interactive p-5 mb-4">
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
          <Shield className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="O que está acontecendo no campo?"
            className="w-full bg-transparent border-none resize-none focus:outline-none text-foreground placeholder:text-muted-foreground min-h-[80px]"
            rows={3}
          />
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <button className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-primary">
              <Image className="w-5 h-5" />
            </button>
            <Button 
              onClick={handleSubmit} 
              disabled={!content.trim()}
              size="sm"
            >
              <Send className="w-4 h-4" />
              Publicar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
