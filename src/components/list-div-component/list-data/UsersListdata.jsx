export default function UsersListData({ user }) {
  const date = new Date(user.createdAt);
  const formattedDate = `${String(date.getDate()).padStart(2, "0")}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${date.getFullYear()}`;
  return (
    <div className="px-0 lg:px-8 mx-4 lg:mx-8 py-2 sm:py-5 flex justify-between border-b border-lightGray">
      <div className="flex gap-5 sm:gap-10 md:gap-20">
        <p className="text-sm sm:text-base">{user.name}</p>
        <p className=" text-sm sm:text-base">{user.email}</p>
        <p className="w-14 lg:w-24 text-sm sm:text-base">{formattedDate}</p>
      </div>
    </div>
  );
}
