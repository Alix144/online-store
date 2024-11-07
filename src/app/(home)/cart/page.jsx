"use client";
import Image from "next/image";
import LoadingIcon from "@/components/LoadingIcon";
import Product from "@/components/Product";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setToTrue } from "@/redux/features/isCartEmpty";
import { useDispatch } from "react-redux";

export default function CartPage() {
  const dispatch = useDispatch();
  const route = useRouter();
  const [products, setProducts] = useState(null);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [placeOrderLoading, setPlaceOrderLoading] = useState(true);
  const [address, setAddress] = useState("");
  const [addAddressValue, setAddAddressValue] = useState({
    area: "",
    block: "",
    street: "",
    buildingNo: "",
    avenue: "",
    aptNo: "",
    floor: "",
    additional: "",
  });

  const handleAmountChange = (productId, newAmount) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId ? { ...product, amount: newAmount } : product
      )
    );
  };

  const getProductPrice = (price, amount) => {
    let productPrice = price * (amount || 1);
    return parseFloat(productPrice.toFixed(5));
  };

  const calculateTotalPrice = () => {
    if (products) {
      const total = products.reduce((acc, product) => {
        const productPrice = product.price * (product.amount || 1);
        return acc + parseFloat(productPrice.toFixed(5));
      }, 0);
      setTotalPrice(total);
    }
  };

  // calling APIs
  const getUser = async () => {
    const response = await fetch(`/api/users/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setProducts(data.cart);
    setUser(data);
    if (data.address) {
      const formattedAddress = `${data.address.area}, Block ${
        data.address.block
      }, Street ${data.address.street}, Building ${data.address.buildingNo}, ${
        data.address.avenue ? "Avenue " + data.address.avenue + ", " : ""
      }Apt ${data.address.aptNo}, Floor ${data.address.floor}`;

      setAddress(formattedAddress);
    }
  };

  const makeOrder = async (formattedAddress) => {
    try {
      const response = await fetch("/api/orders/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          products,
          price: totalPrice,
          customerName: user.name,
          address: formattedAddress,
          phoneNumber: user.phoneNumber,
        }),
      });
      const data = await response.json();
      console.log(data);
      return data.order._id;
    } catch (error) {
      console.log(error)
    }

  };

  const emptyCart = async () => {
    const response = await fetch("/api/users/cart/", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    dispatch(setToTrue());
  };

  const placeOrder = async () => {
    console.log("jjj")
    if (placeOrderLoading === false) {
      setLoading(true);
      if (address === "") {

        if (addAddressValue.area === "" ||
          addAddressValue.block === "" ||
          addAddressValue.street === "" ||
          addAddressValue.buildingNo === "" ||
          addAddressValue.aptNo === "" ||
          addAddressValue.floor === "") {
            console.log("something is empty")
          setLoading(false);
          setError("Please fill all the required fields!");
          return;
        }else{
          const formattedAddress = `${addAddressValue.area}, Block ${
            addAddressValue.block
          }, Street ${addAddressValue.street}, Building ${addAddressValue.buildingNo}, ${
            addAddressValue.avenue ? "Avenue " + addAddressValue.avenue + ", " : ""
          }Apt ${addAddressValue.aptNo}, Floor ${addAddressValue.floor}`;
  
          const orderId = await makeOrder(formattedAddress);

          if (orderId) {
            await emptyCart();
            route.push(`/order-successful/${orderId}`);
          }
        }
      }else{

        const orderId = await makeOrder(address);

        if (orderId) {
          await emptyCart();
          route.push(`/order-successful/${orderId}`);
        }
      }

    }
  };

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
      getUser();
      setPlaceOrderLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    calculateTotalPrice();
  }, [products]);

  return (
    <main className="flex flex-col gap-5 sm:gap-10">
      <section className="py-10 sm:py-14 lg:py-16 xl:py-20 flex flex-col gap-5 sm:gap-10">
        <h1 className="m-auto text-center font-bold text-xl sm:text-2xl lg:text-3xl">
          Cart
        </h1>
        {products === null ? (
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
            <p>No products in cart!</p>
          </div>
        ) : (
          <div className="flex gap-5 justify-center items-center sm:items-start flex-col sm:flex-row">
            <div className="w-[60%] flex gap-5 flex-wrap justify-center sm:justify-normal">
              {products?.map((product) => (
                <Product
                  key={product._id}
                  product={product}
                  products={products}
                  setProducts={setProducts}
                  inCart={true}
                  isFavorite={true}
                  onAmountChange={handleAmountChange}
                />
              ))}
            </div>
            {/* order summary div */}
            {products?.length !== 0 && (
              <div className="p-5 md:p-10 lg:w-[40%] bg-primary rounded-div flex flex-col justify-between">
                {/* adderss & order summary */}
                <div className="mb-14 sm:mb-20">
                  {user?.address ? (
                    <div className="mb-3 sm:mb-7">
                      <p className="text-sm sm:text-base font-bold text-white">
                        Your Address
                      </p>
                      <p className="text-sm sm:text-base text-white">
                        {address}
                      </p>
                    </div>
                  ) : (
                    <div className="mb-3 sm:mb-7 flex flex-col gap-5 justify-between text-darkGray text-center">
                      <p className="text-sm sm:text-base font-bold text-white text-left">
                        Your Address
                      </p>
                      <div className="flex flex-col">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Area"
                            className="mb-3 px-3 w-[50%] h-8 bg-white rounded-div border-darkGray border-[1px]"
                            value={addAddressValue?.area}
                            onChange={(e) =>
                              setAddAddressValue((prevAddress) => ({
                                ...prevAddress,
                                area: e.target.value,
                              }))
                            }
                          />
                          <input
                            type="text"
                            placeholder="Block"
                            className="mb-3 px-3 w-[50%] h-8 bg-white rounded-div border-darkGray border-[1px]"
                            value={addAddressValue?.block}
                            onChange={(e) =>
                              setAddAddressValue((prevAddress) => ({
                                ...prevAddress,
                                block: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Street"
                          className="mb-3 px-3 w-full h-8 bg-white rounded-div border-darkGray border-[1px]"
                          value={addAddressValue?.street}
                          onChange={(e) =>
                            setAddAddressValue((prevAddress) => ({
                              ...prevAddress,
                              street: e.target.value,
                            }))
                          }
                        />
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Building No"
                            className="mb-3 px-3 w-[50%] h-8 bg-white rounded-div border-darkGray border-[1px]"
                            value={addAddressValue?.buildingNo}
                            onChange={(e) =>
                              setAddAddressValue((prevAddress) => ({
                                ...prevAddress,
                                buildingNo: e.target.value,
                              }))
                            }
                          />
                          <input
                            type="text"
                            placeholder="Avenue (optional)"
                            className="mb-3 px-3 w-[50%] h-8 bg-white rounded-div border-darkGray border-[1px]"
                            value={addAddressValue?.avenue}
                            onChange={(e) =>
                              setAddAddressValue((prevAddress) => ({
                                ...prevAddress,
                                avenue: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Apt. number"
                            className="mb-3 px-3 w-[50%] h-8 bg-white rounded-div border-darkGray border-[1px]"
                            value={addAddressValue?.aptNo}
                            onChange={(e) =>
                              setAddAddressValue((prevAddress) => ({
                                ...prevAddress,
                                aptNo: e.target.value,
                              }))
                            }
                          />
                          <input
                            type="text"
                            placeholder="Floor"
                            className="mb-3 px-3 w-[50%] h-8 bg-white rounded-div border-darkGray border-[1px]"
                            value={addAddressValue?.floor}
                            onChange={(e) =>
                              setAddAddressValue((prevAddress) => ({
                                ...prevAddress,
                                floor: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <textarea
                          name=""
                          id=""
                          placeholder="Additional directions (optional)"
                          className="mb-3 px-3 w-full bg-white rounded-div border-darkGray border-[1px]"
                          value={addAddressValue?.additional}
                          onChange={(e) =>
                            setAddAddressValue((prevAddress) => ({
                              ...prevAddress,
                              additional: e.target.value,
                            }))
                          }
                        ></textarea>
                      </div>
                      {error && (
                        <p className="text-sm sm:text-base text-danger">{error}</p>
                      )}
                    </div>
                  )}
                  <div>
                    <p className="text-sm sm:text-base font-bold text-white">
                      Order Summary
                    </p>
                    <div className="flex flex-col gap-2">
                      {products?.map((product) => (
                        <div
                          className="w-full flex justify-between"
                          key={product._id}
                        >
                          <div className="flex gap-3 sm:gap-5">
                            <p className="text-sm sm:text-base text-white">
                              {product?.amount ? product?.amount : "1"}{" "}
                              {product.measurement}
                            </p>
                            <p className="text-sm sm:text-base text-white">
                              {product.name}
                            </p>
                          </div>
                          <p className="text-sm sm:text-base text-white">
                            {getProductPrice(product.price, product.amount)} KWD
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* second part */}
                <div>
                  <div className="mb-5 flex justify-between border-t-[1px] border-white">
                    <p className="text-sm sm:text-base font-bold text-white">
                      Total
                    </p>
                    <p className="text-sm sm:text-base font-bold text-white">
                      {totalPrice} KWD
                    </p>
                  </div>
                  <button
                    className="w-full font-bold btn-style bg-secondary"
                    onClick={() => placeOrder()}
                  >
                    {loading || placeOrderLoading ? (
                      <LoadingIcon />
                    ) : (
                      "Place Order"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
