import ListDiv from "@/components/list-div-component/ListDiv";

export default function UsersPage() {
    return (
      <main className="p-5 sm:p-10 flex flex-col gap-5 sm:gap-10">
        <section className="w-full">
          <h2 className="mb-3 sm:mb-5 text-lg sm:text-2xl text-darkGray font-semibold">
            Users
          </h2>
          <ListDiv type="usersList"/>
        </section>
      </main>
    );
  }
  