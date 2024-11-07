"use client";
import {
  setToDashboard,
  setToOrders,
  setToProducts,
  setToUsers,
} from "@/redux/features/adminCurrentPage";
import { setToFalse } from "@/redux/features/isSidebarOpen";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AdminSidebar({ userId }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const hideSidebar = () => {
    dispatch(setToFalse())
  }

  const currentPage = useSelector((state) => state.adminCurrentPage.value);

  const isSidebarOpen = useSelector((state) => state.isSidebarOpen.value);

  const navigateToDashboard = () => {
    router.replace("/");
    dispatch(setToDashboard());
    dispatch(setToFalse())
  };

  const navigateToOrders = () => {
    router.push("/admin/orders");
    dispatch(setToOrders());
    dispatch(setToFalse())
  };

  const navigateToProducts = () => {
    router.push("/admin/products");
    dispatch(setToProducts());
    dispatch(setToFalse())
  };

  const navigateToUsers = () => {
    router.push("/admin/users");
    dispatch(setToUsers());
    dispatch(setToFalse())
  };

  useEffect(() => {
    if (userId) {
      localStorage.setItem("userId", userId);
    }
  }, [userId]);

  return (
    <div
      className={`h-full py-5 px-5 bg-primary sm:w-72 md:w-80 absolute top-0 ${
        isSidebarOpen ? "left-0" : "-left-[100%]"
      } sm:static flex flex-col items-center z-10 duration-300 shadow-lg sm:shadow-none shadow-black`}
    >
      <div className="w-5 h-5 absolute top-5 left-5 block sm:hidden" onClick={()=>hideSidebar()}>
        <Image
          src="/images/cross.png"
          alt="Close icon"
          width={100}
          height={100}
        />
      </div>
      <div className="mb-10 w-12 h-12 lg:w-16 lg:h-16 cursor-pointer">
        <Image
          src="/images/logo.png"
          alt="Fruity logo"
          width={100}
          height={100}
          priority
        />
      </div>

      <div className="sm:w-full text-white">
        <div
          className={`mb-2 w-full py-2 px-5 flex items-center gap-5 rounded-[10px] ${
            currentPage === "dashboard" && "bg-[#ffffff40]"
          } hover:bg-[#ffffff40] cursor-pointer duration-300`}
          onClick={() => navigateToDashboard()}
        >
          <div className="w-5 h-5">
            <Image
              src="/images/dashboard.png"
              alt="Home"
              width={20}
              height={15}
            />
          </div>
          <p>Dashboard</p>
        </div>
        <div
          className={`mb-2 w-full py-2 px-5 flex items-center gap-5 rounded-[10px] ${
            currentPage === "orders" && "bg-[#ffffff40]"
          } hover:bg-[#ffffff40] cursor-pointer duration-300`}
          onClick={() => navigateToOrders()}
        >
          <div className="w-5 h-5">
            <Image
              src="/images/orders.png"
              alt="Orders"
              width={20}
              height={18}
            />
          </div>
          <p>Orders</p>
        </div>
        <div
          className={`mb-2 w-full py-2 px-5 flex items-center gap-5 rounded-[10px] ${
            currentPage === "products" && "bg-[#ffffff40]"
          } hover:bg-[#ffffff40] cursor-pointer duration-300`}
          onClick={() => navigateToProducts()}
        >
          <div className="w-5 h-5">
            <Image
              src="/images/products.png"
              alt="products"
              width={20}
              height={20}
            />
          </div>
          <p>Products</p>
        </div>
        <div
          className={`mb-2 w-full py-2 px-5 flex items-center gap-5 rounded-[10px] ${
            currentPage === "users" && "bg-[#ffffff40]"
          } hover:bg-[#ffffff40] cursor-pointer duration-300`}
          onClick={() => navigateToUsers()}
        >
          <div className="w-5 h-5">
            <Image src="/images/users.png" alt="Users" width={20} height={10} />
          </div>
          <p>Users</p>
        </div>
      </div>
    </div>
  );
}
