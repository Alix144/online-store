import Image from "next/image";

export default function SignIn() {
  return (
    <main className="py-16 flex justify-center items-center">
      <div className="w-full sm:w-auto px-10 sm:px-16 py-8 sm:py-14 bg-primary rounded-div flex flex-col gap-5 justify-center relative">
        <h1 className="mx-auto font-bold text-xl sm:text-2xl lg:text-3xl text-center text-white ">
          {" "}
          Sign In
        </h1>
        <div className="px-3 sm:px-5 py-2 w-full bg-white rounded-[10px] text center border-silver border-2 flex gap-5 cursor-pointer hover:bg-silver duration-300">
          <Image
            src="/images/google.png"
            alt="Google icon"
            width="25"
            height="25"
            className=""
          />
          Sign in with Google
        </div>

        <Image
          src="/images/leaf.png"
          alt="Green Leaf"
          width="100"
          height="100"
          className="hidden sm:block absolute -top-5 -right-14 rotate-45 -z-10"
        />
        <Image
          src="/images/orange.png"
          alt="Orange"
          width="130"
          height="130"
          className="hidden sm:block absolute -bottom-10 -right-16"
        />
      </div>
    </main>
  );
}
