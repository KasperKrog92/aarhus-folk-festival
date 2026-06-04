import { Hero } from "@/components/sections/Hero";
import { ProgramPreview } from "@/components/sections/ProgramPreview";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { PracticalInfo } from "@/components/sections/PracticalInfo";
import { Newsletter } from "@/components/sections/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <ProgramPreview />
      <ExperienceSection />
      <AboutSection />
      <PracticalInfo />
      <Newsletter />
    </>
  );
}
