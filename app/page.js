"use client";
import UsernameForm from "@/components/UsernameForm";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();

  const [userInfo, setUserInfo] = useState("");

  console.log("huhu", userInfo);

  const getUserInfo = async () => {
    if (status === "loading") {
      return;
    }
    const { data } = await axios.get(`/api/users?id=${session?.user?.id}`);
    return setUserInfo(data?.user);
  };

  useEffect(() => {
    getUserInfo();
  }, [status]);

  if (userInfo && !userInfo?.username) {
    return <UsernameForm />;
  }
  return (
    <main>
      <div>test1</div>
    </main>
  );
}
