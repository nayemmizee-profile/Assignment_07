"use client";

import { authClient } from "@/lib/auth-client";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");
  const [error, setError] = useState("");

  const inputClass =
    "w-full rounded-xl border border-[#dce6de] bg-[#fbfdfb] py-3 pl-11 pr-12 text-[15px] text-[#26342b] outline-none transition placeholder:text-[#929d95] focus:border-[#078b43] focus:ring-4 focus:ring-[#078b43]/10";

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("ইমেইল ও পাসওয়ার্ড লিখুন।");
      return;
    }

    setLoading(true);

    try {
      const { error: authError } = await authClient.signIn.email({
        email: email.trim(),
        password,
        callbackURL: "/",
      });

      if (authError) {
        setError(
          authError.message ||
            "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়। আবার চেষ্টা করুন।",
        );
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("লগইন করা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করুন।");
    } finally {
      setLoading(false);
    }
  }

  async function handleSocialSignIn(provider) {
    setError("");
    setSocialLoading(provider);

    try {
      const { error: authError } = await authClient.signIn.social({
        provider,
        callbackURL: "/dashboard",
      });

      if (authError) {
        setError(authError.message || "সোশ্যাল লগইন করা যায়নি।");
        setSocialLoading("");
      }
    } catch {
      setError("লগইন শুরু করা যায়নি। আবার চেষ্টা করুন।");
      setSocialLoading("");
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f1f7f1] px-4 py-10 text-[#26342b] sm:px-6">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#d8f1df] opacity-70 blur-2xl" />

      <div className="pointer-events-none absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-[#d8f0dd] opacity-70 blur-2xl" />

      <div className="relative z-10 w-full max-w-[494px]">
        {/* Heading */}
        <header className="mb-7 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#202c23] sm:text-[34px]">
            সাইন ইন
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#77837a] sm:text-base">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </header>

        {/* Sign In Card */}
        <section className="rounded-[22px] border border-[#dfe9e1] bg-white/85 p-5 shadow-[0_15px_50px_rgba(36,75,47,0.06)] backdrop-blur-sm sm:p-7">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold"
              >
                ইমেইল
              </label>

              <div className="relative">
                <Mail
                  size={19}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#82968a]"
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold"
              >
                পাসওয়ার্ড
              </label>

              <div className="relative">
                <LockKeyhole
                  size={19}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#82968a]"
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="আপনার পাসওয়ার্ড লিখুন"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"
                  }
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#82968a] transition hover:text-[#078b43]"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || Boolean(socialLoading)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#078b43] px-4 py-3.5 font-semibold text-white shadow-[0_4px_0_#066c36] transition hover:bg-[#06783a] active:translate-y-0.5 active:shadow-none disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <LoaderCircle size={19} className="animate-spin" />
                  লগইন হচ্ছে...
                </>
              ) : (
                "সাইন ইন"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#e0e8e2]" />
            <span className="text-sm text-[#7d887f]">অথবা</span>
            <div className="h-px flex-1 bg-[#e0e8e2]" />
          </div>

          {/* Social Sign In */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => handleSocialSignIn("google")}
              disabled={loading || Boolean(socialLoading)}
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#dce6de] bg-white px-2 py-3 text-sm font-semibold transition hover:bg-[#f5faf6] disabled:opacity-60"
            >
              <span className="text-lg font-extrabold text-[#4285F4]">G</span>

              {socialLoading === "google"
                ? "অপেক্ষা করুন..."
                : "Google দিয়ে চালিয়ে যান"}
            </button>

            <button
              type="button"
              onClick={() => handleSocialSignIn("github")}
              disabled={loading || Boolean(socialLoading)}
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#dce6de] bg-white px-2 py-3 text-sm font-semibold transition hover:bg-[#f5faf6] disabled:opacity-60"
            >
              <svg
                viewBox="0 0 24 24"
                width="19"
                height="19"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.07c-3.1.68-3.76-1.32-3.76-1.32-.5-1.3-1.24-1.65-1.24-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .1.72 2.4 3.34 1.73.1-.73.4-1.23.71-1.51-2.47-.28-5.07-1.24-5.07-5.5 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.42.11-2.96 0 0 .95-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.1-1.43 3.04-1.15 3.04-1.15.61 1.54.23 2.68.12 2.96.72.78 1.15 1.78 1.15 3.01 0 4.27-2.6 5.21-5.08 5.49.4.35.76 1.02.76 2.06V22c0 .3.2.64.77.53A11.1 11.1 0 0 0 12 .9Z" />
              </svg>

              {socialLoading === "github"
                ? "অপেক্ষা করুন..."
                : "GitHub দিয়ে চালিয়ে যান"}
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm text-[#48564c]">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="font-semibold text-[#078b43] transition hover:text-[#056c34] hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </section>

        {/* Home Link */}
        <div className="mt-7 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#87938a] transition hover:text-[#078b43]"
          >
            <ArrowLeft size={16} />
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}
