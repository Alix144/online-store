"use client";
import Image from "next/image";
import { setToHome } from "@/redux/features/currentPage";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export default function Logo() {
  const router = useRouter();
  const dispatch = useDispatch();

  const goToHomePage = () => {
    router.replace("/signin");
    dispatch(setToHome());
  };

  return (
    <div className="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 cursor-pointer" onClick={()=>goToHomePage()}>
      <Image
        src="/images/logo.png"
        alt="Fruity logo"
        width={300}
        height={300}
        priority
      />
    </div>
  );
}
