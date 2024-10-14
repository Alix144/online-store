"use client";
import Image from "next/image";
import LoadingIcon from "@/components/LoadingIcon";
import Product from "@/components/Product";
import { useState, useEffect } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState(null);

  const getProducts = async () => {
    const response = await fetch("/api/products/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <main className="flex flex-col gap-5 sm:gap-10">
      <section className="py-10 sm:py-14 lg:py-16 xl:py-20 flex flex-col gap-5 sm:gap-10">
        <h1 className="m-auto text-center font-bold text-xl sm:text-2xl lg:text-3xl">
          Products
        </h1>
        <div className="min-h-96 flex gap-5 flex-wrap justify-center lg:justify-normal">
          {products === null ? (
            <LoadingIcon />
          ) : products.length === 0 ? (
            <div className="mt-10 w-full flex flex-col text-center justify-start items-center">
              <Image
                src="/images/empty-box.png"
                alt="Empty Box"
                width={100}
                height={100}
                className="mb-5"
              />
              <p>No Products Found!</p>
            </div>
          ) : (
            products.map((product) => (
              <Product product={product} key={product._id} />
            ))
          )}
        </div>
      </section>
    </main>
  );
}
