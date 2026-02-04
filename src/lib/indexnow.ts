const INDEXNOW_KEY = process.env.INDEXNOW_KEY || ""
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ichnusa.restaurant"

export async function submitToIndexNow(urls: string[]) {
  if (!INDEXNOW_KEY) {
    console.warn("IndexNow: Missing INDEXNOW_KEY environment variable")
    return { success: false, error: "Missing API key" }
  }

  const host = new URL(baseUrl).hostname
  const keyLocation = `${baseUrl}/${INDEXNOW_KEY}.txt`

  try {
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host,
        key: INDEXNOW_KEY,
        keyLocation,
        urlList: urls.map((url) => (url.startsWith("http") ? url : `${baseUrl}${url}`)),
      }),
    })

    if (response.ok || response.status === 202) {
      console.log("IndexNow: URLs submitted successfully", urls)
      return { success: true, submitted: urls.length }
    }

    const errorText = await response.text()
    console.error("IndexNow submission failed:", response.status, errorText)
    return { success: false, error: errorText }
  } catch (error) {
    console.error("IndexNow submission error:", error)
    return { success: false, error: String(error) }
  }
}

export async function submitAllPages() {
  const locales = ["it", "en", "cs"]
  const pages = ["", "/menu", "/chi-siamo", "/galleria", "/contatti"]

  const urls: string[] = []
  for (const locale of locales) {
    for (const page of pages) {
      urls.push(`${baseUrl}/${locale}${page}`)
    }
  }

  return submitToIndexNow(urls)
}
