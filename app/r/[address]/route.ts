import { NextRequest } from "next/server";
import { generateUrl } from "@/utils";


export async function GET(
  req: NextRequest,
  { params }: { params: { address: string } }
) {
  try {
    const address = params.address;

    const redirectUrl = generateUrl(`${process.env.NEXT_PUBLIC_REFERRAL_URL}`, {
      referral: address,
    });
    if (address) {
      try {
        console.log("start report data...");
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/report/data`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            list: [
              {
                t: 1,
                v: address,
              },
            ],
          }),
        });
        
        // check response status
        if (!response.ok) {
          console.error("report data failed:", response.status, response.statusText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("report data response:", data);
        
        // ensure wait a short time for request to complete
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error("report data error:", error);
      }
    }

    return new Response(null, {
      status: 302,
      headers: {
        Location: redirectUrl,
      },
    });
  } catch (error) {
    console.error("Redirect error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
