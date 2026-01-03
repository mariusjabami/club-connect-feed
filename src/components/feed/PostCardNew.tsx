import { useState } from "react";
import { Heart, MessageCircle, Share2, Shield, User, Send } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useAuth } from "@/contexts/AuthContext";
import { useComments } from "@/hooks/useComments";
import { toast } from "sonner";

interface PostCardNewProps {
  post: {
    id: string;
    content: string;
    image_url: string | null;
    created_at: string;
    author: {
      id: string;
      name: string;
      username: string;
      avatar_url: string | null;
      user_type: "player" | "club";
    };
    likes_count: number;
    comments_count: number;
    user_liked: boolean;
  };
  onLike: (postId: string) => void;
  onCommentAdded: () => void;
}

export const PostCardNew = ({ post, onLike, onCommentAdded }: PostCardNewProps) => {
  const { profile } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const { comments, loading: loadingComments, addComment } = useComments(post.id);

  const handleLike = () => {
    if (!profile) {
      toast.error("Faça login para curtir");
      return;
    }
    onLike(post.id);
  };

  const handleAddComment = async () => {
    if (!profile) {
      toast.error("Faça login para comentar");
      return;
    }
    if (!newComment.trim()) return;

    const { error } = await addComment(newComment);
    if (error) {
      toast.error("Erro ao adicionar comentário");
    } else {
      setNewComment("");
      onCommentAdded();
    }
  };

  return (
    <article className="card-interactive p-5 animate-fade-in">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
            {post.author.avatar_url ? (
              <img src={post.author.avatar_url} alt={post.author.name} className="w-full h-full object-cover" />
            ) : post.author.user_type === "club" ? (
              <Shield className="w-6 h-6 text-primary" />
            ) : (
              <User className="w-6 h-6 text-muted-foreground" />
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-foreground truncate">{post.author.name}</span>
            {post.author.user_type === "club" && (
              <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
                Clube
              </span>
            )}
            <span className="text-muted-foreground text-sm">@{post.author.username}</span>
            <span className="text-muted-foreground text-sm">·</span>
            <span className="text-muted-foreground text-sm">
              {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: ptBR })}
            </span>
          </div>

          <p className="text-foreground mb-3 leading-relaxed whitespace-pre-wrap">{post.content}</p>

          {post.image_url && (
            <div className="mb-3 rounded-xl overflow-hidden">
              <img src={post.image_url} alt="" className="w-full object-cover max-h-80" />
            </div>
          )}

          <div className="flex items-center gap-6 text-muted-foreground">
            <button 
              onClick={handleLike}
              className={`flex items-center gap-2 transition-colors group ${
                post.user_liked ? "text-red-500" : "hover:text-red-500"
              }`}
            >
              <Heart className={`w-5 h-5 group-hover:scale-110 transition-transform ${post.user_liked ? "fill-current" : ""}`} />
              <span className="text-sm">{post.likes_count}</span>
            </button>
            <button 
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-2 hover:text-primary transition-colors group"
            >
              <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm">{post.comments_count}</span>
            </button>
            <button className="flex items-center gap-2 hover:text-primary transition-colors group">
              <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {showComments && (
            <div className="mt-4 pt-4 border-t border-border">
              {profile && (
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Escreva um comentário..."
                    className="flex-1 input-field text-sm"
                    onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                  />
                  <button
                    onClick={handleAddComment}
                    className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              )}

              {loadingComments ? (
                <div className="text-center text-muted-foreground text-sm py-2">Carregando...</div>
              ) : comments.length === 0 ? (
                <div className="text-center text-muted-foreground text-sm py-2">Nenhum comentário ainda</div>
              ) : (
                <div className="space-y-3">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center overflow-hidden flex-shrink-0">
                        {comment.author.avatar_url ? (
                          <img src={comment.author.avatar_url} alt="" className="w-full h-full object-cover" />
                        ) : comment.author.user_type === "club" ? (
                          <Shield className="w-4 h-4 text-primary" />
                        ) : (
                          <User className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{comment.author.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true, locale: ptBR })}
                          </span>
                        </div>
                        <p className="text-sm text-foreground">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
