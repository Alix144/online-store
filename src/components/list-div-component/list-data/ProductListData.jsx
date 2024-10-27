"use state"
import Image from "next/image";
import { useEffect } from "react";

export default function ProductListData({setIsEditProductWindowOpen, setIsDeleteWindowOpen}) {

  const handleDeleteClick = () => {
    setIsDeleteWindowOpen(true)
  }

  const handleEditClick = () => {
    setIsEditProductWindowOpen(true)
  }

  return (
    <div className="px-8 mx-8 py-5 flex justify-between border-b border-lightGray">
      <div className="flex gap-20">
        <div className="w-24">
            <div className="w-5 h-5 bg-slate-950">

            </div>
        </div>
        <p className="w-24 max-w-24">Apple</p>
        <p className="w-24 max-w-24">7 KWD</p>
        <p className="w-24 max-w-24">KG</p>
      </div>
      <div className="flex gap-5 items-center">
        <button className="btn-style bg-lightGray" onClick={()=>handleEditClick()}>Edit</button>
        <div className="w-5 h-5 cursor-pointer" onClick={()=>handleDeleteClick()}>
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
