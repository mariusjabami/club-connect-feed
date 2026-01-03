import { Header } from "@/components/layout/Header";
import { CreatePost } from "@/components/feed/CreatePost";
import { TrendingSidebar } from "@/components/sidebar/TrendingSidebar";
import { PostCardNew } from "@/components/feed/PostCardNew";
import { usePosts } from "@/hooks/usePosts";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { profile } = useAuth();
  const { posts, loading, createPost, toggleLike, refreshPosts } = usePosts();

  const handleNewPost = async (content: string) => {
    await createPost(content);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          <div className="flex-1 max-w-2xl">
            {profile && <CreatePost onPost={handleNewPost} />}
            
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Carregando posts...</div>
            ) : posts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum post ainda. Seja o primeiro a postar!
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <PostCardNew 
                    key={post.id} 
                    post={post} 
                    onLike={toggleLike}
                    onCommentAdded={refreshPosts}
                  />
                ))}
              </div>
            )}
          </div>

          <TrendingSidebar />
        </div>
      </main>
    </div>
  );
};

export default Index;
