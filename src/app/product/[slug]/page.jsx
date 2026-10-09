import Link from "next/link";

export default async function CategoryProducts({ params }) {
  const { slug } = await params;
  console.log(slug);

  const res = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products?category=${slug}`,
  );

  if (!res.ok) {
    throw new Error("পণ্যের তথ্য পাওয়া যায়নি");
  }

  const products = await res.json();

  function getPriceChange(change) {
    if (change?.dir === "up") {
      return {
        icon: "▲",
        text: `${change.pct}%`,
        className: "bg-red-50 text-red-500",
      };
    }

    if (change?.dir === "down") {
      return {
        icon: "▼",
        text: `${change.pct}%`,
        className: "bg-green-50 text-green-600",
      };
    }

    return {
      icon: "—",
      text: "পরিবর্তন নেই",
      className: "bg-gray-100 text-gray-500",
    };
  }

  const categoryName = products[0]?.categoryNameBn || category;
  const categoryIcon = products[0]?.categoryIcon || "🛒";

  return (
    <main className="min-h-screen bg-[#f1f6f2] px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto max-w-[1200px]">
        {/* Category Header */}
        <section className="flex items-center gap-4 rounded-[18px] border border-gray-200 bg-[#fdfefe] p-5 md:p-6">
          <span className="text-3xl">{categoryIcon}</span>

          <div>
            <h1 className="text-2xl font-bold text-[#202824]">
              {categoryName}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              এই ক্যাটাগরির পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </section>

        {/* Sort Bar */}
        <section className="mt-5 flex min-h-[60px] items-center justify-end rounded-[18px] border border-gray-200 bg-[#fdfefe] px-4 md:px-6">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">সাজান</span>

            <select
              defaultValue="default"
              className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none"
            >
              <option value="default">ডিফল্ট</option>
            </select>
          </div>
        </section>

        {/* Product Count */}
        <p className="mt-4 text-sm text-gray-500">
          মোট {products.length}টি পণ্য দেখানো হচ্ছে
        </p>

        {/* Product Cards */}
        <section className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const change = getPriceChange(product.change);

            return (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group"
              >
                <article className="h-full rounded-[18px] border border-gray-200 bg-[#fdfefe] p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-md md:p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f1f6f2] text-2xl">
                      {product.image}
                    </div>

                    <div>
                      <h2 className="font-bold text-[#202824] group-hover:text-[#07883f]">
                        {product.nameBn}
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        প্রতি {product.unit === "kg" ? "কেজি" : product.unit}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-end justify-between gap-2">
                    <div>
                      <p className="text-sm text-gray-500">আজকের দাম</p>

                      <p className="mt-1 text-xl font-bold text-[#202824]">
                        {product.today} টাকা
                      </p>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${change.className}`}
                    >
                      {change.icon} {change.text}
                    </span>
                  </div>
                </article>
              </Link>
            );
          })}
        </section>

        {/* Empty State */}
        {products.length === 0 && (
          <p className="mt-8 rounded-xl bg-white p-6 text-center text-gray-500">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </p>
        )}
      </div>
    </main>
  );
}
