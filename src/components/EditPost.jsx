import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import appwriteService from "../appwrite/config";
import PostForm from "./PostForm/PostForm";

function EditPost() {
  const [post, setPost] = useState({});
  console.log(post);
  const {postId} = useParams();
  console.log(useParams());

  useEffect(() => {
    if (postId) {
      appwriteService.getPost(postId).then((data) => {
        console.log(data);
        setPost(data);
      });
    }
  }, [postId]);
  return <div>{post && <PostForm post={post} />}</div>;
}

export default EditPost;
