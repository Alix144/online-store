export default function AdminOrderListData() {
    return (
      <div className="px-8 mx-8 py-5 flex justify-between border-b border-lightGray">
        <div className="flex gap-20">
          <p className="w-24 max-w-24">Ali Youssef</p>
          <p className="w-24 max-w-24">10-06-2024</p>
          <p className="w-24 max-w-24">7 KWD</p>
          <p className="w-24 max-w-24">5</p>
        </div>
        <div className="flex gap-1 items-center">
          <div className="w-3 h-3 rounded-full border border-darkGray bg-secondary"></div>
          <p>Active</p>
        </div>
      </div>
    );
  }
  