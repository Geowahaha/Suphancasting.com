import type { JsonLd } from "@/types/seo";
import { siteConfig } from "./site";

export function buildOrganizationJsonLd(): JsonLd {
  const siteUrl = (process.env.NEXT_PUBLIC_CANONICAL_SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL)?.replace(/\/+$/, "") ?? "";
  const urlBase = siteUrl || "https://suphancasting.com";

  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "ManufacturingBusiness"],
    name: siteConfig.name,
    legalName: "บริษัท สุพรรณ แคสติ้ง จำกัด",
    url: urlBase,
    logo: `${urlBase}/suphancasting-assets/logo/suphan-logo-og.webp`,
    image: `${urlBase}/suphancasting-assets/gpt-hero/molten-pour-1.webp`,
    telephone: ["+66-98-636-2356", "+66-84-317-7788"],
    email: "scnwmax@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressRegion: "สุพรรณบุรี",
      addressCountry: "TH",
    },
    sameAs: ["https://line.me/R/ti/p/@213bzijc"],
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

