
import Image from 'next/image'
import React from 'react'
import SignInFormClient from './components/SignInFormClient'
import { getSession } from '@/app/api/auth/getSession'
import { redirect } from 'next/navigation'

const loginPage = () => {
  // const session=await getSession();
  // const user=session?.user;
  // if(!user)redirect("/dashboard");
  return (
    <>
      <Image src={"/logo.svg"} alt='logo-image' height={300} width={300}></Image>
      <SignInFormClient/>
      
    </>
  )
}

export default loginPage