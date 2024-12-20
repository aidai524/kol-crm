import { Card } from '@/components/ui/card'
import { 
  Users, 
  MousePointerClick, 
  ArrowLeftRight,
  Wallet
} from 'lucide-react'

interface StatsCardsProps {
  data: {
    clickCount: number
    activeUsers: number
    transactionCount: number
    totalVolume: {
      sol: number
      usd: number
    }
  }
}

export function StatsCards({ data }: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="p-6">
        <div className="flex items-center gap-2">
          <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-medium">链接点击</h3>
        </div>
        <p className="mt-4 text-2xl font-bold">{data.clickCount}</p>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-medium">活跃用户</h3>
        </div>
        <p className="mt-4 text-2xl font-bold">{data.activeUsers}</p>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-2">
          <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-medium">交易笔数</h3>
        </div>
        <p className="mt-4 text-2xl font-bold">{data.transactionCount}</p>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-2">
          <Wallet className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-medium">交易总额</h3>
        </div>
        <div className="mt-4 space-y-1">
          <p className="text-2xl font-bold">{data.totalVolume.sol} SOL</p>
          <p className="text-sm text-muted-foreground">
            ≈ ${data.totalVolume.usd.toLocaleString()}
          </p>
        </div>
      </Card>
    </div>
  )
} 