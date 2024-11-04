"use client";
import Image from "next/image";
import ListData from "./list-data/ListData";
import CustomerOrderListData from "./list-data/CustomerOrderListData";
import AdminOrderListData from "./list-data/AdminOrderListData";
import ProductListData from "./list-data/ProductListData";
import UsersListData from "./list-data/UsersListdata";
import { useEffect, useState } from "react";
import LoadingIcon from "../LoadingIcon";

export default function ListDiv({ type }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(null);
  const [isDeleteWindowOpen, setIsDeleteWindowOpen] = useState(null);
  const [isAddProductWindowOpen, setIsAddProductWindowOpen] = useState(false);
  const [isEditProductWindowOpen, setIsEditProductWindowOpen] = useState(null);
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productMeasurement, setProductMeasurement] = useState("");
  const [orders, setOrders] = useState(null);
  const [products, setProducts] = useState(null);
  const [users, setUsers] = useState(null);

  const closeAddForm = () => {
    setIsAddProductWindowOpen(false);
    setError("");
  };

  const closeEditForm = () => {
    setIsEditProductWindowOpen(null);
    setError("");
  };

  //**** calling APIs ****//
  // products
  const getProducts = async () => {
    const response = await fetch("/api/products/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setProducts(data);
  };

  const addProduct = async () => {
    setError("");
    if (
      productName === "" &&
      productPrice === "" &&
      productMeasurement === ""
    ) {
      setError("Please provide fill all the fields!");
      return;
    } else if (productPrice === "") {
      setError("Please provide a product price!");
      return;
    } else if (productName === "") {
      setError("Please provide a product name!");
      return;
    } else if (productMeasurement === "") {
      setError("Please provide measurement!");
      return;
    }
    setLoading(true);
    const response = await fetch("/api/products/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: productName,
        price: productPrice,
        measurement: productMeasurement,
      }),
    });
    getProducts();
    setLoading(false);
    setProductName("");
    setProductPrice("");
    setIsAddProductWindowOpen(false);
  };

  const editProduct = async () => {
    setError("");
    if (productName === "" && productPrice === "") {
      setError("Please provide product name and price!");
      return;
    } else if (productPrice === "") {
      setError("Please provide a product price!");
      return;
    } else if (productName === "") {
      setError("Please provide a product name!");
      return;
    }
    setLoading(true);
    const response = await fetch("/api/products/", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId,
        name: productName,
        price: productPrice,
        measurement: productMeasurement,
      }),
    });
    getProducts();
    setLoading(false);
    setIsEditProductWindowOpen(null);
  };

  const deleteProduct = async () => {
    setLoading(true);
    const response = await fetch("/api/products/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    getProducts();
    setLoading(false);
    setIsDeleteWindowOpen(null);
  };

  // users
  const getUsers = async () => {
    const response = await fetch("/api/users/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setUsers(data);
    console.log(data);
  };

  // orders
  const getOrders = async () => {
    setLoading(true);
    const response = await fetch("/api/orders/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    const userOrders = data.filter((order) => order.userId === userId);
    console.log(data);
    setOrders(userOrders);
  };

  useEffect(() => {
    if (userId) {
      if (type === "productsList") {
        getProducts();
      }
      if (type === "customerOrderList") {
        getOrders();
      } else {
        getUsers();
      }
    }
  }, [userId]);

  useEffect(() => {
    if (isEditProductWindowOpen === null) {
      setProductId("");
      setProductName("");
      setProductPrice("");
      setProductMeasurement("");
    } else {
      setProductId(isEditProductWindowOpen._id);
      setProductName(isEditProductWindowOpen.name);
      setProductPrice(isEditProductWindowOpen.price);
      setProductMeasurement(isEditProductWindowOpen.measurement);
    }
  }, [isEditProductWindowOpen]);

  useEffect(() => {
    if (isDeleteWindowOpen !== null) {
      setProductId(isDeleteWindowOpen);
    }
  }, [isDeleteWindowOpen]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      setUserId(storedUserId);
    }
  }, []);

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
                <h5 className="w-10 sm:w-14 lg:w-24 font-semibold text-sm sm:text-base">
                  Date
                </h5>
                <h5 className="w-10 sm:w-14 lg:w-24 font-semibold text-sm sm:text-base">
                  Price
                </h5>
                <h5 className="w-10 sm:w-14 lg:w-24 font-semibold text-sm sm:text-base">
                  Items
                </h5>
              </div>
              <h5 className="font-semibold text-sm sm:text-base">Status</h5>
            </div>
          ) : type === "adminOrderList" ? (
            <div className="px-5 lg:px-16 py-1 w-full bg-silver rounded-div flex justify-between scrollbar-hide overflow-x-auto">
              <div className="flex gap-5 sm:gap-10 md:gap-20">
                <h5 className="w-16 lg:w-24 font-semibold text-sm sm:text-base">
                  Customer
                </h5>
                <h5 className="w-10 sm:w-14 lg:w-24 font-semibold text-sm sm:text-base">
                  Date
                </h5>
                <h5 className="w-10 sm:w-14 lg:w-24 font-semibold text-sm sm:text-base">
                  Price
                </h5>
                <h5 className="w-10 sm:w-14 lg:w-24 font-semibold text-sm sm:text-base">
                  Items
                </h5>
              </div>
              <h5 className="w-10 sm:w-14 lg:w-24 font-semibold text-sm sm:text-base">
                Status
              </h5>
            </div>
          ) : type === "productsList" ? (
            <div className="px-5 lg:px-16 py-1 w-full bg-silver rounded-div flex justify-between scrollbar-hide overflow-x-auto">
              <div className="flex gap-5 sm:gap-10 md:gap-20">
                <h5 className="w-10 sm:w-14 lg:w-24 font-semibold text-sm sm:text-base">
                  Image
                </h5>
                <h5 className="w-10 sm:w-14 lg:w-24 font-semibold text-sm sm:text-base">
                  Name
                </h5>
                <h5 className="w-10 sm:w-14 lg:w-24 font-semibold text-sm sm:text-base">
                  Price
                </h5>
                <h5 className="w-10 sm:w-14 lg:w-24 font-semibold text-sm sm:text-base">
                  Measurement
                </h5>
              </div>
            </div>
          ) : (
            <div className="px-5 lg:px-16 py-1 w-full bg-silver rounded-div flex justify-between scrollbar-hide overflow-x-auto">
              <div className="flex gap-5 sm:gap-10 md:gap-20">
                <h5 className="w-10 sm:w-14 lg:w-24 font-semibold text-sm sm:text-base">
                  Name
                </h5>
                <h5 className="w-10 sm:w-14 lg:w-24 font-semibold text-sm sm:text-base">
                  Email
                </h5>
                <h5 className="w-24 font-semibold text-sm sm:text-base">
                  Member Since
                </h5>
              </div>
            </div>
          )}

          {/* content */}
          <div className="w-full h-full max-h-80 overflow-y-scroll scrollbar-hide overflow-x-auto">
            {type === "customerOrderList" ? (
              orders === null ? (
                <div className="h-full flex justify-center items-center">
                  <LoadingIcon />
                </div>
              ) : orders.length === 0 ? (
                <p>no orders found</p>
              ) : (
                orders?.slice().reverse().map((order) => (
                  <CustomerOrderListData key={order._id} order={order} />
                ))
              )
            ) : type === "adminOrderList" ? (
              <AdminOrderListData />
            ) : type === "productsList" ? (
              products === null ? (
                <LoadingIcon />
              ) : products.length === 0 ? (
                <div className="mt-10 w-full flex flex-col text-center justify-start items-center">
                  <Image
                    src="/images/empty-box.png"
                    alt="Empty Box"
                    width={100}
                    height={100}
                    className="mb-5"
                  />
                  <p>No Products Found!</p>
                </div>
              ) : (
                products?.map((product) => (
                  <ProductListData
                    key={product._id}
                    product={product}
                    setIsEditProductWindowOpen={setIsEditProductWindowOpen}
                    setIsDeleteWindowOpen={setIsDeleteWindowOpen}
                  />
                ))
              )
            ) : users === null ? (
              <LoadingIcon />
            ) : users.length === 0 ? (
              <div className="mt-10 w-full flex flex-col text-center justify-start items-center">
                <Image
                  src="/images/empty-box.png"
                  alt="Empty Box"
                  width={100}
                  height={100}
                  className="mb-5"
                />
                <p>No usesrs found!</p>
              </div>
            ) : (
              users?.map((user) => <UsersListData key={user._id} user={user} />)
            )}
          </div>
        </div>
      </div>

      {isDeleteWindowOpen !== null && (
        <div className="w-full h-full absolute top-0 left-0 bg-[#00000066] z-10 flex justify-center items-center">
          <div className="p-5 bg-white rounded-div flex flex-col gap-5 justify-between text-darkGray text-center">
            <h2 className="text-lg font-semibold">Delete Product</h2>
            <p>Are you sure you want to delete this product?</p>
            <div className="flex justify-between">
              <button
                className="btn-style bg-[#00000066] text-white"
                onClick={() => setIsDeleteWindowOpen(null)}
              >
                Cancel
              </button>
              <button
                className="btn-style bg-danger text-white"
                onClick={() => deleteProduct()}
              >
                {loading ? <LoadingIcon /> : "Delete"}
              </button>
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
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              <input
                type="Number"
                placeholder="Price (KWD)"
                className="mb-3 px-3 w-64 h-8 bg-white rounded-div border-darkGray border-[1px]"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
              <select
                id="measurement"
                name="measurement"
                placeholder="Measurement"
                className="mb-3 px-3 w-64 h-8 bg-white rounded-div border-darkGray border-[1px] text-gray-400"
                onChange={(e) => setProductMeasurement(e.target.value)}
              >
                <option value="" disabled selected>
                  Measurement
                </option>
                <option value="kg">kg</option>
                <option value="g">g</option>
              </select>
            </div>
            {error && (
              <p className="text-sm sm:text-base text-danger">{error}</p>
            )}

            <div className="flex justify-between">
              <button
                className="btn-style bg-[#00000066] text-white"
                onClick={() => closeAddForm()}
              >
                Cancel
              </button>
              <button
                className="btn-style bg-primary text-white"
                onClick={() => addProduct()}
              >
                {loading ? <LoadingIcon /> : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditProductWindowOpen !== null && (
        <div className="w-full h-full absolute top-0 left-0 bg-[#00000066] z-10 flex justify-center items-center">
          <div className="p-5 bg-white rounded-div flex flex-col gap-5 justify-between text-darkGray text-center">
            <h2 className="text-lg font-semibold">Edit Product</h2>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Product Name"
                className="mb-3 px-3 w-64 h-8 bg-white rounded-div border-darkGray border-[1px]"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              <input
                type="Number"
                placeholder="Price (KWD)"
                className="mb-3 px-3 w-64 h-8 bg-white rounded-div border-darkGray border-[1px]"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
              <select
                id="measurement"
                name="measurement"
                placeholder="Measurement"
                className="mb-3 px-3 w-64 h-8 bg-white rounded-div border-darkGray border-[1px]"
                onChange={(e) => setProductMeasurement(e.target.value)}
              >
                <option value="kg" selected={productMeasurement === "kg"}>
                  kg
                </option>
                <option value="g" selected={productMeasurement === "g"}>
                  g
                </option>
              </select>
            </div>
            {error && (
              <p className="text-sm sm:text-base text-danger">{error}</p>
            )}
            <div className="flex justify-between">
              <button
                className="btn-style bg-[#00000066] text-white"
                onClick={() => closeEditForm()}
              >
                Cancel
              </button>
              <button
                className="btn-style bg-primary text-white"
                onClick={() => editProduct()}
              >
                {loading ? <LoadingIcon /> : "Edit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
