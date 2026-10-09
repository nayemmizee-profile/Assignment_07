import Link from "next/link";

export default async function PriceDownCards() {
  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");

  const data = await res.json();

  // শুধু যেসব পণ্যের দাম কমেছে
  const priceHike = data
    .filter((product) => product.change.dir === "down")
    .slice(0, 6);

  return (
    <section className="w-full max-w-[1200px] mx-auto mt-10">
      {/* Section Header */}
      <div className="mb-5 flex items-center gap-3">
        <span className="text-green-500 text-lg">▼</span>

        <h2 className="text-[20px] md:text-3xl font-bold text-[#202824]">
          আজ দাম কমেছে
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {priceHike.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="group"
          >
            <article className="h-full rounded-[20px] border border-gray-200 bg-[#fdfefe] p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center gap-4">
                {/* Product Image/Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1f6f2] text-3xl">
                  {product.image}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#202824]">
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

                {/* Change */}
                <div className="rounded-full bg-[#f1f6f2] px-3 py-2 text-sm font-semibold text-green-500">
                  ▼ {product.change.pct}%
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
