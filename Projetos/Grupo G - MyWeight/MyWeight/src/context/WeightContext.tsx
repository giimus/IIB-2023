'use client'

import React, { createContext, useContext, useState } from 'react'

interface WeightInfo {
  id: string
  weight: number
  created_at: string
}

interface WeightContextType {
  adultWeightInfo: WeightInfo[]
  setAdultWeightInfo: React.Dispatch<React.SetStateAction<WeightInfo[]>>
  babyWeightInfo: WeightInfo[]
  setBabyWeightInfo: React.Dispatch<React.SetStateAction<WeightInfo[]>>
  calibInfo: boolean
  setCalibInfo: React.Dispatch<React.SetStateAction<boolean>>
  userInfo: string
  setUserInfo: React.Dispatch<React.SetStateAction<string>>
  isProblem: boolean
  setIsProblem: React.Dispatch<React.SetStateAction<boolean>>
}

export const WeightContext = createContext<WeightContextType | undefined>(
  undefined,
)

export function useWeightContext() {
  const context = useContext(WeightContext)
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider')
  }
  return context
}

export function WeightContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [adultWeightInfo, setAdultWeightInfo] = useState<WeightInfo[]>([])
  const [babyWeightInfo, setBabyWeightInfo] = useState<WeightInfo[]>([])
  const [calibInfo, setCalibInfo] = useState<boolean>(false)
  const [userInfo, setUserInfo] = useState<string>('adult')
  const [isProblem, setIsProblem] = useState<boolean>(false)

  return (
    <WeightContext.Provider
      value={{
        adultWeightInfo,
        setAdultWeightInfo,
        babyWeightInfo,
        setBabyWeightInfo,
        calibInfo,
        setCalibInfo,
        userInfo,
        setUserInfo,
        isProblem,
        setIsProblem,
      }}
    >
      {children}
    </WeightContext.Provider>
  )
}
