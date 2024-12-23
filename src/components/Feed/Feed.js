import React, { useEffect, useState } from "react";
import { fetchPosts } from "../../utils/firebaseUtils";
import Post from "./Post";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
    };
    loadPosts();
  }, []);

  return (
    <div className="container mx-auto p-4 flex flex-col items-center flex-wrap">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
