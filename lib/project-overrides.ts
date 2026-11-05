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

  // ── Müşteri firmalar ────────────────────────────────────────────────────
  // Duvarda proje adı yerine firma adı görünür. Adlar her videonun YouTube
  // açıklamasında yazdığı haliyle alındı ("… için hazırladık", "… tarafından
  // hayata geçirilen", "… imzasını taşıyan"). Aynı firmanın birden fazla işi
  // varsa duvarda tek kart olur (en yeni işi); diğerleri /projeler'de kalır.
  "P7N2s8DfzZM": { clientName: "Musaoğulları Wohnbau", sector: "Arsa" },
  "E8zgd9xOhOI": { clientName: "Musaoğulları Wohnbau", sector: "Arsa" },
  "8UrXWCEwtjk": { clientName: "Leda Grup & Yedisalkım İnşaat" },
  "NLmWdMysivw": { clientName: "Leda Grup & Yedisalkım İnşaat" },
  "gGKwXakttqs": { clientName: "Türk Group" },
  "8hvHuyiMfgM": { clientName: "Türk Group" },
  "BZYy_up4uiI": { clientName: "Helka İnşaat" },
  "6Fr03xwU2pk": { clientName: "Helka İnşaat", sector: "Kurumsal Film" },
  "9GTZmRRHSkc": { clientName: "Mesken Arsa" },
  "3tB-dcwUSs4": { clientName: "Ünsal Group" },
  "sooZ2YGqx20": { clientName: "Hit Yapı" },
  "Q3mLxhVRCPw": { clientName: "TPY Yapı" },
  "vF0Psg_Hsm4": { clientName: "Şahinler Group" },

  // TODO(içerik): Aşağıdaki dört videonun açıklamasında firma adı geçmiyor;
  // duvarda şimdilik proje adıyla görünüyorlar. Firma adını biliyorsanız
  // `clientName` ekleyin:
  //   "eAjV9RHsxDY" Santra Çayyolu
  //   "J0Rvb-IQ3oE" Silva Bağlıca
  //   "6paS-VmutN4" Vantage Ofis
  //   "043jp9LPDv4" Yeni Batı Plus Ankara
};
