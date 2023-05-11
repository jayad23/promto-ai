"use client";
import { useSearchParams } from "next/navigation";
import { useFetch } from "@hooks/useFetch";
import { useProfileActions } from "@hooks/useProfile";
import { useSession } from "next-auth/react";
import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  const [userPosts, setUserPosts] = useFetch(params?.id && `/api/users/${params?.id}/posts`)
  const { handleEdit, handleDelete } = useProfileActions(userPosts, setUserPosts);
  const { data: session } = useSession();

  return (
    <Profile
      name={userName.replaceAll("_", " ")}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
      showEditButtons={params.id === session.user.id}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default UserProfile;