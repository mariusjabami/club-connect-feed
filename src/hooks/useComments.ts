import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface Comment {
  id: string;
  content: string;
  created_at: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatar_url: string | null;
    user_type: "player" | "club";
  };
}

export const useComments = (postId: string) => {
  const { profile } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select(`
        id,
        content,
        created_at,
        author:profiles!comments_author_id_fkey (
          id,
          name,
          username,
          avatar_url,
          user_type
        )
      `)
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    if (!error && data) {
      setComments(data as Comment[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const addComment = async (content: string) => {
    if (!profile) return { error: new Error("Not authenticated") };

    const { error } = await supabase.from("comments").insert({
      post_id: postId,
      author_id: profile.id,
      content,
    });

    if (!error) {
      await fetchComments();
    }

    return { error };
  };

  return { comments, loading, addComment, refreshComments: fetchComments };
};
