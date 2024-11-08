import HomeBtn from "@/components/order-successful-page-components/HomeBtn";
import SummaryNote from "@/components/order-successful-page-components/SummaryNote";
import Image from "next/image";

export default function SuccessfulOrderPage( {params} ) {
  const { orderId } = params;

  return (
    <main className="flex flex-col gap-5 sm:gap-10">
      <section className=" w-full flex flex-col justify-between items-center gap-40">
        <div className="py-20 w-full bg-primary flex justify-center items-center rounded-div text-center relative">
          <div>
            <div className="mx-auto h-14 w-14">
              <Image
                src="/images/success.png"
                alt="Success"
                width={300}
                height={300}
              />
            </div>
            <h1 className="text-success font-bold text-xl sm:text-2xl lg:text-3xl">
              Order Successful!
            </h1>
            <p className="text-white text-sm sm:text-base">
              Thank you for your purchase
            </p>
          </div>
          {/* note div */}
          <SummaryNote orderId={orderId}/>

          <div className="h-28 w-28 absolute bottom-0 right-10 lg:right-[30%] hidden sm:block">
            <Image
              src="/images/gratitude.png"
              alt="Gratitude"
              width={300}
              height={300}
            />
          </div>
        </div>
        <HomeBtn/>
      </section>
    </main>
  );
}
