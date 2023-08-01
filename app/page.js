"use client";
import PostContent from "@/components/PostContent";
import PostForm from "@/components/PostForm";
import UsernameForm from "@/components/UsernameForm";
import useUserInfo from "@/hooks/useUserInfo";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const {userInfo,setUserInfo,status:userInfoStatus} = useUserInfo();
  const [posts, setPosts] = useState([]);
  const [idsLikedByMe,setIdsLikedByMe] = useState([]);

  console.log("main page post",posts)
  console.log("main page idsLikedByMe",idsLikedByMe)

 

  function fetchHomePosts() {
    axios.get("/api/posts").then((response) => {
      setPosts(response.data.posts);
      setIdsLikedByMe(response.data.idsLikedByMe);
    });
  }

  

  useEffect(() => {
    fetchHomePosts();
  }, []);

  if (userInfo && !userInfo?.username) {
    return <UsernameForm />;
  }
  return (
    <>
      <h1 className="text-lg font-bold p-4">Home</h1>
      <PostForm onPost={() => {fetchHomePosts();}} />
      {posts?.length > 0 && posts?.map(post => (
          <div className="border-t border-twitterBorder p-5" key={post?._id}>
            {post && (
              <div>
                <PostContent {...post} likedByMe={idsLikedByMe.includes(post?._id)}/>
                {/* <div className="relative h-8">
                  <div className="border-l-2 border-twitterBorder h-10 absolute ml-6 -top-4"></div>
                </div> */}
              </div>
            )}
            {/* <PostContent {...post} likedByMe={idsLikedByMe.includes(post._id)} /> */}
          </div>
        ))}    </>
  );
}
