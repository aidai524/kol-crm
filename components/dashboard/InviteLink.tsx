'use client'

import { Card } from '@/components/ui/card'
import { useWallet } from '@solana/wallet-adapter-react'
import { Copy, Link } from 'lucide-react'
import { useState, useEffect } from 'react'

export function InviteLink() {
  const { publicKey } = useWallet()
  const [inviteCode, setInviteCode] = useState('')
  const [copied, setCopied] = useState(false)

  // 根据钱包地址生成邀请码
  useEffect(() => {
    if (publicKey) {
      // 使用钱包地址的前6位作为邀请码
      const code = publicKey.toBase58().slice(0, 6)
      setInviteCode(code)
    }
  }, [publicKey])

  const inviteLink = `${window.location.origin}/invite/${inviteCode}`

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy link', err)
    }
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Link className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Invite Link</h2>
        </div>
      </div>
      
      <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-md">
        <span className="flex-1 font-mono text-sm truncate">
          {inviteLink}
        </span>
        <button
          onClick={copyLink}
          className="p-2 hover:bg-background rounded-md transition-colors relative"
        >
          <Copy className="h-4 w-4" />
          {copied && (
            <span className="absolute right-0 -top-8 bg-popover text-popover-foreground px-2 py-1 rounded shadow-lg text-sm whitespace-nowrap">
              Copied
            </span>
          )}
        </button>
      </div>
      
      <p className="mt-4 text-sm text-muted-foreground">
        Share this link with others. You'll earn rewards when they trade through your link.
      </p>
    </Card>
  )
} 