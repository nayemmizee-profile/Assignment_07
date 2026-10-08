import Header from "@/Header/head";
import Navbar from "@/Header/navbar";
import "./globals.css";

export const metadata = {
  title: "Bazar Dor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
