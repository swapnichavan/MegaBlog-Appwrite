import React from "react";
import {Link} from "react-router-dom";
import appwriteService from "../appwrite/config";

function PostCard({$id, title, featuredImage}) {
  return (
    <Link to={`/post/${$id}`} className="w-full">
      <div>
        <div>
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
          />
        </div>
        <h2>{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
