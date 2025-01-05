import PostCard from "@/components/PostCard";
import { getCollection } from "@/lib/db";
import { formatDistanceToNow } from "date-fns";
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
    <div key={post._id} className="bg-white">
      <div className="border-1 border-slate-200 p-4 rounded-md h-full">
        <p className="block  font-semibold">{post.title}</p>
        <p className="text-slate-400 text-xs mb-2">
          {formatDistanceToNow(post._id.getTimestamp(), {
            addSuffix: true,
          })}
        </p>
        <p className="text-sm">{post.content}</p>
      </div>
    </div>
  );
}
