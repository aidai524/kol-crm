'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Coins, ExternalLink } from 'lucide-react'
import { useState } from 'react'

// 模拟数据
const rewardsData = {
  total: 1250.75,
  available: 450.25,
  claimed: 800.50,
  nextPayout: '2024-01-20',
  lastReward: {
    amount: 125.5,
    timestamp: '2024-01-15 14:30',
    txHash: '4ZtTe2wPnHqRZy7JHMqYVNwkzJuAFhQWY1MyNY8eqKPm',
  }
}

export function RewardsCard() {
  const [showTxDetails, setShowTxDetails] = useState(false)

  const openExplorer = () => {
    window.open(
      `https://explorer.solana.com/tx/${rewardsData.lastReward.txHash}?cluster=devnet`,
      '_blank'
    )
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2">
        <Coins className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Rewards Summary</h2>
      </div>
      
      <div className="mt-6 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Total Rewards</span>
          <span className="font-bold">${rewardsData.total}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Available</span>
          <span className="font-bold text-green-600">${rewardsData.available}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Claimed</span>
          <span className="font-bold">${rewardsData.claimed}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Next Payout</span>
          <span className="font-medium">{rewardsData.nextPayout}</span>
        </div>
      </div>
      
      <div className="mt-6">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setShowTxDetails(!showTxDetails)}
        >
          View Latest Reward Transaction
        </Button>

        {showTxDetails && (
          <div className="mt-4 p-4 bg-muted/50 rounded-lg space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Amount</span>
              <span className="font-medium">{rewardsData.lastReward.amount} SOL</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Timestamp</span>
              <span className="font-medium">{rewardsData.lastReward.timestamp}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Transaction Hash</span>
              <button
                onClick={openExplorer}
                className="flex items-center gap-1 text-sm text-primary hover:underline"
              >
                {rewardsData.lastReward.txHash.slice(0, 4)}...
                {rewardsData.lastReward.txHash.slice(-4)}
                <ExternalLink className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
} 