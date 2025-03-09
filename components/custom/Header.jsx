"use client"
import Colors from '@/data/Colors'
import { Button } from '../ui/button'
import Image from 'next/image'
import React from 'react'
import { useContext } from 'react'
import { UserDetailContext } from '@/context/UserDetailContext'

function Header() {
  const {userDetail,setUserDetail}=useContext(UserDetailContext);
  return (
    <div className='p-4 flex justify-between items-center'>
      <Image src={'/logo.png'} alt='Logo' width={40} height={40} />
      {!userDetail?.name && (<div className='flex gap-5'>
        <Button variant="ghost">Sign In</Button>
        <Button className="text-white" style={{
          backgroundColor:Colors.BLUE,
        }}>Get Started</Button>
      </div>)}
    </div>
  )
}

export default Header