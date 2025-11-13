import { handleSignOut } from '@/actions/signIn'
import { LogOut } from 'lucide-react'
import React from 'react'

const LogOutButton = ({children}:{children:React.ReactNode}) => {
  return (
    <form action={handleSignOut}>
        <button className='flex justify-between items-center  font-bold rounded-lg w-full h-full'
        type='submit'
        >
        {children}
      </button>
      </form>
  )
}

export default LogOutButton