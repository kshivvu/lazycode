import { auth } from "@/auth";
import React from "react";


const AuthLayout = async({children}:{children:React.ReactNode})=>{
    return (
       
        <main className="flex justify-center items-center h-screen bg-zinc-800 flex-col">
            {children}
        </main>
    )
}


export default AuthLayout;