"use client"
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Form from '@components/Form'

const EditPrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const url = `/api/prompt/${promptId}`;

  useEffect(() => {
    if (promptId) {
      const getPostById = async () => {
        const request = await fetch(url);
        const results = await request.json();
        setPost({ prompt: results.prompt, tag: results.tag });
      }
      getPostById();
    }
  }, [promptId])

  const handleSubmitting = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(url, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        })
      })

      if (response.ok) {
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPost({ prompt: "", tag: "" });
      setSubmitting(false);
    }
  }

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={handleSubmitting}
      btnText="Save"
    />
  )
}

export default EditPrompt;