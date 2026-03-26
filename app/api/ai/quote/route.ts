import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db/prisma";
import { createAIRequestLog } from "@/lib/db/aiRequests";
import {
  QuoteGeneratorRouteInputSchema,
  generateQuoteEstimate,
} from "@/lib/ai/quoteGenerator";
import { apiText, getApiLocale } from "@/lib/api-i18n";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const locale = getApiLocale(request, json ?? undefined);
  const msg = apiText(locale);

  const parsed = QuoteGeneratorRouteInputSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().formErrors.join("; ") || msg.invalidInput },
      { status: 400 },
    );
  }

  const estimate = await generateQuoteEstimate({
    specsText: parsed.data.specsText,
    materialId: parsed.data.materialId,
    materialName: parsed.data.materialName,
  });

  const { userId: clerkUserId } = await auth();
  const dbUser = clerkUserId
    ? await prisma.users.findUnique({
        where: { clerkUserId },
        select: { id: true },
      })
    : null;

  if (dbUser?.id) {
    await createAIRequestLog({
      type: "QUOTE_GENERATOR",
      userId: dbUser.id,
      inputText: parsed.data.specsText,
      outputJson: estimate,
      model: "gpt-4o-mini + deterministic-cost-engine",
    });
  }

  return NextResponse.json({ estimate });
}

