import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const taxId = searchParams.get("tax_id");

  if (!taxId) {
    return NextResponse.json({ error: "tax_id is required" }, { status: 400 });
  }

  const response = await fetch(
    `https://vericorp-api.p.rapidapi.com/v1/company/${encodeURIComponent(taxId)}`,
    {
      headers: {
        "X-RapidAPI-Key": process.env.VERICORP_API_KEY!,
        "X-RapidAPI-Host": "vericorp-api.p.rapidapi.com",
      },
    },
  );

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
