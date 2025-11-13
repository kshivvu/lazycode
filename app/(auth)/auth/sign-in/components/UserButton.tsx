"use client";
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { Avatar,AvatarFallback,AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import LogOutButton from './LogOutButton';
import { currentUser } from '@/hooks/use-current-user';
import { LogOut, User } from 'lucide-react';


const UserButton = () => {
    const user=currentUser();
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Avatar className='rounded-full'>
                <AvatarImage src={user?.image!} alt={user?.name!} />
                <AvatarFallback>
                    <User className='text-white'/>
                </AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent>
            <DropdownMenuItem>
                <span>
                    {user?.email}
                </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <LogOutButton>
                <DropdownMenuItem className='w-full'>
                    <LogOut className='inline mr-5'/>
                    LogOut
                </DropdownMenuItem>
            </LogOutButton>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton