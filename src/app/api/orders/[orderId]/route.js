import Order from "@/lib/models/Order";
import connectToDb from "@/lib/dbConnection";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    const { pathname } = new URL(request.url);
    const orderId = pathname.split("/").pop(); 
  try {
    await connectToDb();
    const order = await Order.findById(orderId).populate("userId");
    return new NextResponse(JSON.stringify(order), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Could not find order " + error.message }),
      { status: 500 }
    );
  }
};
