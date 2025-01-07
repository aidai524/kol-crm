import { NextRequest } from "next/server";
import { generateUrl } from "@/utils";
import request from "@/utils/request";

const BOT_PATTERNS = [
  "facebookexternalhit",
  "WhatsApp",
  "Twitterbot",
  "LinkedInBot",
  "TelegramBot",
  "Discord",
  "Slackbot",
  "Line",
  "Snapchat",
  "Pinterest",
  "Discordbot",

  "bot",
  "spider",
  "crawler",

  "googlebot",
  "bingbot",
  "yandex",
  "baiduspider",
  "duckduckbot",

  "preview",
  "embed",
  "prerender",
  "snippet",
  "metadata",
  "outbrain",
  "quora",
  "yahoo",
  "semrush",
  "ahrefsbot",
  "mj12bot",
  "Slackbot",
  "Slack-ImgProxy",
  "Slack/",
].join("|");

export async function GET(
  req: NextRequest,
  { params }: { params: { address: string } }
) {
  try {
    const address = params.address;

    const redirectUrl = generateUrl(`${process.env.NEXT_PUBLIC_REFERRAL_URL}`, {
      referral: address,
    });

    const userAgent = req.headers.get("user-agent") || "";
    const isBot = new RegExp(BOT_PATTERNS, "i").test(userAgent);

    if (isBot) {
      return new Response(null, {
        status: 307,
        headers: {
          Location: redirectUrl,
        },
      });
    }

    if (address) {
      request(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/report/data`, {
        method: "POST",
        body: {
          list: [
            {
              t: 1,
              v: address,
            },
          ],
        },
      }).catch((err) => {
        console.log(err);
      });
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
