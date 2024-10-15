"use client";
import Link from "next/link";
import {
  setToOrders,
  setToProducts,
  setToHome,
} from "@/redux/features/currentPage";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function LeftNav({ isUserSignedIn }) {
  const dispatch = useDispatch();

  const currentPage = useSelector(
    (state) => state.currentPage.value
  );

  return (
    <nav className="hidden items-center gap-2 lg:gap-10 sm:flex">
        <Link className={`${currentPage === "home" && "border-b-[1px]"} hover:border-b-[1px] border-primary`} href={"/"} onClick={()=>dispatch(setToHome())}>
          Home
        </Link>
        <Link
          className={`${currentPage === "products" && "border-b-[1px]"} hover:border-b-[1px] border-primary`}
          href={"/products"}
          onClick={()=>dispatch(setToProducts())}
        >
          Products
        </Link>
        {isUserSignedIn && (
          <Link
            className={`${currentPage === "orders" && "border-b-[1px]"} hover:border-b-[1px] border-primary`}
            href={"/orders"}
            onClick={()=>dispatch(setToOrders())}
          >
            Orders
          </Link>
        )}
        <Link
          className="hover:border-b-[1px] border-primary"
          href={"/#contact"}
          onClick={()=>dispatch(setToHome())}
        >
          Contact
        </Link>
      </nav>
  );
}
