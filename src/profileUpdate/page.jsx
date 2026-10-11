"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user?.name]);

  async function handleUpdate(event) {
    event.preventDefault();

    setMessage("");
    setError("");

    const updatedName = name.trim();

    if (!updatedName) {
      setError("আপনার নাম লিখুন।");
      return;
    }

    if (updatedName === user?.name) {
      setMessage("নামে কোনো পরিবর্তন করা হয়নি।");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.updateUser({
        name: updatedName,
      });

      if (result.error) {
        setError(result.error.message || "নাম আপডেট করা যায়নি।");
        return;
      }

      setMessage("আপনার নাম সফলভাবে আপডেট হয়েছে।");
    } catch (err) {
      console.error("Profile update error:", err);
      setError("নাম আপডেট করতে সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    setSigningOut(true);
    setError("");

    try {
      const result = await authClient.signOut();

      if (result.error) {
        setError("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
        return;
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Sign out error:", err);
      setError("সাইন আউট করতে সমস্যা হয়েছে।");
    } finally {
      setSigningOut(false);
    }
  }

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f0f5f0]">
        <p className="text-gray-600">লোড হচ্ছে...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f0f5f0] p-5">
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <p className="text-gray-700">প্রোফাইল দেখতে সাইন ইন করুন।</p>

          <button
            type="button"
            onClick={() => router.push("/signin")}
            className="mt-5 rounded-lg bg-green-700 px-6 py-3 text-white hover:bg-green-800"
          >
            সাইন ইন
          </button>
        </div>
      </main>
    );
  }

  const userName = user.name || "ব্যবহারকারী";
  const userEmail = user.email || "";
  const userImage = user.image || "";

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-[875px]">
        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#26332b]">আমার প্রোফাইল</h1>

          <p className="mt-1 text-sm text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন
          </p>
        </div>

        {/* User Information */}
        <section className="flex flex-col gap-5 rounded-[20px] border border-[#dfe8df] bg-[#fbfdfb] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="flex min-w-0 items-center gap-5">
            {userImage ? (
              <Image
                src={userImage}
                alt={userName}
                className="h-20 w-20 shrink-0 rounded-2xl object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-gray-500">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-12 w-12"
                  aria-hidden="true"
                >
                  <path d="M12 12a5 5 0 100-10 5 5 0 000 10Zm0 2c-4.42 0-8 2.24-8 5v2h16v-2c0-2.76-3.58-5-8-5Z" />
                </svg>
              </div>
            )}

            <div className="min-w-0">
              <h2 className="truncate text-xl font-semibold text-[#26332b]">
                {userName}
              </h2>

              <p className="mt-1 break-all text-sm text-gray-500 sm:text-base">
                {userEmail}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="shrink-0 rounded-xl border border-red-500 px-5 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50 disabled:opacity-60"
          >
            {signingOut ? "সাইন আউট হচ্ছে..." : "↩ সাইন আউট"}
          </button>
        </section>

        {/* Update Name Form */}
        <section className="mt-7 rounded-[20px] border border-[#dfe8df] bg-[#fbfdfb] p-6 sm:p-7">
          <h2 className="text-xl font-semibold text-[#26332b]">তথ্য</h2>

          <form onSubmit={handleUpdate} className="mt-10">
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-[#26332b]"
            >
              নাম
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="আপনার নাম লিখুন"
              maxLength={100}
              required
              className="h-12 w-full rounded-xl border border-[#dfe8df] bg-transparent px-4 text-base text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />

            {message && (
              <p className="mt-3 text-sm text-green-700" role="status">
                {message}
              </p>
            )}

            {error && (
              <p className="mt-3 text-sm text-red-600" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-5 h-12 w-full rounded-xl bg-green-700 font-semibold text-white shadow-md transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
