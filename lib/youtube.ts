// Tek bir YouTube video id'sinden hem kapak görselini hem oynatıcı adresini
// türetiyoruz. Böylece bir iş eklemek için gereken tek şey id: kapak ayrıca
// hazırlanmıyor, hover için ayrı bir kısa klip kesilmiyor.

/**
 * Kapak görseli adresi.
 *
 * ÖNEMLİ: YouTube dikey (Shorts) yüklemelerin kapağını iki ayrı adreste tutar.
 * `maxresdefault` her zaman **16:9**'dur — 1080x1920 bir videonun kapağını bile
 * 1280x720 olarak verir. Dikey bir kartta bunu `object-cover` ile kullanmak
 * karenin yaklaşık üçte ikisini kırpar. Dikey videonun gerçek 9:16 kapağı
 * `oardefault` ("original aspect ratio") adresindedir — ölçüldü: 1080x1920.
 *
 * Yatay videolarda `oardefault` bulunmayabilir, orada `maxresdefault` doğrudur.
 */
export function youtubeThumbnail(videoId: string, vertical = false) {
  const variant = vertical ? "oardefault" : "maxresdefault";
  return `https://i.ytimg.com/vi/${videoId}/${variant}.jpg`;
}

type EmbedOptions = {
  videoId: string;
  /** Sessiz, kontrolsüz, döngülü arka plan/önizleme modu. */
  background?: boolean;
  autoplay?: boolean;
  /** Videonun kaçıncı saniyesinden başlayacağı — önizlemede "vitrin anı". */
  start?: number;
};

export function youtubeEmbedUrl({
  videoId,
  background = false,
  autoplay = background,
  start,
}: EmbedOptions) {
  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    mute: background ? "1" : "0",
    controls: background ? "0" : "1",
    loop: background ? "1" : "0",
    ...(background ? { playlist: videoId } : {}), // tek videonun döngüye girmesi için şart
    ...(start ? { start: String(start) } : {}),
    playsinline: "1",
    modestbranding: "1",
    rel: "0",
  });

  // youtube-nocookie.com, izleyici oynata basana kadar çerez yazmaz.
  return `https://www.youtube-nocookie.com/embed/${videoId}?${params}`;
}

/**
 * Kapak yüklenirken gösterilen 9x16 bulanık yer tutucu (383 bayt, koyu lacivert).
 * Uzak görsellerde Next bunu otomatik üretemiyor, elle vermek gerekiyor.
 */
export const COVER_BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/2wBDABcQERQRDhcUEhQaGBcbIjklIh8fIkYyNSk5UkhXVVFIUE5bZoNvW2F8Yk5QcptzfIeLkpSSWG2grJ+OqoOPko3/2wBDARgaGiIeIkMlJUONXlBejY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY3/wAARCAAQAAkDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAgP/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCbAUB//9k=";
