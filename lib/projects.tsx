import { PLACEHOLDER_VIDEO_SRC } from "@/lib/media";

// TEK VERİ KAYNAĞI.
//
// Ana sayfadaki Referanslar duvarı ile /projeler sayfası aynı diziden beslenir:
// duvar `showAsReference` işaretli kayıtları müşteri markasıyla gösterir,
// /projeler tamamını listeler. Bir kaydı burada düzenlediğinizde ikisi birden
// güncellenir — ve bir referans kartının gideceği sayfanın var olmaması veri
// düzeyinde imkânsız hale gelir.
//
// Yeni bir iş eklemek için gereken asgari alanlar: slug, title, youtubeId.
// Kapak görseli ayrıca hazırlanmaz, YouTube'dan türetilir (bkz. lib/youtube.ts).

export type ProjectClient = {
  name: string;
  sector: string;
  /** Logo dosyası yoksa gösterilen baş harf rozeti. */
  code: string;
  /** Baş harf rozetinin arka plan rengi. */
  color: string;
  /** public/images/references/ altındaki logo — yalnızca izin alınmış logolar. */
  logoUrl?: string;
};

export type Project = {
  slug: string;
  title: string;
  /** ProjectCover'ın kapak görseli yokken kullandığı vurgu rengi. */
  accentColor: string;
  /** İşin YouTube id'si — kapak, önizleme ve lightbox hep bundan türer. */
  youtubeId?: string;
  /** 9:16 (Shorts) yükleme mi? Kapak varyantını ve kutu oranını belirler. */
  youtubeVertical?: boolean;
  /** Önizlemenin başlayacağı saniye — girişteki yavaş açılışı atlar. */
  previewStart?: number;
  /** Henüz YouTube'a yüklenmemiş işler için geçici yerel klip. */
  videoSrc?: string;
  coverImage?: string;
  description?: string;
  location?: string;
  date?: string;
  gallery?: string[];
  /** İş bir müşteri için yapıldıysa — Referanslar duvarında bu bilgiyle görünür. */
  client?: ProjectClient;
  /** Ana sayfadaki Referanslar duvarında gösterilsin mi (sıra bu dizideki sıra). */
  showAsReference?: boolean;
};

