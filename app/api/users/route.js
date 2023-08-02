import { NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import User from "@/models/User";

export async function GET(request, context) {
  try {
    await mongooseConnect();

    const { searchParams } = new URL(request?.url);
    const username=searchParams.get("username")
   
    const session = await getServerSession(authOptions);
    const userID = session?.user?.id;

    const user = userID
      ? await User.findById(userID)
      : await User.findOne({username});

      
      

    return NextResponse.json({ user });
  } catch (error) {
    console.log("errrr", error);
    return NextResponse.error(error);
  }
}



export async function PUT(request, context) {
  try {
    await mongooseConnect();
   
    const { username } = await request.json();
    const session = await getServerSession(authOptions);
    const userID = session?.user?.id;


    await User.findByIdAndUpdate(userID, { username });
    return new Response("okk");
    // return NextResponse.json({ user });
  } catch (error) {
    console.log("errrr", error);
    return NextResponse.error(error);
  }
}
