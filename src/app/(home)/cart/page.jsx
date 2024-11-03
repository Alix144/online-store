"use client";
import LoadingIcon from "@/components/LoadingIcon";
import OrderSuccess from "@/components/OrderSuccess";
import Product from "@/components/Product";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState(null);
  const [userId, setUserId] = useState(null);

  // calling APIs
  const getUser = async () => {
    const response = await fetch(`/api/users/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setProducts(data.cart);
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
      {true ? (
        <section className="py-10 sm:py-14 lg:py-16 xl:py-20 flex flex-col gap-5 sm:gap-10">
          <h1 className="m-auto text-center font-bold text-xl sm:text-2xl lg:text-3xl">
            Cart
          </h1>
          <div className="flex gap-5 justify-center sm:justify-normal items-center sm:items-start flex-col sm:flex-row">
            <div className="w-[60%] flex gap-5 flex-wrap justify-center sm:justify-normal">
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
                  <p>No products in cart!</p>
                </div>
              ) : (
                products?.map((product) => (
                  <Product product={product} products={products} setProducts={setProducts} key={product._id} inCart={true} isFavorite={true}/>
                ))
              )}
            </div>
            {/* order summary div */}
            <div className="p-5 md:p-10 lg:w-[40%] bg-primary rounded-div flex flex-col justify-between">
              {/* adderss & order summary */}
              <div className="mb-14 sm:mb-20">
                {false ? (
                  <div className="mb-3 sm:mb-7">
                    <p className="text-sm sm:text-base font-bold text-white">
                      Your Address
                    </p>
                    <p className="text-sm sm:text-base text-white">
                      123 Fresh Market St., Green Valley, Kuwait City, Kuwait.
                    </p>
                  </div>
                ) : (
                  <div className="mb-3 sm:mb-7 flex flex-col gap-5 justify-between text-darkGray text-center">
                    <p className="text-sm sm:text-base font-bold text-white text-left">
                      Your Address
                    </p>
                    <div className="flex flex-col">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Area"
                          className="mb-3 px-3 w-[50%] h-8 bg-white rounded-div border-darkGray border-[1px]"
                        />
                        <input
                          type="text"
                          placeholder="Block"
                          className="mb-3 px-3 w-[50%] h-8 bg-white rounded-div border-darkGray border-[1px]"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Street"
                        className="mb-3 px-3 w-full h-8 bg-white rounded-div border-darkGray border-[1px]"
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Building No"
                          className="mb-3 px-3 w-[50%] h-8 bg-white rounded-div border-darkGray border-[1px]"
                        />
                        <input
                          type="text"
                          placeholder="Avenue (optional)"
                          className="mb-3 px-3 w-[50%] h-8 bg-white rounded-div border-darkGray border-[1px]"
                        />
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Apt. number"
                          className="mb-3 px-3 w-[50%] h-8 bg-white rounded-div border-darkGray border-[1px]"
                        />
                        <input
                          type="text"
                          placeholder="Floor"
                          className="mb-3 px-3 w-[50%] h-8 bg-white rounded-div border-darkGray border-[1px]"
                        />
                      </div>
                      <textarea
                        name=""
                        id=""
                        placeholder="Additional directions (optional)"
                        className="mb-3 px-3 w-full bg-white rounded-div border-darkGray border-[1px]"
                      ></textarea>
                    </div>
                  </div>
                )}
                <div>
                  <p className="text-sm sm:text-base font-bold text-white">
                    Order Summary
                  </p>
                  <div className="flex flex-col gap-2">
                    <div className="w-full flex justify-between">
                      <div className="flex gap-3 sm:gap-5">
                        <p className="text-sm sm:text-base text-white">2 KG</p>
                        <p className="text-sm sm:text-base text-white">
                          Tomatoes
                        </p>
                      </div>
                      <p className="text-sm sm:text-base text-white">
                        0.600 KWD
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* second part */}
              <div>
                <div className="mb-5 flex justify-between border-t-[1px] border-white">
                  <p className="text-sm sm:text-base font-bold text-white">
                    Total
                  </p>
                  <p className="text-sm sm:text-base font-bold text-white">
                    0.400 KWD
                  </p>
                </div>
                <button className="w-full font-bold btn-style bg-secondary">
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <OrderSuccess />
      )}
    </main>
  );
}
