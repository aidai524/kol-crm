import { generateUrl } from "@/utils";
import request from "@/utils/request";
import { innerApiPrefix, PaginationResponse, WrapperResponse } from ".";
import dayjs from "@/utils/dayjs";

interface QuerySummaryResponse {
  address: string;
  created_at: string;
  id: number;
  invite_total: number;
  link_clicks: number;
  referral_fee: number;
  sol_amount: number;
  transactions: number;
  updated_at: string;
}

interface QueryReferralUsersResponse {
  address: string;
  created_at: string;
  id: number;
  referral_account: string;
  time: number;
  transactions: number;
  update_time: number;
  updated_at: string;
}

interface QueryRecentTransactionsResponse {
  address: string;
  created_at: string;
  icon: string;
  id: number;
  name: string;
  project_id: number;
  protocol_fee: number;
  proxy: string;
  proxy_fee: number;
  referral: string;
  referral_fee: number;
  sol_amount: number;
  time: number;
  token: string;
  token_amount: number;
  tx_hash: string;
  type: string;
  updated_at: string;
}

export const referralService = {
  async queryReferralLink() {
    const account = window.solanaWallet?.account;
    // const { data } = await request<WrapperResponse<string>>(
    //   generateUrl(innerApiPrefix("/airdrop/referral/account/code"), { account })
    // );

    const link = generateUrl(`${process.env.NEXT_PUBLIC_REFERRAL_URL}`, {
      referral: account,
      // airdrop: data,
    });
    return link;
  },
  async querySolPrice() {
    const { data } = await request<WrapperResponse<{ SolPrice: number }>>(
      innerApiPrefix("/config")
    );
    return data?.SolPrice;
  },
  async querySummary() {
    const { data } = await request<WrapperResponse<QuerySummaryResponse>>(
      innerApiPrefix("/referral/data")
    );
    return data;
  },
  async queryReferralUsers() {
    const { data } = await request<
      PaginationResponse<QueryReferralUsersResponse>
    >(generateUrl(innerApiPrefix("/referral/account"), { limit: 100 }));
    return data;
  },
  async queryRecentTransactions(offset: number = 0, limit: number = 100) {
    const { data } = await request<
      PaginationResponse<QueryRecentTransactionsResponse>
    >(generateUrl(innerApiPrefix("/referral/trade"), { offset, limit }));
    return data;
  },
  async queryTrend(type: "invited" | "transactions" | "volume") {
    const url = type === "invited" ? "invited/account" : type;
    const { data } = await request<
      WrapperResponse<
        {
          date: string;
          invite_count?: number;
          trade_count?: number;
          sol_amount?: number;
        }[]
      >
    >(generateUrl(innerApiPrefix(`/referral/trend/${url}`), { day: 7 }));
    const result = data?.map((item) => ({
      date: dayjs(item.date).format("MM-DD"),
      value: item.invite_count ?? item.trade_count ?? item.sol_amount,
    }));
    if (!result?.length) {
      const res = Array.from({ length: 7 }, (_, index) => ({
        date: dayjs().subtract(index, "day").format("MM-DD"),
        value: 0,
      })).reverse();
      return res;
    }
    return result;
  },
};
