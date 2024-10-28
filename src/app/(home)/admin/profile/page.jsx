import Image from "next/image";

export default function ProfilePage() {
  return (
    <main className="p-10 flex flex-col gap-5 sm:gap-10">
      <section className="h-screen w-full">
        <h2 className="mb-3 sm:mb-5 text-lg sm:text-2xl text-darkGray font-semibold">
          Profile
        </h2>
        <div className="mx-auto w-full md:w-[50%] p-3 sm:p-5 bg-primary rounded-div flex flex-col gap-1 sm:gap-3 items-center">
          <div className="w-20 sm:w-28 h-20 sm:h-28">
            <Image
              src="/images/user2.png"
              alt="Profile"
              width={300}
              height={300}
              className="mb-5"
            />
          </div>
          <h1 className="text-base sm:text-xl font-semibold text-white">
            Ali Youssef
          </h1>
          <p className="text-sm sm:text-base text-white ">ali@gmail.com</p>
        </div>
      </section>
    </main>
  );
}
