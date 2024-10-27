import ListDiv from "@/components/list-div-component/ListDiv";

export default function OrdersPage() {
  return (
    <main className="flex flex-col gap-5 sm:gap-10">
      <section className="py-10 sm:py-14 lg:py-16 xl:py-20">
      <h1 className="mb-5 sm:mb-10 m-auto text-center font-bold text-xl sm:text-2xl lg:text-3xl">
        Orders
      </h1>
        <div className="mx-auto w-[80%]">

        <ListDiv type={"customerOrderList"}/>
        </div>
      </section>
    </main>
  );
}
