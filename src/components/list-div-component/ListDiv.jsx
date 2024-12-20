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
  const [isOrderDetailsWindowOpen, setIsOrderDetailsWindowOpen] =
    useState(null);
  const [productId, setProductId] = useState("");

  
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productMeasurement, setProductMeasurement] = useState("");
  const [uploadedImage, setUploadedImage] = useState({ file: "" });
  
  const [status, setStatus] = useState("");
  
  const [orders, setOrders] = useState(null);
  const [adminOrders, setAdminOrders] = useState(null);
  const [displayedAdminOrders, setDisplayedAdminOrders] = useState(null);
  const [products, setProducts] = useState(null);
  const [displayedProducts, setDisplayedProducts] = useState(null);

  const [users, setUsers] = useState(null);
  const [displayedUsers, setDisplayedUsers] = useState(null);

  const [searchOrdersInputValue, setSearchOrdersInputValue] = useState("");
  const [searchProductsInputValue, setSearchProductsInputValue] = useState("");
  const [searchUsersInputValue, setSearchUsersInputValue] = useState("");

  const searchOrders = (e) => {
    const value = e.target.value;
    setSearchOrdersInputValue(value);
  
    const filteredOrders = adminOrders.filter(order => 
      order.customerName.toLowerCase().includes(value.toLowerCase())
    );

    setDisplayedAdminOrders(filteredOrders);
  
  }

  const searchProducts = (e) => {
    const value = e.target.value;
    setSearchProductsInputValue(value);
  
    const filteredProducts = products.filter(product => 
      product.name.toLowerCase().includes(value.toLowerCase())
    );

    setDisplayedProducts(filteredProducts);
  }

  const searchUsers = (e) => {
    const value = e.target.value;
    setSearchUsersInputValue(value);
  
    const filteredUsers = users.filter(user => 
      user.name.toLowerCase().includes(value.toLowerCase())
    );

    setDisplayedUsers(filteredUsers);
  }

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setUploadedImage({ ...uploadedImage, file: base64 });
  };

  const closeAddForm = () => {
    setIsAddProductWindowOpen(false);
    setProductName("");
    setProductPrice("");
    setUploadedImage({ file: "" });
    setError("");
  };

  const closeEditForm = () => {
    setIsEditProductWindowOpen(null);
    setError("");
  };

  const closeOrderDetails = () => {
    setIsOrderDetailsWindowOpen(null);
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
    setSearchProductsInputValue("")
    setDisplayedProducts(data)
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
    try {
      const response = await fetch("/api/products/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: productName,
          price: productPrice,
          measurement: productMeasurement,
          image: uploadedImage,
        }),
      });
      getProducts();
      closeAddForm();
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  const editProduct = async () => {
    setLoading(true);
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
    
    try {
      const response = await fetch("/api/products/", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          name: productName,
          price: productPrice,
          measurement: productMeasurement,
          image: uploadedImage,
        }),
      });
      getProducts();
      setIsEditProductWindowOpen(null);
    } catch (error) {
      setError(error)
    }
    setLoading(false);
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
    setDisplayedUsers(data)
  };

  // orders
  const getOrders = async () => {
    try {
      const response = await fetch("/api/orders/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      const userOrders = data.filter((order) => order.userId === userId);
      const adminComingOrders = data;
      setOrders(userOrders);
      setAdminOrders(adminComingOrders);
      setDisplayedAdminOrders(adminComingOrders)
      setSearchOrdersInputValue("")
    } catch (error) {
      setError(error);
    }
  };

  const updateOrderStatus = async (orderId) => {
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/orders/", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          status,
        }),
      });
      closeOrderDetails();
      getOrders();
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (type === "productsList") {
      getProducts();
    } else if (type === "customerOrderList" || type === "adminOrderList") {
      if (userId) {
        getOrders();
      }
    } else {
      getUsers();
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
        {type === "adminOrderList" ?
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
              placeholder="Search order by name"
              className="h-full w-full focus:outline-none rounded-sm text-darkGray"
              value={searchOrdersInputValue}
              onChange={(e)=>searchOrders(e)}
            />
          </div>
        </div>
        : type === "productsList"?
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
              placeholder="Search products by name"
              className="h-full w-full focus:outline-none rounded-sm text-darkGray"
              value={searchProductsInputValue}
              onChange={(e)=>searchProducts(e)}
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
        : type === "usersList" ?
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
              placeholder="Search user by name"
              className="h-full w-full focus:outline-none rounded-sm text-darkGray"
              value={searchUsersInputValue}
              onChange={(e)=>searchUsers(e)}
            />
          </div>
        </div>
        :
        null
        }

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
                <div className="mt-10 w-full flex flex-col text-center justify-start items-center">
                  <Image
                    src="/images/no-task.png"
                    alt="Empty List"
                    width={70}
                    height={70}
                    className="mb-5"
                  />
                  <p>No Orders Found!</p>
                </div>
              ) : (
                orders
                  ?.slice()
                  .reverse()
                  .map((order) => (
                    <CustomerOrderListData key={order._id} order={order} />
                  ))
              )
            ) : type === "adminOrderList" ? (
              displayedAdminOrders === null ? (
                <div className="h-full flex justify-center items-center">
                  <LoadingIcon />
                </div>
              ) : displayedAdminOrders.length === 0 ? (
                <div className="mt-10 w-full flex flex-col text-center justify-start items-center">
                  <Image
                    src="/images/no-task.png"
                    alt="Empty List"
                    width={70}
                    height={70}
                    className="mb-5"
                  />
                  <p>No Orders Found!</p>
                </div>
              ) : (
                displayedAdminOrders
                  ?.slice()
                  .reverse()
                  .map((order) => (
                    <AdminOrderListData
                      key={order._id}
                      order={order}
                      setIsOrderDetailsWindowOpen={setIsOrderDetailsWindowOpen}
                    />
                  ))
              )
            ) : type === "productsList" ? (
              products === null ? (
                <div className="h-full flex justify-center items-center">
                  <LoadingIcon />
                </div>
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
                displayedProducts
                  ?.slice()
                  .reverse()
                  .map((product) => (
                    <ProductListData
                      key={product._id}
                      product={product}
                      setIsEditProductWindowOpen={setIsEditProductWindowOpen}
                      setIsDeleteWindowOpen={setIsDeleteWindowOpen}
                      image={product.image}
                    />
                  ))
              )
            ) : users === null ? (
              <div className="h-full flex justify-center items-center">
                <LoadingIcon />
              </div>
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
              displayedUsers
                ?.slice()
                .reverse()
                .map((user) => <UsersListData key={user._id} user={user} />)
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

              <input
                type="file"
                lable="Image"
                name="file"
                id="file-upload"
                accept=".jpeg, .png, .jpg"
                onChange={(e) => handleFileUpload(e)}
                className="hidden"
              />
              <div className="flex justify-between">
                <div className="h-full w-16 overflow-hidden">
                  <Image
                    src={uploadedImage?.file || "/images/default-image.png"}
                    alt="Product image"
                    width={200}
                    height={200}
                  />
                </div>
                  <label htmlFor="file-upload" className="mb-3 px-3 w-32 h-8 flex justify-center items-center cursor-pointer bg-white rounded-div border-darkGray border-[1px]">
                    Upload
                  </label>
              </div>
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

              <input
                type="file"
                lable="Image"
                name="file"
                id="file-upload"
                accept=".jpeg, .png, .jpg"
                onChange={(e) => handleFileUpload(e)}
                className="hidden"
              />
              <div className="flex justify-between">
                <div className="h-full w-16 overflow-hidden">
                  <Image
                    src={uploadedImage?.file || "/images/default-image.png"}
                    alt="Product image"
                    width={200}
                    height={200}
                  />
                </div>
                  <label htmlFor="file-upload" className="mb-3 px-3 w-32 h-8 flex justify-center items-center cursor-pointer bg-white rounded-div border-darkGray border-[1px]">
                    Upload
                  </label>
              </div>
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

      {isOrderDetailsWindowOpen !== null && (
        <div className="w-full h-full absolute top-0 left-0 bg-[#00000066] z-10 flex justify-center items-center">
          <div className="p-5 bg-white rounded-div flex flex-col gap-5 justify-between text-darkGray text-center">
            <h2 className="text-lg font-semibold">Order Details</h2>
            <div className="flex flex-col gap-3 text-left">
              <div>
                <p className="text-sm sm:text-base font-bold">Date</p>
                <p className="text-sm sm:text-base">
                  {isOrderDetailsWindowOpen.createdAt.slice(0, 10)}
                </p>
              </div>
              <div>
                <p className="text-sm sm:text-base font-bold">Customer Name</p>
                <p className="text-sm sm:text-base">
                  {isOrderDetailsWindowOpen.customerName}
                </p>
              </div>
              <div>
                <p className="text-sm sm:text-base font-bold">Phone Number</p>
                <p className="text-sm sm:text-base">
                  +965 {isOrderDetailsWindowOpen.phoneNumber}
                </p>
              </div>
              <div>
                <p className="text-sm sm:text-base font-bold">Address</p>
                <p className="text-sm sm:text-base">
                  {isOrderDetailsWindowOpen.address}
                </p>
              </div>
              <div>
                <p className="text-sm sm:text-base font-bold">Order Summary</p>
                {isOrderDetailsWindowOpen.products.map((product) => (
                  <p className="text-sm sm:text-base" key={product.id}>
                    {product.amount} kg {product.name}
                  </p>
                ))}
              </div>
              <div>
                <p className="text-sm sm:text-base font-bold">Total Price</p>
                <p className="text-sm sm:text-base">
                  {isOrderDetailsWindowOpen.price} KWD
                </p>
              </div>
              <select
                id="status"
                name="status"
                placeholder="status"
                className="mb-3 px-3 w-64 h-8 bg-white rounded-div border-darkGray border-[1px]"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option
                  value="active"
                  selected={isOrderDetailsWindowOpen.status === "active"}
                >
                  Active
                </option>
                <option
                  value="delivered"
                  selected={isOrderDetailsWindowOpen.status === "delivered"}
                >
                  Delivered
                </option>
                <option
                  value="canceled"
                  selected={isOrderDetailsWindowOpen.status === "canceled"}
                >
                  Canceled
                </option>
              </select>
            </div>
            {error && (
              <p className="text-sm sm:text-base text-danger">{error}</p>
            )}
            <div className="flex justify-between">
              <button
                className="btn-style bg-[#00000066] text-white"
                onClick={() => closeOrderDetails()}
              >
                Cancel
              </button>
              <button
                className="btn-style bg-primary text-white"
                onClick={() => updateOrderStatus(isOrderDetailsWindowOpen._id)}
              >
                {loading ? <LoadingIcon /> : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
