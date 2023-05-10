"use client"
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useFetch } from '@hooks/useFetch'

import Profile from '@components/Profile'

const ProfileComponent = () => {
  const { data: session } = useSession();
  const savedUserId = JSON.parse(sessionStorage.getItem("userId"));
  const [posts] = useFetch(`/api/users/${session?.user.id ? session?.user.id : savedUserId}/posts`);

  const handleEdit = (post) => {
    alert("Edit", JSON.stringify(post));
  };

  const handleDelete = async (post) => {
    alert("Delete", JSON.stringify(post));
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