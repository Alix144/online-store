"use client";

import { setToHome } from "@/redux/features/currentPage";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export default function HomeBtn() {
  const router = useRouter();
  const dispatch = useDispatch()

  const navigateToHome = () => {
    router.push("/")
    dispatch(setToHome())
  }
  
  return (
    <button
      className="w-64 btn-style bg-primary text-white"
      onClick={() => navigateToHome()}
    >
      Home
    </button>
  );
}
