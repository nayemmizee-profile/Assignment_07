import Link from "next/link";
import { Suspense } from "react";

async function PriceHikeCardsData() {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("পণ্যের ডেটা লোড করা যায়নি");
  }

  const data = await res.json();

  // শুধু যেসব পণ্যের দাম বেড়েছে
  const priceHike = data
    .filter((product) => product.change?.dir === "up")
    .slice(0, 6);

  return (
    <section className="mx-auto mt-10 w-full max-w-[1200px]">
      {/* Section Header */}
      <div className="mb-5 flex items-center gap-3">
        <span className="text-lg text-red-500">▲</span>

        <h2 className="text-[20px] font-bold text-[#202824] md:text-3xl">
          আজ দাম বেড়েছে
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {priceHike.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.category}`}
            className="group"
          >
            <article className="h-full rounded-[20px] border border-gray-200 bg-[#fdfefe] p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              {/* Product Image/Icon */}
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1f6f2] text-3xl">
                  {product.image}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#202824]">
                    {product.nameBn}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    প্রতি {product.unit === "kg" ? "কেজি" : product.unit}
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="mt-5 flex items-end justify-between">
                <div>
                  <p className="text-sm text-gray-500">আজকের দাম</p>

                  <p className="mt-1 text-2xl font-bold text-[#202824]">
                    {product.today} টাকা
                  </p>
                </div>

                {/* Price Change */}
                <div className="rounded-full bg-[#f1f6f2] px-3 py-2 text-sm font-semibold text-red-500">
                  ▲ {product.change?.pct}%
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function PriceHikeCards() {
  return (
    <Suspense
      fallback={
        <section className="mx-auto mt-10 w-full max-w-[1200px]">
          <div className="mb-5 h-8 w-48 animate-pulse rounded bg-gray-200" />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-40 animate-pulse rounded-[20px] border border-gray-200 bg-gray-100"
              />
            ))}
          </div>
        </section>
      }
    >
      <PriceHikeCardsData />
    </Suspense>
  );
}
