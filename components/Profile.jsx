import React from 'react'
import PromptCard from './PromptCard'

const Profile = ({ name, description, data, handleEdit, handleDelete }) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        Welcome, {" "}
        <span className='blue_gradient'>{name}</span>
      </h1>
      <p className='desc text-left'>{description}</p>
      <div className='mt-10 prompt_layout'>
        {data.map(prompt => (
          <PromptCard
            key={prompt._id}
            prompt={prompt}
            handleTagClick={(tag) => alert(tag)}
            handleDelete={() => handleDelete(prompt)}
            handleEdit={() => handleEdit(prompt)}
            showEditButtons
          />
        ))}
      </div>
    </section>
  )
}

export default Profile