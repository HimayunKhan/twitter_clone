import { NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Post from "@/models/Post";
import User from "@/models/User";
import Like from "@/models/Like";
import Follower from "@/models/Follower";

export async function POST(request, context) {
  try {
    await mongooseConnect();
    const { destination } = await request.json();

    const session = await getServerSession(authOptions);
    const userID = session?.user?.id;

    const existingFollow = await Follower.findOne({
		destination,
      source: userID,
    });

    if (existingFollow) {
      await existingFollow.deleteOne();
      return NextResponse.json(null);
    } else {
     const f= await Follower.create({ destination, source: userID });
	 return NextResponse.json(f);

    }
  } catch (error) {
    console.log("errrr", error);
    return NextResponse.error(error);
  }
}
