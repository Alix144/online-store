import Header from "@/components/Header";
import Image from "next/image";

export default function Home() {
  return (
    <main className="h-screen">
      <section className="px-5 md:px-10 lg:px-14 py-3 sm:py-14 lg:py-16 xl:py-20 h-40 sm:h-72 lg:h-96 w-full rounded-div bg-secondary relative overflow-hidden">
        <div className="w-[95%] mx-auto sm:mx-0 text-center sm:text-start sm:w-[65%] lg:w-[45%] h-full flex flex-col justify-between gap-1 lg:gap-5 z-50">
          <h1 className="font-bold text-lg sm:text-2xl lg:text-3xl">Fresh Vegetables & Fruits Delivered to Your Doorstep!</h1>
          <p className="text-darkGray text-sm sm:text-base">Farm-fresh produce, handpicked with care. Quality and flavor in every bite.</p>
          <div className="mx-auto sm:mx-0 flex gap-2">
            <button className="btn-style bg-primary text-white">Browse Products</button>
            <button className="btn-style bg-silver text-darkGray">Our Location</button>
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
    </main>
  );
}
