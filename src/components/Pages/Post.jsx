import React from "react";
import {useParams} from "react-router-dom";

function Post({props}) {
  console.log(props);
  console.log(useParams());
  return <div>Post</div>;
}

export default Post;
