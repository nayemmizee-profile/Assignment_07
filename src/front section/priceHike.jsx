import Link from "next/link";

const products = [
  {
    id: 1,
    slug: "peyaj",
    name: "পেঁয়াজ",
    unit: "প্রতি কেজি",
    price: 54,
    change: "১২.৫%",
    type: "up",
    icon: "🧅",
  },
  {
    id: 2,
    slug: "ada",
    name: "আদা",
    unit: "প্রতি কেজি",
    price: 85,
    change: "৯.১%",
    type: "up",
    icon: "🫚",
  },
  {
    id: 3,
    slug: "begun",
    name: "বেগুন",
    unit: "প্রতি কেজি",
    price: 44,
    change: "৪.৮%",
    type: "up",
    icon: "🍆",
  },
  {
    id: 4,
    slug: "rui-mach",
    name: "রুই মাছ",
    unit: "প্রতি কেজি",
    price: 86,
    change: "৪.৮%",
    type: "up",
    icon: "🐟",
  },
  {
    id: 5,
    slug: "dim",
    name: "ডিম",
    unit: "প্রতি ডজন",
    price: 158,
    change: "৩.৯%",
    type: "up",
    icon: "🥚",
  },
  {
    id: 6,
    slug: "makhon",
    name: "মাখন (১০০ গ্রাম)",
    unit: "প্রতি পিস",
    price: 145,
    change: "৬.৬%",
    type: "up",
    icon: "🧈",
  },
];

export default function PriceHikeCards() {
  return (
    <section className="w-full max-w-[1200px] mx-auto mt-10">
      {/* Section Header */}
      <div className="mb-5 flex items-center gap-3">
        <span className="text-red-500 text-lg">▲</span>

        <h2 className="text-2xl md:text-3xl font-bold text-[#202824]">
          আজ দাম বেড়েছে
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="group"
          >
            <article className="h-full rounded-[20px] border border-gray-200 bg-[#fdfefe] p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#07883f]/30 hover:shadow-lg">
              {/* Product Info */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f1f6f2] text-3xl">
                    {product.icon}
                  </div>

                  {/* Name */}
                  <div>
                    <h3 className="text-lg font-bold text-[#202824] group-hover:text-[#07883f]">
                      {product.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">{product.unit}</p>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="mt-5 flex items-end justify-between">
                <div>
                  <p className="text-sm text-gray-500">আজকের দাম</p>

                  <p className="mt-1 text-2xl font-bold text-[#202824]">
                    {product.price} টাকা
                  </p>
                </div>

                {/* Price Change */}
                <div className="rounded-full bg-[#f1f6f2] px-3 py-2 text-sm font-semibold text-red-500">
                  ▲ {product.change}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
