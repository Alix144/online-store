import UserBoxes from "@/components/profile-components/UserBoxes";
import Image from "next/image";

export default function Profile() {
  return (
    <main>
      <section className="py-10 sm:py-14 lg:py-16 xl:py-20 mx-auto w-full sm:w-[540px] flex flex-col gap-3 sm:gap-5">
        <div className="p-3 sm:p-5 w-full bg-primary rounded-div flex flex-col gap-1 sm:gap-3 items-center">
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
        <div className="py-3 sm:py-5 px-5 sm:px-10 w-full rounded-div bg-white flex justify-between items-center text-darkGray">
          <div className="">
            <p className="text-sm sm:text-base">Total Orders:</p>
            <p className="text-sm sm:text-base font-bold">23</p>
          </div>
          <div className="w-[1px] h-14 bg-lightGray"></div>
          <div className="">
            <p className="text-sm sm:text-base">Active Orders</p>
            <p className="text-sm sm:text-base font-bold">3</p>
          </div>
          <div className="w-[1px] h-14 bg-lightGray"></div>
          <div className="">
            <p className="text-sm sm:text-base">Member Since</p>
            <p className="text-sm sm:text-base font-bold">12-04-2022</p>
          </div>
        </div>
        <UserBoxes/>
      </section>
    </main>
  );
}
