"use client"
import React, { useState, useEffect, Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  useEffect(() => {
    const setproviders = async () => {
      const response = await getProviders()
      setProviders(response);
    };
    setproviders();
  }, [])

  useEffect(() => {
    if (session) {
      sessionStorage.setItem("userId", JSON.stringify(session?.user.id));
    };
  }, [session])

  return (
    <nav className='flex-between w-full mb-12 pt-3'>
      <Link href="/" className='flex gap-2 flex-center'>
        <Image
          src="/assets/images/logo.svg"
          alt='Homepage logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Prompto-AI</p>
      </Link>
      <div className='sm:flex hidden'>
        {
          session?.user ? (
            <div className='flex gap-3 md:gap-5'>
              <Link href="/create-prompt" className='black_btn'>Create post</Link>
              <button type="button"
                onClick={() => {
                  sessionStorage.clear()
                  signOut()
                }} className='outline_btn'>Sign out</button>
              <Link href="/profile">
                <Image
                  src={session?.user?.image}
                  width={37}
                  height={37}
                  alt="profile"
                  className='rounded-full'
                />
              </Link>
            </div>
          ) : (
            <Fragment>
              {
                providers && Object.values(providers).map(provider => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className='black_btn'
                  >
                    Sign In
                  </button>
                ))
              }
            </Fragment>
          )
        }
      </div>
      <div className='sm:hidden flex relative'>
        {
          session?.user ? (
            <div className='flex'>
              <Image
                src={session?.user?.image}
                width={37}
                height={37}
                alt="profile"
                className='rounded-full'
                onClick={() => setToggleDropDown(prevState => !prevState)}
              />
              {
                toggleDropDown && (
                  <div className='dropdown'>
                    <Link href="/profile" className='dropdown_link' onClick={() => setToggleDropDown(false)}>
                      My Profile
                    </Link>
                    <Link href="/create-prompt" className='dropdown_link' onClick={() => setToggleDropDown(false)}>
                      Create Prompt
                    </Link>
                    <button onClick={() => {
                      sessionStorage.clear();
                      setToggleDropDown(false)
                      signOut();
                    }} className='mt-5 w-full black_btn'>Sign Out</button>
                  </div>
                )
              }
            </div>
          ) : (
            <Fragment>
              {
                providers && Object.values(providers).map(provider => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className='black_btn'
                  >
                    Sign In
                  </button>
                ))
              }
            </Fragment>
          )
        }
      </div>
    </nav>
  )
}

export default Nav