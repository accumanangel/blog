"use client";
import { Sparkles, Loader } from "lucide-react";
import { useActionState } from "react";

export default function BlogForm({ handler, post }) {
  const [state, action, isPending] = useActionState(handler, undefined);
  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="postId" defaultValue={post?._id} />
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          autoComplete="off"
          defaultValue={state?.title || post?.title}
        />
        {state?.errors?.title && <p className="error">{state.errors?.title}</p>}
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          id="content"
          autoComplete="off"
          rows={6}
          defaultValue={state?.content || post?.content}
        ></textarea>
        {state?.errors?.content && (
          <p className="error">{state.errors?.content}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          className="btn-primary flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all duration-300 group"
        >
          <span className="mr-2 transition-transform duration-300">
            {isPending ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
          </span>
          {isPending ? "Loading..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
