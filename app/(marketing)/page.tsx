import { siteConfig } from "@/lib/seo/site";
import { StitchFrame } from "@/components/stitch/StitchFrame";
import { STITCH_ROUTE_SLUGS } from "@/lib/stitch/manifest";
import { TikTokSlider } from "@/components/stitch/TikTokSlider";

export const metadata = {
  title: siteConfig.defaultTitle,
  description: siteConfig.defaultDescription,
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <TikTokSlider />
      <StitchFrame slug={STITCH_ROUTE_SLUGS.home} title="Suphancasting home" />
    </div>
  );
}
