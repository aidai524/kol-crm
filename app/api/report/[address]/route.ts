import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { address: string } }) {
  const address = params.address;
  console.log("address:", address);
  try {
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
    
    const data = await response.json();
    console.log("report data response:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Report error:', error);
    return NextResponse.json({ error: 'Failed to report' }, { status: 500 });
  }
} 