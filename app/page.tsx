import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Packages from "@/components/sections/Packages";
import Services from "@/components/sections/Services";
import References from "@/components/sections/References";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Packages />
      <Services />
      <References />
      <Testimonials />
      {/* SSS iletişimden hemen önce: son itirazları cevaplayıp teklif formuna
          bırakıyor. */}
      <Faq />
      <Contact />
    </>
  );
}
