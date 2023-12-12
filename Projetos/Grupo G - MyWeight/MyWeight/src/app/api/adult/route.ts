import { prisma } from '@/lib/prisma'
import { format, utcToZonedTime } from 'date-fns-tz'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const brTimeZone = 'America/Sao_Paulo'
  const today = utcToZonedTime(new Date(), brTimeZone)
  const formattedDate = format(today, 'dd MMM. yyyy', { timeZone: brTimeZone })

  const { weight } = (await req.json()) as { weight: number }

  const registered = await prisma.adultMeasures.create({
    data: {
      weight: Number(weight.toFixed(2)),
      created_at: formattedDate.toLowerCase(),
    },
  })

  if (registered) {
    return NextResponse.json({ status: 201 })
  }

  return NextResponse.json({ status: 404 })
}

export async function GET() {
  const measures = await prisma.adultMeasures.findMany({
    orderBy: {
      created_at: 'desc',
    },
  })

  if (measures) {
    return NextResponse.json(measures)
  }

  return NextResponse.json({ status: 404 })
}
