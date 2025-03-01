"use client"
import React, { children } from 'react'
import { useState } from 'react'
import Header from '@/components/custom/Header'
import { MessagesContext } from '@/context/MessagesContext'
import { UserDetailContext } from '@/context/UserDetailContext'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import Hero from '@/components/custom/Hero'

function Provider() {
  const [messages,setMessages] = useState();
  const [userDetail,setUserDetail] = useState();
  return (
    <div>
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
    </div>
  )
}

export default Provider