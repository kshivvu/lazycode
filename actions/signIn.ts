"use server"

import { signIn, signOut } from "@/auth"

import { redirect } from "next/navigation"



const googleLogin=async()=>{
    const url=await signIn("google",{
        redirectTo:"/dashboard"
    })
    redirect(url);
}


const githubLogin=async()=>{
     const url=await signIn("github",{
        redirectTo:"/dashboard"
    })
    redirect(url);
}



const handleSignOut= async () => {
    "use server"
    const url=await signOut({
        redirectTo:"/auth/sign-in"
    });
    redirect(url)
   
    
  }



export  {googleLogin,githubLogin,handleSignOut};