import Image from "next/image";

export default function Product({ product, isFavorite }) {
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
          <p className="text-sm sm:text-base">{product?.price} KWD / {product?.measurement}</p>
        </div>

        <div className="flex flex-col justify-between">
          <Image
            src={`/images/${isFavorite ? 'filled-heart.png' : 'empty-heart.png'}`}
            alt={`${isFavorite ? 'Filled' : 'Empty'} heart`}
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
