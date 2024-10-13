import Image from "next/image";

export default async function AdminSidebar() {
  return (
    <div className="py-5 px-5 bg-primary w-full sm:w-72 md:w-80 h-screen absolute top-0 left-0 sm:static hidden sm:flex flex-col items-center z-10">
      <div className="mb-10 w-12 h-12 lg:w-16 lg:h-16 cursor-pointer">
        <Image
          src="/images/logo.png"
          alt="Fruity logo"
          width={100}
          height={100}
          priority
        />
      </div>

      <div className="sm:w-full text-white">
        <div className="mb-2 w-full py-2 px-5 flex items-center gap-5 rounded-[10px] hover:bg-[#ffffff40] cursor-pointer duration-300">
          <div className="w-5 h-5">
            <Image
              src="/images/dashboard.png"
              alt="Home"
              width={20}
              height={15}
            />
          </div>
          <p>Dashboard</p>
        </div>
        <div className="mb-2 w-full py-2 px-5 flex items-center gap-5 rounded-[10px] hover:bg-[#ffffff40] cursor-pointer duration-300">
          <div className="w-5 h-5">
            <Image
              src="/images/orders.png"
              alt="Orders"
              width={20}
              height={18}
            />
          </div>
          <p>Orders</p>
        </div>
        <div className="mb-2 w-full py-2 px-5 flex items-center gap-5 rounded-[10px] hover:bg-[#ffffff40] cursor-pointer duration-300">
          <div className="w-5 h-5">
            <Image
              src="/images/products.png"
              alt="products"
              width={20}
              height={20}
            />
          </div>
          <p>Products</p>
        </div>
        <div className="mb-2 w-full py-2 px-5 flex items-center gap-5 rounded-[10px] hover:bg-[#ffffff40] cursor-pointer duration-300">
          <div className="w-5 h-5">
            <Image src="/images/users.png" alt="Users" width={20} height={10} />
          </div>
          <p>Users</p>
        </div>
      </div>
    </div>
  );
}
