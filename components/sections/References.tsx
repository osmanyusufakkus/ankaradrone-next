import FadeUp from "@/components/ui/FadeUp";
import Eyebrow from "@/components/ui/Eyebrow";
import ReferenceWall from "@/components/ui/ReferenceWall";
import { REFERENCE_PROJECTS } from "@/lib/projects";

// Bu bölüm artık kendi veri listesini tutmuyor — lib/projects.tsx içindeki tek
// kaynaktan `showAsReference` işaretli işleri okuyor. Böylece her referansın
// gideceği bir proje sayfası olduğu garanti.
export default function References() {
  return (
    <section id="references" className="section-black-to-dark scroll-mt-24 py-25">
      <div className="mx-auto max-w-[1240px] px-8">
        <FadeUp className="mb-14">
          <Eyebrow>Referanslarımız</Eyebrow>
          <h2 className="section-title-glow mb-4 font-display text-[clamp(42px,5.5vw,72px)] leading-[0.95] text-brand-white">
            BİZE <span className="section-title-glow-accent text-brand-blue">GÜVENENLER</span>
          </h2>
          <p className="max-w-[580px] text-base leading-relaxed font-light text-brand-offwhite">
            Bir markanın üzerine gelin, o iş için çektiğimiz video yandaki panoda
            görünsün. Tıkladığınızda video büyür ve projenin tamamına
            geçebilirsiniz.
          </p>
        </FadeUp>

        <FadeUp delay="0.1s">
          <ReferenceWall projects={REFERENCE_PROJECTS} />
        </FadeUp>
      </div>
    </section>
  );
}
