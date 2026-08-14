import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Packages from "@/components/sections/Packages";
import Services from "@/components/sections/Services";
import References from "@/components/sections/References";
import Testimonials from "@/components/sections/Testimonials";
import CtaStrip from "@/components/sections/CtaStrip";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Packages />
      <Services />
      <References />
      <Testimonials />
      <CtaStrip />
    </>
  );
}
