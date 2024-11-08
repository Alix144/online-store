"use client";
import { useEffect, useState } from "react";
import LoadingIcon from "../LoadingIcon";

export default function SummaryNote({ orderId }) {
  const [user, setUser] = useState(null);
  const [order, setOrder] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orderDate, setOrderDate] = useState();

  const getOrder = async () => {
    setLoading(true);
    const response = await fetch(`/api/orders/${orderId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setOrder(data);
  };

  const getUser = async () => {
    const response = await fetch(`/api/users/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getOrder();
  }, []);

  useEffect(() => {
    if (userId) {
      getUser();
    }
  }, [userId]);

  //accessing user local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (order) {
      setLoading(false);
      const date = new Date(order.createdAt);
      const formattedDate = `${String(date.getDate()).padStart(
        2,
        "0"
      )}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
      setOrderDate(formattedDate);
    }
  }, [order]);

  return (
    <div className="p-3 sm:p-5 w-60 sm:w-64 xl:w-72 h-60 sm:h-64 xl:h-72 text-left bg-secondary shadow-md absolute left-1/2 transform -translate-x-1/2 lg:translate-x-0 lg:left-16 -bottom-52 lg:-bottom-40 flex justify-center flex-col gap-2">
      {loading ? (
        <LoadingIcon />
      ) : (
        <>
          <div>
            <p className="text-sm">Customer</p>
            <p className="text-sm font-bold">{user?.name}</p>
          </div>
          <div>
            <p className="text-sm">Address</p>
            <p className="text-sm font-bold">
              {order?.address}
            </p>
          </div>
          <div>
            <p className="text-sm">Order Date</p>
            <p className="text-sm font-bold">{orderDate}</p>
          </div>
          <div>
            <p className="text-sm">Total</p>
            <p className="text-sm font-bold">{order?.price} KWD</p>
          </div>
        </>
      )}
    </div>
  );
}
