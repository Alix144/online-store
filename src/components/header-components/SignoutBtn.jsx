"use client";
import Image from "next/image";
import { signOut } from "next-auth/react";

export default function SignoutBtn() {

  return (
    <div className="py-1 px-3 rounded-div duration-300 hover:bg-silver" onClick={() => signOut()}>
      <Image src="/images/signout.png" alt="Signout" width={17} height={17} />
    </div>
  );
}
