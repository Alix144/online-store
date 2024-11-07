"use client";

import { useEffect, useState } from "react";
import LoadingIcon from "./LoadingIcon";

export default function AdminNumbersDiv() {
  const [products, setProducts] = useState(null);
  const [users, setUsers] = useState(null);
  const [orders, setOrders] = useState(null);
  const [deliveredOrders, setDeliveredOrders] = useState(null);
  const [undeliveredOrders, setUndeliveredOrders] = useState(null);
  const [error, setError] = useState("");

  // products
  const getProducts = async () => {
    try {
      const response = await fetch("/api/products/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  // users
  const getUsers = async () => {
    const response = await fetch("/api/users/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setUsers(data);
  };

  // orders
  const getOrders = async () => {
    try {
      const response = await fetch("/api/orders/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setOrders(data);
      setDeliveredOrders(data.filter(order => order.status !== "active"))
      setUndeliveredOrders(data.filter(order => order.status === "active"))
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getProducts();
    getOrders();
    getUsers();
  }, []);

  return (
    <div className="m-auto py-3 sm:py-5 px-5 md:px-10 w-48 sm:w-full rounded-div bg-white flex-col sm:flex-row flex justify-between items-center text-darkGray text-center sm:text-left">
      <div className="">
        <p className="text-sm sm:text-base">Total Orders:</p>
        {orders === null ? (
          <LoadingIcon />
        ) : (
          <p className="text-sm sm:text-base font-bold">{orders.length}</p>
        )}
      </div>
      <div className="my-3 w-20 sm:w-[1px] h-[1px] sm:h-14 bg-lightGray"></div>
      <div className="">
        <p className="text-sm sm:text-base">undelivered Orders</p>
        {undeliveredOrders === null ? (
          <LoadingIcon />
        ) : (
          <p className="text-sm sm:text-base font-bold">{undeliveredOrders.length}</p>
        )}
      </div>
      <div className="my-3 w-20 sm:w-[1px] h-[1px] sm:h-14 bg-lightGray"></div>
      <div className="">
        <p className="text-sm sm:text-base">Delivered Orders</p>
          {deliveredOrders === null ? (
          <LoadingIcon />
        ) : (
          <p className="text-sm sm:text-base font-bold">{deliveredOrders.length}</p>
        )}
      </div>
      <div className="my-3 w-20 sm:w-[1px] h-[1px] sm:h-14 bg-lightGray"></div>
      <div className="">
        <p className="text-sm sm:text-base">Products</p>
        {products === null ? (
          <LoadingIcon />
        ) : (
          <p className="text-sm sm:text-base font-bold">{products.length}</p>
        )}
      </div>
      <div className="my-3 w-20 sm:w-[1px] h-[1px] sm:h-14 bg-lightGray"></div>
      <div className="">
        <p className="text-sm sm:text-base">Total Users</p>
        {users === null ? (
          <LoadingIcon />
        ) : (
          <p className="text-sm sm:text-base font-bold">{users.length}</p>
        )}
      </div>
    </div>
  );
}
