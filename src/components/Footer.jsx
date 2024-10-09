import Image from "next/image";

export default function Footer() {
  return (
    <footer className="my-5 sm:my-10 py-5 px-10 flex flex-col sm:flex-row justify-center sm:justify-end items-center bg-secondary rounded-div relative">
      <div className=" w-10 h-10 mb-3 sm:mb-0 sm:absolute left-10 -top-3 md:-top-4 sm:w-16 sm:h-16 lg:w-20 lg:h-20">
        <Image
          src="/images/logo.png"
          alt="Fruity logo"
          width={100}
          height={100}
        />
      </div>
      <p className="text-sm sm:text-base text-center flex flex-col sm:flex-row sm:gap-1 items-center">
        © 2024 Fruiti Store. All rights reserved. Developed by
        <Image
          src="/images/personal-logo.png"
          alt="Ali logo"
          width={40}
          height={40}
        />
      </p>
    </footer>
  );
}
