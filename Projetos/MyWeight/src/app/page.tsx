'use client'

import Header from '@/components/Header'
import Home from '@/components/Home'
import NavBar from '@/components/NavBar'
import New from '@/components/New'
import Profile from '@/components/Profile'
import { useState } from 'react'

export default function App() {
  const [currentTab, setCurrentTab] = useState('home')

  return (
    <div className="mx-auto flex min-h-[100vh] max-w-lg flex-col justify-between px-6 py-4">
      <Header />

      {currentTab === 'home' && <Home />}
      {currentTab === 'new' && <New />}
      {currentTab === 'profile' && <Profile />}

      <NavBar func={setCurrentTab} />
    </div>
  )
}
