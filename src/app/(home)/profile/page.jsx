import Image from "next/image";

export default async function Header() {
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
        <div className="w-full flex gap-3 sm:gap-5 text-center text-darkGray">
          <div className="py-3 sm:py-5 px-5 sm:px-10 w-[50%] bg-secondary rounded-div flex flex-col gap-3 sm:gap-5 items-center">
            <div className="w-8 sm:w-10 h-8 sm:h-10">
              <Image
                src="/images/phone.png"
                alt="Phone"
                width={300}
                height={300}
                className="mb-5"
              />
            </div>
            <p className="text-sm sm:text-base font-bold">+965 45534464</p>
          </div>
          <div className="py-3 sm:py-5 px-5 sm:px-10 w-[50%] bg-secondary rounded-div flex flex-col gap-3 sm:gap-5 items-center">
            <div className="w-8 sm:w-10 h-8 sm:h-10">
              <Image
                src="/images/address.png"
                alt="Address"
                width={300}
                height={300}
                className="mb-5"
              />
            </div>
            {/* <p className="text-sm sm:text-base font-bold">Kuwait, Hawalli</p> */}
            <button className="py-2 px-5 text-sm sm:text-base text-white rounded-div border-none bg-[#00000066] hover:bg-darkGray duration-300 cursor-pointer">Add Address</button>
          </div>
        </div>
      </section>
    </main>
  );
}
