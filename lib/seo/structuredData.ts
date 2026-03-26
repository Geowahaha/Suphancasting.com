import type { JsonLd } from "@/types/seo";
import { siteConfig } from "./site";

export function buildOrganizationJsonLd(): JsonLd {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "";
  const urlBase = siteUrl || "https://suphancasting.com";

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.fullName,
    url: urlBase,
    logo: `${urlBase}/logo.png`,
    sameAs: [],
  };
}

export function buildFAQJsonLd(params: {
  mainEntity: Array<{ q: string; a: string }>;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: params.mainEntity.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function buildProductJsonLd(params: {
  name: string;
  description?: string;
  sku?: string | null;
  brand?: string;
  url: string;
  imageUrl?: string | null;
}): JsonLd {
  const { name, description, sku, brand, url, imageUrl } = params;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    sku: sku ?? undefined,
    brand: brand ? { "@type": "Brand", name: brand } : undefined,
    url,
    image: imageUrl ?? undefined,
  };
}

