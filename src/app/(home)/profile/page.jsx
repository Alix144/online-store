"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import UserBoxes from "@/components/profile-components/UserBoxes";
import LoadingIcon from "@/components/LoadingIcon";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userOrders, setUserOrders] = useState(null);
  const [activeOrders, setActiveOrders] = useState(null);
  const [formattedDate, setFormattedDate] = useState("");

  // calling APIs
  const getUserRequest = async (id) => {
    const response = await fetch(`/api/users/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data;
  };

  const getUser = async (id) => {
    const data = await getUserRequest(id)
    setUser(data);
  }

  const getOrdersRequest = async () => {
    const response = await fetch("/api/orders/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data
  };

  const getOrders = async () => {
    const data = await getOrdersRequest()
    const filteredOrders = data.filter((order) => order.userId === userId);
    setUserOrders(filteredOrders);
    setActiveOrders(filteredOrders.filter((order) => order.status === "active"))
  }

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
      getUser(userId);
      getOrders()
    }
  }, [userId]);

  useEffect(() => {
    if (user) {
      const date = new Date(user.createdAt);
      const newDate = `${String(date.getDate()).padStart(2, "0")}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${date.getFullYear()}`;
      setFormattedDate(newDate);
    }
  }, [user]);

  return (
    <main>
      <section className="py-10 sm:py-14 lg:py-16 xl:py-20 mx-auto w-full sm:w-[540px] flex flex-col gap-3 sm:gap-5">
        <div className="p-3 sm:p-5 w-full bg-primary rounded-div flex flex-col gap-1 sm:gap-3 items-center">
          <div className="w-20 sm:w-28 h-20 sm:h-28">
            <Image
              src="/images/user2.png"
              alt="Profile"
              width={300}
              height={300}
              className="mb-5"
            />
          </div>
          <h1 className="text-base sm:text-xl font-semibold text-white">
            {user?.name}
          </h1>
          <p className="text-sm sm:text-base text-white ">{user?.email}</p>
        </div>
        <div className="py-3 sm:py-5 px-5 sm:px-10 w-full rounded-div bg-white flex justify-between items-center text-darkGray">
          <div className="">
            <p className="text-sm sm:text-base">Total Orders:</p>
            {userOrders !== null ? 
            <p className="text-sm sm:text-base font-bold">{userOrders.length}</p> 
            : 
            <LoadingIcon />}
            
          </div>
          <div className="w-[1px] h-14 bg-lightGray"></div>
          <div className="">
            <p className="text-sm sm:text-base">Active Orders</p>
            {activeOrders !== null ? 
            <p className="text-sm sm:text-base font-bold">{activeOrders.length}</p> 
            : 
            <LoadingIcon />}
          </div>
          <div className="w-[1px] h-14 bg-lightGray"></div>
          <div className="">
            <p className="text-sm sm:text-base">Member Since</p>
            {formattedDate ? 
            <p className="text-sm sm:text-base font-bold">{formattedDate}</p> 
            : 
            <LoadingIcon />}
          </div>
        </div>
        <UserBoxes userId={userId} user={user} />
      </section>
    </main>
  );
}
