import { siteConfig } from "@/lib/seo/site";
import { StitchFrame } from "@/components/stitch/StitchFrame";
import { STITCH_ROUTE_SLUGS } from "@/lib/stitch/manifest";

export const metadata = {
  title: siteConfig.defaultTitle,
  description: siteConfig.defaultDescription,
};

export default function HomePage() {
  return <StitchFrame slug={STITCH_ROUTE_SLUGS.home} title="Suphancasting home" />;
}
