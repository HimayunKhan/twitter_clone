// import { NextResponse } from "next/server";
// import { mongooseConnect } from "@/lib/mongoose";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";
// import User from "@/models/User";
// import Follower from "@/models/Follower";

// export async function GET(request, context) {
//   try {
//     await mongooseConnect();

//     const { searchParams } = new URL(request?.url);
//     const username = searchParams.get("username");

//     if (username) {
//       const session = await getServerSession(authOptions);
//       const userID = session?.user?.id;

//       const user = await User.findOne({ username });

//       const follow = await Follower.findOne({
//         source: userID,
//         destination: user._id,
//       });

//       return NextResponse.json({ user, follow });
//     }
//   } catch (error) {
//     // return NextResponse.error(error);
//   }
// }


import { NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import User from "@/models/User";
import Follower from "@/models/Follower";

export async function GET(request, context) {
  try {
    await mongooseConnect();

    const { searchParams } = new URL(request?.url);
    const username = searchParams.get("username");

    if (username) {
      // Check if the request is during prerendering
      const isPrerendering = context?.req?.headers?.has("x-vercel-id");

      if (isPrerendering) {
        // Return a placeholder or an error response during prerendering
        return NextResponse.json({ error: "Prerendering in progress" });
      }

      const session = await getServerSession(authOptions);
      const userID = session?.user?.id;

      const user = await User.findOne({ username });

      const follow = await Follower.findOne({
        source: userID,
        destination: user?._id,
      });

      return NextResponse.json({ user, follow });
    }
  } catch (error) {
    // return NextResponse.error(error);
  }
}
