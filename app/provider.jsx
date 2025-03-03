"use client"
import React, { children } from 'react'
import { useState } from 'react'
import Header from '@/components/custom/Header'
import { MessagesContext } from '@/context/MessagesContext'
import { UserDetailContext } from '@/context/UserDetailContext'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import Hero from '@/components/custom/Hero'
import { GoogleOAuthProvider } from '@react-oauth/google'
function Provider() {
  const [messages,setMessages] = useState();
  const [userDetail,setUserDetail] = useState();
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