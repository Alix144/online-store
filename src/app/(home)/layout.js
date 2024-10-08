import "../globals.css";
import { Inter } from "next/font/google";

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
        <h1>main layout</h1>
        {children}
      </body>
    </html>
  );
}
