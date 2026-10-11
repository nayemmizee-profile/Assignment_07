import Link from "next/link";
export default function HeadButton() {
  return (
    <div className="flex items-center gap-3">
      {/* Sign In */}
      <Link href="/signin">
        <button
          type="button"
          className="text-[10px] font-extrabold py-1.5 px-4 text-gray-800 transition hover:bg-green-200 rounded-2xl hover:text-green-700"
        >
          সাইন ইন
        </button>
      </Link>

      {/* Sign Up */}
      <Link href="/signup">
        <button
          type="button"
          className="rounded-xl bg-green-600 px-3 py-1.5 text-[10px] font-extrabold text-white shadow-md transition hover:bg-green-700 hover:shadow-lg"
        >
          সাইন আপ
        </button>
      </Link>
    </div>
  );
}
