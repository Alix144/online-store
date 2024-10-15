import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextAuth";
import SignoutBtn from "./header-components/SignoutBtn"
import SigninBtn from "./header-components/signinBtn";
import IconsNav from "./header-components/IconsNav";
import LeftNav from "./header-components/LeftNav";
import Logo from "./header-components/Logo";

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

      <Logo/>

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
