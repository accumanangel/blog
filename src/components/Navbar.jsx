import getAuthUser from "@/lib/getAuthUser";

import { logout } from "@/actions/auth";
import NavLink from "@/components/NavLink";
import {
  CirclePlus,
  House,
  LucideNotepadText,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";

export default async function Navbar() {
  const authUser = await getAuthUser();
  // console.log(authUser);

  return (
    <nav>
      <NavLink href="/" label="Home" iconName="House" color="white" size={16} />

      {authUser ? (
        <div className="flex items-center">
          <NavLink
            href="/posts/create"
            label="New"
            iconName="CirclePlus"
            color="white"
            size={16}
          />
          <NavLink
            href="/dashboard"
            label="Dashboard"
            iconName="LucideNotepadText"
            color="white"
            size={16}
          />
          <form action={logout}>
            <button type="submit" className="nav-link">
              <div className="flex items-center gap-x-1">
                <LogOut color="white" size={16} />
              </div>
            </button>
          </form>
        </div>
      ) : (
        <div>
          <NavLink
            href="/login"
            label="Login"
            iconName="LogIn"
            color="white"
            size={16}
          />
          <NavLink
            href="/register"
            label="Register"
            iconName="UserPlus"
            color="white"
            size={16}
          />
        </div>
      )}
    </nav>
  );
}
