'use client';

import { HeroSection } from '@/components/home/HeroSection';
import { PartnersSection } from '@/components/home/PartnersSection';
import { StatsSection } from '@/components/home/StatsSection';
import { WhyExistSection } from '@/components/home/WhyExistSection';
import { ChallengesSection } from '@/components/home/ChallengesSection';
import { FrameworkSection } from '@/components/home/FrameworkSection';
import { IndustriesSection } from '@/components/home/IndustriesSection';
import { ForgeSection } from '@/components/home/ForgeSection';
import { CtaSection } from '@/components/home/CtaSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PartnersSection />
      <StatsSection />
      <WhyExistSection />
      <ChallengesSection />
      <FrameworkSection />
      <IndustriesSection />
      <ForgeSection />
      <CtaSection />
    </>
  );
}
