"use client"
import React, { children, useEffect } from 'react'
import { useState } from 'react'
import Header from '@/components/custom/Header'
import { MessagesContext } from '@/context/MessagesContext'
import { UserDetailContext } from '@/context/UserDetailContext'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import Hero from '@/components/custom/Hero'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { useConvex } from 'convex/react'
import { api } from '@/convex/_generated/api'
function Provider() {
  const [messages,setMessages] = useState();
  const [userDetail,setUserDetail] = useState();
  const convex=useConvex();

  useEffect(()=>{
    IsAuntheicated();
  },[])
  const IsAuntheicated=async()=>{
    if(typeof window !== 'undefined'){
      const user=JSON.parse(localStorage.getItem('user'));
      const result=await convex.query(api.users.GetUser,{
        email:user?.email
      })
      setUserDetail(result);
      console.log(result);
      //Fetch from Database
    }
  }
  return (
    <div>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY}>
      <UserDetailContext.Provider value={{userDetail,setUserDetail}}>
      <MessagesContext.Provider value={{messages,setMessages}}>
        <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange>
            <Header/>
            <Hero/>
        {children}
        </NextThemesProvider>
      </MessagesContext.Provider>
      </UserDetailContext.Provider>
      </GoogleOAuthProvider>;
    </div>
  )
}

export default Provider