"use client";
import { useRouter } from "next/navigation";

export default function SigninBtn() {
    const router = useRouter()

    const goToSiginPage = () => {
        router.replace("/signin")
    }

  return (
    <button className="btn-style bg-primary text-white" onClick={()=>goToSiginPage()}>Sign In</button>
  );
}
