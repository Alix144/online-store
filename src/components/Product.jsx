"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingIcon from "./LoadingIcon";

export default function Product({ product, products, setProducts, isFavorite, inCart }) {
  const [loadingFavorite, setLoadingFavorite] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState(1);
  const [favorite, setFavorite] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [isDeleteWindowOpen, setIsDeleteWindowOpen] = useState(false);
  const userId = localStorage.getItem("userId");

  const reduceAmount = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    } else if (amount === 1 || amount === 0.75 || amount === 0.5) {
      setAmount(amount - 0.25);
    }
  };

  const toggleFavorite = () => {
    if (favorite) {
      setFavorite(false);
      removeFromFavorites();
    } else {
      setFavorite(true);
      addToFavorites();
    }
  };

  // calling APIs
  const addToFavorites = async () => {
    setLoadingFavorite(true);

    try {
      const response = await fetch("/api/users/favorites/add/", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          productId: product._id,
        }),
      });
    } catch (error) {
      console.log(error);
    }

    setLoadingFavorite(false);
  };

  const removeFromFavorites = async () => {
    setLoadingFavorite(true);

    try {
      const response = await fetch("/api/users/favorites/remove/", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          productId: product._id,
        }),
      });
    } catch (error) {
      console.log(error);
    }

    setLoadingFavorite(false);
  };

  const addToCart = async () => {
    setLoadingCart(true)
    try {
      const response = await fetch("/api/users/cart/add/", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          productId: product._id,
        }),
      });
      setIsInCart(true)
    } catch (error) {
      console.log(error);
    }
    setLoadingCart(false)
  };

  const removeFromCart = async () => {
    try {
      const response = await fetch("/api/users/cart/remove/", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          productId: product._id,
        }),
      });
      setIsInCart(false)
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    const response = await fetch(`/api/users/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setUser(data);
  };

  const handleRemoveProductFromCart = () => {
    removeFromCart()
    const updatedProducts = products.filter(pro => pro._id !== product._id);
    setProducts(updatedProducts)
    setIsDeleteWindowOpen(false)
  }

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user && user?.favorite?.some((fav) => fav._id === product?._id)) {
      setFavorite(true);
    }

    if (user && user?.cart?.some((pro) => pro._id === product?._id)) {
      setIsInCart(true);
    }
  }, [user]);

  return (
    <>
      <div className="p-3 w-52 sm:w-60 min-w-52 sm:min-w-60 h-52 sm:h-60 rounded-div bg-white border-lightGray border-[1px] flex flex-col gap-3 cursor-pointer">
        <div className="w-full h-[65%] rounded-div bg-lightGray relative">
          <Image
            src="/images/apples.jpg"
            alt="apples"
            layout="fill"
            objectFit="cover"
            className="rounded-div"
          />
        </div>

        <div className="px-3 h-[35%] w-full flex justify-between">
          <div className="flex flex-col justify-between">
            <h3 className="text-lg font-semibold">{product?.name}</h3>
            <p className="text-sm sm:text-base">
              {product?.price} KWD / {product?.measurement}
            </p>
          </div>

          {inCart ? (
            <div className="flex flex-col justify-between items-end">
              <Image
                src="/images/trash-can.png"
                alt="Trash Can"
                width={15}
                height={15}
                onClick={() => setIsDeleteWindowOpen(true)}
              />
              <div className="flex gap-1 items-center">
                <div className="w-4 h-4" onClick={() => reduceAmount()}>
                  <Image
                    src="/images/minus.png"
                    alt="Minus"
                    width={100}
                    height={100}
                  />
                </div>
                <input
                  type="number"
                  className="px-1 w-10 h-5 border border-darkGray rounded-[5px]"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <p className="text-sm sm:text-base">kg</p>
                <div className="w-4 h-4" onClick={() => setAmount(amount + 1)}>
                  <Image
                    src="/images/plus.png"
                    alt="Plus"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-between items-end">
              {loadingFavorite ? (
                <LoadingIcon />
              ) : (
                <Image
                  src={`/images/${
                    favorite ? "filled-heart.png" : "empty-heart.png"
                  }`}
                  alt={`${isFavorite ? "Filled" : "Empty"} heart`}
                  width="20"
                  height="20"
                  className="cursor-pointer"
                  onClick={() => toggleFavorite()}
                />
              )}
              {isInCart ? (
                <Link href={"/cart"} className="text-sm sm:text-base">In Cart</Link>
              ) : (
                loadingCart ?
                <LoadingIcon/>
                :
                <Image
                  src="/images/cart.png"
                  alt="Cart"
                  width="20"
                  height="20"
                  className="cursor-pointer"
                  onClick={()=>addToCart()}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {isDeleteWindowOpen && (
        <div className="w-full h-full fixed top-0 left-0 bg-[#00000066] z-10 flex justify-center items-center">
          <div className="p-5 bg-white rounded-div flex flex-col gap-5 justify-between text-darkGray text-center">
            <h2 className="text-lg font-semibold">Delete Product</h2>
            <p>Are you sure you want to delete this product?</p>
            <div className="flex justify-between">
              <button
                className="btn-style bg-[#00000066] text-white"
                onClick={() => setIsDeleteWindowOpen(false)}
              >
                Cancel
              </button>
              <button className="btn-style bg-danger text-white" onClick={()=>handleRemoveProductFromCart()}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
