import React from "react";
import Container from "../components/Container";
import {PostForm as PostFormComponent} from "../components/PostForm/PostForm";

function AddPost() {
  return (
    <div className="py-8">
      <Container>
        <PostFormComponent />
      </Container>
    </div>
  );
}

export default AddPost;
