import getAuthUser from "@/lib/getAuthUser";

import { logout } from "@/actions/auth";
import NavLink from "@/components/NavLink";

export default async function Navbar() {
  const authUser = await getAuthUser();
  // console.log(authUser);

  return (
    <nav>
      <NavLink href="/" label="Home" />

      {authUser ? (
        <div className="flex items-center">
          <NavLink href="/posts/create" label="New Post" />
          <NavLink href="/dashboard" label="Dashboard" />
          <form action={logout}>
            <button type="submit" className="nav-link">
              Logout
            </button>
          </form>
        </div>
      ) : (
        <div>
          <NavLink href="/login" label="Login" />
          <NavLink href="/register" label="Register" />
        </div>
      )}
    </nav>
  );
}
