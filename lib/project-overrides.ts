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
  // Arsa tanıtımları: başlıkta proje/marka adı olmadığı için duvarda değil,
  // /projeler'de görünüyorlar.
  "P7N2s8DfzZM": { showAsReference: false, sector: "Arsa" },
  "E8zgd9xOhOI": { showAsReference: false, sector: "Arsa" },
};
