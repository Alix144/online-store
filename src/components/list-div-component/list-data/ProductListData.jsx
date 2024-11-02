import Image from "next/image";
import { useEffect } from "react";

export default function ProductListData({product, setIsEditProductWindowOpen, setIsDeleteWindowOpen}) {

  const handleDeleteClick = () => {
    setIsDeleteWindowOpen(true)
  }

  const handleEditClick = () => {
    setIsEditProductWindowOpen(true)
  }

  return (
    <div className="px-0 lg:px-8 mx-4 lg:mx-8 py-2 sm:py-5 flex justify-between border-b border-lightGray">
      <div className="flex gap-5 sm:gap-10 md:gap-20">
        <div className="w-10 sm:w-14 lg:w-24">
            <div className="w-5 h-5 bg-slate-950">

            </div>
        </div>
        <p className="w-10 sm:w-14 lg:w-24 text-sm sm:text-base">{product.name}</p>
        <p className="w-10 sm:w-14 lg:w-24 text-sm sm:text-base">{product.price} KWD</p>
        <p className="w-10 sm:w-14 lg:w-24 text-sm sm:text-base">{product.measurement}</p>
      </div>
      <div className="flex gap-5 items-center">
        <button className="btn-style bg-lightGray" onClick={()=>handleEditClick()}>Edit</button>
        <div className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 cursor-pointer" onClick={()=>handleDeleteClick()}>
          <Image
            src="/images/trash-can.png"
            alt="Trash Can"
            width={100}
            height={100}
          />
        </div>
      </div>
    </div>
  );
}
