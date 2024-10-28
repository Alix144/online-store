export default function AdminOrderListData() {
    return (
      <div className="px-0 lg:px-8 mx-4 lg:mx-8 py-2 sm:py-5 flex justify-between border-b border-lightGray">
        <div className="flex gap-5 sm:gap-10 md:gap-20">
          <p className="w-16 lg:w-24 text-sm sm:text-base">Ali Youssef</p>
          <p className="w-10 sm:w-14 lg:w-24 text-sm sm:text-base">10-06-2024</p>
          <p className="w-10 sm:w-14 lg:w-24 text-sm sm:text-base">7 KWD</p>
          <p className="w-10 sm:w-14 lg:w-24 text-sm sm:text-base">5</p>
        </div>
        <div className="flex gap-1 items-center">
          <div className="w-3 h-3 rounded-full border border-darkGray bg-secondary"></div>
          <p className="w-10 sm:w-14 lg:w-24 text-sm sm:text-base">Active</p>
        </div>
      </div>
    );
  }
  