import React, {useCallback} from "react";
import {useForm} from "react-hook-form";
import Input from "../Input";
import Select from "../Select";
import Button from "../Button";
import RTE from "../RTE";
import appwriteServices from "../../appwrite/config.js";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

function PostForm({post}) {
  console.log(post);
  const {register, handleSubmit, control, watch, setValue, getValues} = useForm(
    {
      defaultValues: {
        title: post?.title || "",
        content: post?.content || "",
        slug: post?.slug || "",
        status: post?.status || "active",
      },
    }
  );

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  console.log(userData);

  const submitPost = async (data) => {
    console.log(data);
    if (post) {
      const file = await appwriteServices.uploadFile(data.image[0]);
      console.log(file);

      if (file) {
        appwriteServices.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteServices.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      console.log(dbPost);

      if (dbPost) {
        navigate(`/posts/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteServices.uploadFile(data.image[0]);
      console.log(file);
      if (file) {
        const fileId = file.$id;
        console.log(fileId);
        data.featuredImage = fileId;
        const dbPost = await appwriteServices.createPost({
          ...data,
          userId: userData.$id,
        });
        if (dbPost) {
          console.log(dbPost);
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(submitPost)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title"
          placeholder="Enter your title"
          className="mb-4"
          {...register("title", {required: true})}
        />
        <Input
          label="Slug"
          placeholder="slug"
          className="mb-4"
          {...register("slug", {required: true})}
        />
        <RTE
          label="Content"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image"
          type="file"
          accept="image/*"
          className="mb-4"
          {...register("image", {required: !post})}
        />
        {post && (
          <div className="mb-4 w-full">
            <img
              // src={appwriteServices.getFilePreview(post?.featuredImage || null)}
              src={appwriteServices.getFileView(post?.featuredImage || null)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="status"
          className="mb-4"
          {...register("status", {
            required: true,
          })}
        />
      </div>
      <Button type="submit" bgColor={post ? "bg-green-500" : undefined}>
        {!post ? "Submit" : "Update"}
      </Button>
      {/* <Button type="submit">Submit</Button> */}
    </form>
  );
}

export default PostForm;
