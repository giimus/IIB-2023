import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import { ArrowRight, Check, Hourglass, RefreshCcw } from 'lucide-react'
import { Input } from './ui/input'
import { useToast } from './ui/use-toast'
import { Toaster } from './ui/toaster'
import { api } from '@/lib/axios'
import { useWeightContext } from '@/context/WeightContext'
import { Progress } from './ui/progress'

export default function New() {
  const [knownWeight, setKnownWeight] = useState(0)
  const [isCalib, setIsCalib] = useState(false)
  const [isRemoved, setIsRemoved] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const [isBlocked, setIsBlocked] = useState(true)
  const [weight, setWeight] = useState(0.0)
  const [control, setControl] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const { toast } = useToast()

  const R = process.env.NEXT_PUBLIC_R_URL
  const J = process.env.NEXT_PUBLIC_J_URL

  const baseUrl = J

  const { calibInfo, setCalibInfo, userInfo } = useWeightContext()

  useEffect(() => {
    if (calibInfo === true) {
      setIsCalib(true)
      setProgress(100)
    } else {
      calibVerify()
    }
  }, [])

  async function calibScale() {
    setIsLoading(true)
    try {
      const res = await api.post(
        `${baseUrl}/calib`,
        {
          knownWeight,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (res.status === 200) {
        setControl(true)
        setIsLoading(false)
        setProgress(33)
        toast({
          title: 'Success',
          description: 'Known weight registered!',
        })
      }
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Communication has failed...',
      })
      setIsLoading(false)
      console.error(err)
    }
  }
  async function calibNoWeight() {
    setIsLoading(true)
    try {
      const res = await api.get(`${baseUrl}/calib/no-weight`)
      if (res.status === 200) {
        setIsRemoved(true)
        setIsLoading(false)
        setProgress(66)
        toast({
          title: 'Success',
          description: 'Offset has been set!',
        })
      }
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Offset has not been set...',
      })
      console.error(err)
    }
  }
  async function calibPutWeight() {
    setIsLoading(true)
    try {
      const res = await api.get(`${baseUrl}/calib/put-weight`)
      if (res.status === 200) {
        setIsAdded(true)
        setIsCalib(true)
        setCalibInfo(true)
        setIsLoading(false)
        setProgress(100)
        toast({
          title: 'Success',
          description: 'Measurement scale has been adjusted!',
        })
      }
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Scaling proccess has failed...',
      })
      console.error(err)
    }
  }
  async function calibVerify() {
    try {
      const res = await api.get(`${baseUrl}/calib/verify`)

      if (res.status === 200) {
        setIsCalib(true)
        setCalibInfo(true)
        setIsAdded(true)
        setProgress(100)
      }
    } catch (err) {
      setIsCalib(false)
      setIsAdded(false)
      setIsBlocked(false)
      setIsRemoved(false)
      setControl(false)
      setKnownWeight(0.0)
      setWeight(0.0)
      setCalibInfo(false)
      setProgress(0)
    }
  }
  async function blockWeight() {
    setIsLoading(true)
    try {
      const res = await api.get(`${baseUrl}/block`)
      if (res.status === 200) {
        setIsBlocked(true)
        setWeight(res.data.massa)
        setIsLoading(false)
      }
    } catch (err) {
      console.error(err)
    }
  }
  async function registerWeight() {
    setIsLoading(true)
    try {
      const res = await api.post(`/api/${userInfo}`, {
        weight,
      })

      if (res.data.status === 201) {
        setIsLoading(false)
        toast({
          title: 'Success',
          description: 'Weight saved to history!',
        })
      }
    } catch (err) {
      console.log(err)
      setIsLoading(false)
      toast({
        title: 'Error',
        variant: 'destructive',
        description: 'Failed to register...',
      })
    }
  }
  async function resetScale() {
    try {
      const res = await api.get(`${baseUrl}/reset`)
      if (res.status === 200) {
        setIsCalib(false)
        setIsAdded(false)
        setIsBlocked(false)
        setIsRemoved(false)
        setControl(false)
        setKnownWeight(0.0)
        setWeight(0.0)
        setCalibInfo(false)
        setProgress(0)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="dark mb-auto space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-amber-500">
            <p className="flex items-center gap-2">
              1. Start calibration{' '}
              <RefreshCcw
                onClick={calibVerify}
                className="text-zinc-200 transition-all ease-linear active:rotate-90"
                size={16}
              />
            </p>
          </CardTitle>
          <CardDescription>
            Insert a known weight of an object you have to calibrate your scale
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Input
            type="number"
            placeholder="Weight (kg)"
            onChange={(ev) => setKnownWeight(Number(ev.target.value))}
          />
          <Button onClick={calibScale} disabled={isLoading}>
            Calibrate <ArrowRight className="ml-2" />
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-amber-500">
            2.{' '}
            {isRemoved ? 'Add known weight on scale' : 'Remove all the weights'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            onClick={calibNoWeight}
            disabled={!control || isRemoved || isLoading}
          >
            Removed
          </Button>
          {isRemoved && (
            <Button
              className="ml-4"
              onClick={calibPutWeight}
              disabled={isAdded || isLoading}
            >
              Added
            </Button>
          )}
        </CardContent>
      </Card>

      <div className="flex items-center gap-4">
        <Progress value={progress} className="h-2" />
        {progress === 100 ? (
          <Check size={16} className="text-lime-500" />
        ) : (
          <Hourglass size={16} className="text-red-400" />
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-amber-500">
            3. New measure
            {weight !== 0.0 && (
              <p className="text-zinc-200">
                {weight} <span className="font-medium">kg</span>
              </p>
            )}
          </CardTitle>
          <CardDescription>Block the current measure</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Button
            className="w-1/2"
            onClick={blockWeight}
            disabled={!isCalib || isLoading}
          >
            Block Weight
          </Button>
          <Button
            className="w-1/2"
            disabled={!isCalib || isLoading}
            onClick={registerWeight}
          >
            Save Weight
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={resetScale}
          variant={'outline'}
          disabled={!isCalib}
          className="border-red-400 bg-transparent text-red-400 hover:text-red-400"
        >
          Reset scale
        </Button>
      </div>

      <Toaster />
    </div>
  )
}
