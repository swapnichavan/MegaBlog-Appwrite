import React, {useEffect} from "react";
import appwriteService from "../appwrite/config";
import PostCard from "./PostCard";
import {use} from "react";

function Home() {
  const [posts, setPosts] = React.useState([]);

  useEffect(() => {
    appwriteService
      .getPosts()
      .then((data) => setPosts(data.documents))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      {posts.length === 0 && (
        <h1 className="text-center">No posts available</h1>
      )}
      {posts?.map((post) => (
        <PostCard key={post.$id} {...post} />
      ))}
    </div>
  );
}

export default Home;
