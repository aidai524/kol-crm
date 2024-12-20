'use client'

import { Card } from '@/components/ui/card'

interface Transaction {
  id: string
  date: string
  type: 'buy' | 'sell'
  amount: number
  price: number
  user: string
}

// 模拟数据
const transactions: Transaction[] = [
  {
    id: '1',
    date: '2024-01-15 14:30',
    type: 'buy',
    amount: 1.5,
    price: 102.5,
    user: '0x1234...5678'
  },
  {
    id: '2',
    date: '2024-01-15 13:25',
    type: 'sell',
    amount: 0.8,
    price: 101.2,
    user: '0x8765...4321'
  },
  // 添加更多模拟数据...
]

export function TransactionsTable() {
  return (
    <Card className="overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold">最近交易</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr className="text-left">
              <th className="p-4 text-sm font-medium text-muted-foreground">时间</th>
              <th className="p-4 text-sm font-medium text-muted-foreground">类型</th>
              <th className="p-4 text-sm font-medium text-muted-foreground">数量</th>
              <th className="p-4 text-sm font-medium text-muted-foreground">价格</th>
              <th className="p-4 text-sm font-medium text-muted-foreground">用户</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-t">
                <td className="p-4">{tx.date}</td>
                <td className="p-4">
                  <span className={tx.type === 'buy' ? 'text-green-600' : 'text-red-600'}>
                    {tx.type === 'buy' ? '买入' : '卖出'}
                  </span>
                </td>
                <td className="p-4">{tx.amount} SOL</td>
                <td className="p-4">${tx.price}</td>
                <td className="p-4 font-mono">{tx.user}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
} 