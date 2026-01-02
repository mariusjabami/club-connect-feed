import { Heart, MessageCircle, Share2, Shield, User } from "lucide-react";
import { Post } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <article className="card-interactive p-5 animate-fade-in">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
            {post.authorAvatar ? (
              <img src={post.authorAvatar} alt={post.authorName} className="w-full h-full object-cover" />
            ) : post.authorType === 'club' ? (
              <Shield className="w-6 h-6 text-primary" />
            ) : (
              <User className="w-6 h-6 text-muted-foreground" />
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-foreground truncate">{post.authorName}</span>
            {post.authorType === 'club' && (
              <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
                Clube
              </span>
            )}
            <span className="text-muted-foreground text-sm">@{post.authorUsername}</span>
            <span className="text-muted-foreground text-sm">·</span>
            <span className="text-muted-foreground text-sm">
              {formatDistanceToNow(post.createdAt, { addSuffix: true, locale: ptBR })}
            </span>
          </div>

          <p className="text-foreground mb-3 leading-relaxed whitespace-pre-wrap">{post.content}</p>

          {post.image && (
            <div className="mb-3 rounded-xl overflow-hidden">
              <img src={post.image} alt="" className="w-full object-cover max-h-80" />
            </div>
          )}

          <div className="flex items-center gap-6 text-muted-foreground">
            <button className="flex items-center gap-2 hover:text-primary transition-colors group">
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm">{post.likes}</span>
            </button>
            <button className="flex items-center gap-2 hover:text-primary transition-colors group">
              <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm">{post.comments}</span>
            </button>
            <button className="flex items-center gap-2 hover:text-primary transition-colors group">
              <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
