import Footer from "@/Footer/footer";
import Header from "@/Header/head";
import Marquee from "@/Header/marquee";
import Navbar from "@/Header/navbar";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
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
        <ToastContainer
          position="top-right"
          autoClose={3000}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}
