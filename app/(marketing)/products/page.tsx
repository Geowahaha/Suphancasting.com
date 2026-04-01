import type { Metadata } from "next";
import { siteConfig } from "@/lib/seo/site";
import { StitchFrame } from "@/components/stitch/StitchFrame";
import { STITCH_ROUTE_SLUGS } from "@/lib/stitch/manifest";

export const metadata: Metadata = {
  title: `Portfolio | ${siteConfig.fullName}`,
  description:
    "Product portfolio and casting gallery (Stitch design preview).",
};

export default function ProductsPage() {
  return <StitchFrame slug={STITCH_ROUTE_SLUGS.portfolio} title="Portfolio" />;
}
