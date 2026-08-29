import { CONTACT, SITE_NAME, SITE_URL } from "@/lib/site";

type ContactNotificationInput = {
  name: string;
  email: string;
  phone: string;
  projectLabel: string;
  message: string;
  receivedAt: Date;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/** Mail header values must never contain a CR/LF sequence. */
function safeHeader(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function toE164Digits(value: string) {
  const digits = value.replace(/\D/g, "");

  if (digits.startsWith("0090")) return digits.slice(2);
  if (digits.startsWith("90")) return digits;
  if (digits.startsWith("0")) return `90${digits.slice(1)}`;
  return `90${digits}`;
}

function formatReceivedAt(value: Date) {
  return new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Istanbul",
  }).format(value);
}

export function buildContactNotification(input: ContactNotificationInput) {
  const name = escapeHtml(input.name);
  const email = escapeHtml(input.email);
  const phone = escapeHtml(input.phone);
  const projectLabel = escapeHtml(input.projectLabel);
  const message = escapeHtml(input.message).replace(/\r?\n/g, "<br>");
  const receivedAt = escapeHtml(formatReceivedAt(input.receivedAt));
  const phoneDigits = toE164Digits(input.phone);
  const emailHref = `mailto:${email}`;
  const phoneHref = `tel:+${phoneDigits}`;
  const whatsappHref = `https://wa.me/${phoneDigits}`;
  const preheader = escapeHtml(
    `${input.name}, ${input.projectLabel} için teklif talebi gönderdi.`,
  );

  const subject = `Yeni teklif: ${safeHeader(input.name)} — ${safeHeader(input.projectLabel)}`;

  const text = [
    `${SITE_NAME.toUpperCase()} — YENİ TEKLİF TALEBİ`,
    "",
    `Ad Soyad: ${input.name}`,
    `E-posta: ${input.email}`,
    `Telefon: ${input.phone}`,
    `Proje tipi: ${input.projectLabel}`,
    `Gönderim zamanı: ${formatReceivedAt(input.receivedAt)}`,
    "",
    "MESAJ",
    input.message,
    "",
    `E-postayla yanıtla: mailto:${input.email}`,
    `Telefon: ${phoneHref}`,
    `WhatsApp: ${whatsappHref}`,
    "",
    `Bu bildirim ${SITE_URL} iletişim formundan gönderildi.`,
  ].join("\n");

  const html = `<!doctype html>
<html lang="tr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <title>${escapeHtml(subject)}</title>
    <style>
      @media only screen and (max-width: 640px) {
        .email-shell { width: 100% !important; }
        .mobile-pad { padding-left: 20px !important; padding-right: 20px !important; }
        .mobile-block { display: block !important; width: 100% !important; }
        .mobile-block + .mobile-block { padding-top: 10px !important; }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background:#eef3f8;color:#172033;font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${preheader}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#eef3f8;">
      <tr>
        <td align="center" style="padding:32px 12px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" class="email-shell" style="width:100%;max-width:640px;background:#ffffff;border:1px solid #dfe7f0;border-radius:20px;box-shadow:0 12px 36px rgba(20,42,74,.08);overflow:hidden;">
            <tr>
              <td class="mobile-pad" style="padding:28px 36px;background:#0b1628;border-bottom:4px solid #2196f3;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td valign="middle">
                      <div style="font-size:11px;line-height:16px;font-weight:700;letter-spacing:2.2px;color:#75bfff;">ANKARA DRONE</div>
                      <div style="margin-top:4px;font-size:14px;line-height:20px;color:#c8d3e3;">Web iletişim formu</div>
                    </td>
                    <td align="right" valign="middle">
                      <span style="display:inline-block;padding:7px 11px;border:1px solid rgba(117,191,255,.45);border-radius:999px;background:#102b4d;font-size:10px;line-height:12px;font-weight:700;letter-spacing:1.4px;color:#a9d7ff;">YENİ TALEP</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td class="mobile-pad" style="padding:34px 36px 16px;">
                <h1 style="margin:0;font-size:28px;line-height:36px;font-weight:700;color:#111827;">Yeni teklif talebi</h1>
                <p style="margin:10px 0 0;font-size:15px;line-height:24px;color:#5d697b;">
                  <strong style="color:#172033;">${name}</strong>, <strong style="color:#172033;">${projectLabel}</strong> için iletişim formunu doldurdu.
                </p>
              </td>
            </tr>

            <tr>
              <td class="mobile-pad" style="padding:16px 36px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;border:1px solid #e3eaf2;border-radius:14px;border-collapse:separate;overflow:hidden;">
                  <tr>
                    <td width="34%" style="padding:14px 18px;border-bottom:1px solid #e8eef5;background:#f7f9fc;font-size:11px;line-height:16px;font-weight:700;letter-spacing:1px;color:#6e7a8c;">AD SOYAD</td>
                    <td style="padding:14px 18px;border-bottom:1px solid #e8eef5;font-size:14px;line-height:20px;font-weight:600;color:#172033;">${name}</td>
                  </tr>
                  <tr>
                    <td width="34%" style="padding:14px 18px;border-bottom:1px solid #e8eef5;background:#f7f9fc;font-size:11px;line-height:16px;font-weight:700;letter-spacing:1px;color:#6e7a8c;">E-POSTA</td>
                    <td style="padding:14px 18px;border-bottom:1px solid #e8eef5;font-size:14px;line-height:20px;color:#172033;word-break:break-word;"><a href="${emailHref}" style="color:#147ad6;text-decoration:underline;">${email}</a></td>
                  </tr>
                  <tr>
                    <td width="34%" style="padding:14px 18px;border-bottom:1px solid #e8eef5;background:#f7f9fc;font-size:11px;line-height:16px;font-weight:700;letter-spacing:1px;color:#6e7a8c;">TELEFON</td>
                    <td style="padding:14px 18px;border-bottom:1px solid #e8eef5;font-size:14px;line-height:20px;color:#172033;"><a href="${phoneHref}" style="color:#147ad6;text-decoration:underline;">${phone}</a></td>
                  </tr>
                  <tr>
                    <td width="34%" style="padding:14px 18px;border-bottom:1px solid #e8eef5;background:#f7f9fc;font-size:11px;line-height:16px;font-weight:700;letter-spacing:1px;color:#6e7a8c;">PROJE TİPİ</td>
                    <td style="padding:14px 18px;border-bottom:1px solid #e8eef5;font-size:14px;line-height:20px;color:#172033;">${projectLabel}</td>
                  </tr>
                  <tr>
                    <td width="34%" style="padding:14px 18px;background:#f7f9fc;font-size:11px;line-height:16px;font-weight:700;letter-spacing:1px;color:#6e7a8c;">GÖNDERİM</td>
                    <td style="padding:14px 18px;font-size:14px;line-height:20px;color:#5d697b;">${receivedAt}</td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td class="mobile-pad" style="padding:16px 36px;">
                <div style="margin-bottom:9px;font-size:11px;line-height:16px;font-weight:700;letter-spacing:1.2px;color:#6e7a8c;">PROJE MESAJI</div>
                <div style="padding:18px 20px;border-left:4px solid #2196f3;border-radius:4px 12px 12px 4px;background:#f2f7fd;font-size:15px;line-height:24px;color:#263247;word-break:break-word;">${message}</div>
              </td>
            </tr>

            <tr>
              <td class="mobile-pad" style="padding:16px 36px 34px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td class="mobile-block" align="center" style="border-radius:10px;background:#147ad6;">
                      <a href="${emailHref}" style="display:block;padding:14px 18px;font-size:14px;line-height:18px;font-weight:700;color:#ffffff;text-decoration:none;">E-postayla yanıtla</a>
                    </td>
                    <td width="10" class="mobile-block"></td>
                    <td class="mobile-block" align="center" style="border:1px solid #cfd9e6;border-radius:10px;background:#ffffff;">
                      <a href="${whatsappHref}" style="display:block;padding:13px 18px;font-size:14px;line-height:18px;font-weight:700;color:#17324f;text-decoration:none;">WhatsApp'tan yaz</a>
                    </td>
                  </tr>
                </table>
                <p style="margin:14px 0 0;font-size:12px;line-height:19px;color:#7a8698;text-align:center;">Bu e-postaya normal şekilde yanıt verdiğinde mesaj doğrudan ${name} kişisine gider.</p>
              </td>
            </tr>

            <tr>
              <td class="mobile-pad" style="padding:22px 36px;background:#f7f9fc;border-top:1px solid #e3eaf2;">
                <p style="margin:0;font-size:12px;line-height:19px;color:#7a8698;">Bu bildirim <a href="${escapeHtml(SITE_URL)}" style="color:#147ad6;text-decoration:none;">${escapeHtml(SITE_URL.replace(/^https?:\/\//, ""))}</a> iletişim formundan otomatik olarak gönderildi.</p>
                <p style="margin:6px 0 0;font-size:12px;line-height:19px;color:#9aa4b2;">${escapeHtml(CONTACT.city)}, Türkiye · ${escapeHtml(CONTACT.email)}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject, text, html };
}
