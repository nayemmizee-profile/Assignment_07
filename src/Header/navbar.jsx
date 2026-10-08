import Link from "next/link";

export default async function Navbar() {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
  );
  const data = await res.json();

  //   console.log(data);

  return (
    <div className="w-full border-b border-gray-200 bg-[#fdfefe]">
      <div className="mx-auto flex h-[30px] max-w-[1200px] items-center gap-5">
        {data.map((n) => (
          <Link
            key={n.id}
            href={n.slug}
            className="flex text-[12px] transition hover:text-red-700 items-center font-bold gap-1"
          >
            <span>{n.icon}</span>
            <span>{n.nameBn}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
