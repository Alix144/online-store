"use client";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setToFalse } from "@/redux/features/isSidebarOpen";

export default function SignoutBtn() {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut()
    dispatch(setToFalse())
    localStorage.removeItem("userId");
  }

  return (
    <div className="py-1 px-3 rounded-div duration-300 hover:bg-silver" onClick={() => handleSignOut()}>
      <Image src="/images/signout.png" alt="Signout" width={17} height={17} />
    </div>
  );
}
