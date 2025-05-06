import React, {useEffect} from "react";
import appwriteService from "../appwrite/config";
import PostCard from "./PostCard";
import Container from "../components/Container/Container";

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
        <div className="w-full py-8 mt-4 text-center">
          <Container>
            <div className="flex flex-wrap">
              <div className="p-2 w-full">
                <h1 className="text-2xl font-bold hover:text-grey-500">
                  Login to read posts
                </h1>
              </div>
            </div>
          </Container>
        </div>
      )}
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
            {posts?.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Home;
