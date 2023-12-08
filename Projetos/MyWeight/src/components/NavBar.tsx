'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Home, Plus, User } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'

interface NavBarProps {
  func: (tab: string) => void
}

export default function NavBar({ func }: NavBarProps) {
  const [currentTab, setCurrentTab] = useState('home')

  function handleValueChange(tab: string) {
    setCurrentTab(tab)
    func(tab)
  }

  return (
    <Tabs
      className="tap dark overflow-hidden rounded-lg border border-zinc-800"
      onValueChange={handleValueChange}
      defaultValue="home"
    >
      <TabsList className="grid h-16 grid-cols-3 bg-zinc-950">
        <TabsTrigger value="home" className="relative h-full rounded-s-lg">
          <Home
            className={
              currentTab === 'home'
                ? 'z-[2] scale-125 text-amber-500 transition-all ease-linear'
                : 'z-[2] scale-100 transition-all ease-linear'
            }
          />

          {currentTab === 'home' && (
            <motion.div
              layoutId="activeTab"
              className="absolute left-0 right-0 z-[1] h-full rounded-s bg-zinc-900"
            />
          )}
        </TabsTrigger>
        <TabsTrigger value="new" className="relative h-full">
          <Plus
            className={
              currentTab === 'new'
                ? 'z-[2] rotate-90 scale-150 text-amber-500 transition-all ease-in-out'
                : 'z-[2] rotate-0 scale-100 transition-all ease-in-out'
            }
          />

          {currentTab === 'new' && (
            <motion.div
              layoutId="activeTab"
              className="absolute left-0 right-0 z-[1] h-full bg-zinc-900"
            />
          )}
        </TabsTrigger>
        <TabsTrigger value="profile" className="relative h-full rounded-e-lg">
          <User
            className={
              currentTab === 'profile'
                ? 'z-[2] scale-125 text-amber-500 transition-all ease-linear'
                : 'z-[2] scale-100 transition-all ease-linear'
            }
          />

          {currentTab === 'profile' && (
            <motion.div
              layoutId="activeTab"
              className="absolute left-0 right-0 z-[1] h-full rounded-e bg-zinc-900"
            />
          )}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
