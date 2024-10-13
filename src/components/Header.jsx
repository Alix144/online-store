import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextAuth";
import SignoutBtn from "./header-components/SignoutBtn"
import SigninBtn from "./header-components/signinBtn";

export default async function Header() {
  const session = await getServerSession(authOptions);
  console.log(session)
  return (
    <header className="my-5 flex justify-between relative items-center z-10">
      <div className="h-6 w-6 sm:hidden">
        <Image
          src="/images/hamburger.png"
          alt="Hamburger icon"
          width={30}
          height={30}
          priority
        />
      </div>
      <nav className="hidden items-center gap-2 lg:gap-10 sm:flex">
        <Link className="hover:border-b-[1px] border-primary" href={"/"}>
          Home
        </Link>
        <Link
          className="hover:border-b-[1px] border-primary"
          href={"/products"}
        >
          Products
        </Link>
        {session?.user && (
          <Link
            className="hover:border-b-[1px] border-primary"
            href={"/orders"}
          >
            Orders
          </Link>
        )}
        <Link
          className="hover:border-b-[1px] border-primary"
          href={"/#contact"}
        >
          Contact
        </Link>
      </nav>
      <div className="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 cursor-pointer">
        <Image
          src="/images/logo.png"
          alt="Fruity logo"
          width={300}
          height={300}
          priority
        />
      </div>

      {session?.user ? (
        <div className="flex gap-1 sm:gap-2">
          <div className="py-1 px-1 rounded-[30px] duration-300 bg-lightGray flex ">
            <div className="hidden sm:flex py-1 px-3 rounded-div duration-300 hover:bg-silver items-center justify-center cursor-pointer">
              <Image
                src="/images/empty-heart.png"
                alt="Empty heart"
                width={21}
                height={21}
              />
            </div>
            <div className="hidden sm:flex px-3 rounded-div duration-300 hover:bg-silver items-center justify-center cursor-pointer">
              <Image
                src="/images/user.png"
                alt="User profile"
                width={21}
                height={21}
              />
            </div>
            <div className="px-3 rounded-div duration-300 hover:bg-silver flex items-center justify-center cursor-pointer">
              <Image src="/images/cart.png" alt="Cart" width={21} height={21} />
            </div>
          </div>

          <div className="py-1 px-1 bg-lightGray rounded-div flex items-center justify-center cursor-pointer">
            <SignoutBtn/>
          </div>
        </div>
      ) : (
        <SigninBtn/>
      )}
    </header>
  );
}
