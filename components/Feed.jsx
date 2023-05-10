"use client"
import React, { useState, useEffect } from 'react'
import PromptCard from './PromptCard'
import { useFetch } from '@hooks/useFetch'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map(prompt => (<PromptCard key={prompt._id} prompt={prompt} handleTagClick={handleTagClick} />))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [promptsCollection] = useFetch("/api/prompt");

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className='search_input peer'
        />
      </form>
      <PromptCardList
        data={promptsCollection}
        handleTagClick={(tag) => alert(tag)}
      />
    </section>
  )
}

export default Feed