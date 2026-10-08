import logo from "@/image/logo-icon.png";
import Image from "next/image";

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
      <nav className="mx-auto flex h-[70px] max-w-[1250px] items-center justify-between px-6">
        {/* Logo & Website Info */}
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="bg-stone-200 border-1 rounded-2xl p-3">
            <Image
              src={logo}
              alt="Bazar logo"
              width={30}
              height={30}
              className="h-6 w-6"
            />
          </div>
          {/* Website Name */}
          <div className="leading-tight">
            <h1 className="text-[18px] font-bold tracking-tight text-gray-900">
              বাজার দর
            </h1>

            <p className="mt-0.5 text-[10px]  text-gray-600">
              {" "}
              {day},{date}
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-9">
          {/* Sign In */}
          <button
            type="button"
            className="text-[12px] font-semibold text-gray-800 transition hover:text-green-700"
          >
            সাইন ইন
          </button>

          {/* Sign Up */}
          <button
            type="button"
            className="rounded-xl bg-green-600 px-6 py-2 text-[12px] font-semibold text-white shadow-md transition hover:bg-green-700 hover:shadow-lg"
          >
            সাইন আপ
          </button>
        </div>
      </nav>
    </header>
  );
}
