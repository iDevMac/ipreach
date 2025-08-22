'use client'

import { BookAlertIcon, HomeIcon } from 'lucide-react'
import Link from 'next/link'
import { redirect, usePathname } from 'next/navigation';
import React from 'react'
import { VscSignIn } from "react-icons/vsc";
import { Button } from './ui/button';
import { signOut } from '@/lib/actions/auth.action';



const navLinks = [
    {
        title: "Sermons",
        link: "/sermons",
        icon: <BookAlertIcon className={`size-5`}/>
    },
    {
        title: "Home",
        link: "/",
        icon: <HomeIcon/>
    },
    // {
    //     title: "Sign-In",
    //     link: "/sign-in",
    //     icon: <VscSignIn className={`size-5`}/>
    // },
    // {
    //     title: "Sign Out",
    //     link: "#",
    //     icon: <VscSignIn className={`size-5`}/>
    // },
]

function Navbar() {

    const pathname = usePathname()

    async function handleSignOut(){
        await signOut()
        redirect("/sign-in")
    }

  return (
    <div className='fixed bottom-0 h-[70px] w-full'>
      <div className='flex justify-center items-center h-[70px] border-t-3 rounded-xl'>
        <div className='flex justify-center items-center space-x-9'>
            {
                navLinks.map((item, i) => (
                    <Link
                     key={i} 
                     href={item.link} 
                     className={`flex flex-col 
                        justify-center items-center 
                        hover:text-purple-700
                        ${pathname == item.link && "text-purple-700 font-bold"}
                    `}
                    >
                        {item.icon}
                        <p className=''>{item.title}</p>
                    </Link>
                ))
            }
            <Button
             onClick={handleSignOut}
             className='flex flex-col justify-center items-center hover:text-purple-700 text-red-500 font-bold bg-transparent'>
                <VscSignIn className={`size-5`}/>
                <p>Sign Out</p>
            </Button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
