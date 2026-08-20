# Yayın Öncesi Kontrol Listesi

Site şu an **yer tutucu (dummy) içerikle** çalışıyor. Aşağıdaki maddelerin tamamı
kapanmadan siteyi yayına almayın.

Kalan tüm yer tutucuları tek komutla listelemek için:

```bash
grep -rn "TODO(içerik)" app components lib
```

---

## 1. İçerik — hukuki risk taşıyanlar (önce bunlar)

- [ ] **Referans listesi** — `components/sections/References.tsx`
      Şu an 10 büyük kurum yer tutucu olarak listeli (İÇTAŞ, EMLAK KONUT, TOKİ,
      ANKAmall, AKFEN, SETUR, MEB…). Yalnızca **gerçekten çalıştığınız** firmaları
      bırakın. Bir firmanın adını veya logosunu izinsiz kullanmak marka hakkı
      ihlali sayılabilir — referans göstermek için müşteriden **yazılı onay** alın.
- [ ] **Logo dosyaları** — `public/images/references/`
      Yalnızca izin alınmış logolar dursun. Logosu olmayan firmalar baş harf
      rozetiyle görünür, bu da düzgün bir görünümdür.
- [ ] **İstatistikler** — `components/sections/Stats.tsx`
      "200+ proje", "50+ kurumsal referans" doğrulanabilir gerçek sayılar mı?
      Emin olunamayan bir metriği göstermemek, abartmaktan iyidir.
- [ ] **KVKK aydınlatma metni** — `app/kvkk/page.tsx`
      Bu bir taslaktır, **hukuki onaydan geçmemiştir.** Bir avukata/mali müşavire
      kontrol ettirin; şirket unvanı ve açık adresi doldurun.

## 2. İçerik — medya

- [ ] **Yer tutucu video** — `lib/media.ts` içindeki `PLACEHOLDER_VIDEO_SRC`
      Şu an w3schools'un örnek klibini gösteriyor ve **kesinlikle yayına
      çıkmamalı.** Gerçek kliplerinizi `public/videos/` altına koyup ilgili
      `videoSrc` alanlarını güncelleyin.
- [ ] **Hero arka plan videosu** — `lib/media.ts` içindeki `HERO_YOUTUBE_ID`
      YouTube arka plan gömmesi (~1MB iframe) sayfa açılışını yavaşlatır ve
      açılış hızı doğrudan güven algısıdır. Hero için 10-15 saniyelik, sessiz,
      ~2MB'a sıkıştırılmış kendi MP4'ünüzü kullanın; YouTube'u diğer kartların
      lightbox'ında bırakın.
- [ ] **Proje sayfaları** — `lib/projects.tsx`
      "Proje 1…4" başlıkları, kapak görselleri, açıklama, konum ve tarih.
- [ ] ⚠️ **Müşteri yorumları** — `components/sections/Testimonials.tsx`
      **Şu an dosyada üç adet UYDURMA yorum var**, düzenin çalıştığını görmek
      için konuldu. Yayına çıkmadan önce ya gerçek yorumlarla değiştirin ya da
      diziyi boşaltın (boşaltınca bölüm otomatik "çok yakında" durumuna döner).
      Sahte müşteri yorumu, sitedeki en riskli yer tutucudur.
      Gerçek yorum toplarken müşteriden adının ve firmasının yayımlanmasına dair
      **yazılı onay** alın; vermezse "Proje Müdürü · İnşaat Firması" gibi anonim
      yayımlayın.

- [ ] ⚠️ **SSS cevapları** — `lib/faq.ts`
      Şu an 6 taslak soru-cevap var. Özellikle **izin süreci, teslim süresi ve
      kullanım hakları** maddeleri bağlayıcı taahhüt niteliğindedir; kendi
      süreçlerinize göre yeniden yazın. Soru eklemek/çıkarmak için sadece
      `FAQ_ITEMS` dizisini düzenlemeniz yeterli — numaralandırma, düzen ve
      arama motorlarına verilen yapısal veri kendiliğinden güncellenir.
      Yayınladıktan sonra `id` değerlerini değiştirmeyin, paylaşılan
      bağlantılar kırılır.

