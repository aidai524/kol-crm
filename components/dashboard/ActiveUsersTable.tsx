'use client'

import { Card } from '@/components/ui/card'
import { User } from 'lucide-react'

interface ActiveUser {
  id: string
  address: string
  lastActive: string
  transactions: number
}

// Mock data
const activeUsers: ActiveUser[] = [
  {
    id: '1',
    address: '0x1234...5678',
    lastActive: '10 mins ago',
    transactions: 12
  },
  {
    id: '2',
    address: '0x8765...4321',
    lastActive: '25 mins ago',
    transactions: 8
  },
  {
    id: '3',
    address: '0x9876...1234',
    lastActive: '1 hour ago',
    transactions: 5
  }
]

export function ActiveUsersTable() {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <User className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Active Users</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="pb-2 text-sm font-medium text-muted-foreground">User</th>
              <th className="pb-2 text-sm font-medium text-muted-foreground">Last Active</th>
              <th className="pb-2 text-sm font-medium text-muted-foreground">Transactions</th>
            </tr>
          </thead>
          <tbody>
            {activeUsers.map((user) => (
              <tr key={user.id} className="border-b last:border-0">
                <td className="py-3 font-mono">{user.address}</td>
                <td className="py-3 text-muted-foreground">{user.lastActive}</td>
                <td className="py-3">{user.transactions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
} 