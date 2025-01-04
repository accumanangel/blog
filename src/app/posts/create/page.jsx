import { createPost } from "@/actions/posts";
import BlogForm from "@/components/BlogForm";

export default async function create() {
  return (
    <div className="container">
      <h1 className="title">Create post</h1>
      <BlogForm handler={createPost} />
    </div>
  );
}
