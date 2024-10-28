"use client";
import { setToTrue } from "@/redux/features/isSidebarOpen";
import Image from "next/image";
import { useDispatch } from "react-redux";

export default function AdminHamburderBtn() {
  const dispatch = useDispatch();

  const showSidebar = () => {
    dispatch(setToTrue())
  }

  return (
    <div className="h-6 w-6 sm:hidden" onClick={() => showSidebar()}>
      <Image
        src="/images/hamburger.png"
        alt="Hamburger icon"
        width={30}
        height={30}
      />
    </div>
  );
}
