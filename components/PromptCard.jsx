"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

const PromptCard = ({ prompt, handleTagClick, handleEdit, handleDelete, showEditButtons = false }) => {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();

  const handleCopy = () => {
    setCopied(prompt.prompt);
    navigator.clipboard.writeText(prompt.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  const evaluator = showEditButtons && session?.user.id === prompt.creator._id;

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
          <Image
            src={prompt.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className='rounded-full object-contain'
          />
        </div>
        <div className="flex flex-col">
          <h3 className='font-satoshi font-semibold text-gray-900 capitalize'>{prompt.creator.username.replaceAll("_", " ")}</h3>
          <p className='font-inter text-sm text-gray-500'>{prompt.creator.email}</p>
        </div>
        <div className="coppy_btn" onClick={handleCopy}>
          <Image
            src={copied === prompt.prompt ? "/assets/icons/tick.svg" : "assets/icons/copy.svg"}
            width={12}
            height={12}
            alt="action icon"
            className={copied === prompt.prompt ? 'cursor-none' : 'cursor-pointer'}
          />
        </div>
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700'>{prompt.prompt}</p>
      <p className='font-inter text-sm blue_gradient cursor-pointer' onClick={() => handleTagClick(prompt.tag)}>
        {prompt.tag}
      </p>
      {
        evaluator && (
          <div className='flex flex-end gap-3'>
            <p
              className='font-inter text-sm green_gradient cursor-pointer'
              onClick={handleEdit ? handleEdit : () => { }}
            >
              Edit
            </p>
            <p className='font-inter text-sm orange_gradient cursor-pointer'
              onClick={handleDelete ? handleDelete : () => { }}>Delete</p>
          </div>
        )
      }
    </div >
  )
}

export default PromptCard