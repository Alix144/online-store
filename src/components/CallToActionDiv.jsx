"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CallToActionDiv() {
  const router = useRouter();

  const navigateToProducts = () => {
    router.push("/products");
  };

  return (
    <div
      className="md:mr-5 p-10 min-w-52 h-52 sm:min-w-60 sm:h-60 rounded-div bg-primary relative cursor-pointer overflow-hidden"
      onClick={() => navigateToProducts()}
    >
      <h2 className="font-bold text-lg lg:text-2xl text-white">
        Fresh <br /> Products
      </h2>
      <Image
        src="/images/tomatoes.png"
        alt="Tomatoes"
        width="150"
        height="150"
        className="bottom-0 -left-3 absolute scale-x-[-1]"
      />
      <Image
        src="/images/arrow.png"
        alt="Arrow"
        width="25"
        height="25"
        className="bottom-7 right-7 absolute -rotate-45 hover:bottom-8 hover:right-6 duration-300"
      />
    </div>
  );
}
