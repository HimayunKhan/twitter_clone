import { NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Post from "@/models/Post";
import User from "@/models/User";
import Like from "@/models/Like";

export async function GET(request, context) {
  try {
    await mongooseConnect();
    
    const session = await getServerSession(authOptions);
    const userID = session?.user?.id;
    const { searchParams } = new URL(request?.url);
    const { id } = Object.fromEntries(searchParams.entries());


    // if (id) {
    //   const post = await Post.findById(id)
    //     .populate('author')
    //     .populate({
    //       path: 'parent',
    //       populate: 'author',
    //     });
    //  return  NextResponse.json({post});
    // }else {
    //   const parent = req.query.parent || null;
    //   const author = req.query.author;
    //   let searchFilter;
    //   if (!author && !parent) {
    //     const myFollows = await Follower.find({source:session.user.id}).exec();
    //     const idsOfPeopleIFollow = myFollows.map(f => f.destination);
    //     searchFilter = {author:[...idsOfPeopleIFollow,session.user.id]};
    //   }
    //   if (author) {
    //     searchFilter = {author};
    //   }
    //   if (parent) {
    //     searchFilter = {parent};
    //   }
    //   const posts = await Post.find(searchFilter)
    //     .populate('author')
    //     .populate({
    //       path: 'parent',
    //       populate: 'author',
    //     })
    //     .sort({createdAt: -1})
    //     .limit(20)
    //     .exec();

    //   let postsLikedByMe = [];
    //   if (session) {
    //     postsLikedByMe = await Like.find({
    //       author:session.user.id,
    //       post:posts.map(p => p._id),
    //     });
    //   }
    //   let idsLikedByMe = postsLikedByMe.map(like => like.post);
    //   res.json({
    //     posts,
    //     idsLikedByMe,
    //   });
    // }

    if (id) {
      const post = await Post.findById(id).populate("author");

      return NextResponse.json({ post });
    } else {
      const posts = await Post.find()
        .populate("author")
        .sort({ createdAt: -1 })
        .limit(20)
        .exec();

      let postsLikedByMe = [];
      if (session) {
        postsLikedByMe = await Like.find({
          author: userID,
          post: posts.map((p) => p._id),
        });
      }

      let idsLikedByMe = postsLikedByMe.map((like) => like.post);

      return NextResponse.json({ posts, idsLikedByMe });
    }
  } catch (error) {
    console.log("errrr", error);
    return NextResponse.error(error);
  }
}

export async function POST(request, context) {
  try {
    await mongooseConnect();
    const { text, parent, images } = await request.json();
    const session = await getServerSession(authOptions);
    const userID = session?.user?.id;

    const post = await Post.create({
      author: userID,
      text,
      parent,
      images,
    });

    // if (parent) {
    //   const parentPost = await Post.findById(parent);
    //   parentPost.commentsCount = await Post.countDocuments({ parent });
    //   await parentPost.save();
    // }
    return NextResponse.json(post);
  } catch (error) {
    console.log("errrr", error);
    return NextResponse.error(error);
  }
}
