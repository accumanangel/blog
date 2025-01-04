import PostCard from "@/components/PostCard";
import { getCollection } from "@/lib/db";

export default async function Home() {
  const postCollection = await getCollection("posts");
  const posts = await postCollection?.find().sort({ $natural: -1 }).toArray();

  // console.log(posts);

  if (posts) {
    return (
      <div key={123} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <PostCard post={post} />
        ))}
      </div>
    );
  } else {
    return <p>Failed to fetch data from the database</p>;
  }
}
