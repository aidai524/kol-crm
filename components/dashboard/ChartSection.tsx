'use client'

import { Card } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { format, subDays } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { useState } from 'react'

type ChartMetric = 'users' | 'transactions' | 'volume'

interface ChartData {
  date: string
  users: number
  transactions: number
  volume: number
}

// 生成模拟数据
const generateMockData = (): ChartData[] => {
  return Array.from({ length: 7 }).map((_, i) => {
    const date = subDays(new Date(), 6 - i)
    return {
      date: format(date, 'MM-dd', { locale: zhCN }),
      users: Math.floor(Math.random() * 50) + 10,
      transactions: Math.floor(Math.random() * 100) + 20,
      volume: Math.floor(Math.random() * 1000) + 500,
    }
  })
}

const metricConfigs = {
  users: {
    name: 'Invited Users',
    color: '#0ea5e9',
    formatter: (value: number) => `${value} users`,
  },
  transactions: {
    name: 'Transactions',
    color: '#8b5cf6',
    formatter: (value: number) => `${value} txs`,
  },
  volume: {
    name: 'Volume',
    color: '#f59e0b',
    formatter: (value: number) => `${value} SOL`,
  },
}

export function ChartSection() {
  const [metric, setMetric] = useState<ChartMetric>('users')
  const data = generateMockData()

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Trend Analysis</h2>
        <div className="flex gap-2">
          {(Object.keys(metricConfigs) as ChartMetric[]).map((key) => (
            <button
              key={key}
              onClick={() => setMetric(key)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                metric === key
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              {metricConfigs[key].name}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <XAxis
              dataKey="date"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => metricConfigs[metric].formatter(value)}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-muted-foreground">Date:</span>
                      <span className="font-medium">
                        {payload[0].payload.date}
                      </span>
                      <span className="text-muted-foreground">
                        {metricConfigs[metric].name}:
                      </span>
                      <span className="font-medium">
                        {metricConfigs[metric].formatter(payload[0].value as number)}
                      </span>
                    </div>
                  </div>
                )
              }}
            />
            <Bar
              dataKey={metric}
              fill={metricConfigs[metric].color}
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
} 