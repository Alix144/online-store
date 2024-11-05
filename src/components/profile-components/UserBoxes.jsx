"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import LoadingIcon from "../LoadingIcon";

export default function UserBoxes({ user }) {
  const [isAddAddressWindowOpen, setIsAddAddressWindowOpen] = useState(false);
  const [isAddNumberWindowOpen, setIsAddNumberWindowOpen] = useState(false);
  const [address, setAddress] = useState(null);
  const [number, setNumber] = useState(null);

  useEffect(() => {
    if (user) {
      if (user?.address) {
        const formattedAddress = `${user.address.area}, Street ${
          user.address.street
        }, building ${user.address.buildingNo}, ${
          user.address.avenue ? "Avenue " + user.address.avenue + ", " : ""
        }Apt ${user.address.aptNo}, Floor ${user.address.floor}`;
        setAddress(formattedAddress);
      } else {
        setAddress("");
      }

      if (user?.phoneNumber) {
        setNumber(user.phoneNumber);
      } else {
        setNumber("");
      }
    }
  }, [user]);

  return (
    <>
      <div className="w-full flex gap-3 sm:gap-5 text-center text-darkGray">
        <div className="py-3 sm:py-5 px-5 sm:px-10 w-[50%] bg-secondary rounded-div flex flex-col gap-3 sm:gap-5 items-center">
          <div className="w-8 sm:w-10 h-8 sm:h-10">
            <Image
              src="/images/phone.png"
              alt="Phone"
              width={300}
              height={300}
              className="mb-5"
            />
          </div>
          {number === null ? (
            <LoadingIcon />
          ) : number === "" ? (
            <button
              className="py-2 px-5 text-sm sm:text-base text-white rounded-div border-none bg-[#00000066] hover:bg-darkGray duration-300 cursor-pointer"
              onClick={() => setIsAddNumberWindowOpen(true)}
            >
              Add Number
            </button>
          ) : (
            <p className="text-sm sm:text-base font-bold">{user.phoneNumber}</p>
          )}
        </div>
        <div className="py-3 sm:py-5 px-5 sm:px-10 w-[50%] bg-secondary rounded-div flex flex-col gap-3 sm:gap-5 items-center">
          <div className="w-8 sm:w-10 h-8 sm:h-10">
            <Image
              src="/images/address.png"
              alt="Address"
              width={300}
              height={300}
              className="mb-5"
            />
          </div>
          {address === null ? (
            <LoadingIcon />
          ) : address === "" ? (
            <button
              className="py-2 px-5 text-sm sm:text-base text-white rounded-div border-none bg-[#00000066] hover:bg-darkGray duration-300 cursor-pointer"
              onClick={() => setIsAddAddressWindowOpen(true)}
            >
              Add Address
            </button>
          ) : (
            <p className="text-sm sm:text-base font-bold">{address}</p>
          )}
        </div>
      </div>

      {/* add address window */}
      {isAddNumberWindowOpen && (
        <div className="w-full h-full fixed top-0 left-0 bg-[#00000066] z-10 flex justify-center items-center">
          <div className="p-5 bg-silver rounded-div flex flex-col gap-5 justify-between text-darkGray text-center">
            <h2 className="text-lg font-semibold">Add Number</h2>
            <div className="flex flex-col">
              <div className="flex gap-2">
                <input
                  type="text"
                  disabled
                  placeholder="+965"
                  className="mb-3 px-3 w-20 h-8 bg-white rounded-div border-darkGray border-[1px]"
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="mb-3 px-3 w-60 h-8 bg-white rounded-div border-darkGray border-[1px]"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <button
                className="btn-style bg-[#00000066] text-white"
                onClick={() => setIsAddNumberWindowOpen(false)}
              >
                Cancel
              </button>
              <button className="btn-style bg-primary text-white">Add</button>
            </div>
          </div>
        </div>
      )}

      {/* add address window */}
      {isAddAddressWindowOpen && (
        <div className="w-full h-full fixed top-0 left-0 bg-[#00000066] z-10 flex justify-center items-center">
          <div className="p-5 bg-silver rounded-div flex flex-col gap-5 justify-between text-darkGray text-center">
            <h2 className="text-lg font-semibold">Add Address</h2>
            <div className="flex flex-col">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Area"
                  className="mb-3 px-3 w-40 h-8 bg-white rounded-div border-darkGray border-[1px]"
                />
                <input
                  type="text"
                  placeholder="Block"
                  className="mb-3 px-3 w-40 h-8 bg-white rounded-div border-darkGray border-[1px]"
                />
              </div>
              <input
                type="text"
                placeholder="Street"
                className="mb-3 px-3 w-full h-8 bg-white rounded-div border-darkGray border-[1px]"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Building No"
                  className="mb-3 px-3 w-40 h-8 bg-white rounded-div border-darkGray border-[1px]"
                />
                <input
                  type="text"
                  placeholder="Avenue (optional)"
                  className="mb-3 px-3 w-40 h-8 bg-white rounded-div border-darkGray border-[1px]"
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Apt. number"
                  className="mb-3 px-3 w-40 h-8 bg-white rounded-div border-darkGray border-[1px]"
                />
                <input
                  type="text"
                  placeholder="Floor"
                  className="mb-3 px-3 w-40 h-8 bg-white rounded-div border-darkGray border-[1px]"
                />
              </div>
              <textarea
                name=""
                id=""
                placeholder="Additional directions (optional)"
                className="mb-3 px-3 w-full bg-white rounded-div border-darkGray border-[1px]"
              ></textarea>
            </div>
            <div className="flex justify-between">
              <button
                className="btn-style bg-[#00000066] text-white"
                onClick={() => setIsAddAddressWindowOpen(false)}
              >
                Cancel
              </button>
              <button className="btn-style bg-primary text-white">Add</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
