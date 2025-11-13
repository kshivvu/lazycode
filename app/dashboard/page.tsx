import React from 'react'
import { handleSignOut } from '@/actions/signIn'
import { redirect } from 'next/navigation'
import { getSession } from '../api/auth/getSession'
import LogOutButton from '../(auth)/auth/sign-in/components/LogOutButton'
import UserButton from '../(auth)/auth/sign-in/components/UserButton'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Footer from './components/Footer'
import Link from 'next/link'
import { ArrowUp } from 'lucide-react'



const dashboard = async() => {
  


 
  return (
    <div className=' flex flex-col justify-start pt-8 pb-10 space-y-8 items-center'>
      <Image src={"/hero.svg"} alt='hero-img' width={300} height={300}/>
      <h1 className='text-center font-bold text-4xl text-red-500 '>LAZYCODE EDITOR - Coding with comfort</h1>
      <p className='w-1/2 text-sm    text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, minima aspernatur. Hic accusamus ut laborum nemo et ipsum, vero beatae blanditiis harum magni ex quas deleniti explicabo error vel magnam cumque soluta maxime? Soluta laudantium ducimus rem earum amet veniam, eum ea iure ipsam. A.</p>
      <Link href={"/"}>
          <Button>Get Started <ArrowUp/></Button>
      </Link>

      
    </div> 
  )
}

export default dashboard