// src/app/api/og/route.ts
import { ImageResponse } from "@vercel/og";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const title = url.searchParams.get("title") || "AGA Dev";
  const subtitle = url.searchParams.get("subtitle") || "Digital Space";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f172a",
          color: "white",
          padding: "60px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <img
          src="https://aga.is-a.dev/logo.png"
          alt="logo"
          width={120}
          height={120}
          style={{ borderRadius: "50%", marginBottom: "40px" }}
        />
        <h1 style={{ fontSize: 64, fontWeight: "bold" }}>{title}</h1>
        <p style={{ fontSize: 32, color: "#94a3b8", marginTop: "20px" }}>
          {subtitle}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
