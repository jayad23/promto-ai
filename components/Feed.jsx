"use client"
import React, { useState } from 'react'
import PromptCard from './PromptCard'
import { useFetch } from '@hooks/useFetch'
import Loader from './Loader'
import { useSession } from 'next-auth/react'

const PromptCardList = ({ data, handleTagClick }) => {
  const { data: session } = useSession();
  const className = session?.user ? 'mt-16 prompt_layout' : 'mt-16 prompt_layout hidden';
  if (data.length === 0) {
    return <Loader dimension={50} className='mt-16 prompt_layout' />;
  }
  return (
    <div className={className}>
      {data.map(prompt => (<PromptCard key={prompt._id} prompt={prompt} handleTagClick={handleTagClick} />))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const [promptsCollection] = useFetch("/api/prompt");

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i");
    return promptsCollection.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          className='search_input peer'
        />
      </form>
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList
          data={promptsCollection}
          handleTagClick={handleTagClick}
        />
      )}
    </section>
  )
}

export default Feed