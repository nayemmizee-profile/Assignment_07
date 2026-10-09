export default async function ProductDetails({ params }) {
  const { slug } = await params;

  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");

  const products = await res.json();

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <main className="mx-auto max-w-[1200px] px-5 py-10">
      <div className="rounded-3xl border bg-white p-8">
        <div className="flex items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100 text-5xl">
            {product.image}
          </div>

          <div>
            <h1 className="text-3xl font-bold">{product.nameBn}</h1>

            <p className="mt-2 text-gray-500">প্রতি {product.unit}</p>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-gray-500">আজকের দাম</p>

          <p className="text-4xl font-bold">{product.today} টাকা</p>
        </div>
      </div>
    </main>
  );
}
