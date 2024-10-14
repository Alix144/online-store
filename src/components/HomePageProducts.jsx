"use client";
import Image from "next/image";
import LoadingIcon from "@/components/LoadingIcon";
import Product from "@/components/Product";
import { useState, useEffect } from "react";

export default function HomePageProducts() {
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

  return (
    <div className="flex gap-5 flex-wrap justify-center">
      {products === null ? (
        <div className="sm:w-96 h-52 sm:h-60 flex justify-center items-center">
          <LoadingIcon />
        </div>
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
        products
          ?.slice(0, 3)
          .map((product) => <Product key={product._id} product={product} />)
      )}
    </div>
  );
}
