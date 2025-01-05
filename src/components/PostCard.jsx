import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export default function PostCard({ post }) {
  return (
    <div key={post._id} className="bg-white">
      <div className="border-1 border-slate-200 p-4 rounded-md h-full">
        <Link
          href={`/posts/show/${post._id.toString()}`}
          className="block  font-semibold"
        >
          {post.title}
        </Link>
        <p className="text-slate-400 text-xs mb-2">
          {formatDistanceToNow(post._id.getTimestamp(), {
            addSuffix: true,
          })}
        </p>
        <p className="text-sm">
          {post.content.length > 100
            ? post.content.slice(0, 100) + "..."
            : post.content}
        </p>
      </div>
    </div>
  );
}
