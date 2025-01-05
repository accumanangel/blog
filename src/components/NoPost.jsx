import Link from "next/link";

export default function NoPostsMessage() {
  return (
    <div className="flex items-center justify-center  bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg  text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          No Posts Available
        </h2>
        <p className="text-gray-600">
          You don't have any posts! Start creating some to share with others.
        </p>
        <div className="mt-4">
          <Link
            href={"/posts/create"}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none mb-5"
          >
            Create Post
          </Link>
        </div>
      </div>
    </div>
  );
}
