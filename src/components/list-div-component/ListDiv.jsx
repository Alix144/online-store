"use client";
import Image from "next/image";
import ListData from "./list-data/ListData";
import CustomerOrderListData from "./list-data/CustomerOrderListData";
import AdminOrderListData from "./list-data/AdminOrderListData";
import ProductListData from "./list-data/ProductListData";
import UsersListData from "./list-data/UsersListdata";
import { useState } from "react";

export default function ListDiv({ type }) {
  const [isDeleteWindowOpen, setIsDeleteWindowOpen] = useState(false);
  const [isAddProductWindowOpen, setIsAddProductWindowOpen] = useState(false);
  const [isEditProductWindowOpen, setIsEditProductWindowOpen] = useState(false);

  const [jaja, setJaja] = useState('initial')

  return (
    <>
      <div className="w-full">
        
        {/* search input */}
        <div className="w-full flex justify-between flex-col-reverse sm:flex-row">
          <div className="mb-3 px-3 w-full sm:w-64 h-8 bg-white rounded-div border-darkGray border-[1px] flex gap-1 items-center">
            <div className="w-5 h-5">
              <Image
                src="/images/search.png"
                alt="Search"
                width={100}
                height={100}
              />
            </div>
            <input
              type="text"
              placeholder="Search Order"
              className="h-full w-full focus:outline-none rounded-sm text-darkGray"
            />
          </div>
          {type === "productsList" && (
            <button
              className="mb-2 sm:mb-0 px-5 h-8 py-0 bg-primary text-white rounded-[30px] text-sm sm:text-base hover:rounded-[10px] duration-300"
              onClick={() => setIsAddProductWindowOpen(true)}
            >
              Add Product
            </button>
          )}
        </div>

        <div className="p-3 w-full h-96 bg-white rounded-div">
          {/* header */}
          {type === "customerOrderList" ? (
            <div className="px-5 lg:px-16 py-1 w-full bg-silver rounded-div flex justify-between scrollbar-hide overflow-x-auto">
              <div className="flex gap-5 sm:gap-10 md:gap-20">
                <h5 className="w-10 sm:w-14 lg:w-24 font-semibold text-sm sm:text-base">Date</h5>
                <h5 className="w-10 sm:w-14 lg:w-24 font-semibold text-sm sm:text-base">Price</h5>
                <h5 className="w-10 sm:w-14 lg:w-24 font-semibold text-sm sm:text-base">Items</h5>
              </div>
              <h5 className="font-semibold text-sm sm:text-base">Status</h5>
            </div>
          ) : type === "adminOrderList" ? (
            <div className="px-5 lg:px-16 py-1 w-full bg-silver rounded-div flex justify-between scrollbar-hide overflow-x-auto">
              <div className="flex gap-5 sm:gap-10 md:gap-20">
                <h5 className="w-16 lg:w-24 font-semibold text-sm sm:text-base">Customer</h5>
                <h5 className="w-10 sm:w-14 lg:w-24 font-semibold text-sm sm:text-base">Date</h5>
                <h5 className="w-10 sm:w-14 lg:w-24 font-semibold text-sm sm:text-base">Price</h5>
                <h5 className="w-10 sm:w-14 lg:w-24 font-semibold text-sm sm:text-base">Items</h5>
              </div>
              <h5 className="w-10 sm:w-14 lg:w-24 font-semibold text-sm sm:text-base">Status</h5>
            </div>
          ) : type === "productsList" ? (
            <div className="px-5 lg:px-16 py-1 w-full bg-silver rounded-div flex justify-between scrollbar-hide overflow-x-auto">
              <div className="flex gap-5 sm:gap-10 md:gap-20">
                <h5 className="w-10 sm:w-14 lg:w-24 font-semibold text-sm sm:text-base">Image</h5>
                <h5 className="w-10 sm:w-14 lg:w-24 font-semibold text-sm sm:text-base">Name</h5>
                <h5 className="w-10 sm:w-14 lg:w-24 font-semibold text-sm sm:text-base">Price</h5>
                <h5 className="w-10 sm:w-14 lg:w-24 font-semibold text-sm sm:text-base">Measurement</h5>
              </div>
            </div>
          ) : (
            <div className="px-5 lg:px-16 py-1 w-full bg-silver rounded-div flex justify-between scrollbar-hide overflow-x-auto">
              <div className="flex gap-5 sm:gap-10 md:gap-20">
                <h5 className="w-10 sm:w-14 lg:w-24 font-semibold text-sm sm:text-base">Name</h5>
                <h5 className="w-10 sm:w-14 lg:w-24 font-semibold text-sm sm:text-base">Email</h5>
                <h5 className="w-24 font-semibold text-sm sm:text-base">Member Since</h5>
              </div>
            </div>
          )}

          {/* content */}
          <div className="w-full max-h-80 overflow-y-scroll scrollbar-hide overflow-x-auto">
            {type === "customerOrderList" ? (
              <CustomerOrderListData />
            ) : type === "adminOrderList" ? (
              <AdminOrderListData />
            ) : type === "productsList" ? (
              <ProductListData setIsEditProductWindowOpen={setIsEditProductWindowOpen} setIsDeleteWindowOpen={setIsDeleteWindowOpen}/>
            ) : (
              <UsersListData />
            )}
          </div>
        </div>
      </div>

      {isDeleteWindowOpen && (
        <div className="w-full h-full absolute top-0 left-0 bg-[#00000066] z-10 flex justify-center items-center">
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
              <button className="btn-style bg-danger text-white">Delete</button>
            </div>
          </div>
        </div>
      )}

      {isAddProductWindowOpen && (
        <div className="w-full h-full absolute top-0 left-0 bg-[#00000066] z-10 flex justify-center items-center">
          <div className="p-5 bg-silver rounded-div flex flex-col gap-5 justify-between text-darkGray text-center">
            <h2 className="text-lg font-semibold">Add Product</h2>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Product Name"
                className="mb-3 px-3 w-64 h-8 bg-white rounded-div border-darkGray border-[1px]"
              />
              <input
                type="Number"
                placeholder="Price (KWD)"
                className="mb-3 px-3 w-64 h-8 bg-white rounded-div border-darkGray border-[1px]"
              />
              <select id="measurement" name="measurement" placeholder="Measurement" className="mb-3 px-3 w-64 h-8 bg-white rounded-div border-darkGray border-[1px] text-gray-400">
                <option value="" disabled selected>Measurement</option>
                <option value="kg">kg</option>
                <option value="g">g</option>
              </select>
            </div>
            <div className="flex justify-between">
              <button
                className="btn-style bg-[#00000066] text-white"
                onClick={() => setIsAddProductWindowOpen(false)}
              >
                Cancel
              </button>
              <button className="btn-style bg-primary text-white">Add</button>
            </div>
          </div>
        </div>
      )}

      {isEditProductWindowOpen && (
        <div className="w-full h-full absolute top-0 left-0 bg-[#00000066] z-10 flex justify-center items-center">
          <div className="p-5 bg-white rounded-div flex flex-col gap-5 justify-between text-darkGray text-center">
            <h2 className="text-lg font-semibold">Edit Product</h2>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Product Name"
                className="mb-3 px-3 w-64 h-8 bg-white rounded-div border-darkGray border-[1px]"
              />
              <input
                type="Number"
                placeholder="Price (KWD)"
                className="mb-3 px-3 w-64 h-8 bg-white rounded-div border-darkGray border-[1px]"
              />
              <select id="measurement" name="measurement" placeholder="Measurement" className="mb-3 px-3 w-64 h-8 bg-white rounded-div border-darkGray border-[1px]">
                <option value="" disabled selected>Measurement</option>
                <option value="kg">kg</option>
                <option value="g">g</option>
              </select>
            </div>
            <div className="flex justify-between">
              <button
                className="btn-style bg-[#00000066] text-white"
                onClick={() => setIsEditProductWindowOpen(false)}
              >
                Cancel
              </button>
              <button className="btn-style bg-primary text-white">Edit</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
