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

  return (
    <>
      <div className="w-full">
        {/* search input */}
        <div className="w-full flex justify-between">
          <div className="mb-3 px-3 w-64 h-8 bg-white rounded-div border-darkGray border-[1px] flex gap-1 items-center">
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
              className="px-5 h-8 py-0 bg-primary text-white rounded-[30px] text-sm sm:text-base hover:rounded-[10px] duration-300"
              onClick={() => setIsAddProductWindowOpen(true)}
            >
              Add Product
            </button>
          )}
        </div>

        <div className="p-3 w-full h-96 bg-white rounded-div">
          {/* header */}
          {type === "customerOrderList" ? (
            <div className="px-16 py-1 w-full bg-silver rounded-div flex justify-between">
              <div className="flex gap-20">
                <h5 className="w-24 max-w-24 font-semibold">Date</h5>
                <h5 className="w-24 max-w-24 font-semibold">Price</h5>
                <h5 className="w-24 max-w-24 font-semibold">Items</h5>
              </div>
              <h5 className="font-semibold">Status</h5>
            </div>
          ) : type === "adminOrderList" ? (
            <div className="px-16 py-1 w-full bg-silver rounded-div flex justify-between">
              <div className="flex gap-20">
                <h5 className="w-24 max-w-24 font-semibold">Customer</h5>
                <h5 className="w-24 max-w-24 font-semibold">Date</h5>
                <h5 className="w-24 max-w-24 font-semibold">Price</h5>
                <h5 className="w-24 max-w-24 font-semibold">Items</h5>
              </div>
              <h5 className="font-semibold">Status</h5>
            </div>
          ) : type === "productsList" ? (
            <div className="px-16 py-1 w-full bg-silver rounded-div flex justify-between">
              <div className="flex gap-20">
                <h5 className="w-24 max-w-24 font-semibold">Image</h5>
                <h5 className="w-24 max-w-24 font-semibold">Name</h5>
                <h5 className="w-24 max-w-24 font-semibold">Price</h5>
                <h5 className="w-24 max-w-24 font-semibold">Measurement</h5>
              </div>
            </div>
          ) : (
            <div className="px-16 py-1 w-full bg-silver rounded-div flex justify-between">
              <div className="flex gap-20">
                <h5 className="w-24 max-w-24 font-semibold">Name</h5>
                <h5 className="w-24 max-w-24 font-semibold">Email</h5>
                <h5 className="w-28 max-w-32 font-semibold">Member Since</h5>
              </div>
            </div>
          )}

          {/* content */}
          <div className="w-full max-h-80 overflow-y-scroll scrollbar-hide">
            {type === "customerOrderList" ? (
              <CustomerOrderListData />
            ) : type === "adminOrderList" ? (
              <AdminOrderListData />
            ) : type === "productsList" ? (
              <ProductListData />
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
                <option value="apple">KG</option>
                <option value="banana">Gr</option>
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
                <option value="apple">KG</option>
                <option value="banana">Gr</option>
              </select>
            </div>
            <div className="flex justify-between">
              <button
                className="btn-style bg-[#00000066] text-white"
                onClick={() => setIsDeleteWindowOpen(false)}
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
