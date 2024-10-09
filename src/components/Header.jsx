"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <header className="my-5 flex justify-between relative items-center">
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
        {isLoggedIn && (
          <Link
            className="hover:border-b-[1px] border-primary"
            href={"/orders"}
          >
            Orders
          </Link>
        )}
        <Link className="hover:border-b-[1px] border-primary" href={"/contact"}>
          Contact
        </Link>
      </nav>
      <div className="w-10 h-10 absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 md:w-16 md:h-16 lg:w-20 lg:h-20">
        <Image
          src="/images/logo.png"
          alt="Fruity logo"
          width={300}
          height={300}
          priority
        />
      </div>
      <button className="py-1 md:py-2 px-3 sm:px-5 md:px-7 bg-primary rounded-[30px] text-white text-sm sm:text-base">
        Sign In
      </button>
    </header>
  );
}
