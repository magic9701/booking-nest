import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { address } = await req.json();
    if (!address) {
      return NextResponse.json({ error: "地址是必填的" }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "OK") {
      return NextResponse.json({ error: "地址解析失敗" }, { status: 400 });
    }

    const { lat, lng } = data.results[0].geometry.location;
    return NextResponse.json({ lat, lng });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "伺服器錯誤" }, { status: 500 });
  }
}
