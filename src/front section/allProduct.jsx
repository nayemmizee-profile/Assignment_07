import Link from "next/link";

export default async function AllProductCard() {
  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");

  const data = await res.json();

  const products = data;

  function getPriceChange(change) {
    if (change.dir === "up") {
      return {
        icon: "↑",
        text: `${change.pct}%`,
        className: "bg-red-50 text-red-500",
      };
    }

    if (change.dir === "down") {
      return {
        icon: "↓",
        text: `${change.pct}%`,
        className: "bg-green-50 text-green-600",
      };
    }

    return {
      icon: "-- 0.0%",
      text: "",
      className: "bg-gray-100 text-gray-500",
    };
  }

  return (
    <section className="w-full max-w-[1200px] mx-auto mt-10">
      {/* Section Header */}
      <div className="mb-5 flex flex-col justify-baseline  gap-3">
        <h2 className="text-[20px] gap-3 flex md:text-3xl font-bold text-[#202824]">
          <span className="text-[#07883f] text-lg">●</span> সব পণ্য
        </h2>

        <p className="text-[8px] md:text-base font-bold text-[#555655]">
          মোট {products.length}টি পণ্য দেখানো হচ্ছে
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((product) => {
          // প্রতিটি product-এর price change বের করছি
          const change = getPriceChange(product.change);

          return (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
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
                      প্রতি {product.unit}
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
