"use client";

import HeroPhoto from "@/image/bazar-hero.png";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MarketBanner() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date();

    const formattedDate = today.toLocaleDateString("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    setDate(formattedDate);
  }, []);

  return (
    <section className="mx-auto mt-2 flex w-full max-w-[1200px] justify-center rounded-[28px] border border-gray-200 bg-[#fdfefe] px-6 py-7 md:px-10 md:py-8">
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        {/* Left Content */}
        <div className="w-full md:w-[65%]">
          {/* Date */}
          <span className="inline-block rounded-full bg-[#e5f5eb] px-4 py-2 text-sm font-medium text-[#07883f]">
            {date || "তারিখ লোড হচ্ছে..."}
          </span>

          {/* Title */}
          <h1 className="mt-4 text-xl font-bold tracking-tight text-[#202824] md:text-2xl lg:text-3xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Description */}
          <p className="mt-4 max-w-1xl text-base leading-8 text-gray-500 md:text-[15px]">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* Button */}
          <Link
            href="/products"
            className="mt-7 inline-flex items-center rounded-xl bg-[#07883f] px-4 py-2 text-base font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#057535] hover:shadow-lg"
          >
            সব পণ্য দেখুন
            <span className="ml-2 text-lg">→</span>
          </Link>
        </div>

        {/* Right Image */}
        <div className="relative flex w-full justify-center md:w-[35%]">
          <Image
            src={HeroPhoto}
            alt="বাজারের পণ্য"
            width={300}
            height={230}
            priority
            className="h-auto w-[220px] object-contain md:w-[280px]"
          />
        </div>
      </div>
    </section>
  );
}