## 3. İletişim bilgileri — `lib/site.ts`

Sitedeki tüm iletişim bilgisi bu tek dosyadan gelir.

- [ ] `SOCIAL_LINKS` — gerçek Instagram ve YouTube adresleri
      (şu an genel ana sayfalara gidiyor). Instagram arşiviniz en güçlü güven
      kaynağınız; buranın doğru olması önemli.
- [ ] `CONTACT.addressLine` — tam açık adres (JSON-LD ve footer bunu kullanır)
- [ ] `CONTACT.email` / `phoneDisplay` — doğrulayın

## 4. Ortam değişkenleri (hosting panelinde)

`.env.example` dosyasını `.env.local` olarak kopyalayıp doldurun; canlıda ise
hosting sağlayıcısının ortam değişkeni ekranına girin.

- [ ] `NEXT_PUBLIC_SITE_URL` — gerçek alan adı (sonunda eğik çizgi olmadan).
      `sitemap.xml`, `robots.txt`, JSON-LD ve paylaşım görselleri buna bağlı.
- [ ] `RESEND_API_KEY` — https://resend.com/api-keys
- [ ] `CONTACT_FROM_EMAIL` — **alan adı Resend'de doğrulanmış olmalı**
      (resend.com/domains → DNS'e SPF + DKIM kaydı). Doğrulanmazsa formdan gelen
      mailler ya gitmez ya da spam'e düşer.
- [ ] `CONTACT_TO_EMAIL` — mesajların düşeceği kutu

## 5. Analitik

Site çerezsiz analitikle geliyor (`@vercel/analytics` + `@vercel/speed-insights`),
bu yüzden **çerez onay banner'ı gerekmiyor.**

- [ ] Vercel'e dağıttıktan sonra proje panelinden **Analytics** ve **Speed
      Insights** sekmelerini açın — açılmazsa veri toplanmaz.
- [ ] **Vercel dışında bir yerde barındıracaksanız** bu iki paket hiçbir şey
      yapmaz. `app/layout.tsx` içindeki iki satırı Plausible veya Umami ile
      değiştirin (ikisi de çerezsizdir, KVKK metni aynen geçerli kalır).
- [ ] Google Analytics eklemeye karar verirseniz çerez banner'ı **zorunlu hale
      gelir** ve `app/kvkk/page.tsx` içindeki 7. madde güncellenmelidir.

## 6. Bağımlılık bakımı

Site 18 Ağustos 2026'da **0 güvenlik açığı** ile Next.js 16.3.1'e alındı. Bu
durum kendiliğinden korunmaz — paketler eskidikçe açıklar birikir.

- [ ] Ayda bir `npm audit` çalıştırın.
- [ ] Çıkan açıklar `npm audit fix` ile kapanıyorsa güvenle uygulayın (sürüm
      aralıklarını zorlamaz). `npm audit fix --force` ise ana sürüm atlatabilir
      — onu uygulamadan önce build alıp siteyi test edin.
- [ ] Node sürümünüz **v20.15.0**; bazı geliştirme paketleri artık ≥20.19
      istiyor (şu an yalnızca uyarı veriyor, üretimi etkilemiyor). Fırsat
      bulunca Node 20 LTS'in güncel sürümüne geçin.

## 7. Yayın sonrası

- [ ] İletişim formunu canlıda **gerçekten test edin** — mail kutuya düşüyor mu,
      "yanıtla" düğmesi müşteriye gidiyor mu?
- [ ] Google Search Console'a siteyi ekleyip `sitemap.xml` gönderin
- [ ] Google Business Profile (İşletme Profili) oluşturun — yerel aramada
      `ProfessionalService` JSON-LD şemasıyla birlikte en büyük etkiyi bu yapar
- [ ] Site adresini WhatsApp'ta kendinize gönderip paylaşım kartını kontrol edin
      (başlık, açıklama ve 1200x630 görsel doğru mu)
- [ ] Mobil cihazda: menü açılıyor mu, WhatsApp butonu çalışıyor mu, video
      kartlarına dokununca lightbox açılıyor mu?
