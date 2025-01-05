import { generateUrl, storageStore } from "@/utils";
import { innerApiPrefix, request, WrapperResponse } from ".";

const authStore = storageStore("auth", {
  storage: typeof window !== "undefined" ? sessionStorage : undefined,
});

export const authService = {
  async auth() {
    if (!window.solanaWallet) return;
    const token = getToken();
    console.log("token", token);
    if (token) return token;
    try {
      const time = Date.now();
      const msg = `login FlipN,time:${time}`;
      const encodeMsg = new TextEncoder().encode(msg);
      console.log("encodeMsg", encodeMsg);
      const signature = await window.solanaWallet.signMessage!(encodeMsg);
      const signatureBase64 = await bufferToBase64(signature);
      const { data } = await request<WrapperResponse<string>>(
        generateUrl(innerApiPrefix("/account/token"), {
          address: window.solanaWallet.account,
          signature: signatureBase64,
          time,
        })
      );
      setToken(data);
      return data;
    } catch (error) {
      console.error(error);
      setToken(undefined);
      return;
    }
  },
};

export function getToken() {
  const account = window.solanaWallet?.account;
  if (!account) return;
  return authStore?.get(account);
}

export function setToken(token?: string) {
  const account = window.solanaWallet?.account;
  if (!account) return;
  authStore?.set(account, token);
}

async function bufferToBase64(buffer: Uint8Array) {
  const base64url: any = await new Promise((r) => {
    const reader = new FileReader();
    reader.onload = () => r(reader.result);
    reader.readAsDataURL(new Blob([buffer]));
  });
  return base64url.slice(base64url.indexOf(",") + 1);
}
