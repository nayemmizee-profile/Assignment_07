import Footer from "@/Footer/footer";
import Header from "@/Header/head";
import Marquee from "@/Header/marquee";
import Navbar from "@/Header/navbar";
import { Suspense } from "react";
import "./globals.css";

export const metadata = {
  title: "Bazar Dor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<p>Loading navbar...</p>}>
          <Header />
          <Navbar />
          <Marquee />
          {children}
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}
