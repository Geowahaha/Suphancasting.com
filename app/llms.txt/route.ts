export function GET() {
  const body = [
    "Suphancasting.com",
    "Industrial steel casting and OEM casting parts supplier in Thailand.",
    "",
    "Primary pages:",
    "- /products : Product catalog and RFQ-ready product details",
    "- /promotions : Current promotions and buyer offers",
    "- /contact : RFQ submission and quote request",
    "- /blog : Knowledge hub for casting process and RFQ guidance",
    "",
    "Citable facts:",
    "- Supports OEM casting parts workflow from RFQ to production.",
    "- Provides AI-assisted quotation guidance and industrial media knowledge feed.",
    "- Focuses on steel casting quality, lead time clarity, and buyer-ready specifications.",
  ].join("\n");

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}

