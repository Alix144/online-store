"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setToTrue, setToFalse } from "@/redux/features/isCartEmpty";
import { setToNull } from "@/redux/features/currentPage";
import LoadingIcon from "./LoadingIcon";
import { useRouter } from "next/navigation";

export default function Product({
  product,
  products,
  setProducts,
  isFavorite,
  inCart,
  onAmountChange,
}) {
  const router = useRouter()
  const dispatch = useDispatch();
  const [loadingFavorite, setLoadingFavorite] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);
  const [amount, setAmount] = useState("1");
  const [user, setUser] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [isDeleteWindowOpen, setIsDeleteWindowOpen] = useState(false);
  const userId = localStorage.getItem("userId");

  const reduceAmount = () => {
    let newAmount;
    if (Number(amount) > 1) {
      newAmount = Number(amount) - 1;
    } else if (Number(amount) <= 0.25) {
      newAmount = Number(amount);
    } else {
      newAmount = Number(amount) - 0.25;
    }
    setAmount(String(newAmount));
  };

  const increaseAmount = () => {
    let newAmount =
      Number(amount) < 1 ? Number(amount) + 0.25 : Number(amount) + 1;
    setAmount(String(newAmount));
  };

  const settingCustomAmount = (e) => {
    setAmount(String(e.target.value));
  };

  useEffect(() => {
    if (inCart) onAmountChange(product._id, Number(amount));
  }, [amount]);

  const toggleFavorite = () => {
    if (userId) {
      if (favorite) {
        setFavorite(false);
        removeFromFavorites();
      } else {
        setFavorite(true);
        addToFavorites();
      }
    }else{
      router.push("/signin")
      dispatch(setToNull())
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

  const addToCartRequest = async () => {
    setLoadingCart(true);
    dispatch(setToFalse());
    try {
      const response = await fetch("/api/users/cart/add/", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          productId: product._id,
        }),
      });
      setIsInCart(true);
    } catch (error) {
      console.log(error);
    }
    setLoadingCart(false);
  };

  const addToCart = async () => {
    if (userId) {
      await addToCartRequest()
    }else{
      router.push("/signin")
      dispatch(setToNull())
    }
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
      setIsInCart(false);
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
    removeFromCart();
    const updatedProducts = products.filter((pro) => pro._id !== product._id);
    if (updatedProducts.length === 0) {
      dispatch(setToTrue());
    }
    setProducts(updatedProducts);
    setIsDeleteWindowOpen(false);
  };

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
            src={product?.image?.file || "/images/default-image.png"}
            alt="Product image"
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
                  onChange={(e) => settingCustomAmount(e)}
                />
                <p className="text-sm sm:text-base">kg</p>
                <div className="w-4 h-4" onClick={() => increaseAmount()}>
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
              {loadingCart ? (
                <LoadingIcon />
              ) : isInCart ? (
                <Link href={"/cart"} className="text-sm sm:text-base">
                  In Cart
                </Link>
              ) : (
                <Image
                  src="/images/cart.png"
                  alt="Cart"
                  width="20"
                  height="20"
                  className="cursor-pointer"
                  onClick={() => addToCart()}
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
              <button
                className="btn-style bg-danger text-white"
                onClick={() => handleRemoveProductFromCart()}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
