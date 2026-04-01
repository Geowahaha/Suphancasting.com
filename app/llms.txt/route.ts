export function GET() {
  const body = [
    "Suphancasting.com",
    "Industrial steel casting and OEM casting parts supplier in Thailand.",
    "",
    "Primary pages:",
    "- / : New marketing home (Stitch)",
    "- /designs : Index of all Stitch UI exports",
    "- /products : Portfolio (Stitch)",
    "- /promotions : Promotions (Stitch)",
    "- /rfq : RFQ submission, AI quote, and auto-quotation engine",
    "- /contact : Contact page (Stitch)",
    "- /blog : Resources hub (Stitch)",
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

