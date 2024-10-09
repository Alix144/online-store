import Image from "next/image";

export default function SignIn() {
  return (
    <main className="py-16 flex justify-center items-center">
      <div className="px-12 py-10 w-[40%] bg-primary rounded-div flex flex-col gap-5 justify-center">
        <h1 className="mx-auto font-bold text-xl sm:text-2xl lg:text-3xl text-center text-white ">
          Sign In
        </h1>
        <div className="px-5 py-2 w-full bg-white rounded-[10px] text center border-silver border-2 flex gap-5 cursor-pointer hover:bg-silver duration-300">
          <Image
            src="/images/google.png"
            alt="Google icon"
            width="25"
            height="25"
            className=""
          />
          Sign in with Google
        </div>

      </div>
    </main>
  );
}
