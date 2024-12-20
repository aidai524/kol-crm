'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useEffect } from 'react'

interface WalletConnectProps {
  onConnect: () => void
}

export function WalletConnect({ onConnect }: WalletConnectProps) {
  const { connected } = useWallet()

  useEffect(() => {
    if (connected) {
      onConnect()
    }
  }, [connected, onConnect])

  return (
    <div className="text-center">
      <h2 className="mb-4 text-2xl font-bold">连接钱包</h2>
      <p className="mb-6 text-muted-foreground">
        请连接您的 Solana 钱包以访问数据看板
      </p>
      <div className="flex justify-center">
        <WalletMultiButton />
      </div>
    </div>
  )
} 