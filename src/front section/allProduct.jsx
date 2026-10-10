import Link from "next/link";
import { Suspense } from "react";

async function AllProductCardData() {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("পণ্যের তথ্য পাওয়া যায়নি");
  }

  const products = await res.json();

  function getPriceChange(change) {
    if (change?.dir === "up") {
      return {
        icon: "↑",
        text: `${change.pct}%`,
        className: "bg-red-50 text-red-500",
      };
    }

    if (change?.dir === "down") {
      return {
        icon: "↓",
        text: `${change.pct}%`,
        className: "bg-green-50 text-green-600",
      };
    }

    return {
      icon: "--",
      text: "0.0%",
      className: "bg-gray-100 text-gray-500",
    };
  }

  return (
    <section className="mx-auto mt-10 w-full max-w-[1200px]">
      {/* Section Header */}
      <div className="mb-5 flex flex-col gap-3">
        <h2 className="flex gap-3 text-[20px] font-bold text-[#202824] md:text-3xl">
          <span className="text-lg text-[#07883f]">●</span>
          সব পণ্য
        </h2>

        <p className="text-[8px] font-bold text-[#555655] md:text-base">
          মোট {products.length}টি পণ্য দেখানো হচ্ছে
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const change = getPriceChange(product.change);

          return (
            <Link
              key={product.id}
              href={`/products/${product.category}`}
              className="group"
            >
              <article className="h-full rounded-[20px] border border-gray-200 bg-[#fdfefe] p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#07883f]/30 hover:shadow-lg">
                {/* Product Info */}
                <div className="flex items-center gap-4">
                  {/* Product Image/Icon */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f1f6f2] text-3xl">
                    {product.image}
                  </div>

                  {/* Product Name */}
                  <div>
                    <h3 className="text-lg font-bold text-[#202824] group-hover:text-[#07883f]">
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

                  {/* Dynamic Change */}
                  <div
                    className={`rounded-full px-3 py-2 text-sm font-semibold ${change.className}`}
                  >
                    {change.icon} {change.text}
                  </div>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default function AllProductCard() {
  return (
    <Suspense
      fallback={
        <section className="mx-auto mt-10 w-full max-w-[1200px]">
          <div className="mb-5 flex flex-col gap-3">
            <h2 className="flex gap-3 text-[20px] font-bold text-[#202824] md:text-3xl">
              <span className="text-lg text-[#07883f]">●</span>
              সব পণ্য
            </h2>

            <p className="text-sm text-gray-500">পণ্যের তথ্য লোড হচ্ছে...</p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-40 animate-pulse rounded-[20px] border border-gray-200 bg-[#fdfefe] p-5"
              />
            ))}
          </div>
        </section>
      }
    >
      <AllProductCardData />
    </Suspense>
  );
}
