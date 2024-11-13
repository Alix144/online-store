import UserInfo from "@/components/profile-components/UserInfo";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextAuth";

export const metadata = {
  title: "Fruity Store | Profile Page",
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
console.log(session.user.id)

  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${session.user.id}`);
      const data = await response.json();
      console.log(data);
      return data
    } catch (error) {
      console.log(error);
      return error
    }
  };

  const user = await getUser()

  return (
    <main className="p-5 sm:p-10 flex flex-col gap-5 sm:gap-10">
      <section className="h-screen w-full">
        <h2 className="mb-3 sm:mb-5 text-lg sm:text-2xl text-darkGray font-semibold">
          Profile
        </h2>
        <div className="mx-auto w-full md:w-[50%] p-3 sm:p-5 bg-primary rounded-div flex flex-col gap-1 sm:gap-3 items-center">
          <div className="w-20 sm:w-28 h-20 sm:h-28">
            <Image
              src="/images/user2.png"
              alt="Profile"
              width={300}
              height={300}
              className="mb-5"
            />
          </div>
          {/* <UserInfo /> */}
          
            {user.email ?
            <>
            <h1 className="text-base sm:text-xl font-semibold text-white">
              {user.name}
            </h1>
            <p className="text-sm sm:text-base text-white ">{user.email}</p>
            </>
            :
            <p>Error fetching data!</p>
            }
        </div>
      </section>
    </main>
  );
}
