"use client";
import Image from "next/image";
import LoadingIcon from "@/components/LoadingIcon";
import Product from "@/components/Product";
import { useState, useEffect } from "react";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(null);
  const [userId, setUserId] = useState(null);

  // calling APIs
  const getUser = async () => {
    const response = await fetch(`/api/users/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setFavorites(data.favorite);
  };

  //accessing user local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      setUserId(storedUserId);
    }
  }, []);

  // fetching user
  useEffect(() => {
    if (userId) {
      getUser();
    }
  }, [userId]);

  return (
    <main className="flex flex-col gap-5 sm:gap-10">
      <section className="py-10 sm:py-14 lg:py-16 xl:py-20 flex flex-col gap-5 sm:gap-10">
        <h1 className="m-auto text-center font-bold text-xl sm:text-2xl lg:text-3xl">
          Favorites
        </h1>
        <div className="min-h-96 flex gap-5 flex-wrap justify-center lg:justify-normal">
          {favorites === null ? (
            <LoadingIcon />
          ) : favorites.length === 0 ? (
            <div className="mt-10 w-full flex flex-col text-center justify-start items-center">
              <Image
                src="/images/empty-box.png"
                alt="Empty Box"
                width={100}
                height={100}
                className="mb-5"
              />
              <p>No favorites products!</p>
            </div>
          ) : (
            favorites?.map((product) => (
              <Product product={product} key={product._id} isFavorite={true} />
            ))
          )}
        </div>
      </section>
    </main>
  );
}
