import ListDiv from "@/components/list-div-component/ListDiv";

export default function ProductsPage() {
    return (
      <main className="p-10 flex flex-col gap-5 sm:gap-10">
        <section className="w-full">
          <h2 className="mb-3 sm:mb-5 text-lg sm:text-2xl text-darkGray font-semibold">
            Products
          </h2>
          <ListDiv />
        </section>
      </main>
    );
  }
  