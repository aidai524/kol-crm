import { NextResponse } from "next/server";
import { generateUrl } from "@/utils";

export async function GET(
  request: Request,
  { params }: { params: { address: string } }
) {
  const address = params.address;

  if (address) {
    try {
      fetch(`${request.headers.get("origin")}/api/report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
        }),
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
