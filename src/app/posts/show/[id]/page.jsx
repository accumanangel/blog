import PostCard from "@/components/PostCard";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

export default async function post({ params }) {
  const { id } = await params;

  const postCollection = await getCollection("posts");
  const post =
    id.length === 24
      ? await postCollection?.findOne({
          _id: ObjectId.createFromHexString(id),
        })
      : null;

  return (
    <div className="container w-full md:w-3/4">
      {post ? <PostCard post={post} /> : <p>Failed to fetch data</p>}
    </div>
  );
}
