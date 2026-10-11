"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    } else {
      setUser(null);
    }
  }, [session]);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  async function handleSignOut() {
    try {
      await authClient.signOut();
      setIsOpen(false);
      router.push("/signin");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  }

  if (isPending) {
    return <div className="h-12 w-36 animate-pulse rounded-full bg-gray-100" />;
  }

  if (!user) {
    return (
      <Link
        href="/signin"
        className="rounded-lg bg-green-700 px-5 py-2.5 font-medium text-white transition hover:bg-green-800"
      >
        সাইন ইন{" "}
      </Link>
    );
  }

  const name = user.name || "User";
  const email = user.email || "";
  const image = user.image || "";

  return (
    <div ref={dropdownRef} className="relative">
      {/* Profile button */}
      {/* Profile Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="flex items-center gap-2 rounded-full bg-transparent px-4 py-2 transition hover:bg-gray-100"
      >
        {/* User Image or Profile Icon */}
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-10 w-10 rounded-xl object-cover"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-3xl bg-green-100 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 12a5 5 0 100-10 5 5 0 000 10Zm-7.5 9a7.5 7.5 0 0115 0v1h-15v-1Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}

        {/* User Name */}
        <span className="max-w-32 truncate text-[16px] font-medium text-[#26332b]">
          {name}
        </span>

        {/* Dropdown Arrow */}
        <svg
          className={`h-4 w-4 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.09 1.03l-4.25 4.5a.75.75 0 01-1.09 0l-4.25-4.5a.75.75 0 01.02-1.05z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown card */}
      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-4 w-[min(92vw,420px)] origin-top-right rounded-3xl border border-[#e1e9e2] bg-white p-5 shadow-[0_12px_35px_rgba(30,50,35,0.15)] sm:w-[440px] sm:p-7"
        >
          {/* User information */}
          <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
            {image ? (
              <img
                src={image}
                alt={name}
                className="h-16 w-16 shrink-0 rounded-2xl object-cover"
              />
            ) : (
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-1xl font-semibold text-green-800">
                {name.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="min-w-0">
              <h3 className="truncate text-[20px] font-semibold text-[#26332b] sm:text-[16px] ">
                {name}
              </h3>
              <p className="mt-1 break-all text-[12px] text-gray-500 sm:text-[10px]">
                {email}
              </p>
            </div>
          </div>

          {/* My profile */}
          <Link
            href="/profile"
            role="menuitem"
            onClick={() => setIsOpen(false)}
            className="mt-3 flex items-center gap-4 rounded-xl px-3 py-2 text-[14px] text-[#26332b] transition hover:bg-green-50 sm:text-[12px] "
          >
            <svg
              className="h-7 w-7 shrink-0 text-emerald-600"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.42 0-8 2.24-8 5v2h16v-2c0-2.76-3.58-5-8-5z" />
            </svg>
            <span>আমার প্রোফাইল</span>
            <svg
              className="ml-auto h-5 w-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>

          {/* Sign out */}
          <button
            type="button"
            role="menuitem"
            onClick={handleSignOut}
            className="mt-2 flex w-full items-center gap-4 rounded-xl bg-red-50 px-4 py-2 text-left text-[14px] font-bold text-red-500 transition hover:bg-red-100 sm:text-[12px] "
          >
            <svg
              className="h-7 w-7 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M10 17l5-5-5-5" />
              <path d="M15 12H3" />
              <path d="M12 3h6a2 2 0 012 2v14a2 2 0 01-2 2h-6" />
            </svg>
            <span>সাইন আউট</span>
          </button>
        </div>
      )}
    </div>
  );
}
