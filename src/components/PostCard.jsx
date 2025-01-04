import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export default function PostCard({ post }) {
  return (
    <div key={post._id} className="bg-white">
      <div className="border border-slate-400 border-dashed p-4 rounded-md h-full">
        <p className="text-slate-400 text-xs">
          {formatDistanceToNow(post._id.getTimestamp(), {
            addSuffix: true,
          })}
        </p>
        <Link
          href={`/posts/show/${post._id.toString()}`}
          className="block text-xl font-semibold mb-4"
        >
          {post.title}
        </Link>
        <p className="text-sm ">{post.content}</p>
      </div>
    </div>
  );
}
