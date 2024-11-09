import NextAuthProvider from "@/providers/NextAuthProvider";
import Header from "@/components/Header";
import AdminSidebar from "@/components/AdminSidebar";
import "../globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextAuth";
import ReduxProvider from "@/redux/ReduxProvider";
import AdminHeader from "@/components/AdminHeader";
import Sidebar from "@/components/Sidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user.email === "aliiyousseff144@gmail.com" || false;
  return (
    <html lang="en">
      <body className={`${inter.variable} ${isAdmin && "flex"}`}>
        <ReduxProvider>
          <NextAuthProvider>
            {isAdmin ? (
              <div className="w-full flex relative">
                <AdminSidebar userId={session.user.id}/>
                <div className="w-full">
                  <AdminHeader />
                  {children}
                </div>
              </div>
            ) : (
              <div className="mx-auto w-[90%] sm:w-[80%] relative">
                <Header />
                <Sidebar isUserSignedIn={session?.user}/>
                {children}
                <Footer />
              </div>
            )}
          </NextAuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
