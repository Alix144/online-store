"use client";
import { setToNull } from "@/redux/features/currentPage";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export default function SigninBtn() {
    const router = useRouter()
    const dispatch = useDispatch()

    const goToSiginPage = () => {
        router.replace("/signin")
        dispatch(setToNull())
    }

  return (
    <button className="btn-style bg-primary text-white" onClick={()=>goToSiginPage()}>Sign In</button>
  );
}
