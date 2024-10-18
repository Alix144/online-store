import Image from "next/image";

export default function OrderSuccess() {
  return (
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
          <h1 className="text-success font-bold text-3xl">Order Successful!</h1>
          <p className="text-white text-sm sm:text-base">
            Thank you for your purchase
          </p>
        </div>
        {/* note div */}
        <div className="p-5 w-72 h-72 text-left bg-secondary shadow-md absolute left-16 -bottom-40 flex flex-col gap-2">
          <div>
            <p className="text-sm">Customer</p>
            <p className="text-sm font-bold">Ali Youssef</p>
          </div>
          <div>
            <p className="text-sm">Address</p>
            <p className="text-sm font-bold">
              123 Fresh Market St., Green Valley, Kuwait City, Kuwait.
            </p>
          </div>
          <div>
            <p className="text-sm">Order Date</p>
            <p className="text-sm font-bold">10-03-2024</p>
          </div>
          <div>
            <p className="text-sm">Total</p>
            <p className="text-sm font-bold">0.400 KWD</p>
          </div>
          <div>
            <p className="text-sm">Payment</p>
            <p className="text-sm font-bold">Cash</p>
          </div>
        </div>

        <div className="h-28 w-28 absolute bottom-0 right-[30%]">
          <Image
            src="/images/gratitude.png"
            alt="Gratitude"
            width={300}
            height={300}
          />
        </div>
      </div>
      <button className="w-64 btn-style bg-primary text-white">Home</button>
    </section>
  );
}
