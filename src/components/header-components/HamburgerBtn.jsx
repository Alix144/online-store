"use client";
import Image from "next/image";
import {
  setToOrders,
  setToProducts,
  setToHome,
} from "@/redux/features/currentPage";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setToTrue } from "@/redux/features/isSidebarOpen";

export default function HamburgerBtn() {
  const dispatch = useDispatch();

  const currentPage = useSelector((state) => state.currentPage.value);

  const showSidebar = () => {
    dispatch(setToTrue())
  }

  return (
    <div className="h-6 w-6 sm:hidden" onClick={()=>showSidebar()}>
      <Image
        src="/images/hamburger.png"
        alt="Hamburger icon"
        width={30}
        height={30}
        priority
      />
    </div>
  );
}
