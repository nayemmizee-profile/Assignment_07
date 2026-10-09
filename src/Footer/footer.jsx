export default function Footer() {
  return (
    <section className="w-full border-y border-gray-200 bg-[#fdfefe] mt-6">
      <div
        className="
          mx-auto
          flex
          w-full
          max-w-[1200px]
          flex-col
          items-center
          justify-center
          gap-3
          px-5
          py-5
          text-center

          sm:px-6

          md:flex-row
          md:justify-between
          md:gap-6
          md:py-6
          md:text-left
        "
      >
        {/* Left Text */}
        <p className="text-sm leading-6 text-[#303631] md:text-base">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        {/* Right Text */}
        <p className="text-sm leading-6 text-[#303631] md:text-base md:text-right">
          সকল দাম স্থির নয়; বাজার অবস্থার উপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </section>
  );
}
