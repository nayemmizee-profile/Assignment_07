import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const API_URL = "https://api.abcz.workers.dev/api/bazardor/products";

const money = (value) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(value ?? 0);

async function ProductDetailsData({ params }) {
  const { category, slugId } = await params;

  const res = await fetch(`${API_URL}?id=${slugId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product data");
  }

  const data = await res.json();
  const products = Array.isArray(data) ? data : data.products || [];

  const product = products.find((item) => String(item.id) === String(slugId));

  if (!product) {
    notFound();
  }

  const markets = product.markets || [];

  const minPrice = markets.length
    ? Math.min(...markets.map((market) => market.min))
    : 0;

  const maxPrice = markets.length
    ? Math.max(...markets.map((market) => market.max))
    : 0;

  const averagePrice = markets.length
    ? markets.reduce((sum, market) => sum + (market.min + market.max) / 2, 0) /
      markets.length
    : 0;

  const isUp = product.change?.dir === "up";
  const priceChange = Math.abs((product.today ?? 0) - (product.yesterday ?? 0));

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-6 text-[#26332a] sm:px-6">
      <div className="mx-auto max-w-5xl">
        {/* Breadcrumb */}
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-gray-600">
          <Link href="/" className="transition-colors hover:text-green-700">
            হোম
          </Link>

          <span>›</span>

          <Link
            href={`/products/${product.category}`}
            className="transition-colors hover:text-green-700"
          >
            {product.categoryNameBn}
          </Link>

          <span>›</span>

          <span className="text-gray-800">{product.nameBn}</span>
        </nav>

        {/* Product Header */}
        <section className="mb-4 flex flex-col justify-between gap-4 rounded-xl border border-[#e0e9e1] bg-[#fbfdfb] p-4 sm:flex-row sm:items-center sm:p-5">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-3xl sm:h-16 sm:w-16">
              {product.image || product.categoryIcon || "🍚"}
            </div>

            <div className="min-w-0">
              <h1 className="text-xl font-bold sm:text-2xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-xs text-gray-500">
                {product.categoryNameBn} ·{" "}
                {product.unit === "kg" ? "প্রতি কেজি" : product.unit}
              </p>

              <p className="mt-2 text-xs text-gray-700">
                গতকালের তুলনায় আজকের দামের পরিবর্তন:{" "}
                <span
                  className={
                    isUp
                      ? "font-semibold text-red-500"
                      : "font-semibold text-green-600"
                  }
                >
                  {money(priceChange)} টাকা
                </span>
              </p>
            </div>
          </div>

          {/* Today's Price */}
          <div className="w-full rounded-xl bg-[#f0f5f0] px-5 py-3 text-center sm:w-auto sm:min-w-28">
            <p className="text-xs text-gray-500">আজকের দাম</p>

            <p className="text-2xl font-bold">{money(product.today)}</p>

            <p className="text-xs text-gray-500">
              টাকা / {product.unit === "kg" ? "কেজি" : product.unit}
            </p>

            <p
              className={`mt-1 text-xs font-semibold ${
                isUp ? "text-red-500" : "text-green-600"
              }`}
            >
              {isUp ? "▲" : "▼"} {money(product.change?.pct ?? 0)}%
            </p>
          </div>
        </section>

        {/* Price Summary */}
        <section className="rounded-xl border border-[#e0e9e1] bg-[#fbfdfb] p-4 sm:p-5">
          <h2 className="mb-3 text-sm font-bold">দামের সারসংক্ষেপ</h2>

          <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {/* Lowest Price */}
            <div className="rounded-xl border border-[#e0e9e1] p-4 transition-colors hover:bg-[#f5faf5]">
              <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>

              <p className="mt-1 text-xl font-bold text-green-600">
                {money(minPrice)} টাকা
              </p>

              <p className="mt-1 text-xs text-gray-500">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            {/* Highest Price */}
            <div className="rounded-xl border border-[#e0e9e1] p-4 transition-colors hover:bg-[#f5faf5]">
              <p className="text-xs text-gray-500">সর্বোচ্চ দাম</p>

              <p className="mt-1 text-xl font-bold text-red-500">
                {money(maxPrice)} টাকা
              </p>

              <p className="mt-1 text-xs text-gray-500">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            {/* Average Price */}
            <div className="rounded-xl border border-[#e0e9e1] p-4 transition-colors hover:bg-[#f5faf5]">
              <p className="text-xs text-gray-500">গড় দাম</p>

              <p className="mt-1 text-xl font-bold text-green-600">
                {money(averagePrice)} টাকা
              </p>

              <p className="mt-1 text-xs text-gray-500">
                প্রতি এককের গড় হিসাবে
              </p>
            </div>
          </div>

          {/* Market Table */}
          <h2 className="mb-3 text-sm font-bold">বাজারভিত্তিক আজকের দাম</h2>

          <div className="overflow-x-auto rounded-xl border border-[#e0e9e1]">
            <table className="w-full min-w-[650px] border-collapse text-left text-xs">
              <thead className="bg-[#f8fbf8] text-gray-500">
                <tr>
                  <th className="px-3 py-3 font-semibold">বাজার</th>
                  <th className="px-3 py-3 font-semibold">বিভাগ</th>
                  <th className="px-3 py-3 text-right font-semibold">
                    সর্বনিম্ন
                  </th>
                  <th className="px-3 py-3 text-right font-semibold">
                    সর্বোচ্চ
                  </th>
                  <th className="px-3 py-3 text-right font-semibold">গড়</th>
                </tr>
              </thead>

              <tbody>
                {markets.map((market, index) => {
                  const avg = (market.min + market.max) / 2;

                  return (
                    <tr
                      key={`${market.market}-${index}`}
                      className="border-t border-[#dce5dd] transition-colors even:bg-[#f0f5f0] hover:bg-[#e7f0e8]"
                    >
                      <td className="whitespace-nowrap px-3 py-3 font-medium">
                        {market.market}
                      </td>

                      <td className="whitespace-nowrap px-3 py-3">
                        {market.division}
                      </td>

                      <td className="whitespace-nowrap px-3 py-3 text-right">
                        {money(market.min)} টাকা
                      </td>

                      <td className="whitespace-nowrap px-3 py-3 text-right">
                        {money(market.max)} টাকা
                      </td>

                      <td className="whitespace-nowrap px-3 py-3 text-right font-semibold">
                        {money(avg)} টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {markets.length === 0 && (
              <p className="px-4 py-8 text-center text-sm text-gray-500">
                এই পণ্যের কোনো বাজারের তথ্য পাওয়া যায়নি।
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default function ProductDetails({ params }) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#f0f5f0] px-4 py-6 text-[#26332a] sm:px-6">
          <div className="mx-auto max-w-5xl animate-pulse rounded-xl border border-[#e0e9e1] bg-[#fbfdfb] p-6">
            <p className="text-sm text-gray-500">পণ্যের তথ্য লোড হচ্ছে...</p>
          </div>
        </main>
      }
    >
      <ProductDetailsData params={params} />
    </Suspense>
  );
}
