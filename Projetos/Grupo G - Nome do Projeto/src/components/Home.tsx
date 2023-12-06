'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { ScrollArea } from './ui/scroll-area'
import { api } from '@/lib/axios'
import { useEffect, useState } from 'react'
import { useWeightContext } from '@/context/WeightContext'
import { RefreshCcw, Rocket, XCircle } from 'lucide-react'
import { LineWobble } from '@uiball/loaders'

type MeasureProps = {
  id: string
  weight: number
  created_at: string
}

export default function Home() {
  const [measures, setMeasures] = useState<MeasureProps[]>([])
  const {
    adultWeightInfo,
    setAdultWeightInfo,
    babyWeightInfo,
    setBabyWeightInfo,
    userInfo,
    setIsProblem,
    isProblem,
  } = useWeightContext()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function getMeasures() {
      setMeasures([])
      setIsLoading(true)

      try {
        const res = await api.get(`/api/${userInfo}`)

        if (res.status === 200 && userInfo === 'adult') {
          setMeasures(res.data)
          setAdultWeightInfo(res.data)
          setIsLoading(false)
        }

        if (res.status === 200 && userInfo === 'baby') {
          setMeasures(res.data.measures)
          setIsProblem(res.data.problem)
          setBabyWeightInfo(res.data.measures)
          setIsLoading(false)
        }
      } catch (err) {
        console.error(err)
      }
    }

    if (
      (userInfo === 'adult' && adultWeightInfo.length === 0) ||
      (userInfo === 'baby' && babyWeightInfo.length === 0)
    ) {
      getMeasures()
    } else {
      if (userInfo === 'adult') {
        setMeasures(adultWeightInfo)
      }
      if (userInfo === 'baby') {
        setMeasures(babyWeightInfo)
      }
    }
  }, [])

  async function resetMeasures() {
    setMeasures([])
    setIsLoading(true)

    try {
      const res = await api.get(`/api/${userInfo}`)

      if (res.status === 200 && userInfo === 'adult') {
        setMeasures(res.data)
        setAdultWeightInfo(res.data)
        setIsLoading(false)
      }

      if (res.status === 200 && userInfo === 'baby') {
        setMeasures(res.data.measures)
        setIsProblem(res.data.problem)
        setBabyWeightInfo(res.data.measures)
        setIsLoading(false)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="dark mb-auto space-y-8">
      {userInfo === 'baby' &&
        (isProblem === true ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-red-400">
                <p className="flex items-center justify-between">
                  Problem detected
                  <XCircle />
                </p>
              </CardTitle>
              <CardDescription>
                Too much weight lost on the last days
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-zinc-200">
                <p className="flex items-center justify-between">
                  <span>
                    <span className="text-amber-500">3</span> days on this
                    planet
                  </span>

                  <Rocket className="text-amber-500" />
                </p>
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      <Card>
        <CardHeader>
          <CardTitle className="text-amber-500">
            <p className="flex items-center gap-2">
              History{' '}
              <RefreshCcw
                onClick={resetMeasures}
                className="text-zinc-200 transition-all ease-linear active:rotate-90"
                size={16}
              />
            </p>
          </CardTitle>
          <CardDescription>Track your last measures</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex w-full justify-center">
              <LineWobble color="#f59e0b" />
            </div>
          ) : (
            <p className="text-2xl font-bold text-zinc-200">
              {measures[0]?.weight}{' '}
              <span className="font-medium">{measures[0] && 'kg'}</span>
            </p>
          )}
        </CardContent>
        <CardFooter>
          <ScrollArea className="h-72 w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Weight (kg)</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {measures.map((measure) => (
                  <TableRow key={measure.id}>
                    <TableCell>{measure.weight}</TableCell>
                    <TableCell>{measure.created_at}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardFooter>
      </Card>
    </div>
  )
}
