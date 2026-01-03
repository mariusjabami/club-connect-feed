import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface PostWithAuthor {
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
}

export const usePosts = () => {
  const { profile } = useAuth();
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    const { data: postsData, error } = await supabase
      .from("posts")
      .select(`
        id,
        content,
        image_url,
        created_at,
        author:profiles!posts_author_id_fkey (
          id,
          name,
          username,
          avatar_url,
          user_type
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
      return;
    }

    const postsWithCounts = await Promise.all(
      (postsData || []).map(async (post) => {
        const { count: likesCount } = await supabase
          .from("likes")
          .select("*", { count: "exact", head: true })
          .eq("post_id", post.id);

        const { count: commentsCount } = await supabase
          .from("comments")
          .select("*", { count: "exact", head: true })
          .eq("post_id", post.id);

        let userLiked = false;
        if (profile) {
          const { data: likeData } = await supabase
            .from("likes")
            .select("id")
            .eq("post_id", post.id)
            .eq("user_id", profile.id)
            .maybeSingle();
          userLiked = !!likeData;
        }

        return {
          ...post,
          author: post.author as PostWithAuthor["author"],
          likes_count: likesCount || 0,
          comments_count: commentsCount || 0,
          user_liked: userLiked,
        };
      })
    );

    setPosts(postsWithCounts);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [profile]);

  const createPost = async (content: string) => {
    if (!profile) return { error: new Error("Not authenticated") };

    const { error } = await supabase.from("posts").insert({
      author_id: profile.id,
      content,
    });

    if (!error) {
      await fetchPosts();
    }

    return { error };
  };

  const toggleLike = async (postId: string) => {
    if (!profile) return;

    const post = posts.find((p) => p.id === postId);
    if (!post) return;

    if (post.user_liked) {
      await supabase
        .from("likes")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", profile.id);
    } else {
      await supabase.from("likes").insert({
        post_id: postId,
        user_id: profile.id,
      });
    }

    await fetchPosts();
  };

  return { posts, loading, createPost, toggleLike, refreshPosts: fetchPosts };
};