// TODO(içerik): Aşağıdaki firma adları ve etiketler YER TUTUCUDUR — bu firmalar
// müşteriniz değil. Yayına almadan önce yalnızca gerçekten çalıştığınız firmaları
// bırakın; bir firmanın adını veya logosunu izinsiz kullanmak marka hakkı ihlali
// sayılabilir. Logo eklemek için müşteriden yazılı onay alın.
//
// TODO(içerik): Şu an tek gerçek video ilk kayıtta. Diğerlerine `youtubeId` ve
// `previewStart` girildikçe kapak, önizleme ve lightbox kendiliğinden çalışır.
export const PROJECTS: Project[] = [
  {
    slug: "ictas-santiye-cekimi",
    title: "İçtaş İnşaat – Şantiye Çekimi",
    accentColor: "rgba(33,150,243,.25)",
    youtubeId: "V_-NrZUmLfM",
    youtubeVertical: true,
    previewStart: 3,
    showAsReference: true,
    client: {
      name: "İÇTAŞ İNŞAAT",
      sector: "İnşaat",
      code: "İÇ",
      color: "rgba(33,150,243,.25)",
    },
  },
  {
    slug: "emlak-konut-proje-tanitim",
    title: "Emlak Konut – Proje Tanıtım",
    accentColor: "rgba(255,150,0,.2)",
    videoSrc: PLACEHOLDER_VIDEO_SRC,
    showAsReference: true,
    client: {
      name: "EMLAK KONUT",
      sector: "Gayrimenkul",
      code: "EM",
      color: "rgba(255,150,0,.2)",
      logoUrl: "/images/references/emlakkonut.png",
    },
  },
  {
    slug: "toki-hava-belgeleme",
    title: "TOKİ – Hava Belgeleme",
    accentColor: "rgba(76,175,80,.2)",
    videoSrc: PLACEHOLDER_VIDEO_SRC,
    showAsReference: true,
    client: {
      name: "TOKİ",
      sector: "Konut",
      code: "TO",
      color: "rgba(76,175,80,.2)",
      logoUrl: "/images/references/toki.png",
    },
  },
  {
    slug: "ankamall-etkinlik-cekimi",
    title: "ANKAmall – Etkinlik Çekimi",
    accentColor: "rgba(233,30,99,.2)",
    videoSrc: PLACEHOLDER_VIDEO_SRC,
    showAsReference: true,
    client: {
      name: "ANKAmall",
      sector: "Ticaret",
      code: "AN",
      color: "rgba(233,30,99,.2)",
    },
  },
  {
    slug: "aeropark-tesis-dokumantasyonu",
    title: "Aeropark – Tesis Dokümantasyonu",
    accentColor: "rgba(255,87,34,.2)",
    videoSrc: PLACEHOLDER_VIDEO_SRC,
    showAsReference: true,
    client: {
      name: "AEROPARK",
      sector: "Sanayi",
      code: "AE",
      color: "rgba(255,87,34,.2)",
    },
  },
  {
    slug: "kaya-yapi-3d-modelleme",
    title: "Kaya Yapı – 3D Modelleme",
    accentColor: "rgba(33,150,243,.2)",
    videoSrc: PLACEHOLDER_VIDEO_SRC,
    showAsReference: true,
    client: {
      name: "KAYA YAPI",
      sector: "İnşaat",
      code: "KY",
      color: "rgba(33,150,243,.2)",
    },
  },
  {
    slug: "akfen-proje-belgeleme",
    title: "Akfen – Proje Belgeleme",
    accentColor: "rgba(156,39,176,.2)",
    videoSrc: PLACEHOLDER_VIDEO_SRC,
    showAsReference: true,
    client: {
      name: "AKFEN",
      sector: "Altyapı",
      code: "AK",
      color: "rgba(156,39,176,.2)",
    },
  },
  {
    slug: "ozak-gyo-satis-filmi",
    title: "Özak GYO – Satış Filmi",
    accentColor: "rgba(0,188,212,.2)",
    videoSrc: PLACEHOLDER_VIDEO_SRC,
    showAsReference: true,
    client: {
      name: "ÖZAK GYO",
      sector: "Gayrimenkul",
      code: "OZ",
      color: "rgba(0,188,212,.2)",
    },
  },
  {
    slug: "setur-tanitim-filmi",
    title: "Setur – Tanıtım Filmi",
    accentColor: "rgba(255,193,7,.2)",
    videoSrc: PLACEHOLDER_VIDEO_SRC,
    showAsReference: true,
    client: {
      name: "SETUR",
      sector: "Turizm",
      code: "ST",
      color: "rgba(255,193,7,.2)",
    },
  },
  {
    slug: "meb-kampus-cekimi",
    title: "MEB – Kampüs Çekimi",
    accentColor: "rgba(33,150,243,.2)",
    videoSrc: PLACEHOLDER_VIDEO_SRC,
    showAsReference: true,
    client: {
      name: "MEB",
      sector: "Kamu",
      code: "MB",
      color: "rgba(33,150,243,.2)",
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

/** Ana sayfadaki Referanslar duvarında gösterilecek işler. */
export const REFERENCE_PROJECTS = PROJECTS.filter(
  (project) => project.showAsReference && project.client,
);

/**
 * Vitrin panosunun açılıştaki içeriği: gerçek videosu olan ilk iş. Böylece
 * ziyaretçi hover etmeden de gerçek bir kare görür, gradyan yer tutucu değil.
 */
export const SHOWCASE_DEFAULT =
  REFERENCE_PROJECTS.find((project) => project.youtubeId) ?? REFERENCE_PROJECTS[0];
