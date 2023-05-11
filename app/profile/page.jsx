"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useFetch } from '@hooks/useFetch'

import Profile from '@components/Profile'

const ProfileComponent = () => {
  const { data: session } = useSession();
  const savedUserId = JSON.parse(sessionStorage.getItem("userId"));
  const [posts, setPosts] = useFetch(`/api/users/${session?.user.id ? session?.user.id : savedUserId}/posts`);
  const router = useRouter();

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=/${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Oh no! What didn't you like about this prompt? ...Are you sure?");
    if (hasConfirmed) {
      const id = post._id.toString();
      try {
        await fetch(`/api/prompt/${id}`, {
          method: "DELETE",
        })
        const filteredPosts = posts.filter(p => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Pheww... Now people will continue to benefit from it.")
    }
  };

  return (
    <Profile
      name="Kike Vanegas"
      description="This is a description"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default ProfileComponent;