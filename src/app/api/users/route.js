import User from "@/lib/models/User";
import connectToDb from "@/lib/dbConnection";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDb();
    const users = await User.find();
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Could not find users " + error.message }),
      { status: 500 }
    );
  }
};