import User from "@/lib/models/User";
import connectToDb from "@/lib/dbConnection";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    const { pathname } = new URL(request.url);
    const userId = pathname.split("/").pop(); 

    await connectToDb();
    const user = await User.findOne({ userId });
    
    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Could not find user " + error.message }),
      { status: 500 }
    );
  }
};
