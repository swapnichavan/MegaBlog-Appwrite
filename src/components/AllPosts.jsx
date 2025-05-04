import React, {useEffect} from "react";
import appwriteService from "../appwrite/config";
import PostCard from "./PostCard";

function AllPosts() {
  const [posts, setPosts] = React.useState([]);
  useEffect(() => {
    const posts = async () => {
      const getPosts = await appwriteService
        .getPosts()
        .then((data) => setPosts(data.documents))
        .catch((error) => console.log(error));
      //   console.log(getPosts);
    };

    posts();
  }, []);
  return (
    <div>
      {posts?.map((post) => (
        <PostCard key={post.$id} {...post} />
      ))}
    </div>
  );
}

export default AllPosts;
