import SignoutBtn from "./header-components/SignoutBtn";
import ProfileIcon from "./header-components/ProfileIcon";
import AdminHamburderBtn from "./header-components/AdminHamburgerBtn";

export default function AdminHeader() {
  return (
    <div className="py-2 px-3 sm:px-5 md:px-10 w-full bg-white z-10 flex justify-between sm:justify-end">
      <div className="flex sm:hidden items-center gap-3">
        <AdminHamburderBtn/>
      </div>
      <div className="flex gap-1 sm:gap-2">
        <div className="py-1 px-1 rounded-[30px] duration-300 bg-lightGray flex ">
          <ProfileIcon/>
        </div>
        <div className="py-1 px-1 bg-lightGray rounded-div flex items-center justify-center cursor-pointer">
          <SignoutBtn />
        </div>
      </div>
    </div>
  );
}
