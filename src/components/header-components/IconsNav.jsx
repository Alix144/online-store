"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  setToFavorites,
  setToProfile,
  setToCart,
} from "@/redux/features/currentPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setToFalse } from "@/redux/features/isCartEmpty";

export default function IconsNav({ isSidebarNav, userId, hideSidebar }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [products, setProducts] = useState(null);

  const currentPage = useSelector((state) => state.currentPage.value);

  const isCartEmpty = useSelector((state) => state.isCartEmpty.value);

  const navigateToFavorite = () => {
    router.push("/favorites");
    dispatch(setToFavorites());
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      hideSidebar();
    }
  };

  const navigateToProfile = () => {
    router.push("/profile");
    dispatch(setToProfile());
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      hideSidebar();
    }
  };

  const navigateToCart = () => {
    router.push("/cart");
    dispatch(setToCart());
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      hideSidebar();
    }
  };

  // calling APIs
  const getUser = async () => {
    const response = await fetch(`/api/users/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setProducts(data.cart);
  };

  // fetching user
  useEffect(() => {
    if (userId) {
      getUser();
    }
  }, [userId]);

  useEffect(() => {
    if (products?.length > 0) {
      dispatch(setToFalse());
    }
  }, [products]);

  useEffect(() => {
    if (userId) {
      localStorage.setItem("userId", userId);
      console.log(userId);
    }
  }, [userId]);

  return (
    <div
      className={`${
        isSidebarNav && "min-h-[35px] min-w-[140px]"
      } py-1 px-1 rounded-[30px] duration-300 bg-lightGray flex`}
    >
      <div
        className={`${
          isSidebarNav ? "flex" : "hidden sm:flex"
        } py-1 px-3 rounded-div duration-300 ${
          currentPage === "favorites" && "bg-silver"
        } hover:bg-silver items-center justify-center cursor-pointer`}
        onClick={() => navigateToFavorite()}
      >
        <Image
          src="/images/empty-heart.png"
          alt="Empty heart"
          width={21}
          height={21}
        />
      </div>
      <div
        className={`${
          isSidebarNav ? "flex" : "hidden sm:flex"
        } px-3 rounded-div duration-300 ${
          currentPage === "profile" && "bg-silver"
        } hover:bg-silver items-center justify-center cursor-pointer`}
        onClick={() => navigateToProfile()}
      >
        <Image
          src="/images/user.png"
          alt="User profile"
          width={21}
          height={21}
        />
      </div>
      <div
        className={`px-3 rounded-div duration-300 ${
          currentPage === "cart" && "bg-silver"
        } hover:bg-silver flex items-center justify-center cursor-pointer relative`}
        onClick={() => navigateToCart()}
      >
        <Image src="/images/cart.png" alt="Cart" width={21} height={21} />
        {!isCartEmpty && (
          <div className="w-2 h-2 bg-primary rounded-full absolute top-1 right-2"></div>
        )}
      </div>
    </div>
  );
}
