import User from "@/lib/models/User";
import connectToDb from "@/lib/dbConnection";
import { NextResponse } from "next/server";

export const PATCH = async (request) => {
    try {
      const body = await request.json();
      const { userId, productId } = body;
  
      await connectToDb();
  
      const updatedCart = await User.findOneAndUpdate(
        { userId },
        { $addToSet: { cart: productId } },
        { new: true }
      );
  
      if (!updatedCart)
        return new NextResponse(
          JSON.stringify({ message: "Product not found" }),
          { status: 400 }
        );
  
      return new NextResponse(
        JSON.stringify({
          message: "Products is added to cart",
          user: updatedCart,
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