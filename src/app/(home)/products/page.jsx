import Product from "@/components/Product";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col gap-5 sm:gap-10">
      <section className="py-10 sm:py-14 lg:py-16 xl:py-20 flex flex-col gap-5 sm:gap-10">
          <h1 className="m-auto text-center font-bold text-xl sm:text-2xl lg:text-3xl">Products</h1>
          <div className="flex gap-5 flex-wrap justify-center lg:justify-normal">
            <Product/>
            <Product/>
            <Product/>
            <Product/>
            
          </div>

      </section>
    </main>
  );
}
