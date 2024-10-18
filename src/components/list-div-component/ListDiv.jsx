import Image from "next/image";
import ListData from "./list-data/ListData";

export default function ListDiv() {
  return (
    <div className="w-full">
      <div className="mb-3 px-3 w-64 h-8 bg-white rounded-div border-darkGray border-[1px] flex gap-1 items-center">
        <div className="w-5 h-5">
          <Image
            src="/images/search.png"
            alt="Search"
            width={100}
            height={100}
          />
        </div>
        <input
          type="text"
          placeholder="Search Order"
          className="h-full w-full focus:outline-none rounded-sm text-darkGray"
        />
      </div>
      <div className="p-3 w-full h-96 bg-white rounded-div">
        {/* header */}
        <div className="px-16 py-1 w-full bg-silver rounded-div flex justify-between">
          <div className="flex gap-20">
            <h5 className="w-24 max-w-24 font-semibold">Date</h5>
            <h5 className="w-24 max-w-24 font-semibold">Price</h5>
            <h5 className="w-24 max-w-24 font-semibold">Items</h5>
          </div>
          <h5 className="font-semibold">Status</h5>
        </div>

        {/* content */}
        <div className="w-full max-h-80 overflow-y-scroll scrollbar-hide">
          <ListData/>
        </div>
      </div>
    </div>
  );
}
