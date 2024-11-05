import User from "@/lib/models/User";
import connectToDb from "@/lib/dbConnection";
import { NextResponse } from "next/server";

export const PATCH = async (request) => {
    try {
      const body = await request.json();
      const { userId, address } = body;
  
      await connectToDb();
      
      const updatedUser = await User.findOneAndUpdate(
        { userId },
        { $set: { address } },
        { new: true }
      );
  
      if (!updatedUser)
        return new NextResponse(
          JSON.stringify({ message: "User not found" }),
          { status: 400 }
        );
  
      return new NextResponse(
        JSON.stringify({
          message: "Address is updated",
          user: updatedUser,
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