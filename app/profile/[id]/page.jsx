"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useFetch } from "@hooks/useFetch";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts] = useFetch(params?.id && `/api/users/${params?.id}/posts`)

  return (
    <Profile
      name={userName.replaceAll("_", " ")}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
};

export default UserProfile;