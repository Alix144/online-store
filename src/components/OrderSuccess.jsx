import Image from "next/image";

export default function OrderSuccess() {
  return (
    <section className="w-full">
      <div className="py-20 w-full bg-primary flex justify-center items-center rounded-div text-center">
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
          <p className="text-white text-sm sm:text-base">Thank you for your purchase</p>
        </div>
      </div>
    </section>
  );
}
