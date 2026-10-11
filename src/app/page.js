import AllProductCard from "@/front section/allProduct";
import MarketBanner from "@/front section/hero";
import PriceDownCards from "@/front section/pricedown";
import PriceHikeCards from "@/front section/priceHike";
import ProfilePage from "./profileUpdate/page";
import SignInPage from "./signin/page";
import SignupPage from "./signup/page";

export default function Page() {
  return (
    <>
      <MarketBanner />
      <PriceHikeCards />
      <PriceDownCards />
      <AllProductCard />
      <SignInPage />
      <SignupPage />
      <ProfilePage />
    </>
  );
}
