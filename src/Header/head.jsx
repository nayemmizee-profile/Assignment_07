export default function Navbar() {
  // Dynamic date
  const today = new Date();

  const date = today.toLocaleDateString("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="w-full border-b border-gray-200 bg-[#fdfefe]">
      <nav className="mx-auto flex h-[82px] max-w-[1200px] items-center justify-between px-6">
        {/* Logo & Website Info */}
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.8"
              className="h-7 w-7"
            >
              <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 8H6" />
              <circle cx="10" cy="20" r="1.2" />
              <circle cx="18" cy="20" r="1.2" />
              <path d="M9 11h8M11 8v6M15 8v6" />
            </svg>
          </div>

          {/* Website Name */}
          <div className="leading-tight">
            <h1 className="text-[23px] font-bold tracking-tight text-gray-900">
              বাজার দর
            </h1>

            <p className="mt-0.5 text-sm font-medium text-gray-600">
              সবজির বাজার, {date}
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-9">
          {/* Sign In */}
          <button
            type="button"
            className="text-[16px] font-semibold text-gray-800 transition hover:text-green-700"
          >
            সাইন ইন
          </button>

          {/* Sign Up */}
          <button
            type="button"
            className="rounded-xl bg-green-600 px-6 py-3 text-[16px] font-semibold text-white shadow-md transition hover:bg-green-700 hover:shadow-lg"
          >
            সাইন আপ
          </button>
        </div>
      </nav>
    </header>
  );
}
