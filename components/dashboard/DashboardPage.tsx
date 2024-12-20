'use client'

import { useState } from 'react'
import { WalletConnect } from '../wallet/WalletConnect'
import { WalletAddress } from '../wallet/WalletAddress'
import { StatsCards } from './StatsCards'
import { TransactionsTable } from './TransactionsTable'
import { RewardsCard } from './RewardsCard'
import { ActiveUsersTable } from './ActiveUsersTable'
import { InviteLink } from './InviteLink'
import { useWalletStatus } from '@/hooks/useWalletStatus'
import { ChartSection } from './ChartSection'

export function DashboardPage() {
  const { isConnected, isReady } = useWalletStatus()

  // 模拟数据
  const statsData = {
    clickCount: 1234,
    activeUsers: 89,
    transactionCount: 456,
    totalVolume: {
      sol: 789.12,
      usd: 23456.78
    }
  }

  if (!isReady) {
    return null // 或显示加载状态
  }

  if (!isConnected) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <WalletConnect onConnect={() => {}} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">KOL Dashboard</h1>
        <WalletAddress />
      </div>
      
      <StatsCards data={statsData} />
      
      <div className="grid gap-6 md:grid-cols-2">
        <RewardsCard />
        <InviteLink />
      </div>
      
      <ChartSection />
      
      <div className="grid gap-6 md:grid-cols-2">
        <ActiveUsersTable />
        <TransactionsTable />
      </div>
    </div>
  )
} 