"use client";
import ProfileDropdown from "@/Header/profile";
import logo from "@/image/logo-icon.png";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import HeadButton from "./headButton";

export default function Header() {
  const today = new Date();

  const date = today.toLocaleDateString("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const day = today.toLocaleDateString("bn-BD", {
    weekday: "long",
  });

  const { data: session, isPending } = authClient.useSession();

  const isLoggedIn = !!session?.user;

  const [showRight, setShowRight] = useState(true);

  const rightSide = () => {
    setShowRight((prev) => !prev);
  };

  return (
    <header className="w-full border-b border-gray-200 bg-[#fdfefe]">
      <nav className="mx-auto flex min-h-[60px] max-w-[1250px] items-center justify-between gap-4 px-4 sm:px-6">
        {/* Logo & Website Info */}
        <Link href="/" className="shrink-0">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="rounded-[10px] border border-gray-200 bg-stone-100 p-3">
              <Image
                src={logo}
                alt="Bazar logo"
                width={30}
                height={30}
                className="h-5 w-5 object-contain"
              />
            </div>

            {/* Website Name */}
            <div className="leading-tight">
              <h1 className="text-base font-bold tracking-tight text-gray-900">
                বাজার দর
              </h1>

              <p className="mt-0.5 text-[10px] text-gray-600">
                {day}, {date}
              </p>
            </div>
          </div>
        </Link>

        {/* Right Side */}

        <div className="flex items-center gap-3">
          {isLoggedIn ? <ProfileDropdown /> : <HeadButton />}
        </div>
      </nav>
    </header>
  );
}
