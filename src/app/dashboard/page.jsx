import { deletePost } from "@/actions/posts";
import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { ObjectId } from "mongodb";
import Link from "next/link";
import { Eye, Edit, Trash } from "lucide-react";
import NoPostsMessage from "@/components/NoPost";

export default async function Dashbaord() {
  const user = await getAuthUser();

  const postCollection = await getCollection("posts");

  const userPosts = await postCollection
    ?.find({
      user: ObjectId.createFromHexString(user.userId),
    })
    .sort({
      $natural: -1,
    })
    .toArray();

  if (!userPosts) return <p>Failed to fetch the data!</p>;

  if (userPosts.length === 0) return <NoPostsMessage />;

  return (
    <div className="overflow-x-auto">
      <h1 className="title text-2xl font-semibold mb-6 text-gray-800">
        Dashboard
      </h1>

      <table className="table-auto w-full border-collapse border border-gray-200 shadow-lg rounded-lg">
        <thead className="bg-gray-100 font-bold">
          <tr>
            <th className="w-1/2 px-6 py-3 text-left text-sm font-bold text-gray-600">
              Title
            </th>
            <th className="w-1/6 px-6 py-3 text-left text-sm font-bold text-gray-600">
              View
            </th>
            <th className="w-1/6 px-6 py-3 text-left text-sm font-bold text-gray-600">
              Edit
            </th>
            <th className="w-1/6 px-6 py-3 text-left text-sm font-bold text-gray-600">
              Delete
            </th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {userPosts.map((post) => (
            <tr key={post._id.toString()} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4">{post.title}</td>
              <td className="px-6 py-4 text-blue-500 hover:text-blue-600">
                <Link
                  href={`/posts/show/${post._id.toString()}`}
                  className="flex items-center"
                >
                  <Eye className="mr-2 w-5 h-5" />
                  View
                </Link>
              </td>
              <td className="px-6 py-4 text-green-500 hover:text-green-600">
                <Link
                  href={`/posts/edit/${post._id.toString()}`}
                  className="flex items-center"
                >
                  <Edit className="mr-2 w-5 h-5" />
                  Edit
                </Link>
              </td>
              <td className="px-6 py-4 text-red-500 hover:text-red-600">
                <form action={deletePost}>
                  <input
                    type="hidden"
                    name="postId"
                    defaultValue={post._id.toString()}
                  />
                  <button type="submit" className="flex items-center">
                    <Trash className="mr-2 w-5 h-5" />
                    Delete
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
