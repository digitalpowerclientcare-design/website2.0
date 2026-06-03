"use client";

import { useState } from "react";
import { HeroCarousel } from "@/components/sections/home/HeroCarousel";
import { PartnersMarquee } from "@/components/sections/home/PartnersMarquee";
import { ServicesTabs } from "@/components/sections/home/ServicesTabs";
import { HomeStats } from "@/components/sections/home/HomeStats";
import { IndustryCaseStudies } from "@/components/sections/home/IndustryCaseStudies";
import { CtaHome } from "@/components/sections/home/CtaHome";
import type { ServiceId } from "@/lib/homeContent";

export function HomePageClient() {
  const [activeService, setActiveService] = useState<ServiceId>("consultation");

  return (
    <>
      <HeroCarousel />
      <PartnersMarquee />
      <ServicesTabs activeTab={activeService} onTabChange={setActiveService} />
      <HomeStats service={activeService} />
      <IndustryCaseStudies />
      <CtaHome />
    </>
  );
}
