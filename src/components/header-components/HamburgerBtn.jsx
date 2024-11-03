"use client";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setToTrue } from "@/redux/features/isSidebarOpen";

export default function HamburgerBtn() {
  const dispatch = useDispatch();

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
