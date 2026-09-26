import { Inter, Oswald } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${oswald.variable}`}>
        <div className="flex min-h-screen flex-col bg-[#111318]">
          <Navbar />

          <main className="flex-1">{children}</main>

          <Footer />
        </div>

        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar
          theme="dark"
        />
      </body>
    </html>
  );
}