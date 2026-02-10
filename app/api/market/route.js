import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch('https://api.upstox.com/v2/market-quote/quotes?symbol=NSE_EQ%7CINE002A01018', {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${process.env.UPSTOX_ACCESS_TOKEN}`
            }
        });
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}
