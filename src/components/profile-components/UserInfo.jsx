"use client";
import { useEffect, useState } from "react";
import LoadingIcon from "../LoadingIcon";

export default function UserInfo() {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  //   APIs calls
  const getUser = async () => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  //accessing user local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      setUserId(storedUserId);
      console.log(userId)
    }
  }, []);

  useEffect(() => {
    console.log("hh")
    if (userId) {
      getUser();
    }
  }, [userId]);

  return (
    <>
      {user === null ? (
        <LoadingIcon />
      ) : (
        <>
          <h1 className="text-base sm:text-xl font-semibold text-white">
            {user.name}
          </h1>
          <p className="text-sm sm:text-base text-white ">{user.email}</p>
        </>
      )}
    </>
  );
}
