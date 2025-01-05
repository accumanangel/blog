"use client";

import { useState } from "react";
import NavLink from "@/components/NavLink";
import { logout } from "@/actions/auth";

export default function Navbar({ authUser }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <NavLink href="/" label="Home" className="text-lg font-semibold" />

        <button
          className="text-white lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } lg:flex lg:items-center lg:space-x-4`}
        >
          {authUser ? (
            <div className="flex flex-col lg:flex-row lg:space-x-4">
              <NavLink href="/posts/create" label="New Post" />
              <NavLink href="/dashboard" label="Dashboard" />
              <form action={logout}>
                <button type="submit" className="nav-link">
                  Logout
                </button>
              </form>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row lg:space-x-4">
              <NavLink href="/login" label="Login" />
              <NavLink href="/register" label="Register" />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
