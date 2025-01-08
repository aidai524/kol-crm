"use client";

import { useEffect, useState } from "react";
import { WalletConnect } from "../wallet/WalletConnect";
import { WalletAddress } from "../wallet/WalletAddress";
import { StatsCards } from "./StatsCards";
import { TransactionsTable } from "./TransactionsTable";
import { RewardsCard } from "./RewardsCard";
import { ActiveUsersTable } from "./ActiveUsersTable";
import { InviteLink } from "./InviteLink";
import { useWalletStatus } from "@/hooks/useWalletStatus";
import { ChartSection } from "./ChartSection";
import { authService } from "@/services/auth";
import { useRequest } from "@/hooks/useHooks";
import { useAuthStore } from "@/stores/auth";

export function DashboardPage() {
  const { connected, account, isReady } = useWalletStatus();
  const { token } = useAuthStore();

  const { loading } = useRequest(authService.auth, {
    refreshDeps: [account, connected, token],
    before: () => !!(account && connected) && !token,
  });

  if (!isReady || loading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        loading...
      </div>
    );
  }

  if (!connected || !token) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <WalletConnect onConnect={() => {}} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">KOL Dashboard</h1>
        <WalletAddress />
      </div>

      <StatsCards />

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
  );
}
