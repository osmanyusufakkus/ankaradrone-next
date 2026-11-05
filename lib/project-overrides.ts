// YouTube kataloğundaki videolara ELLE eklenen bilgiler.
//
// lib/youtube-catalog.json `npm run sync:youtube` ile kanaldan üretilir ve elle
// düzenlenmez. Bir video için kanalda olmayan ya da farklı göstermek istediğiniz
// her şey buraya, videonun YouTube kimliğiyle (watch?v=… kısmı) yazılır.
// Burada kaydı olmayan videolar varsayılanlarla görünür: referans duvarında
// yer alır, sektör ve konum başlıktan çıkarılır, kart proje adını gösterir.
//
// Örnek:
//   "8UrXWCEwtjk": {
//     clientName: "Leda Grup",        // duvarda proje adı yerine firma adı
//     sector: "Konut",                // başlıktan çıkarılanın yerine
//     logoUrl: "/images/references/leda.png", // yalnızca izin alınmış logolar
//     previewStart: 5,                // önizlemenin başlayacağı saniye
//     order: 1,                       // duvarda/listede öne almak için (küçük önce)
//   },

export type ProjectOverride = {
  /** Referans duvarında gösterilsin mi. Varsayılan: true. */
  showAsReference?: boolean;
  /** true ise video sitede hiç görünmez (ne duvarda ne /projeler'de). */
  hidden?: boolean;
  /** Sıralama; küçük sayı önce. Verilmeyenler kanal sırasıyla (en yeni önce) sonra gelir. */
  order?: number;
  /** Duvardaki kartta gösterilecek ad. Varsayılan: proje adı. */
  clientName?: string;
  /** Kart üstündeki sektör etiketi. Varsayılan: başlıktaki türden çıkarılır. */
  sector?: string;
  /** Logo yokken kartta görünen baş harfler. Varsayılan: adın baş harfleri. */
  code?: string;
  /** public/images/references/ altındaki logo — yalnızca izin alınmış logolar. */
  logoUrl?: string;
  /** Logo firmanın değil projenin: kartta firma adı logoya ek olarak yazılır. */
  projectLogo?: boolean;
  /** Sayfa ve kart başlığı. Varsayılan: "Proje adı – Tür". */
  title?: string;
  /** Proje sayfasındaki metin. Varsayılan: YouTube açıklamasının projeye özel kısmı. */
  description?: string;
  location?: string;
  /** Proje sayfasında "Tarih". Varsayılan: YouTube yayın ayı. */
  date?: string;
  previewStart?: number;
};

export const PROJECT_OVERRIDES: Record<string, ProjectOverride> = {
  // Kanal tanıtım videosu — bir müşteri işi değil, duvarda yeri yok.
  "V_-NrZUmLfM": {
    showAsReference: false,
    title: "Ankara Drone – Tanıtım Videosu",
  },

  // ── Müşteri firmalar ve logolar ─────────────────────────────────────────
  // Duvarda firmanın logosu görünür. Firma adları YouTube açıklamalarından,
  // logolar müşteri logoları klasöründen alındı. Aynı firmanın birden fazla
  // işi varsa duvarda tek kart olur (en yeni işi); diğerleri /projeler'de kalır.
  //
  // Logo dosyaları video kapağının üstünde okunsun diye beyaza çevrildi;
  // altın gradyanlı ikisi (Vantage, TPY) kendi renginde. `projectLogo: true`:
  // logo firmanın değil projenin, kartta firma adı ayrıca yazılır.
  "P7N2s8DfzZM": { clientName: "Musaoğulları Wohnbau", sector: "Arsa", logoUrl: "/images/references/musaogullari-wohnbau.png" },
  "E8zgd9xOhOI": { clientName: "Musaoğulları Wohnbau", sector: "Arsa", logoUrl: "/images/references/musaogullari-wohnbau.png" },
  "8UrXWCEwtjk": { clientName: "Leda Grup & Yedisalkım İnşaat", logoUrl: "/images/references/leda-yedisalkim.png" },
  "NLmWdMysivw": { clientName: "Leda Grup & Yedisalkım İnşaat", logoUrl: "/images/references/leda-yedisalkim.png" },
  "gGKwXakttqs": { clientName: "Türk Group", logoUrl: "/images/references/turk-group.png" },
  "8hvHuyiMfgM": { clientName: "Türk Group", logoUrl: "/images/references/turk-group.png" },
  "BZYy_up4uiI": { clientName: "Helka İnşaat", logoUrl: "/images/references/helka-insaat.png" },
  "6Fr03xwU2pk": { clientName: "Helka İnşaat", sector: "Kurumsal Film", logoUrl: "/images/references/helka-insaat.png" },
  "9GTZmRRHSkc": { clientName: "Mesken Arsa", logoUrl: "/images/references/mesken-arsa.png" },
  "3tB-dcwUSs4": { clientName: "Ünsal Group", logoUrl: "/images/references/jewel-premium-beytepe.png", projectLogo: true },
  "Q3mLxhVRCPw": { clientName: "TPY Yapı", logoUrl: "/images/references/tpy-yapi.png" },
  "vF0Psg_Hsm4": { clientName: "Şahinler Group", logoUrl: "/images/references/viento-incek.png", projectLogo: true },
  "J0Rvb-IQ3oE": { clientName: "GYG", logoUrl: "/images/references/gyg.png" },
  // Firma adı bilinmiyor, kartta proje adı ve proje logosu.
  "eAjV9RHsxDY": { logoUrl: "/images/references/santra-cayyolu.png" },
  "6paS-VmutN4": { logoUrl: "/images/references/vantage-office.png" },
  // Logosu yok, kartta yalnızca ad yazıyor.
  "sooZ2YGqx20": { clientName: "Hit Yapı" },

  // TODO(içerik): Yeni Batı Plus Ankara ("043jp9LPDv4") için ne firma adı ne
  // logo var; kartta proje adıyla görünüyor. Hit Yapı'nın logosu da eksik.
};
