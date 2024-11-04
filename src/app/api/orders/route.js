import Order from "@/lib/models/Order";
import connectToDb from "@/lib/dbConnection";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDb();
    const orders = await Order.find();
    return new NextResponse(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Could not find orders " + error.message }),
      { status: 500 }
    );
  }
};

export const POST = async (request) => {
  try {
    const body = await request.json();
    const { userId, products, price } = body;

    await connectToDb();
    const newOrder = new Order({userId, products, price});
    await newOrder.save();
    return new NextResponse(
      JSON.stringify({ message: "Order created", order: newOrder }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error creating order " + error.message }),
      { status: 500 }
    );
  }
};

export const PATCH = async (request) => {
  try {
    const body = await request.json();
    const { orderId, newStatus } = body;

    await connectToDb();

    const updatedOrder = await Order.findOneAndUpdate(
      { _id: orderId },
      {  status: newStatus },
      { new: true }
    );

    if (!updatedOrder)
      return new NextResponse(
        JSON.stringify({ message: "Order not found" }),
        { status: 400 }
      );

    return new NextResponse(
      JSON.stringify({
        message: "Order is updated",
        product: updatedOrder,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "error in catch block : " + error.message }),
      { status: 500 }
    );
  }
};