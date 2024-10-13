import Link from "next/link";
import Image from "next/image";
import SignoutBtn from "./header-components/SignoutBtn";

export default async function AdminHeader() {
  return (
    <div className="py-2 px-3 sm:px-5 md:px-10 w-full bg-white z-10 flex justify-between sm:justify-end">
      <div className="flex sm:hidden items-center gap-3">
        <div className="h-6 w-6 sm:hidden">
          <Image
            src="/images/hamburger.png"
            alt="Hamburger icon"
            width={30}
            height={30}
            priority
          />
        </div>
      </div>
      <div className="flex gap-1 sm:gap-2">
        <div className="py-1 px-1 rounded-[30px] duration-300 bg-lightGray flex ">
          <div className="flex px-3 rounded-div duration-300 hover:bg-silver items-center justify-center cursor-pointer">
            <Image
              src="/images/user.png"
              alt="User profile"
              width={21}
              height={21}
            />
          </div>
        </div>
        <div className="py-1 px-1 bg-lightGray rounded-div flex items-center justify-center cursor-pointer">
          <SignoutBtn />
        </div>
      </div>
    </div>
  );
}
