import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { PostCard } from "@/components/feed/PostCard";
import { CreatePost } from "@/components/feed/CreatePost";
import { TrendingSidebar } from "@/components/sidebar/TrendingSidebar";
import { mockPosts } from "@/data/mockData";
import { Post } from "@/types";

const Index = () => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  const handleNewPost = (content: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      authorId: "c1",
      authorName: "FC Estrela",
      authorUsername: "fcestrela",
      authorType: "club",
      content,
      likes: 0,
      comments: 0,
      createdAt: new Date(),
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          <div className="flex-1 max-w-2xl">
            <CreatePost onPost={handleNewPost} />
            
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          <TrendingSidebar />
        </div>
      </main>
    </div>
  );
};

export default Index;
