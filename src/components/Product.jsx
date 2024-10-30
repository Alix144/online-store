"use client"
import Image from "next/image";
import { useState } from "react";

export default function Product({ product, isFavorite, inCart }) {
  const [amount, setAmount] = useState(1)

  const reduceAmount = () => {
    if(amount > 1){
      setAmount(amount-1)
    }else if(amount === 1 || amount === 0.75 || amount === 0.5){
      setAmount(amount - 0.25)
    }
  }

  return (
    <div className="p-3 w-52 sm:w-60 min-w-52 sm:min-w-60 h-52 sm:h-60 rounded-div bg-white border-lightGray border-[1px] flex flex-col gap-3 cursor-pointer">
      <div className="w-full h-[65%] rounded-div bg-lightGray relative">
        <Image
          src="/images/apples.jpg"
          alt="apples"
          layout="fill"
          objectFit="cover"
          className="rounded-div"
        />
      </div>

      <div className="px-3 h-[35%] w-full flex justify-between">
        <div className="flex flex-col justify-between">
          <h3 className="text-lg font-semibold">{product?.name}</h3>
          <p className="text-sm sm:text-base">
            {product?.price} KWD / {product?.measurement}
          </p>
        </div>

        {inCart ? (
          <div className="flex flex-col justify-between items-end">
            <Image
              src="/images/trash-can.png"
              alt="Trash Can"
              width={15}
              height={15}
            />
            <div className="flex gap-1 items-center">
              <div className="w-4 h-4" onClick={()=>reduceAmount()}>
                <Image
                  src="/images/minus.png"
                  alt="Minus"
                  width={100}
                  height={100}
                />
              </div>
              <input
                type="number"
                className="px-1 w-10 h-5 border border-darkGray rounded-[5px]"
                value={amount}
                onChange={(e)=>setAmount(e.target.value)}
              />
              <p className="text-sm sm:text-base">kg</p>
              <div className="w-4 h-4" onClick={()=>setAmount(amount + 1)}>
                <Image
                  src="/images/plus.png"
                  alt="Plus"
                  width={100}
                  height={100}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-between">
            <Image
              src={`/images/${
                isFavorite ? "filled-heart.png" : "empty-heart.png"
              }`}
              alt={`${isFavorite ? "Filled" : "Empty"} heart`}
              width="20"
              height="20"
              className="cursor-pointer"
            />
            <Image
              src="/images/cart.png"
              alt="Cart"
              width="20"
              height="20"
              className="cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
}
