import Image from "next/image";
import ListData from "./list-data/ListData";
import CustomerOrderListData from "./list-data/CustomerOrderListData";
import AdminOrderListData from "./list-data/AdminOrderListData";
import ProductListData from "./list-data/ProductListData";
import UsersListData from "./list-data/UsersListdata";

export default function ListDiv({ type }) {
  return (
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
        {type === "productsList" && 
        <button className="px-5 h-8 py-0 bg-primary text-white rounded-[30px] text-sm sm:text-base hover:rounded-[10px] duration-300">Add Product</button>
        }
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
  );
}
