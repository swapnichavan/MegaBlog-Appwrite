import React, {useEffect, useState} from "react";
import {Container, PostCard} from "../components";
import {appwiteService} from "../services/appwiteService";
import {set} from "react-hook-form";

function AllPost() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwiteService
      .getAllPosts()
      .then((posts) => setPosts(posts.documents))
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        {posts.length > 0 ? (
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/2">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        ) : null}
      </Container>
    </div>
  );
}

export default AllPost;
