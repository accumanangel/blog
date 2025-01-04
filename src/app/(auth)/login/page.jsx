"use client";

import { login } from "@/actions/auth";
import Link from "next/link";
import { useActionState } from "react";

export default function Login() {
  const [state, action, isPending] = useActionState(login, undefined);

  return (
    <div className="container md:w-1/2">
      <h1 className="title">Login</h1>
      <form action={action} className="space-y-4">
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="off"
            defaultValue={state?.email}
          />
          {state?.errors?.email && (
            <p className="error">{state.errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
          {state?.errors?.password && (
            <p className="error">{state.errors.password}</p>
          )}
        </div>

        <div className="flex items-end gap-4">
          <button disabled={isPending} className="btn-primary">
            {isPending ? "Loading..." : "Login"}
          </button>
          <Link className="text-link" href={"/register"}>
            {" "}
            Or register here
          </Link>
        </div>
      </form>
    </div>
  );
}
