import { NextResponse } from "next/server";
import { generateUrl } from "@/utils";

export async function GET(
  request: Request,
  { params }: { params: { address: string } }
) {
  const address = params.address;

  if (address) {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/report/data`;
      console.log("url:", url, address);
      fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "cache-control": "no-cache, no-store, must-revalidate",
          "pragma": "no-cache",
          "expires": "0"
        },
        cache: "no-store",
        body: JSON.stringify({
          list: [
            {
              t: 1,
              v: address,
            },
          ],
        }),
      }).then(res => res.json()).then(data => {
        console.log("data:", data);
      });
    } catch (error) {
      console.error("report data error:", error);
    }
  }

  const redirectUrl = generateUrl(`${process.env.NEXT_PUBLIC_REFERRAL_URL}`, {
    referral: address,
  });

  return NextResponse.redirect(redirectUrl);
}
