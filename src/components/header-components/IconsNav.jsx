"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function IconsNav() {
    const router = useRouter()

    const navigateToFavorite = () => {
        router.push("/favorites")
    }

    const navigateToProfile = () => {
        router.push("/profile")
    }

    const navigateToCart = () => {
        router.push("/cart")
    }

  return (
    <div className="py-1 px-1 rounded-[30px] duration-300 bg-lightGray flex ">
      <div className="hidden sm:flex py-1 px-3 rounded-div duration-300 hover:bg-silver items-center justify-center cursor-pointer" onClick={()=>navigateToFavorite()}>
        <Image
          src="/images/empty-heart.png"
          alt="Empty heart"
          width={21}
          height={21}
        />
      </div>
      <div className="hidden sm:flex px-3 rounded-div duration-300 hover:bg-silver items-center justify-center cursor-pointer" onClick={()=>navigateToProfile()}>
        <Image
          src="/images/user.png"
          alt="User profile"
          width={21}
          height={21}
        />
      </div>
      <div className="px-3 rounded-div duration-300 hover:bg-silver flex items-center justify-center cursor-pointer" onClick={()=>navigateToCart()}>
        <Image src="/images/cart.png" alt="Cart" width={21} height={21} />
      </div>
    </div>
  );
}
