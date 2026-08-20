# AnkaraDrone Web Sitesi

Ankara merkezli drone çekim hizmetleri için tek sayfalık tanıtım sitesi + proje portföyü.
Next.js 16 (App Router), React 19, Tailwind CSS v4, TypeScript.

Bu doküman **neyi nereden değiştireceğinizi** anlatır. Yayın öncesi yapılacaklar ayrı
bir dosyada: [PUBLISH_CHECKLIST.md](./PUBLISH_CHECKLIST.md).

---

## İçindekiler

1. [Hızlı başlangıç](#1-hızlı-başlangıç)
2. [Şunu değiştirmek istiyorum](#2-şunu-değiştirmek-istiyorum)
3. [Klasör yapısı](#3-klasör-yapısı)
4. [İçerik dosyaları (en çok dokunacağınız yerler)](#4-i̇çerik-dosyaları)
5. [Sayfalar](#5-sayfalar)
6. [Bölümler](#6-bölümler)
7. [UI bileşenleri](#7-ui-bileşenleri)
8. [Hook'lar](#8-hooklar)
9. [Yardımcı kütüphaneler](#9-yardımcı-kütüphaneler)
10. [Stil sistemi](#10-stil-sistemi)
11. [Ortam değişkenleri](#11-ortam-değişkenleri)
12. [Sık yapılan işler](#12-sık-yapılan-işler)
13. [Tuzaklar](#13-tuzaklar)

---

## 1. Hızlı başlangıç

```bash
npm install
```

Ardından `.env.example` dosyasını `.env.local` olarak kopyalayıp doldurun
(bkz. [Ortam değişkenleri](#11-ortam-değişkenleri)).

| Komut | Ne yapar |
|---|---|
| `npm run dev` | Geliştirme sunucusu — http://localhost:3000, kaydettikçe anında yenilenir |
| `npm run build` | Üretim derlemesi. Yayına almadan önce **mutlaka** çalıştırın, hatalar burada çıkar |
| `npm start` | `build` çıktısını üretim modunda çalıştırır |
| `npm run lint` | Kod denetimi |

Tip hatalarını ayrıca görmek için: `npx tsc --noEmit`

> `npm run build` çıktısı proje kökündeki `.next/` klasörüne yazılır ve git'e gönderilmez.
> Bu klasör **tek başına taşınabilir değildir** — site çalışmak için `node_modules` ve
> bir Node sunucusu ister.

---

## 2. Şunu değiştirmek istiyorum

Aradığınız satırı bulun, karşısındaki dosyayı açın.

| İstediğiniz değişiklik | Dosya |
|---|---|
| Telefon, e-posta, adres | `lib/site.ts` → `CONTACT` |
| Instagram / YouTube bağlantısı | `lib/site.ts` → `SOCIAL_LINKS` |
| Site başlığı, açıklaması, alan adı | `lib/site.ts` |
| İletişim formundaki "proje tipi" seçenekleri | `lib/site.ts` → `PROJECT_TYPES` |
| Proje eklemek/çıkarmak, referans duvarı | `lib/projects.tsx` → `PROJECTS` |
| SSS soruları ve cevapları | `lib/faq.ts` → `FAQ_ITEMS` |
| Hero arka plan videosu | `lib/media.ts` → `HERO_YOUTUBE_ID` |
| Yer tutucu (dummy) video | `lib/media.ts` → `PLACEHOLDER_VIDEO_SRC` |
| Hizmet paketleri (4 adet) | `components/sections/Packages.tsx` → `PACKAGES` |
| Hizmet kartları (6 adet) | `components/sections/Services.tsx` → `SERVICES` |
| İstatistik rakamları | `components/sections/Stats.tsx` → `STATS` |
| Müşteri yorumları | `components/sections/Testimonials.tsx` → `TESTIMONIALS` |
| Hero başlığı / alt metni | `components/sections/Hero.tsx` |
| Menü bağlantıları | `components/layout/Navbar.tsx` → `NAV_LINKS` |
| Footer hizmet listesi | `components/layout/Footer.tsx` → `SERVICE_LINKS` |
| Bölümlerin sayfadaki sırası | `app/page.tsx` |
| Renkler, yazı tipleri, köşe yuvarlaması | `app/globals.css` → `@theme` |
| KVKK metni | `app/kvkk/page.tsx` → `SECTIONS` |
| Sosyal medya paylaşım görseli | `app/opengraph-image.tsx` |
| Formun gittiği mail adresi | `.env.local` → `CONTACT_TO_EMAIL` |

---

## 3. Klasör yapısı

```
ankaradrone-next/
├─ app/                  Sayfalar ve rotalar (Next.js App Router)
│  ├─ layout.tsx         Tüm sayfaları saran kabuk: font, metadata, navbar, footer
│  ├─ page.tsx           Ana sayfa — sadece bölümleri sırayla dizer
│  ├─ globals.css        Tema değişkenleri, animasyonlar, global stiller
│  ├─ projeler/          Portföy sayfaları
│  ├─ kvkk/              Aydınlatma metni
│  ├─ sitemap.ts         /sitemap.xml üretir
│  ├─ robots.ts          /robots.txt üretir
│  ├─ opengraph-image.tsx Paylaşım kartı görselini üretir
│  ├─ not-found.tsx      404 sayfası
│  └─ error.tsx          Beklenmeyen hata sayfası
├─ components/
│  ├─ layout/            Her sayfada görünenler (Navbar, Footer)
│  ├─ sections/          Ana sayfanın blokları
│  └─ ui/                Yeniden kullanılan parçalar
├─ hooks/                Ortak React mantığı
├─ lib/                  İçerik verisi ve yardımcı fonksiyonlar
└─ public/images/        Görseller (logo, referans logoları)
```

---

## 4. İçerik dosyaları

En çok dokunacağınız dosyalar bunlar. Hepsi düz TypeScript dizisi/nesnesi — JSX bilmenize gerek yok.

### `lib/site.ts` — şirket bilgileri

Sitedeki **tüm** iletişim bilgisinin tek kaynağı. Buradaki bir değeri değiştirdiğinizde
footer, iletişim formu, WhatsApp butonu, Google'a verilen işletme bilgisi ve paylaşım
kartı hep birlikte güncellenir.

| Alan | Format | Nerede görünür |
|---|---|---|
| `SITE_URL` | `"https://..."` (sonda `/` yok) | sitemap, robots, JSON-LD |
| `SITE_NAME` | Metin | Footer, JSON-LD |
| `SITE_TITLE` | Metin | Tarayıcı sekmesi, Google sonucu |
| `SITE_DESCRIPTION` | Metin | Google sonucu, paylaşım kartı |
| `CONTACT.email` | `"info@..."` | Footer, form, iletişim kartı |
| `CONTACT.phoneDisplay` | `"+90 554 ..."` | Ekranda görünen telefon |
| `CONTACT.addressLine` | Metin | Footer, JSON-LD |
| `SOCIAL_LINKS` | `{ href, label, key }[]` | Footer ikonları |
| `PROJECT_TYPES` | `{ id, label }[]` | Formdaki "proje tipi" listesi |

> Telefon numarası dosyanın içindeki `PHONE_E164` sabitinden türer (sadece rakam,
> ülke kodu dahil: `905545480697`). `tel:` ve WhatsApp bağlantıları oradan üretilir,
> yani numarayı **tek yerde** değiştirirsiniz.

`SOCIAL_LINKS` içindeki `key` değeri ikonu seçer; şu an `instagram` ve `youtube`
tanımlı (ikonlar `components/layout/Footer.tsx` → `SOCIAL_ICONS`).

### `lib/projects.tsx` — projeler + referanslar

**Tek veri kaynağı.** Hem `/projeler` sayfasını hem ana sayfadaki Referanslar duvarını
besler. Bir kaydı burada düzenlediğinizde ikisi birden güncellenir.

```ts
{
  slug: "ictas-santiye-cekimi",     // ZORUNLU. Adres: /projeler/ictas-santiye-cekimi
  title: "İçtaş İnşaat – Şantiye Çekimi",  // ZORUNLU
  accentColor: "rgba(33,150,243,.25)",     // ZORUNLU. Kapak yoksa kullanılan renk
  youtubeId: "V_-NrZUmLfM",         // Videonun YouTube id'si
  youtubeVertical: true,            // 9:16 (Shorts) ise true
  previewStart: 3,                  // Hover önizlemesi kaçıncı saniyeden başlasın
  showAsReference: true,            // Ana sayfadaki referans duvarında görünsün mü
  client: {                         // Müşteri bilgisi (referans duvarı bunu gösterir)
    name: "İÇTAŞ İNŞAAT",
    sector: "İnşaat",
    code: "İÇ",                     // Logo yoksa gösterilen baş harf rozeti
    color: "rgba(33,150,243,.25)",  // Rozetin arka plan rengi
    logoUrl: "/images/references/x.png",  // İsteğe bağlı
  },
  // İsteğe bağlı ek alanlar:
  description: "...",  location: "...",  date: "...",
  coverImage: "/images/...",   // Elle kapak vermek isterseniz
  gallery: ["/images/a.jpg"],  // Proje sayfasındaki galeri
  videoSrc: "...",             // Henüz YouTube'a yüklenmemişse geçici yerel video
}
```

**Yeni bir iş eklemek için asgari üç alan yeter: `slug`, `title`, `youtubeId`.**
Kapak görselini ayrıca hazırlamanız gerekmez — YouTube'dan otomatik alınır.

`youtubeId` nereden bulunur: video adresindeki `v=` sonrası veya Shorts adresindeki
son parça. Örnek: `youtube.com/shorts/V_-NrZUmLfM` → `V_-NrZUmLfM`

Dosyanın sonunda üç türetilmiş değer var, bunlara dokunmanıza gerek yok:
`getProjectBySlug()`, `REFERENCE_PROJECTS` (duvarda görünenler), `SHOWCASE_DEFAULT`
(vitrin panosunun açılıştaki içeriği — videosu olan ilk iş).

### `lib/faq.ts` — SSS

```ts
{
  id: "sss-teslimat",                    // Adres çubuğu bağlantısı: /#sss-teslimat
  question: "Görüntüleri hangi formatta teslim ediyorsunuz?",
  answer: "İlk paragraf.\n\nİkinci paragraf.",
}
```

`answer` içinde **boş satır** bırakırsanız ayrı paragraf olarak basılır.
Soru eklemek/çıkarmak için sadece diziyi düzenleyin — numaralandırma (01, 02…),
düzen ve arama motorlarına verilen yapısal veri kendiliğinden güncellenir.

> Yayınladıktan sonra `id` değerlerini **değiştirmeyin**; paylaştığınız bağlantılar kırılır.

### `lib/media.ts` — yer tutucu medya

| Sabit | Ne işe yarar |
|---|---|
| `PLACEHOLDER_VIDEO_SRC` | Gerçek videosu olmayan kartlarda oynayan geçici klip. **Yayına çıkmamalı.** |
| `HERO_YOUTUBE_ID` | Ana sayfa arka plan videosu. `undefined` ise yerel yer tutucu oynar. |
| `HERO_YOUTUBE_VERTICAL` | Hero videosu 9:16 ise `true` |

### Bölüm içindeki veriler

Bazı bölümlerin verisi kendi dosyasının en üstünde durur:

| Bölüm | Dizi | Alanlar |
|---|---|---|
| `Packages.tsx` | `PACKAGES` | `id, num, tag, label, title, desc, features[], gradient, icon, youtubeId?, youtubeVertical?, previewStart?, videoSrc?` |
| `Services.tsx` | `SERVICES` | `id, title, desc, icon` |
| `Stats.tsx` | `STATS` | `id, value (sayı), suffix, label, icon` |
| `Testimonials.tsx` | `TESTIMONIALS` | `id, quote, name, role` |
| `Footer.tsx` | `SERVICE_LINKS` | Düz metin dizisi |
| `Navbar.tsx` | `NAV_LINKS` | `{ href, label }` |

İki alan dikkat ister:

- **`title` (Packages)** — JSX'tir, içinde `<br />` ile satır kırabilirsiniz.
  Yanındaki **`label`** ise aynı başlığın düz metin hâlidir; ekran okuyucular ve
  video etiketleri onu kullanır. Başlığı değiştirirseniz ikisini de güncelleyin.
- **`icon`** — SVG'nin *iç* parçalarıdır (`<path>`, `<circle>`…), `<svg>` etiketinin
  kendisi bileşen tarafından eklenir. Yeni ikon eklerken sadece iç etiketleri yapıştırın.
- **`gradient` (Packages)** — Tailwind sınıfı olarak yazılmış degrade;
  kartta kapağın üstüne binen renk katmanını belirler.

---

## 5. Sayfalar

| Dosya | Adres | Ne yapar |
|---|---|---|
| `app/layout.tsx` | — | Tüm sayfaları saran kabuk. Fontları yükler, `<head>` metadata'sını, Google'a verilen işletme bilgisini (JSON-LD), Navbar/Footer/WhatsApp butonunu ve analitiği buraya koyar. |
| `app/page.tsx` | `/` | Ana sayfa. İçinde mantık yok — sadece bölümleri sırayla dizer. **Bölüm sırasını buradan değiştirirsiniz.** |
| `app/projeler/page.tsx` | `/projeler` | Tüm projelerin ızgarası |
| `app/projeler/[slug]/page.tsx` | `/projeler/xxx` | Proje detayı. Her `slug` için ayrı sayfa derleme sırasında üretilir. |
| `app/kvkk/page.tsx` | `/kvkk` | Aydınlatma metni. Arama motorlarına kapalıdır. |
| `app/not-found.tsx` | (404) | Olmayan adres |
| `app/error.tsx` | (hata) | Beklenmeyen çökme durumunda gösterilir |
| `app/sitemap.ts` | `/sitemap.xml` | Projeler dahil tüm adresleri listeler, otomatik |
| `app/robots.ts` | `/robots.txt` | Arama motoru yönergeleri |
| `app/opengraph-image.tsx` | (görsel) | WhatsApp/LinkedIn paylaşımında görünen 1200×630 kart |

---

## 6. Bölümler

`components/sections/` — ana sayfanın blokları. Sıraları `app/page.tsx`'te.

| Bölüm | `id` | Ne gösterir |
|---|---|---|
| `Hero.tsx` | `#hero` | Açılış ekranı: arka plan videosu, başlık, iki buton, fare ile hareket eden drone çizimi |
| `Stats.tsx` | — | Dört rakam, ekrana girince sayarak artar |
| `Packages.tsx` | `#packages` | Dört hizmet paketi, zikzak düzende, hover'da video önizlemesi. Sonunda "Tüm Projeler" kartı. |
| `Services.tsx` | `#services` | Altı hizmet kartı |
| `References.tsx` | `#references` | Logo duvarı + büyük vitrin panosu. Verisini `lib/projects.tsx`'ten alır. |
| `Testimonials.tsx` | — | Müşteri yorumları. Dizi boşsa "çok yakında" durumunu gösterir. |
| `Faq.tsx` | `#sss` | SSS akordeonu. JavaScript kullanmaz. |
| `Contact.tsx` | `#contact` | İletişim formu + doğrudan iletişim kartları |

---

## 7. UI bileşenleri

`components/ui/` — birden fazla yerde kullanılan parçalar.

| Bileşen | Ne yapar | Nerede kullanılır |
|---|---|---|
| `Button.tsx` | Buton/bağlantı. `href` verilirse bağlantı, verilmezse gerçek buton olur. `/` ile başlayan adreslerde sayfa yenilenmeden geçiş yapar. `variant="outline"` ikinci stil. | Her yer |
| `VideoCard.tsx` | Kapak + hover'da YouTube önizlemesi + tıklayınca lightbox açan kart | Paketler, proje detayı |
| `VideoLightbox.tsx` | Videoyu büyük açan pencere. `projectHref` verilirse yanında "Projeyi İncele" düğmesi çıkar. ESC ve dışarı tıklama kapatır. | VideoCard, ReferenceWall |
| `ReferenceWall.tsx` | Logo duvarı + vitrin panosu. Hangi logonun üzerine gelinirse pano onu gösterir. | Referanslar |
| `YouTubeEmbed.tsx` | YouTube gömme. `background` modu sessiz/döngülü/kontrolsüz oynatır ve kabı kaplar. | VideoCard, ReferenceWall, Hero |
| `ProjectCover.tsx` | Proje kapak görseli. Sırayla: elle verilen kapak → YouTube kapağı → renkli yer tutucu. | Projeler sayfaları |
| `ContactForm.tsx` | Formun kendisi: doğrulama, hata mesajları, gönderiliyor durumu, spam tuzağı, KVKK onayı | İletişim |
| `Eyebrow.tsx` | Bölüm başlıklarının üstündeki küçük mavi etiket | Tüm bölümler |
| `FadeUp.tsx` | İçeriği ekrana girince aşağıdan yukarı belirtir | Tüm bölümler |
| `CountUp.tsx` | Sayıyı 0'dan hedefe animasyonla çıkarır | İstatistikler |
| `ScrollProgress.tsx` | Sayfanın en üstündeki ince ilerleme çubuğu | Layout |
| `WhatsAppFab.tsx` | Sadece mobilde, sağ altta sabit duran WhatsApp butonu | Layout |

---

## 8. Hook'lar

`hooks/` — bileşenlerin paylaştığı React mantığı.

| Hook | Ne döner | Neden var |
|---|---|---|
| `useMediaQuery(sorgu, sunucuVarsayılanı)` | `true/false` | Bir CSS medya sorgusunu React içinden okur |
| `useHoverCapable()` | `true` = fare var | Dokunmatik cihazda hover'a bağlı hiçbir şeyi çalıştırmamak için. Telefonda video/iframe hiç yüklenmez. |
| `useReducedMotion()` | `true` = hareket azalt | İşletim sisteminde "hareketi azalt" seçen kullanıcıda otomatik oynatmayı kapatır |
| `useMounted()` | `true` = tarayıcıda | Sadece tarayıcıda çalışan işlemler (lightbox gibi) öncesi güvenlik kontrolü |
| `useRafScroll(fn)` | — | Scroll dinleyicisini ekran yenileme hızında sınırlar. Saniyede 100+ yerine ~60 kez çalışır. |

---

## 9. Yardımcı kütüphaneler

### `lib/youtube.ts`

| Fonksiyon | Ne yapar |
|---|---|
| `youtubeThumbnail(id, dikeyMi)` | Video id'sinden kapak görseli adresi üretir |
| `youtubeEmbedUrl({...})` | Oynatıcı adresini parametreleriyle kurar |
| `COVER_BLUR_DATA_URL` | Kapak yüklenirken görünen bulanık yer tutucu |

### `lib/actions/contact.ts`

Formun sunucu tarafı. Tarayıcıdan gönderilen veriyi doğrular, spam tuzağını kontrol
eder ve Resend üzerinden mail atar. Doğrulama kuralları burada:

- Ad en az 2 karakter
- İletişim alanı geçerli e-posta **veya** 10-15 haneli telefon
- Mesaj en az 10 karakter
- KVKK onayı işaretli olmalı

Hata mesajlarını değiştirmek isterseniz bu dosyadaki metinleri düzenleyin.

> `RESEND_API_KEY` tanımlı değilse form çökmez; kullanıcıya WhatsApp ve mail adresini
> gösteren bir mesaj döner.

---

## 10. Stil sistemi

Tailwind CSS v4 kullanılıyor. v4'te tema **CSS tarafında** tanımlanır —
`tailwind.config.ts` neredeyse boştur, ona dokunmanıza gerek yok.

Tüm tasarım değişkenleri `app/globals.css` içindeki `@theme` bloğunda:

| Değişken | Değer | Kullanım |
|---|---|---|
| `--color-brand-blue` | `#2196f3` | `text-brand-blue`, `bg-brand-blue` |
| `--color-brand-blue-dark` | `#1565c0` | Buton hover |
| `--color-brand-blue-light` | `#64b5f6` | Vurgular |
| `--color-brand-black` | `#080c10` | Sayfa arka planı |
| `--color-brand-dark` | `#0d1117` | Koyu bölümler |
| `--color-brand-card` | `#111820` | Kart arka planı |
| `--color-brand-white` | `#f0f4f8` | Başlıklar |
| `--color-brand-offwhite` | `#d0dae6` | Paragraflar |
| `--radius-drone` | `32px` | `rounded-drone` |
| `--radius-pill` | `50px` | `rounded-pill` |
| `--font-display` | Bebas Neue | `font-display` — büyük başlıklar |
| `--font-body` | Raleway | Gövde metni (varsayılan) |

**Rengi değiştirmek:** `@theme` içindeki değeri değiştirin, sitenin tamamı güncellenir.
**Yeni renk eklemek:** `--color-brand-yesil: #4caf50;` satırını ekleyin, ardından
`text-brand-yesil` / `bg-brand-yesil` sınıflarını kullanabilirsiniz.

Animasyonlar da aynı blokta (`--animate-*`) ve karşılıkları dosyanın devamındaki
`@keyframes` bloklarında.

Dosyanın sonunda üç özel bölüm var:
- **SSS akordeon animasyonu** — destekleyen tarayıcıda yumuşak açılır
- **Film grain katmanı** — sadece masaüstünde açık (mobilde kaydırmayı yavaşlatıyordu)
- **Hareket azaltma** — "hareketi azalt" seçen kullanıcıda tüm animasyonlar kapanır

---

## 11. Ortam değişkenleri

`.env.example` dosyasını `.env.local` olarak kopyalayın. `.env.local` git'e gönderilmez.

| Değişken | Zorunlu mu | Açıklama |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Evet | Gerçek alan adı, sonda `/` olmadan |
| `RESEND_API_KEY` | Form için | resend.com/api-keys — ücretsiz katman 3.000 mail/ay |
| `CONTACT_FROM_EMAIL` | Form için | **Alan adı Resend'de doğrulanmış olmalı** (DNS'e SPF + DKIM) |
| `CONTACT_TO_EMAIL` | Hayır | Formun düşeceği kutu. Boşsa `lib/site.ts`'teki adres kullanılır. |

Canlıda bu değerleri hosting sağlayıcısının ortam değişkeni ekranına girersiniz.

---

## 12. Sık yapılan işler

### Yeni bir proje / referans eklemek

1. Videoyu YouTube'a yükleyin, adresteki id'yi kopyalayın
2. `lib/projects.tsx` içindeki `PROJECTS` dizisine yeni bir nesne ekleyin:

```ts
{
  slug: "firma-adi-is-turu",
  title: "Firma Adı – İş Türü",
  accentColor: "rgba(33,150,243,.25)",
  youtubeId: "BURAYA_ID",
  youtubeVertical: true,
  previewStart: 5,
  showAsReference: true,
  client: { name: "FİRMA ADI", sector: "İnşaat", code: "FA", color: "rgba(33,150,243,.25)" },
}
```

3. Kaydedin. Proje sayfası, referans duvarındaki kart ve sitemap kaydı kendiliğinden oluşur.

### Bir referansa gerçek logo eklemek

1. Logo dosyasını (tercihen şeffaf arka planlı PNG) `public/images/references/` klasörüne koyun
2. İlgili projenin `client` bloğuna `logoUrl: "/images/references/dosyaadi.png"` satırını ekleyin
3. Logo yoksa baş harf rozeti gösterilmeye devam eder — bozulma olmaz

> Bir firmanın adını veya logosunu kullanmak için **yazılı onay** alın.

### Hero arka plan videosunu değiştirmek

`lib/media.ts` → `HERO_YOUTUBE_ID` değerini video id'si yapın.

Ama önerimiz: hero için YouTube yerine **kendi MP4 dosyanız**. YouTube gömmesi ~1MB'lık
bir oynatıcı yükler ve açılış hızını düşürür. 10-15 saniyelik, sessiz, ~2MB'a sıkıştırılmış
bir dosyayı `public/` altına koyup `PLACEHOLDER_VIDEO_SRC` yerine onu göstermek daha hızlıdır.

### Yeni SSS sorusu eklemek

`lib/faq.ts` → `FAQ_ITEMS` dizisine ekleyin. Numaralandırma ve düzen otomatik ayarlanır.

### Bölümlerin sırasını değiştirmek

`app/page.tsx` içindeki bileşen sırasını değiştirin. Başka hiçbir yere dokunmanız gerekmez.

### Bir bölümü tamamen kaldırmak

`app/page.tsx`'ten satırını silin. Menüde bağlantısı varsa `Navbar.tsx` → `NAV_LINKS`
içinden de kaldırın.

---

## 13. Tuzaklar

Geliştirme sırasında karşılaşılmış, tekrar ısırması muhtemel konular.

**`"use server"` dosyaları yalnızca `async` fonksiyon dışa aktarabilir.**
`lib/actions/contact.ts` içine sabit bir değer `export` ederseniz `tsc` de `npm run build`
de sorunsuz geçer, hata yalnızca kullanıcı forma bastığında ortaya çıkar.

**YouTube dikey videoların kapağı farklı adreste.** `maxresdefault.jpg` her zaman 16:9
verir — 9:16 bir Shorts'un kapağını bile. Dikey videoda `oardefault.jpg` kullanılır.
`lib/youtube.ts` bunu `youtubeVertical` alanına göre otomatik seçer; elle kapak
adresi yazacaksanız dikkat edin.

**Arka plan videosunda ekran birimi (`vw/vh`) kullanmayın.** `YouTubeEmbed`'in kapak
doldurma hesabı kap birimleriyle (`cqw/cqh`) yapılır. Ekran birimlerine dönerseniz
video küçük kartların içinde aşırı yakınlaşır.

**`aspect-ratio` ile hem yükseklik hem genişlik sınırı vermeyin.** İkisi aynı anda
bağlanırsa oran korunamaz. Dikey kutularda ölçüyü yükseklik sürer, genişlik orandan türer.

**`.env*` gitignore'da, ama `.env.example` hariç tutulmuştur.** Yeni bir ortam değişkeni
eklerseniz `.env.example` dosyasına da (değersiz olarak) ekleyin.

**Yer tutucu içerikler `TODO(içerik)` ile işaretli.** Yayından önce tam listeyi görmek için:

```bash
grep -rn "TODO(içerik)" app components lib
```

---

## Lisans / kullanım

Bu depo AnkaraDrone'a aittir. `public/images/` altındaki üçüncü taraf logolar,
ilgili markaların izniyle kullanılmalıdır.
