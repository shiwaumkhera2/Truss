import { IntroProvider } from "@/components/providers/Intro";
import { Preloader } from "@/components/chrome/Preloader";
import { Nav } from "@/components/chrome/Nav";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Showcase } from "@/components/sections/Showcase";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TrustBand } from "@/components/sections/TrustBand";
import { Founders } from "@/components/sections/Founders";
import { FinalCta } from "@/components/sections/FinalCta";

export default function HomePage() {
  return (
    <IntroProvider>
      <Preloader />
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Showcase />
        <HowItWorks />
        <TrustBand />
        <Founders />
        <FinalCta />
      </main>
    </IntroProvider>
  );
}
