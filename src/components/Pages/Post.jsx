import React, {useEffect} from "react";
import {useParams, useNavigate, Link} from "react-router-dom";
import appwriteService from "../../appwrite/config";
import {useSelector} from "react-redux";
import Container from "../Container/Container";
import Button from "../Button";
import parse from "html-react-parser";

function Post() {
  const [post, setPost] = React.useState({});
  const {postId} = useParams();
  console.log(useParams());
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  const isAuther = post && userData ? post.userId === userData.$id : false;
  console.log(isAuther);

  useEffect(() => {
    appwriteService.getPost(postId).then((post) => {
      console.log(post);
      if (post) {
        setPost(post);
      }
    });
  }, [postId]);

  const deletePost = async () => {
    appwriteService.deletePost(post.$id).then((status) => {
      console.log("File deleted:", status);
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      {post ? (
        <div>
          <Container>
            <div>
              <img
                src={appwriteService.getFileView(post?.featuredImage || null)}
                alt={post.title}
                width={40}
              />
            </div>
            <div>
              {isAuther && (
                <div>
                  <Link to={`/edit-post/${post.$id}`}>
                    <Button>Edit</Button>
                  </Link>
                  <Button onClick={deletePost}>Delete Post</Button>
                </div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{post.title}</h1>
              {/* <div>{parse(post?.content)}</div> */}
            </div>
          </Container>
        </div>
      ) : null}
    </div>
  );
}

export default Post;
