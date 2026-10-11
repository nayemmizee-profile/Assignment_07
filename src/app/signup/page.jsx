"use client";

import { authClient } from "@/lib/auth-client";
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  Info,
  Leaf,
  LoaderCircle,
  LockKeyhole,
  Mail,
  UserRound,
  UserRoundPlus,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const cleanName = name.trim();
    const cleanEmail = email.trim();

    if (!cleanName || !cleanEmail || !password || !confirmPassword) {
      setError("সবগুলো ঘর পূরণ করুন।");
      return;
    }

    if (password.length < 8) {
      setError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    if (password !== confirmPassword) {
      setError("দুটি পাসওয়ার্ড মিলছে না।");
      return;
    }

    setLoading(true);

    try {
      const { error: authError } = await authClient.signUp.email({
        name: cleanName,
        email: cleanEmail,
        password,
        callbackURL: "/",
      });

      if (authError) {
        setError(
          authError.message || "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।",
        );
        return;
      }

      setSuccess("অ্যাকাউন্ট তৈরি হয়েছে।");
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Signup error:", err);
      setError("সমস্যা হয়েছে। ইন্টারনেট ও সার্ভার পরীক্ষা করুন।");
    } finally {
      setLoading(false);
    }
  }

  // Google ও GitHub OAuth শুরু করার ফাংশন
  async function handleSocialSignIn(provider) {
    setError("");
    setSuccess("");
    setSocialLoading(provider);

    try {
      const { error: authError } = await authClient.signIn.social({
        // provider হবে "google" অথবা "github"
        provider: "google",

        // OAuth সফল হলে ইউজারকে এই পেজে ফেরত পাঠাবে
        callbackURL: "/",
      });

      if (authError) {
        setError(authError.message || "সোশ্যাল সাইন আপ করা যায়নি।");
        setSocialLoading("");
      }

      // সফল OAuth সাধারণত provider-এর পেজে redirect করে।
      // তাই এখানে router.push() প্রয়োজন নেই।
    } catch (err) {
      console.error("Social authentication error:", err);
      setError("সোশ্যাল সাইন আপ শুরু করা যায়নি।");
      setSocialLoading("");
    }
  }

  async function handleSocialSignIn(provider) {
    setError("");
    setSuccess("");
    setSocialLoading(provider);

    try {
      const { error: authError } = await authClient.signIn.social({
        // provider হবে "google" অথবা "github"
        provider: "github",

        // OAuth সফল হলে ইউজারকে এই পেজে ফেরত পাঠাবে
        callbackURL: "/",
      });

      if (authError) {
        setError(authError.message || "সোশ্যাল সাইন আপ করা যায়নি।");
        setSocialLoading("");
      }

      // সফল OAuth সাধারণত provider-এর পেজে redirect করে।
      // তাই এখানে router.push() প্রয়োজন নেই।
    } catch (err) {
      console.error("Social authentication error:", err);
      setError("সোশ্যাল সাইন আপ শুরু করা যায়নি।");
      setSocialLoading("");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-[#dce6de] bg-[#fbfdfb] py-3 pl-11 pr-4 text-[15px] text-[#24352b] outline-none transition placeholder:text-[#929d95] focus:border-[#0b8f4b] focus:ring-4 focus:ring-[#0b8f4b]/10";

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f1f7f1] px-4 py-10 text-[#26342b] sm:px-6">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#d8f1df] opacity-70 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-[#d8f0dd] opacity-70 blur-2xl" />

      <div className="relative z-10 w-full max-w-[510px]">
        {/* Heading */}
        <header className="mb-7 text-center">
          <div className="mb-3 flex justify-center text-[#078642]">
            <Leaf size={39} strokeWidth={2.3} />
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-[#202c23] sm:text-[36px]">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#77837a] sm:text-base">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </header>

        {/* Form card */}
        <section className="rounded-[22px] border border-[#dfe9e1] bg-white/85 p-5 shadow-[0_15px_50px_rgba(36,75,47,0.06)] backdrop-blur-sm sm:p-7">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold"
              >
                নাম
              </label>

              <div className="relative">
                <UserRound
                  size={19}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#82968a]"
                />
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="যেমন: রহিম উদ্দিন"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                  required
                  maxLength={100}
                />
              </div>
            </div>

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
                  autoComplete="new-password"
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${inputClass} pr-12`}
                  required
                  minLength={8}
                  maxLength={128}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={
                    showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"
                  }
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#82968a] hover:text-[#078642]"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>

              <p className="mt-2 flex items-center gap-2 text-xs text-[#829087]">
                <Info size={15} />
                কমপক্ষে ৮ অক্ষরের হতে হবে।
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-semibold"
              >
                পাসওয়ার্ড নিশ্চিত করুন
              </label>

              <div className="relative">
                <LockKeyhole
                  size={19}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#82968a]"
                />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="আবার লিখুন"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`${inputClass} pr-12`}
                  required
                  minLength={8}
                  maxLength={128}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label={
                    showConfirmPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"
                  }
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#82968a] hover:text-[#078642]"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>

              {confirmPassword &&
                (password === confirmPassword ? (
                  <p className="mt-2 flex items-center gap-2 text-xs text-[#078642]">
                    <CheckCircle2 size={15} />
                    পাসওয়ার্ড মিলেছে।
                  </p>
                ) : (
                  <p className="mt-2 text-xs text-red-600">
                    পাসওয়ার্ড দুটি মিলছে না।
                  </p>
                ))}
            </div>

            {/* Error and success messages */}
            {error && (
              <p
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            {success && (
              <p
                role="status"
                className="rounded-lg bg-green-50 px-3 py-2.5 text-sm text-green-700"
              >
                {success}
              </p>
            )}

            {/* Email signup */}
            <button
              type="submit"
              disabled={loading || Boolean(socialLoading)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#078b43] px-4 py-3.5 font-semibold text-white shadow-[0_4px_0_#066c36] transition hover:bg-[#06783a] active:translate-y-0.5 active:shadow-none disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <LoaderCircle className="animate-spin" size={19} />
                  অ্যাকাউন্ট তৈরি হচ্ছে...
                </>
              ) : (
                <>
                  <UserRoundPlus size={19} />
                  অ্যাকাউন্ট তৈরি করুন
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#e0e8e2]" />
            <span className="text-sm text-[#7d887f]">অথবা</span>
            <div className="h-px flex-1 bg-[#e0e8e2]" />
          </div>

          {/* Google and GitHub OAuth buttons */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => handleSocialSignIn("google")}
              disabled={loading || Boolean(socialLoading)}
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#dce6de] bg-white px-3 py-3 text-sm font-semibold transition hover:bg-[#f5faf6] disabled:opacity-60"
            >
              {socialLoading === "google" ? (
                <LoaderCircle className="animate-spin" size={19} />
              ) : (
                <span className="text-lg font-extrabold text-[#4285F4]">G</span>
              )}
              Google দিয়ে চালিয়ে যান
            </button>

            <button
              type="button"
              onClick={() => handleSocialSignIn("github")}
              disabled={loading || Boolean(socialLoading)}
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#dce6de] bg-white px-3 py-3 text-sm font-semibold transition hover:bg-[#f5faf6] disabled:opacity-60"
            >
              {socialLoading === "github" ? (
                <LoaderCircle className="animate-spin" size={19} />
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  width="19"
                  height="19"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.07c-3.1.68-3.76-1.32-3.76-1.32-.5-1.3-1.24-1.65-1.24-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .1.72 2.4 3.34 1.73.1-.73.4-1.23.71-1.51-2.47-.28-5.07-1.24-5.07-5.5 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.42.11-2.96 0 0 .95-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.1-1.43 3.04-1.15 3.04-1.15.61 1.54.23 2.68.12 2.96.72.78 1.15 1.78 1.15 3.01 0 4.27-2.6 5.21-5.08 5.49.4.35.76 1.02.76 2.06V22c0 .3.2.64.77.53A11.1 11.1 0 0 0 12 .9Z" />
                </svg>
              )}
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          {/* Sign in link */}
          <p className="mt-6 text-center text-sm text-[#48564c]">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="font-semibold text-[#078b43] hover:text-[#056c34] hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </section>

        {/* Home link */}
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
