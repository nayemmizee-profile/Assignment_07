import AllProductCard from "@/front section/allProduct";
import MarketBanner from "@/front section/hero";
import PriceDownCards from "@/front section/pricedown";
import PriceHikeCards from "@/front section/priceHike";

export default function Page() {
  return (
    <>
      <MarketBanner />
      <PriceHikeCards />
      <PriceDownCards />
      <AllProductCard />
    </>
  );
}
