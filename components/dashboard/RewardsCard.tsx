'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Coins } from 'lucide-react'

// 模拟数据
const rewardsData = {
  total: 1250.75,
  available: 450.25,
  claimed: 800.50,
  nextPayout: '2024-01-20'
}

export function RewardsCard() {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2">
        <Coins className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">奖励统计</h2>
      </div>
      
      <div className="mt-6 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">总奖励</span>
          <span className="font-bold">${rewardsData.total}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">可领取</span>
          <span className="font-bold text-green-600">${rewardsData.available}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">已领取</span>
          <span className="font-bold">${rewardsData.claimed}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">下次发放</span>
          <span className="font-medium">{rewardsData.nextPayout}</span>
        </div>
      </div>
      
      <Button className="mt-6 w-full" disabled={rewardsData.available === 0}>
        领取奖励
      </Button>
    </Card>
  )
} 