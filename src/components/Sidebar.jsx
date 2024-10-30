"use client";
import {
  setToOrders,
  setToProducts,
  setToHome,
  setToNull,
} from "@/redux/features/currentPage";
import { setToFalse } from "@/redux/features/isSidebarOpen";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import IconsNav from "./header-components/IconsNav";
import SignoutBtn from "./header-components/SignoutBtn";

export default function Sidebar({ isUserSignedIn }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const hideSidebar = () => {
    dispatch(setToFalse());
  };

  const goToHomePage = () => {
    router.push("/")
    dispatch(setToHome())
    hideSidebar()
  }

  const goToProductsPage = () => {
    dispatch(setToProducts())
    hideSidebar()
  }

  const goToOrderssPage = () => {
    dispatch(setToOrders())
    hideSidebar()
  }

  const goToSignInPage = () => {
    router.replace("/signin")
    dispatch(setToNull())
    hideSidebar()
}


  const currentPage = useSelector((state) => state.currentPage.value);
  const isSidebarOpen = useSelector((state) => state.isSidebarOpen.value);

  return (
    <div
      className={`w-[80%] h-screen py-5 px-14 bg-primary fixed top-0 ${
        isSidebarOpen ? "left-0" : "-left-[100%]"
      } flex flex-col gap-5 items-center z-10 duration-300 shadow-lg shadow-black sm:hidden`}
    >
      <div
        className="w-5 h-5 absolute top-5 left-5 block sm:hidden"
        onClick={() => hideSidebar()}
      >
        <Image
          src="/images/cross.png"
          alt="Close icon"
          width={100}
          height={100}
        />
      </div>

      <div className="mb-10 w-12 h-12 lg:w-16 lg:h-16 cursor-pointer" onClick={()=>goToHomePage()}>
        <Image
          src="/images/logo.png"
          alt="Fruity logo"
          width={100}
          height={100}
          priority
        />
      </div>

      {isUserSignedIn && <IconsNav isSidebarNav={true} />}

      <nav className="sm:w-full text-white items-center gap-2 lg:gap-10 flex flex-col ">
        <Link
          className={`${
            currentPage === "home" && "border-b-[1px]"
          } hover:border-b-[1px] border-white`}
          href={"/"}
          onClick={() => dispatch(setToHome())}
        >
          Home
        </Link>
        <Link
          className={`${
            currentPage === "products" && "border-b-[1px]"
          } hover:border-b-[1px] border-white`}
          href={"/products"}
          onClick={() => goToProductsPage()}
        >
          Products
        </Link>
        {isUserSignedIn && (
          <Link
            className={`${
              currentPage === "orders" && "border-b-[1px]"
            } hover:border-b-[1px] border-white`}
            href={"/orders"}
            onClick={() => goToOrderssPage()}
          >
            Orders
          </Link>
        )}
        <Link
          className="hover:border-b-[1px] border-white"
          href={"/#contact"}
          onClick={() => goToHomePage()}
        >
          Contact
        </Link>
      </nav>

      {!isUserSignedIn && (
        <button className="bg-secondary btn-style text-black" onClick={()=>goToSignInPage()}>Sign In</button>
      )}

      {isUserSignedIn && (
        <div className="rounded-div bg-lightGray">
          <SignoutBtn />
        </div>
      )}
    </div>
  );
}
