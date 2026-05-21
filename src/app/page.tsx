import { AmbientShell } from "@/components/sections/home/AmbientShell";
import { HeroHome } from "@/components/sections/home/HeroHome";
import { PartnersMarquee } from "@/components/sections/home/PartnersMarquee";
import { StatsHome } from "@/components/sections/home/StatsHome";
import { ImageExpansion } from "@/components/sections/home/ImageExpansion";
import { ProblemsHome } from "@/components/sections/home/ProblemsHome";
import { FrameworkSticky } from "@/components/sections/home/FrameworkSticky";
import { HorizontalIndustries } from "@/components/sections/home/HorizontalIndustries";
import { WorkSamples } from "@/components/sections/home/WorkSamples";
import { ForgeShowcase } from "@/components/sections/home/ForgeShowcase";
import { CtaHome } from "@/components/sections/home/CtaHome";

export default function HomePage() {
  return (
    <AmbientShell>
      <HeroHome />
      <PartnersMarquee />
      <StatsHome />
      <ImageExpansion />
      <ProblemsHome />
      <FrameworkSticky />
      <HorizontalIndustries />
      <WorkSamples />
      <ForgeShowcase />
      <CtaHome />
    </AmbientShell>
  );
}
