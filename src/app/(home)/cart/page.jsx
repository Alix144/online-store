import Product from "@/components/Product";

export default function ProductsPage() {

  return (
    <main className="flex flex-col gap-5 sm:gap-10">
      <section className="py-10 sm:py-14 lg:py-16 xl:py-20 flex flex-col gap-5 sm:gap-10">
        <h1 className="m-auto text-center font-bold text-xl sm:text-2xl lg:text-3xl">
          Cart
        </h1>
        <div className="flex gap-5">
            <div className="w-[60%] flex gap-5 flex-wrap">
                <Product/>
                <Product/>
                <Product/>
            </div>
            <div className="p-3 sm:p-5 h-5 w-[40%] bg-primary rounded-div">

            </div>
        </div>

      </section>
    </main>
  );
}
