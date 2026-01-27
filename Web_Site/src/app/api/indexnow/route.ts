import { NextRequest, NextResponse } from "next/server"
import { submitToIndexNow, submitAllPages } from "@/lib/indexnow"

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  const expectedToken = process.env.INDEXNOW_SECRET

  if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json().catch(() => ({}))
    const { urls, all } = body as { urls?: string[]; all?: boolean }

    if (all) {
      const result = await submitAllPages()
      return NextResponse.json(result)
    }

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: "Missing urls array or set all=true" }, { status: 400 })
    }

    const result = await submitToIndexNow(urls)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit to IndexNow" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    service: "IndexNow",
    usage: "POST with { urls: [...] } or { all: true }",
    documentation: "https://www.indexnow.org/documentation",
  })
}
