import Product from "@/components/Product";

export default function ProductsPage() {
  return (
    <main className="flex flex-col gap-5 sm:gap-10">
      <section className="py-10 sm:py-14 lg:py-16 xl:py-20 flex flex-col gap-5 sm:gap-10">
        <h1 className="m-auto text-center font-bold text-xl sm:text-2xl lg:text-3xl">
          Cart
        </h1>
        <div className="flex gap-5 justify-center sm:justify-normal items-start">
          <div className="w-[60%] hidden sm:flex gap-5 flex-wrap">
            <Product />
            <Product />
            <Product />
          </div>
          {/* order summary div */}
          <div className="p-5 md:p-10 lg:w-[40%] bg-primary rounded-div flex flex-col justify-between">
            {/* adderss & order summary */}
            <div className="mb-14 sm:mb-20">
              <div className="mb-3 sm:mb-7">
                <p className="text-sm sm:text-base font-bold text-white">Your Address</p>
                <p className="text-sm sm:text-base text-white">
                  123 Fresh Market St., Green Valley, Kuwait City, Kuwait.
                </p>
              </div>
              <div>
                <p className="text-sm sm:text-base font-bold text-white">Order Summary</p>
                <div className="flex flex-col gap-2">
                  <div className="w-full flex justify-between">
                    <div className="flex gap-3 sm:gap-5">
                      <p className="text-sm sm:text-base text-white">2 KG</p>
                      <p className="text-sm sm:text-base text-white">
                        Tomatoes
                      </p>
                    </div>
                    <p className="text-sm sm:text-base text-white">0.600 KWD</p>
                  </div>
                </div>
              </div>
            </div>
            {/* second part */}
            <div>
              <div className="mb-5 flex justify-between border-t-[1px] border-white">
                <p className="text-sm sm:text-base font-bold text-white">Total</p>
                <p className="text-sm sm:text-base font-bold text-white">0.400 KWD</p>
              </div>
              <button className="w-full font-bold btn-style bg-secondary">Place Order</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
