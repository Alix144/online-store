"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import LoadingIcon from "../LoadingIcon";

export default function UserBoxes({ userId, user }) {
  const [isAddAddressWindowOpen, setIsAddAddressWindowOpen] = useState(false);
  const [isEditAddressWindowOpen, setIsEditAddressWindowOpen] = useState(false);
  const [isAddNumberWindowOpen, setIsAddNumberWindowOpen] = useState(false);
  const [isEditNumberWindowOpen, setIsEditNumberWindowOpen] = useState(false);
  const [address, setAddress] = useState(null);
  const [firstAddress, setFirstAddress] = useState(null);
  const [number, setNumber] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //form values
  //add number form
  const [phoneNumber, setPhoneNumber] = useState("");
  //edit number form
  const [editNumberValue, setEditNumberValue] = useState("");

  //add address form
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
  //edit address form
  const [editAddressValue, setEditAddressValue] = useState({
    area: "",
    block: "",
    street: "",
    buildingNo: "",
    avenue: "",
    aptNo: "",
    floor: "",
    additional: "",
  });

  // API calls
  const addNumber = async () => {
    setLoading(true);
    if (phoneNumber.toString().length < 8) {
      setLoading(false);
      setError("Phone number should be 8 characters long!");
      return;
    }
    try {
      const response = await fetch("/api/users/phone/", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          phoneNumber,
        }),
      });
      if (response.ok) {
        setNumber(phoneNumber);
      } else {
        setError("Failed to update phone number!");
        console.log("Failed to update phone number:", response);
      }
    } catch (error) {
      setError("Failed to update phone number!");
      console.log(error);
    }
    setLoading(false);
    closeAddNumberWindow();
  };

  const editNumber = async () => {
    setLoading(true);
    if (editNumberValue.toString().length < 8) {
      setLoading(false);
      setError("Phone number should be 8 characters long!");
      return;
    }
    try {
      const response = await fetch("/api/users/phone/", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          phoneNumber: editNumberValue,
        }),
      });
      if (response.ok) {
        setNumber(editNumberValue);
      } else {
        setError("Failed to update phone number!");
        console.log("Failed to update phone number:", response);
      }
    } catch (error) {
      setError("Failed to update phone number!");
      console.log(error);
    }
    setLoading(false);
    closeEditNumberWindow();
  };

  const addAddress = async () => {
    setLoading(true);
    if (
      addAddressValue.area === "" ||
      addAddressValue.block === "" ||
      addAddressValue.street === "" ||
      addAddressValue.buildingNo === "" ||
      addAddressValue.aptNo === "" ||
      addAddressValue.floor === ""
    ) {
      setLoading(false);
      setError("Please fill all the required fields!");
      return;
    }
    try {
      const response = await fetch("/api/users/address/", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          address: addAddressValue,
        }),
      });
      if (response.ok) {
        const formattedAddress = `${addAddressValue.area}, Block ${addAddressValue.block}, Street ${
          addAddressValue.street
        }, Building ${addAddressValue.buildingNo}, ${
          addAddressValue.avenue
            ? "Avenue " + addAddressValue.avenue + ", "
            : ""
        }Apt ${addAddressValue.aptNo}, Floor ${addAddressValue.floor}`;

        setEditAddressValue(addAddressValue);
        setFirstAddress(addAddressValue);
        setAddress(formattedAddress);
      } else {
        setError("Failed to update Address!");
      }
    } catch (error) {
      setError("Failed to update Address!");
    }
    setLoading(false);
    closeAddAddressWindow();
  };

  const editAddress = async () => {
    setLoading(true);
    if (
      editAddressValue.area === "" ||
      editAddressValue.block === "" ||
      editAddressValue.street === "" ||
      editAddressValue.buildingNo === "" ||
      editAddressValue.aptNo === "" ||
      editAddressValue.floor === ""
    ) {
      setLoading(false);
      setError("Please fill all the required fields!");
      return;
    }
    try {
      const response = await fetch("/api/users/address/", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          address: editAddressValue,
        }),
      });
      if (response.ok) {

        const formattedAddress = `${editAddressValue.area}, Block ${editAddressValue.block}, Street ${
          editAddressValue.street
        }, Building ${editAddressValue.buildingNo}, ${
          editAddressValue.avenue ? "Avenue " + editAddressValue.avenue + ", " : ""
        }Apt ${editAddressValue.aptNo}, Floor ${editAddressValue.floor}`;

        setAddress(formattedAddress);
        setFirstAddress(editAddressValue);
      } else {
        setError("Failed to update Address!");
        console.log("Failed to update address:", response);
      }
    } catch (error) {
      setError("Failed to update address!");
    }
    setLoading(false);
    closeEditAddressWindow();
  };

  // forms functions
  const closeAddNumberWindow = () => {
    setIsAddNumberWindowOpen(false);
    setPhoneNumber("");
    setError("");
  };

  const closeEditNumberWindow = () => {
    setIsEditNumberWindowOpen(false);
    setEditNumberValue(number);
    setError("");
  };

  const closeAddAddressWindow = () => {
    setIsAddAddressWindowOpen(false);
    setAddAddressValue({
      area: "",
      block: "",
      street: "",
      buildingNo: "",
      avenue: "",
      aptNo: "",
      floor: "",
      additional: "",
    });
    setError("");
  };

  const closeEditAddressWindow = () => {
    setIsEditAddressWindowOpen(false);
    setEditAddressValue(firstAddress);
    setError("");
  };

  //useEffects

  useEffect(() => {
    setEditNumberValue(number);
  }, [number]);

  useEffect(() => {
    setEditAddressValue(addAddressValue);
  }, [addAddressValue]);

  useEffect(() => {
    setEditAddressValue(firstAddress);
  }, [address]);

  useEffect(() => {
    if (user) {
      if (user?.address) {
        const formattedAddress = `${user.address.area}, Block ${user.address.block}, Street ${
          user.address.street
        }, Building ${user.address.buildingNo}, ${
          user.address.avenue ? "Avenue " + user.address.avenue + ", " : ""
        }Apt ${user.address.aptNo}, Floor ${user.address.floor}`;
        setAddress(formattedAddress);
        setFirstAddress(user.address);
        setAddAddressValue(user.address);
      } else {
        setAddress("");
      }

      if (user?.phoneNumber) {
        setNumber(user.phoneNumber);
        setEditNumberValue(user.phoneNumber);
      } else {
        setNumber("");
        setEditNumberValue(user.phoneNumber);
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
            <div className="w-full h-full flex flex-col justify-between gap-2">
              <p className="text-sm sm:text-base font-bold">{number}</p>
              <button
                className="py-2 px-5 text-sm sm:text-base text-white rounded-div border-none bg-[#00000066] hover:bg-darkGray duration-300 cursor-pointer"
                onClick={() => setIsEditNumberWindowOpen(true)}
              >
                Edit Number
              </button>
            </div>
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
            <div className="w-full h-full flex flex-col justify-between gap-2">
              <p className="text-sm sm:text-base font-bold">{address}</p>
              <button
                className="py-2 px-5 text-sm sm:text-base text-white rounded-div border-none bg-[#00000066] hover:bg-darkGray duration-300 cursor-pointer"
                onClick={() => setIsEditAddressWindowOpen(true)}
              >
                Edit Address
              </button>
            </div>
          )}
        </div>
      </div>

      {/* add number window */}
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
                  type="number"
                  placeholder="Phone Number"
                  className="mb-3 px-3 w-60 h-8 bg-white rounded-div border-darkGray border-[1px]"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>
            {error && (
              <p className="text-sm sm:text-base text-danger">{error}</p>
            )}
            <div className="flex justify-between">
              <button
                className="btn-style bg-[#00000066] text-white"
                onClick={() => closeAddNumberWindow()}
              >
                Cancel
              </button>
              <button
                className="btn-style bg-primary text-white"
                onClick={() => addNumber()}
              >
                {loading ? <LoadingIcon /> : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* edit number window */}
      {isEditNumberWindowOpen && (
        <div className="w-full h-full fixed top-0 left-0 bg-[#00000066] z-10 flex justify-center items-center">
          <div className="p-5 bg-silver rounded-div flex flex-col gap-5 justify-between text-darkGray text-center">
            <h2 className="text-lg font-semibold">Edit Number</h2>
            <div className="flex flex-col">
              <div className="flex gap-2">
                <input
                  type="text"
                  disabled
                  placeholder="+965"
                  className="mb-3 px-3 w-20 h-8 bg-white rounded-div border-darkGray border-[1px]"
                />
                <input
                  type="number"
                  placeholder="Phone Number"
                  className="mb-3 px-3 w-60 h-8 bg-white rounded-div border-darkGray border-[1px]"
                  value={editNumberValue}
                  onChange={(e) => setEditNumberValue(e.target.value)}
                />
              </div>
            </div>
            {error && (
              <p className="text-sm sm:text-base text-danger">{error}</p>
            )}
            <div className="flex justify-between">
              <button
                className="btn-style bg-[#00000066] text-white"
                onClick={() => closeEditNumberWindow()}
              >
                Cancel
              </button>
              <button
                className="btn-style bg-primary text-white"
                onClick={() => editNumber()}
              >
                {loading ? <LoadingIcon /> : "Edit"}
              </button>
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
                  className="mb-3 px-3 w-40 h-8 bg-white rounded-div border-darkGray border-[1px]"
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
                  className="mb-3 px-3 w-40 h-8 bg-white rounded-div border-darkGray border-[1px]"
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
                  className="mb-3 px-3 w-40 h-8 bg-white rounded-div border-darkGray border-[1px]"
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
                  className="mb-3 px-3 w-40 h-8 bg-white rounded-div border-darkGray border-[1px]"
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
                  className="mb-3 px-3 w-40 h-8 bg-white rounded-div border-darkGray border-[1px]"
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
            <div className="flex justify-between">
              <button
                className="btn-style bg-[#00000066] text-white"
                onClick={() => closeAddAddressWindow()}
              >
                Cancel
              </button>
              <button
                className="btn-style bg-primary text-white"
                onClick={() => addAddress()}
              >
                {loading ? <LoadingIcon /> : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* edit address window */}
      {isEditAddressWindowOpen && (
        <div className="w-full h-full fixed top-0 left-0 bg-[#00000066] z-10 flex justify-center items-center">
          <div className="p-5 bg-silver rounded-div flex flex-col gap-5 justify-between text-darkGray text-center">
            <h2 className="text-lg font-semibold">Edit Address</h2>
            <div className="flex flex-col">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Area"
                  className="mb-3 px-3 w-40 h-8 bg-white rounded-div border-darkGray border-[1px]"
                  value={editAddressValue.area}
                  onChange={(e) =>
                    setEditAddressValue((prevAddress) => ({
                      ...prevAddress,
                      area: e.target.value,
                    }))
                  }
                />
                <input
                  type="text"
                  placeholder="Block"
                  className="mb-3 px-3 w-40 h-8 bg-white rounded-div border-darkGray border-[1px]"
                  value={editAddressValue.block}
                  onChange={(e) =>
                    setEditAddressValue((prevAddress) => ({
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
                value={editAddressValue.street}
                onChange={(e) =>
                  setEditAddressValue((prevAddress) => ({
                    ...prevAddress,
                    street: e.target.value,
                  }))
                }
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Building No"
                  className="mb-3 px-3 w-40 h-8 bg-white rounded-div border-darkGray border-[1px]"
                  value={editAddressValue.buildingNo}
                  onChange={(e) =>
                    setEditAddressValue((prevAddress) => ({
                      ...prevAddress,
                      buildingNo: e.target.value,
                    }))
                  }
                />
                <input
                  type="text"
                  placeholder="Avenue (optional)"
                  className="mb-3 px-3 w-40 h-8 bg-white rounded-div border-darkGray border-[1px]"
                  value={editAddressValue.avenue}
                  onChange={(e) =>
                    setEditAddressValue((prevAddress) => ({
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
                  className="mb-3 px-3 w-40 h-8 bg-white rounded-div border-darkGray border-[1px]"
                  value={editAddressValue.aptNo}
                  onChange={(e) =>
                    setEditAddressValue((prevAddress) => ({
                      ...prevAddress,
                      aptNo: e.target.value,
                    }))
                  }
                />
                <input
                  type="text"
                  placeholder="Floor"
                  className="mb-3 px-3 w-40 h-8 bg-white rounded-div border-darkGray border-[1px]"
                  value={editAddressValue.floor}
                  onChange={(e) =>
                    setEditAddressValue((prevAddress) => ({
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
                value={editAddressValue.additional}
                onChange={(e) =>
                  setEditAddressValue((prevAddress) => ({
                    ...prevAddress,
                    additional: e.target.value,
                  }))
                }
              ></textarea>
            </div>
            {error && (
              <p className="text-sm sm:text-base text-danger">{error}</p>
            )}
            <div className="flex justify-between">
              <button
                className="btn-style bg-[#00000066] text-white"
                onClick={() => closeEditAddressWindow()}
              >
                Cancel
              </button>
              <button className="btn-style bg-primary text-white" onClick={()=>editAddress()}>
                {loading ? <LoadingIcon /> : "Edit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
