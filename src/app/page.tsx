import { Hero } from "@/components/sections/Hero";
import { ProgramPreview } from "@/components/sections/ProgramPreview";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { PracticalInfo } from "@/components/sections/PracticalInfo";
import { Newsletter } from "@/components/sections/Newsletter";
import { JsonLd } from "@/components/seo/JsonLd";
import { festivalSchema } from "@/lib/structured-data";
import { getLocale } from "@/i18n/server";

export default async function Home() {
  const locale = await getLocale();

  return (
    <>
      <JsonLd data={festivalSchema(locale)} />
      <Hero />
      <ProgramPreview />
      <ExperienceSection />
      <AboutSection />
      <PracticalInfo />
      <Newsletter />
    </>
  );
}
