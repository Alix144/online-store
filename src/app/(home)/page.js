import Product from "@/components/Product";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextAuth";
import HomePageProducts from "@/components/HomePageProducts";
import ListDiv from "@/components/list-div-component/ListDiv";
import Link from "next/link";
import CallToActionDiv from "@/components/CallToActionDiv";
import AdminNumbersDiv from "@/components/AdminNumbersDiv";

export const metadata = {
  title: "Fruity Store | Home Page",
  description:
    "Shop fresh and preserved fruits, vegetables, dates, and a variety of foodstuffs at Fruity Store. Quality products delivered with care.",
};

export default async function Home() {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user.email === "aliiyousseff144@gmail.com";

  if (session?.user) {
    return isAdmin ? (
      <main className="p-5 sm:p-10 flex flex-col gap-10">
        <section className="w-full">
          <AdminNumbersDiv />
        </section>

        <section className="w-full">
          <h2 className="mb-3 sm:mb-5 text-lg sm:text-2xl text-darkGray font-semibold">
            Orders
          </h2>
          <ListDiv type={"adminOrderList"} />
        </section>
      </main>
    ) : (
      <main className="flex flex-col gap-5 sm:gap-10">
        <section className="px-5 md:px-10 lg:px-14 py-10 sm:py-14 lg:py-16 xl:py-20 h-48 sm:h-72 lg:h-96 w-full rounded-div bg-secondary relative overflow-hidden">
          <div className="w-[95%] mx-auto sm:mx-0 text-center sm:text-start sm:w-[65%] lg:w-[45%] h-full flex flex-col justify-between gap-1 lg:gap-5 z-50">
            <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl">
              Fresh Vegetables & Fruits Delivered to Your Doorstep!
            </h1>
            <p className="text-darkGray text-sm sm:text-base">
              Farm-fresh produce, handpicked with care. Quality and flavor in
              every bite.
            </p>
            <div className="mx-auto sm:mx-0 flex gap-2">
              <button className="btn-style bg-primary text-white">
                <Link href={"/products"}>Browse Products</Link>
              </button>
              <button className="btn-style bg-silver text-darkGray">
                <Link href={"#contact"}>Our Location</Link>
              </button>
            </div>
          </div>

          <div className="hidden sm:block sm:absolute h-full w-64 sm:w-96 top-0 -right-28 lg:right-0 z-0">
            <Image
              src="/images/fruit-plate.png"
              alt="Fruit plate"
              layout="fill"
              className="h-full  top-0 right-0"
            />
          </div>
        </section>
        <section className="flex flex-col gap-5 md:gap-0 md:flex-row justify-between items-center md:items-start">
          <CallToActionDiv />
          <HomePageProducts />
        </section>

        <section
          className="p-5 md:p-10 w-full rounded-div bg-primary overflow-hidden"
          id="contact"
        >
          <h2 className="mb-2 md:mb-5 font-bold text-lg lg:text-2xl text-white ">
            Contact Us
          </h2>

          <div className="w-[70%] mx-auto md:w-full flex justify-center flex-col md:flex-row items-center gap-5 md:gap-10">
            <div className="w-full md:w-[35%]">
              <div className="pl-2 pr-5 mb-3 w-full h-10 bg-silver rounded-div flex justify-between items-center">
                <Image
                  src="/images/phone.png"
                  alt="Phone"
                  width="30"
                  height="30"
                  className="rounded-full"
                />
                <p className="text-sm sm:text-base">+965 545 456 34</p>
              </div>
              <div className="pl-2 pr-5 mb-3 w-full h-10 bg-silver rounded-div flex justify-between items-center">
                <Image
                  src="/images/email.png"
                  alt="Email"
                  width="30"
                  height="30"
                  className="rounded-full"
                />
                <p className="text-sm sm:text-base">ourstore@gmail.com</p>
              </div>
              <div className="px-5 py-3 text-center w-full bg-silver rounded-div flex flex-col gap-3 justify-between items-center">
                <Image
                  src="/images/address.png"
                  alt="Address"
                  width="30"
                  height="30"
                  className="rounded-full"
                />
                <p className="text-sm sm:text-base">
                  123 Fresh Market St., Green Valley, Kuwait City, Kuwait.
                </p>
              </div>
            </div>
            <iframe
              className="rounded-div"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48172.67437440163!2d47.991121699999994!3d29.366618199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf8362d1e75e1b%3A0x3b5166847e02f534!2sKuwait%20Towers!5e1!3m2!1sen!2skw!4v1728481693783!5m2!1sen!2skw"
              width="300"
              height="200"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
      </main>
    );
  } else {
    return (
      <main className="flex flex-col gap-5 sm:gap-10">
        <section className="px-5 md:px-10 lg:px-14 py-10 sm:py-14 lg:py-16 xl:py-20 h-48 sm:h-72 lg:h-96 w-full rounded-div bg-secondary relative overflow-hidden">
          <div className="w-[95%] mx-auto sm:mx-0 text-center sm:text-start sm:w-[65%] lg:w-[45%] h-full flex flex-col justify-between gap-1 lg:gap-5 z-50">
            <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl">
              Fresh Vegetables & Fruits Delivered to Your Doorstep!
            </h1>
            <p className="text-darkGray text-sm sm:text-base">
              Farm-fresh produce, handpicked with care. Quality and flavor in
              every bite.
            </p>
            <div className="mx-auto sm:mx-0 flex gap-2">
              <button className="btn-style bg-primary text-white">
                <Link href={"/products"}>Browse Products</Link>
              </button>
              <button className="btn-style bg-silver text-darkGray">
                <Link href={"#contact"}>Our Location</Link>
              </button>
            </div>
          </div>

          <div className="hidden sm:block sm:absolute h-full w-64 sm:w-96 top-0 -right-28 lg:right-0 z-0">
            <Image
              src="/images/fruit-plate.png"
              alt="Fruit plate"
              layout="fill"
              className="h-full  top-0 right-0"
            />
          </div>
        </section>
        <section className="flex flex-col gap-5 md:gap-0 md:flex-row justify-between items-center md:items-start">
          <CallToActionDiv />
          <HomePageProducts />
        </section>

        <section
          className="p-5 md:p-10 w-full rounded-div bg-primary overflow-hidden"
          id="contact"
        >
          <h2 className="mb-2 md:mb-5 font-bold text-lg lg:text-2xl text-white ">
            Contact Us
          </h2>

          <div className="w-[70%] mx-auto md:w-full flex justify-center flex-col md:flex-row items-center gap-5 md:gap-10">
            <div className="w-full md:w-[35%]">
              <div className="pl-2 pr-5 mb-3 w-full h-10 bg-silver rounded-div flex justify-between items-center">
                <Image
                  src="/images/phone.png"
                  alt="Phone"
                  width="30"
                  height="30"
                  className="rounded-full"
                />
                <p className="text-sm sm:text-base">+965 545 456 34</p>
              </div>
              <div className="pl-2 pr-5 mb-3 w-full h-10 bg-silver rounded-div flex justify-between items-center">
                <Image
                  src="/images/email.png"
                  alt="Email"
                  width="30"
                  height="30"
                  className="rounded-full"
                />
                <p className="text-sm sm:text-base">ourstore@gmail.com</p>
              </div>
              <div className="px-5 py-3 text-center w-full bg-silver rounded-div flex flex-col gap-3 justify-between items-center">
                <Image
                  src="/images/address.png"
                  alt="Address"
                  width="30"
                  height="30"
                  className="rounded-full"
                />
                <p className="text-sm sm:text-base">
                  123 Fresh Market St., Green Valley, Kuwait City, Kuwait.
                </p>
              </div>
            </div>
            <iframe
              className="rounded-div"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48172.67437440163!2d47.991121699999994!3d29.366618199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf8362d1e75e1b%3A0x3b5166847e02f534!2sKuwait%20Towers!5e1!3m2!1sen!2skw!4v1728481693783!5m2!1sen!2skw"
              width="300"
              height="200"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
      </main>
    );
  }
}
