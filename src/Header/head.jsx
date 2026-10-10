"use client";
import logo from "@/image/logo-icon.png";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  // Dynamic date
  const today = new Date();

  const date = today.toLocaleDateString("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const day = today.toLocaleDateString("bn-BD", {
    weekday: "long",
  });

  return (
    <header className="w-full border-b border-gray-200 bg-[#fdfefe]">
      <nav className="mx-auto flex h-[50px] max-w-[1250px] items-center justify-between px-6">
        {/* Logo & Website Info */}
        <Link href="/">
          {" "}
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="bg-stone-100 border-1 rounded-[10px] p-3">
              <Image
                src={logo}
                alt="Bazar logo"
                width={30}
                height={30}
                className="h-3 w-3"
              />
            </div>
            {/* Website Name */}
            <div className="leading-tight">
              <h1 className="text-[16px] font-bold tracking-tight text-gray-900">
                বাজার দর
              </h1>

              <p className="mt-0.5 text-[8px]  text-gray-600">
                {" "}
                {day},{date}
              </p>
            </div>
          </div>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-9">
          {/* Sign In */}
          <button
            type="button"
            className="text-[10px] font-extrabold py-1.5 px-4 text-gray-800 transition hover:bg-green-200 rounded-2xl hover:text-green-700"
          >
            সাইন ইন
          </button>

          {/* Sign Up */}
          <button
            type="button"
            className="rounded-xl bg-green-600 px-3 py-1.5 text-[10px] font-extrabold text-white shadow-md transition hover:bg-green-700 hover:shadow-lg"
          >
            সাইন আপ
          </button>
        </div>
      </nav>
    </header>
  );
}
