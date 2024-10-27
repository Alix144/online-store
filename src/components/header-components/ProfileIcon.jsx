"use client";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProfileIcon() {
  const router = useRouter();
  const dispatch = useDispatch();

  const navigateToProfile = () => {
    router.push("/admin/profile");
    // dispatch(setToProfile());
  };

  return (
    <div
      className="flex px-3 rounded-div duration-300 hover:bg-silver items-center justify-center cursor-pointer"
      onClick={()=>navigateToProfile()}
    >
      <Image src="/images/user.png" alt="User profile" width={21} height={21} />
    </div>
  );
}
