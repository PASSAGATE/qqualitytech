import { NextResponse } from "next/server";

function apiBaseUrl() {
  return (
    process.env.BACKEND_API_URL ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "http://localhost:4000/api/v1"
  );
}

export async function GET() {
  try {
    const response = await fetch(`${apiBaseUrl()}/delivery-fees`, {
      next: { revalidate: 3600 },
    });

    const text = await response.text();
    return new NextResponse(text, {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return NextResponse.json(
      { message: "Failed to connect backend." },
      { status: 502 },
    );
  }
}

