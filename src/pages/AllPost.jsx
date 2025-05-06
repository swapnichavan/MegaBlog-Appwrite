import React, {useEffect, useState} from "react";
import {Container, PostCard} from "../components";
import {appwiteService} from "../services/appwiteService";
import {useDispatch, useSelector} from "react-redux";
import {setPosts} from "../store/PostSlice";

function AllPost() {
  // const [posts, setPosts] = useState([]);
  const posts = useSelector((state) => state.post.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    appwiteService
      .getAllPosts()
      .then((posts) => {
        // setPosts(posts.documents)
        dispatch(setPosts(posts.documents));
      })
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
              <div key={post.$id} className="p-2 w-1/4">
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
