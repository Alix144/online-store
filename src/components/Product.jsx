import Image from "next/image";

export default function Product() {
  return (
    <div className="p-3 min-w-52 h-52 sm:min-w-60 sm:h-60 rounded-div bg-white border-lightGray border-[1px] flex flex-col gap-3 cursor-pointer">
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
          <h3 className="text-lg font-semibold">Apples</h3>
          <p>0.500 KWD / KG</p>
        </div>

        <div className="flex flex-col justify-between">
          <Image
            src="/images/empty-heart.png"
            alt="Empty heart"
            width="20"
            height="20"
            className="cursor-pointer"
          />
          <Image src="/images/cart.png" alt="Cart" width="20" height="20" className="cursor-pointer"/>
        </div>
      </div>
    </div>
  );
}
