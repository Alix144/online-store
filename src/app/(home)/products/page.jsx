"use client";
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
        <div className="min-h-screen flex gap-5 flex-wrap justify-center lg:justify-normal">
          {products === null ? (
            <LoadingIcon/>
          ) : products.length === 0 ? (
            <h5>empty</h5>
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
