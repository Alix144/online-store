import NextAuthProvider from "@/providers/NextAuthProvider";
import Header from "@/components/Header";
import AdminSidebar from "@/components/AdminSidebar";
import "../globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextAuth";
import AdminHeader from "@/components/AdminHeader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Fruity Store | Home Page",
  description:
    "Shop fresh and preserved fruits, vegetables, dates, and a variety of foodstuffs at Fruity Store. Quality products delivered with care.",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user.email === "aliiyousseff144@gmail.com" || false;
  return (
    <html lang="en">
      <body className={`${inter.variable} ${isAdmin && "flex"}`}>
        <NextAuthProvider>
          {isAdmin ? (
            <div className="w-full flex">
              <AdminSidebar />
              <div className="w-full">
                <AdminHeader />
                {children}
              </div>
            </div>
          ) : (
            <div className="mx-auto w-[90%] sm:w-[80%]">
              <Header />
              {children}
              <Footer />
            </div>
          )}
        </NextAuthProvider>
      </body>
    </html>
  );
}
