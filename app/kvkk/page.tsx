import type { Metadata } from "next";
import Eyebrow from "@/components/ui/Eyebrow";
import { CONTACT, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `KVKK Aydınlatma Metni – ${SITE_NAME}`,
  description:
    "AnkaraDrone iletişim formu aracılığıyla toplanan kişisel verilerin işlenmesine ilişkin aydınlatma metni.",
  // A legal page carries no search value and shouldn't compete with the
  // service pages in the index.
  robots: { index: false, follow: true },
};

// TODO(içerik): Bu metin çalışan bir taslaktır, hukuki onaydan geçmemiştir.
// Yayına almadan önce bir avukata/mali müşavire kontrol ettirin ve aşağıdaki
// köşeli parantezli alanları şirketin gerçek bilgileriyle doldurun.

const SECTIONS = [
  {
    heading: "1. Veri Sorumlusu",
    body: `Kişisel verileriniz, veri sorumlusu sıfatıyla ${SITE_NAME} (${CONTACT.addressLine}) tarafından, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında aşağıda açıklanan çerçevede işlenmektedir.`,
  },
  {
    heading: "2. İşlenen Kişisel Veriler",
    body: "Web sitemizdeki iletişim formu aracılığıyla yalnızca sizin ilettiğiniz ad soyad bilginiz, e-posta adresiniz veya telefon numaranız, ilgilendiğiniz hizmet türü ve mesaj içeriğiniz işlenmektedir. Form üzerinden bunların dışında herhangi bir veri toplanmamaktadır.",
  },
  {
    heading: "3. İşleme Amacı",
    body: "Bu veriler yalnızca talebinize dönüş yapılması, fiyat teklifi hazırlanması ve hizmet sürecinin yürütülmesi amacıyla işlenir. Onayınız olmadan pazarlama iletisi gönderilmez.",
  },
  {
    heading: "4. Hukuki Sebep",
    body: "Verileriniz, KVKK m.5/2-(c) uyarınca sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması ve m.5/1 uyarınca açık rızanız hukuki sebeplerine dayanılarak işlenmektedir.",
  },
  {
    heading: "5. Aktarım",
    body: "Form mesajlarınız, e-posta iletimi amacıyla kullandığımız hizmet sağlayıcının sunucuları üzerinden iletilir ve kurumsal e-posta kutumuzda saklanır. Bunun dışında hiçbir üçüncü kişiyle paylaşılmaz, yurt dışına aktarılmaz ve satılmaz.",
  },
  {
    heading: "6. Saklama Süresi",
    body: "Verileriniz, talebinizin sonuçlanmasının ardından ticari ilişki kurulmadıysa en fazla 1 yıl; ticari ilişki kurulduysa ilgili mevzuatın öngördüğü yasal saklama süreleri boyunca saklanır, sürenin sonunda silinir.",
  },
  {
    heading: "7. Çerezler ve Ziyaret İstatistikleri",
    body: "Sitemiz reklam veya takip çerezi kullanmaz. Ziyaret sayılarını ve sayfa açılış hızını ölçmek için çerez kullanmayan, kişiyi tanımlamayan ve siteler arası profil oluşturmayan bir istatistik aracı kullanılmaktadır. Bu ölçüm kişisel veri niteliği taşımadığından ayrıca onayınız alınmamaktadır.",
  },
  {
    heading: "8. Haklarınız",
    body: `KVKK m.11 uyarınca kişisel verilerinizin işlenip işlenmediğini öğrenme, düzeltilmesini, silinmesini veya yok edilmesini isteme ve işlemeye itiraz etme haklarına sahipsiniz. Taleplerinizi ${CONTACT.email} adresine iletebilirsiniz.`,
  },
];

export default function KvkkPage() {
  return (
    <article className="bg-brand-black pt-40 pb-25">
      <div className="mx-auto max-w-3xl px-8">
        <Eyebrow>Yasal</Eyebrow>
        <h1 className="mb-10 font-display text-[clamp(36px,5vw,64px)] leading-[0.95] text-brand-white">
          KVKK <span className="text-brand-blue">AYDINLATMA METNİ</span>
        </h1>

        <div className="flex flex-col gap-8">
          {SECTIONS.map((section) => (
            <section key={section.heading}>
              <h2 className="mb-2.5 text-[11px] font-bold tracking-widest text-brand-blue uppercase">
                {section.heading}
              </h2>
              <p className="text-[15px] leading-loose font-light text-brand-offwhite">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        <p className="mt-12 border-t border-white/8 pt-6 text-xs leading-relaxed text-white/35">
          Sorularınız için:{" "}
          <a
            href={`mailto:${CONTACT.email}`}
            className="rounded text-brand-blue underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          >
            {CONTACT.email}
          </a>
        </p>
      </div>
    </article>
  );
}
