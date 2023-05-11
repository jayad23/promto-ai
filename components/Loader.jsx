import Image from 'next/image'
import React from 'react'

const Loader = ({ dimension, ...props }) => (
  <div className='w-full flex-center items-center'>
    <Image width={dimension} height={dimension} src="/assets/icons/loader.svg" alt="loader" {...props} />
  </div>
)

export default Loader