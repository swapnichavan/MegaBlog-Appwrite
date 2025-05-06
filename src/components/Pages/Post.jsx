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

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={appwriteService.getFileView(post?.featuredImage || null)}
            alt={post.title}
            // width={40}
            className="rounded-xl"
          />
          {isAuther && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete Post
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        {/* <div className="brwoser-css">{parse(post?.content)}</div> */}
      </Container>
    </div>
  ) : null;
}

export default Post;
