"use client";
export default function Loading() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f8faf5]">
      {/* Background gradient glow */}
      <div className="absolute -left-32 -top-32 h-96 w-96 animate-pulse rounded-full bg-green-300/30 blur-[100px]" />

      <div className="absolute -bottom-32 -right-32 h-96 w-96 animate-pulse rounded-full bg-yellow-300/30 blur-[100px]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-5 text-center">
        {/* Logo */}
        <h1 className="text-4xl font-extrabold tracking-tight text-green-800">
          বাজার<span className="text-orange-500">দর</span>
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          প্রতিদিনের বাজারদর, এক জায়গায়
        </p>

        {/* Animated loader */}
        <div className="relative mt-12 flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 animate-spin rounded-full bg-[conic-gradient(from_0deg,transparent_0%,#16a34a_30%,#facc15_65%,#16a34a_85%,transparent_100%)]" />

          <div className="absolute inset-[5px] rounded-full bg-[#f8faf5]" />

          <div className="absolute inset-0 animate-pulse rounded-full bg-green-400/20 blur-xl" />

          <span className="relative text-4xl">🛍️</span>
        </div>

        {/* Loading message */}
        <h2 className="mt-9 text-2xl font-bold text-gray-800 sm:text-3xl">
          বাজারদর{" "}
          <span className="animate-pulse bg-gradient-to-r from-green-600 via-lime-500 to-orange-400 bg-clip-text text-transparent">
            লোড হচ্ছে...
          </span>
        </h2>

        <p className="mt-4 max-w-sm text-sm leading-7 text-gray-500 sm:text-base">
          আপনার প্রয়োজনীয় পণ্যের দাম জানতে একটু অপেক্ষা করুন।
        </p>

        {/* Animated progress bar */}
        <div className="mt-8 h-2 w-56 overflow-hidden rounded-full bg-green-100">
          <div className="h-full w-1/2 animate-[loading_1.5s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-green-600 via-lime-400 to-yellow-400" />
        </div>

        <p className="mt-4 text-xs font-medium tracking-widest text-green-700">
          আপনার বাজার, আপনার হিসাব
        </p>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 h-1 w-full bg-gradient-to-r from-green-700 via-lime-400 to-orange-400" />

      <style jsx>{`
        @keyframes loading {
          0% {
            transform: translateX(-110%);
          }
          100% {
            transform: translateX(220%);
          }
        }
      `}</style>
    </main>
  );
}
