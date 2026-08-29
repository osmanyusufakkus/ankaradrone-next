# Ankara Drone E-posta Altyapısı

Bu proje iki ayrı e-posta akışı kullanır:

1. **Gelen kurumsal posta:** `info@ankara-drone.com` adresine gelen mesajlar
   Cloudflare Email Routing ile `osmanyusufakkus@gmail.com` adresine yönlendirilir.
2. **Web formu bildirimi:** İletişim formu Resend üzerinden
   `osmanyusufakkus@gmail.com` adresine gönderilir.

Web hosting bu kurulumların ön koşulu değildir. Domainin DNS yönetimine erişmek
yeterlidir.

## Gerekli hesaplar ve erişimler

- `ankara-drone.com` domaininin kayıt firmasındaki yönetim paneli
- Ücretsiz bir Cloudflare hesabı
- `osmanyusufakkus@gmail.com` gelen kutusuna erişim
- `osmanyusufakkus@gmail.com` ile açılmış ücretsiz bir Resend hesabı
- Resend panelinden üretilecek bir API key

Secret değerleri sohbet mesajına, Git'e veya `.env.example` dosyasına yazmayın.
Yalnızca Git tarafından dışlanan `.env.local` ve ileride hosting sağlayıcısının
secret/environment-variable paneli kullanılmalıdır.

## 1. Cloudflare Email Routing

### Domaini Cloudflare'a ekleme

1. Cloudflare Dashboard'da **Add a domain** seçeneğiyle `ankara-drone.com`
   domainini ekleyin ve Free planı seçin.
2. Cloudflare mevcut DNS kayıtlarını taradığında listeyi kontrol edin. Daha sonra
   web sitesi için kullanılacak A, AAAA, CNAME ve doğrulama TXT kayıtlarını
   kaybetmemek gerekir.
3. Cloudflare'ın verdiği iki nameserver adresini domainin kayıt firmasındaki
   **Nameservers** alanına girin. Bu işlem domain kaydını Cloudflare'a transfer
   etmez; yalnızca DNS yönetimini Cloudflare'a verir.
4. Cloudflare panelinde domain durumu **Active** olana kadar bekleyin.

### `info@` yönlendirmesi

1. Cloudflare Dashboard > `ankara-drone.com` > **Email > Email Routing**
   bölümünü açın.
2. Email Routing'i etkinleştirin. Cloudflare'ın önerdiği MX ve TXT kayıtlarını
   eklemesine izin verin.
3. **Destination address** olarak `osmanyusufakkus@gmail.com` ekleyin.
4. Gmail'e gelen doğrulama bağlantısını açarak hedef adresi onaylayın.
5. Şu routing rule'u oluşturun:

   ```text
   Custom address: info@ankara-drone.com
   Action: Send to an email
   Destination: osmanyusufakkus@gmail.com
   ```

6. Başlangıçta **Catch-all** kuralını kapalı bırakın. Bu, yanlış yazılmış ve spam
   amaçlı rastgele adreslerin gelen kutusuna düşmesini önler.
7. Başka bir e-posta hesabından `info@ankara-drone.com` adresine test mesajı
   gönderin. Gmail'de Inbox ve Spam klasörlerini kontrol edin.

Cloudflare yönlendirmesi bir mailbox oluşturmaz. Mesajlar Gmail'de saklanır.
Gmail'den normal yanıt verirken gönderici şimdilik kişisel Gmail olarak görünebilir;
ileride Google Workspace'e geçildiğinde `info@ankara-drone.com` gerçek gönderici
alias'ı yapılabilir.

## 2. Resend iletişim formu

### Resend hesabı ve API key

1. Resend hesabını `osmanyusufakkus@gmail.com` ile açın.
2. Dashboard > **API Keys > Create API Key** bölümünde
   `ankara-drone-local` isimli bir key oluşturun.
3. Key'i yalnızca bir kez kopyalayıp `.env.local` içindeki boş değere yazın:

   ```env
   RESEND_API_KEY=re_...
   CONTACT_FROM_EMAIL="Ankara Drone Test <onboarding@resend.dev>"
   CONTACT_TO_EMAIL=osmanyusufakkus@gmail.com
   NEXT_PUBLIC_SITE_URL=https://ankara-drone.com
   ```

Resend'in `onboarding@resend.dev` test göndereni yalnızca Resend hesabının sahibi
olan adrese gönderim yapar. Bu nedenle hesap ve `CONTACT_TO_EMAIL` aynı Gmail
adresi olmalıdır.

### Local test

1. `npm run dev` ile siteyi başlatın.
2. İletişim formuna geçerli bir ad, e-posta, Türkiye mobil telefon numarası ve en
   az 10 karakterlik mesaj girin; KVKK onayını işaretleyin.
3. Başarı mesajını, Resend Dashboard > **Emails** kaydını ve Gmail Inbox/Spam
   klasörlerini birlikte kontrol edin.
4. Gmail'deki mesajda **Yanıtla** komutunun formda girilen ziyaretçi e-posta
   adresine gittiğini doğrulayın.

### Domain doğrulandıktan sonraki gönderen

Site yayına yaklaşınca Resend > **Domains** bölümüne
`notify.ankara-drone.com` ekleyin. Resend'in verdiği SPF ve DKIM kayıtlarını
Cloudflare DNS'e aynen girin. Durum **Verified** olduktan sonra yalnızca şu değeri
değiştirin:

```env
CONTACT_FROM_EMAIL="Ankara Drone Web <form@notify.ankara-drone.com>"
```

Gelen `info@ankara-drone.com` postalarının root domain üzerinde, otomatik form
gönderiminin ise `notify` subdomain'inde tutulması MX kayıt çakışmasını ve gönderim
itibarının birbirini etkilemesini önler.

## Güvenlik ve işletim kontrolleri

- Daha önce kullanılan Gmail App Password iptal edilmelidir; Resend kodu bu
  parolayı artık kullanmaz.
- Resend hesabında multi-factor authentication (MFA, çok faktörlü doğrulama)
  etkinleştirilmelidir.
- API key Git'e gönderilmemeli ve production için ayrı bir key oluşturulmalıdır.
- İletişim formuna hosting seçildikten sonra kalıcı rate limiting eklenmelidir;
  mevcut honeypot temel bot trafiğini azaltır fakat dağıtık saldırıları durdurmaz.
- Ayda en az bir kez Resend hata/bounce kayıtları ve Cloudflare routing durumu
  kontrol edilmelidir.
