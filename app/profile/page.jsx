"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import { useFetch } from '@hooks/useFetch'
import { useProfileActions } from '@hooks/useProfile'

import Profile from '@components/Profile'

const ProfileComponent = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useFetch(session?.user.id && `/api/users/${session?.user.id}/posts`);
  const { handleEdit, handleDelete } = useProfileActions(posts, setPosts);

  return (
    <Profile
      name={session?.user.name.replaceAll("_", " ")}
      description="Here's a brief collection of the most recent prompts you have submitted."
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      showEditButtons
    />
  )
}

export default ProfileComponent;