import { Button } from '@/components/ui/button'
import React from 'react'
import { getSession } from './api/auth/getSession'
import { redirect } from 'next/navigation';

const page = async() => {
  const session=await getSession();
  const user=session?.user;
  if(user)redirect("/dashboard")
  return (
    
    <div>
      <h1 className='font-bold text-4xl text-rose-500 '>hello</h1>
      <Button
      
      >click me</Button>
    </div>
  )
}

export default page