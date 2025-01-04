"use server";

import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { BlogPostSchema } from "@/lib/rules";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { title } from "process";

export async function createPost(state, formData) {
  // check if user is logged in
  const user = await getAuthUser();

  if (!user) redirect("/");

  const validatedFields = BlogPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      title: formData.get("title"),
      content: formData.get("content"),
    };
  }

  try {
    const postCollection = await getCollection("posts");

    const post = {
      title: validatedFields.data.title,
      content: validatedFields.data.content,
      user: ObjectId.createFromHexString(user.userId),
    };

    await postCollection.insertOne(post);
  } catch (error) {
    return {
      errors: { title: error.message },
    };
  }

  redirect("/dashboard");
}

export async function updatePost(state, formData) {
  // check if user is logged in
  const user = await getAuthUser();
  if (!user) redirect("/");

  const postId = formData.get("postId");
  const title = formData.get("title");
  const content = formData.get("content");

  const validatedFields = BlogPostSchema.safeParse({
    title,
    content,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      title: formData.get("title"),
      content: formData.get("content"),
    };
  }

  //find the post
  const postCollection = await getCollection("posts");
  const post = await postCollection.findOne({
    _id: ObjectId.createFromHexString(postId),
  });

  // check if the user owns this post
  if (user.userId !== post.user.toString()) {
    return redirect("/");
  }

  //update post
  postCollection.findOneAndUpdate(
    { _id: post._id },
    {
      $set: {
        title: validatedFields.data.title,
        content: validatedFields.data.content,
      },
    }
  );
  redirect("/dashboard");
}

// delete posts
export async function deletePost(formData) {
  // check if user is logged in
  const user = await getAuthUser();
  if (!user) redirect("/");

  //Find the post
  const postCollection = await getCollection("posts");

  const post = await postCollection?.findOne({
    _id: ObjectId.createFromHexString(formData.get("postId")),
  });

  // check if auth user owns the post
  if (user.userId !== post.user.toString()) return redirect("/");

  // delete post
  await postCollection?.findOneAndDelete({
    _id: post._id,
  });

  // refresh table
  revalidatePath("/dashboard");
}
