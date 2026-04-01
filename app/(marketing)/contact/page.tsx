import type { Metadata } from "next";
import { siteConfig } from "@/lib/seo/site";
import { StitchFrame } from "@/components/stitch/StitchFrame";
import { STITCH_ROUTE_SLUGS } from "@/lib/stitch/manifest";

export const metadata: Metadata = {
  title: `Contact | ${siteConfig.fullName}`,
  description: "Contact Suphan Casting (Stitch design preview).",
};

export default function ContactPage() {
  return <StitchFrame slug={STITCH_ROUTE_SLUGS.contact} title="Contact" />;
}
