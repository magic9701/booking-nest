import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { address } = await req.json();
    if (!address) {
      return NextResponse.json({ error: "地址是必填的" }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}&language=zh-TW`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "OK") {
      return NextResponse.json({ error: "地址解析失敗" }, { status: 400 });
    }

    const result = data.results[0];
    const { lat, lng } = result.geometry.location;
    const formattedAddress = result.formatted_address;

    const addressComponents = result.address_components;
    let city = '';
    let county = '';

    addressComponents.forEach((component: any) => {
      if (component.types.includes('administrative_area_level_2')) {
        county = component.long_name; // 縣市
      } else if (component.types.includes('administrative_area_level_1')) {
        city = component.long_name; // 市/省
      }
    })

    return NextResponse.json({ lat, lng, formattedAddress, city, county })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "伺服器錯誤" }, { status: 500 });
  }
}
