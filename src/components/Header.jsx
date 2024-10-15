import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextAuth";
import SignoutBtn from "./header-components/SignoutBtn"
import SigninBtn from "./header-components/signinBtn";
import IconsNav from "./header-components/IconsNav";
import LeftNav from "./header-components/LeftNav";

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
      
      <LeftNav isUserSignedIn={session?.user}/>
      
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
          <IconsNav/>

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
