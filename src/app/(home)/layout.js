import NextAuthProvider from "@/providers/NextAuthProvider";
import Header from "@/components/Header";
import "../globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Fruity Store | Home Page",
  description:
    "Shop fresh and preserved fruits, vegetables, dates, and a variety of foodstuffs at Fruity Store. Quality products delivered with care.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
      <NextAuthProvider>
        <div className="mx-auto w-[90%] sm:w-[80%]">
          <Header/>
           {children}
           <Footer/>
        </div>
      </NextAuthProvider>
      </body>
    </html>
  );
}
