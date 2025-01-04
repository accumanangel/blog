import BlogForm from "@/components/BlogForm";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";
import { updatePost } from "@/actions/posts";
import getAuthUser from "@/lib/getAuthUser";
import { redirect } from "next/navigation";

export default async function edit({ params }) {
  const { id } = await params;

  const user = await getAuthUser();

  const postCollection = await getCollection("posts");
  let post;

  if (id.length === 24 && postCollection) {
    post = await postCollection.findOne({
      _id: ObjectId.createFromHexString(id),
    });
    post = JSON.parse(JSON.stringify(post));

    console.log(post.user.toString());

    if (user.userId !== post.user.toString()) return redirect("/");
  } else {
    post = null;
  }

  // console.log(post);

  return (
    <div className="container">
      <p className="title">Edit post</p>

      {post ? (
        <BlogForm handler={updatePost} post={post} />
      ) : (
        <p>Failed to fetch data!</p>
      )}
    </div>
  );
}
