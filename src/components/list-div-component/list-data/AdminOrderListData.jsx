export default function AdminOrderListData({ order, setIsOrderDetailsWindowOpen }) {
  const date = new Date(order.createdAt);
  const formattedDate = `${String(date.getDate()).padStart(2, "0")}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${date.getFullYear()}`;

  const openDetailsWindow = () => {
    setIsOrderDetailsWindowOpen(order)
  }

    return (
      <div className="px-0 lg:px-8 mx-4 lg:mx-8 py-2 sm:py-5 flex justify-between border-b border-lightGray cursor-pointer hover:bg-silver duration-300" onClick={()=>openDetailsWindow()}>
        <div className="flex gap-5 sm:gap-10 md:gap-20">
          <p className="w-16 lg:w-24 text-sm sm:text-base">{order.customerName}</p>
          <p className="w-10 sm:w-14 lg:w-24 text-sm sm:text-base">{formattedDate}</p>
          <p className="w-10 sm:w-14 lg:w-24 text-sm sm:text-base">{order.price} KWD</p>
          <p className="w-10 sm:w-14 lg:w-24 text-sm sm:text-base">{order.products.length}</p>
        </div>
        <div className="flex gap-1 items-center">
          <div className={`w-3 h-3 rounded-full border border-darkGray ${order.status === "active" ? "bg-secondary": order.status === "delivered"? "bg-success": "bg-danger"}`}></div>
          <p className="w-10 sm:w-14 lg:w-24 text-sm sm:text-base">{order.status}</p>
        </div>
      </div>
    );
  }
  