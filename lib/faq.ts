// SSS bölümünün tek içerik kaynağı.
//
// Soru eklemek/çıkarmak için yalnızca bu diziyi düzenleyin — bölümün düzeni,
// numaralandırması ve arama motorlarına verilen yapısal veri (JSON-LD) hepsi
// buradan türer. Kaç soru olduğunun kodda hiçbir yerde önemi yok.
//
// `answer` içinde **boş satır bırakarak** paragraf ayırabilirsiniz; bölüm
// bunları ayrı paragraflar olarak basar.
//
// `id` alanı adres çubuğunda kullanılır: site.com/#sss-teslimat gibi bir bağlantı
// doğrudan o soruyu açar. Bir kez yayınladıktan sonra id'leri değiştirmeyin,
// yoksa paylaştığınız bağlantılar kırılır.

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

// ⚠️ TODO(içerik): AŞAĞIDAKİ CEVAPLAR TASLAKTIR — düzenin çalıştığını görmek
// için yazıldı, sizin çalışma şeklinizi yansıttıkları doğrulanmadı. Özellikle
// izin süreci, teslim süresi ve kullanım hakları maddeleri bağlayıcı taahhüt
// niteliğindedir; yayına almadan önce hepsini kendi süreçlerinize göre yeniden
// yazın. Yanlış bir vaat, cevapsız bir sorudan daha maliyetlidir.
export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "sss-izin",
    question: "Uçuş izinlerini kim alıyor?",
    answer:
      "İzin gerektiren bölgelerdeki başvuru sürecini biz yürütüyoruz. Çekim yapılacak alanın konumuna göre gereken izinler değişebildiği için, tarih netleşmeden önce lokasyonu bizimle paylaşmanız süreci hızlandırır.\n\nBazı özel bölgelerde izin süreci birkaç iş günü sürebilir; planlama yaparken bunu hesaba katıyoruz.",
  },
  {
    id: "sss-hava",
    question: "Hava şartları bozulursa ne oluyor?",
    answer:
      "Rüzgâr, yağış ve görüş mesafesi uçuş güvenliğini doğrudan etkilediği için çekim ertelenir. Erteleme durumunda ek ücret alınmaz, en yakın uygun tarihte çekimi tamamlarız.",
  },
  {
    id: "sss-teslimat",
    question: "Görüntüleri hangi formatta teslim ediyorsunuz?",
    answer:
      "Standart teslimat, kurgulanmış videonun yüksek çözünürlüklü MP4 dosyası ve sosyal medya için dikey (9:16) versiyonudur.\n\nProjenin kapsamına göre işlenmemiş ham kayıtlar, fotoğraf seçkisi, ortofoto veya 3B model dosyaları da teslimata eklenebilir. Hangi çıktılara ihtiyacınız olduğunu baştan konuşmamız en doğrusu.",
  },
  {
    id: "sss-haklar",
    question: "Çekilen görüntülerin kullanım hakkı kimde?",
    answer:
      "Teslim edilen görüntüleri kendi tanıtımlarınızda süresiz kullanabilirsiniz. Biz de aksini belirtmediğiniz sürece işi kendi portföyümüzde ve sosyal medya hesaplarımızda gösteriyoruz; bunu istemiyorsanız sözleşmede belirtmemiz yeterli.",
  },
  {
    id: "sss-sure",
    question: "Çekimden teslime ne kadar süre geçiyor?",
    answer:
      "Kurgu ve renk düzeltmesi dahil teslim süresi projenin kapsamına göre değişir. Teklif aşamasında size net bir tarih veriyoruz ve o tarihe bağlı kalıyoruz.",
  },
  {
    id: "sss-fiyat",
    question: "Fiyat neye göre değişiyor?",
    answer:
      "Çekim süresi, lokasyon sayısı, kurgu karmaşıklığı ve istenen çıktılar fiyatı belirleyen ana başlıklar. 3B modelleme veya ortofoto gibi işlem gerektiren çıktılar, standart video çekimine göre daha uzun sürer.\n\nProjenizi kısaca anlatırsanız 24 saat içinde size özel bir teklif hazırlıyoruz.",
  },
];
