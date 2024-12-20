import { useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'

export function useWalletStatus() {
  const { connected, publicKey } = useWallet()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // 等待钱包状态初始化
    setIsReady(true)
  }, [])

  return {
    isConnected: connected,
    publicKey: publicKey?.toBase58(),
    isReady,
  }
} 