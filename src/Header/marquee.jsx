import Link from "next/link";

export default async function Marquee() {
  let products = [];

  try {
    const res = await fetch(
      "https://api.abcz.workers.dev/api/bazardor/products",
      { cache: "no-store" },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    products = (await res.json()).slice(0, 10);
  } catch (error) {
    console.error("Marquee API Error:", error);
  }

  if (!Array.isArray(products) || products.length === 0) {
    return null;
  }

  // নিরবচ্ছিন্ন marquee তৈরির জন্য ডেটা ডুপ্লিকেট
  const marqueeProducts = [...products, ...products];

  return (
    <div className="w-full overflow-hidden border-y border-gray-200 bg-white">
      <div className="price-marquee-track flex w-max">
        {marqueeProducts.map((product, index) => {
          const isUp = product.change?.dir === "up";

          return (
            <>
        <Link href={`/products/${product.category}`} ><div
              key={`${product.id}-${index}`}
              className="flex h-[20px] shrink-0 items-center gap-2
                         border-r border-gray-200 px-4
                         whitespace-nowrap"
            >
              {/* Product Icon */}
              <span className="text-base">
                {product.categoryIcon || product.image || "🛒"}
              </span>

              {/* Product Name */}
              <span className="text-sm font-medium text-gray-800">
                {product.nameBn}
              </span>

              {/* Product Price */}
              <span className="text-sm text-gray-700">
                {Number(product.today).toLocaleString("bn-BD")} টাকা/কেজি
              </span>

              {/* Price Change */}
              <span
                className={`text-sm font-semibold ${
                  isUp ? "text-red-600" : "text-green-600"
                }`}
              >
                {isUp ? "▲" : "▼"}{" "}
                {Number(product.change?.pct || 0).toLocaleString("bn-BD", {
                  maximumFractionDigits: 1,
                })}
                %
              </span>
            </div>
          );
        })}
      </div>
    </div></Link>
  )</>;
}
