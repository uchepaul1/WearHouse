"use client";
import Link from "next/link";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useAuth } from "./AuthContext";

export function NavbarAccount() {
  const { authenticated, user } = useAuth();

  return (
    <Link
      href="/account"
      className="flex items-center hover:text-blue-700 transition-colors"
      aria-label={authenticated ? "Account" : "Login or Sign up"}
    >
      <UserCircleIcon className="h-8 w-8 text-neutral-400" />
      {authenticated && user?.username && (
        <span className="ml-2 font-medium text-neutral-800 hidden md:inline">
          {user.username}
        </span>
      )}
    </Link>
  );
}