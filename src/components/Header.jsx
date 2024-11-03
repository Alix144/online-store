import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextAuth";
import SignoutBtn from "./header-components/SignoutBtn"
import SigninBtn from "./header-components/signinBtn";
import IconsNav from "./header-components/IconsNav";
import LeftNav from "./header-components/LeftNav";
import Logo from "./header-components/Logo";
import HamburgerBtn from "./header-components/HamburgerBtn";

export default async function Header() {
  const session = await getServerSession(authOptions);
  
  return (
    <header className="my-5 flex justify-between relative items-center z-10">
      <HamburgerBtn/>
      <LeftNav isUserSignedIn={session?.user}/>

      <Logo/>

      {session?.user ? (
        <div className="flex gap-1 sm:gap-2">
          <IconsNav userId={session.user.id}/>

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
