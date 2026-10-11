"use client";
import { ArrowLeft, ArrowRight, SearchX } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-green-800 via-green-400 to-green-200 px-5 py-16 text-white">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#baff00]/5 blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-[#baff00]/5 blur-[100px]" />

      <section className="relative mx-auto w-full max-w-5xl">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="text-3xl font-black tracking-tight">
            Your<span className="text-[#baff00]">Brand</span>
          </span>
          <span className="rounded border border-[#baff00]/40 px-2 py-1 text-xs text-[#baff00]">
            404
          </span>
        </Link>

        {/* Main content */}
        <div className="grid items-center gap-12 pt-20 md:grid-cols-2 md:gap-8">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#baff00]" />
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#baff00]">
                Error 404
              </span>
            </div>

            <h1 className="text-5xl font-black leading-tight tracking-tight sm:text-6xl">
              Page <span className="text-[#baff00]">Not Found</span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-8 text-gray-400">
              Oops! The page you are looking for does not exist. It may have
              been moved, deleted, or the URL might be incorrect.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-[#baff00] px-6 py-3.5 font-bold text-black transition hover:bg-[#d0ff66]"
              >
                <ArrowLeft size={18} />
                Back to Home
              </Link>

              <button
                type="button"
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 font-medium text-white transition hover:border-[#baff00] hover:text-[#baff00]"
              >
                Go Back
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* 404 illustration */}
          <div className="relative flex min-h-64 items-center justify-center">
            <div className="absolute inset-0 m-auto h-64 w-64 rounded-full border border-[#baff00]/10 sm:h-80 sm:w-80" />

            <div className="relative text-center">
              <p className="select-none text-[130px] font-black leading-none tracking-tighter text-white/[0.06] sm:text-[180px]">
                404
              </p>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border border-[#baff00]/30 bg-[#baff00]/10 text-[#baff00] shadow-[0_0_60px_rgba(186,255,0,0.08)]">
                  <SearchX size={42} strokeWidth={1.5} />
                </div>

                <p className="text-lg font-semibold text-white">
                  Lost in space?
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Let's get you back on track.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
          <p className="text-sm text-gray-500">
            <span className="mr-2 text-[#baff00]">—</span>
            Don't worry, it happens.
          </p>
          <Link
            href="/"
            className="text-sm text-gray-400 transition hover:text-[#baff00]"
          >
            Return to homepage ↗
          </Link>
        </div>
      </section>
    </main>
  );
}
