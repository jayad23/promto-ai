
import React from 'react'
import Link from 'next/link'

const Form = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit, btnText }) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text_left'><span className='blue_gradient'>{type}</span> Post</h1>
      <p className='desc text-left max-w-md'>
        {type} and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform.
      </p>
      <form
        className='mt-3 w-full max-w-2xl flex flex-col gap-2 glassmorphism'
        onSubmit={handleSubmit}
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>You AI Prompt</span>
          <textarea
            className='form_textarea'
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder='Write your prompt here...'
            required
          />
        </label>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Tag
            <span className='font-normal'>(#product, #webdev #youridea)</span>
          </span>
          <input
            className='form_input'
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder='#yourcustomtag'
            required
          />
        </label>
        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href="/" className='text-gray-500 text-sm hover:font-bold transition-all'>Cancel</Link>
          <button type="submit" disabled={submitting} className='px-5 py-1.5 text-sm bg-btn-submit rounded text-white hover:bg-btn-submit-hovered transition-all'>
            {submitting ? "Submitting..." : btnText}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form