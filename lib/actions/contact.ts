"use server";

import { Resend } from "resend";
import { CONTACT, PROJECT_TYPES } from "@/lib/site";
import { isValidEmail, isValidTurkishMobile } from "@/lib/validation/contact";

export type ContactField =
  | "name"
  | "email"
  | "phone"
  | "projectType"
  | "message"
  | "consent";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<ContactField, string>>;
  /** Echoed back on failure so the visitor never loses what they typed. */
  values?: Partial<Record<Exclude<ContactField, "consent">, string>>;
};

// NOTE: a "use server" file may only export async functions — the type exports
// above are erased at compile time so they're fine, but a plain value export
// (the form's initial state used to live here) throws at runtime while still
// passing both `tsc` and `next build`. It lives in ContactForm.tsx instead.

const MAX_LENGTHS: Record<Exclude<ContactField, "consent">, number> = {
  name: 100,
  email: 254,
  phone: 24,
  projectType: 60,
  message: 2000,
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Mail header values must never contain a CR/LF sequence. */
function safeHeader(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot: a field hidden from humans via CSS. Bots fill every input they
  // find, so anything arriving here is automated — answer with a normal-looking
  // success so the bot doesn't learn to retry, but send nothing.
  if (typeof formData.get("website") === "string" && formData.get("website") !== "") {
    return { status: "success", message: "Mesajınız alındı. En kısa sürede dönüş yapacağız." };
  }

  const read = (field: Exclude<ContactField, "consent">) =>
    (formData.get(field) as string | null)?.trim().slice(0, MAX_LENGTHS[field]) ?? "";

  const values = {
    name: read("name"),
    email: read("email"),
    phone: read("phone"),
    projectType: read("projectType"),
    message: read("message"),
  };

  const fieldErrors: Partial<Record<ContactField, string>> = {};
  if (values.name.length < 2) fieldErrors.name = "Lütfen adınızı yazın.";
  if (!isValidEmail(values.email)) {
    fieldErrors.email = "Geçerli bir e-posta adresi girin.";
  }
  if (!isValidTurkishMobile(values.phone)) {
    fieldErrors.phone = "Geçerli bir Türkiye mobil numarası girin.";
  }
  if (values.message.length < 10) {
    fieldErrors.message = "Projenizden biraz bahsedin (en az 10 karakter).";
  }
  if (formData.get("consent") !== "on") {
    fieldErrors.consent = "Devam etmek için aydınlatma metnini onaylamanız gerekiyor.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Lütfen işaretli alanları kontrol edin.",
      fieldErrors,
      values,
    };
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const sender = process.env.CONTACT_FROM_EMAIL?.trim();
  const recipient = process.env.CONTACT_TO_EMAIL?.trim();

  if (!apiKey || !sender || !recipient) {
    // Misconfiguration, not the visitor's fault — never leave them staring at a
    // dead form, hand them the WhatsApp/mail route instead.
    console.error(
      "[contact] Resend yapılandırması eksik — RESEND_API_KEY, CONTACT_FROM_EMAIL ve CONTACT_TO_EMAIL değerlerini kontrol edin.",
    );
    return {
      status: "error",
      message: `Form şu anda gönderilemiyor. Bize doğrudan ${CONTACT.email} adresinden veya WhatsApp'tan ulaşabilirsiniz.`,
      values,
    };
  }

  const projectLabel =
    PROJECT_TYPES.find((type) => type.id === values.projectType)?.label ?? "Belirtilmedi";

  try {
    const { error } = await new Resend(apiKey).emails.send({
      // Test: onboarding@resend.dev. Production: an address on the verified
      // notify.ankara-drone.com subdomain; see EMAIL_SETUP.md.
      from: sender,
      to: [recipient],
      // Replies from the notification email go directly to the visitor.
      replyTo: values.email,
      subject: `Yeni teklif talebi: ${safeHeader(values.name)} — ${safeHeader(projectLabel)}`,
      text: [
        `Ad: ${values.name}`,
        `E-posta: ${values.email}`,
        `Telefon: ${values.phone}`,
        `Proje tipi: ${projectLabel}`,
        "",
        values.message,
      ].join("\n"),
      html: `
        <h2 style="font-family:sans-serif">Yeni teklif talebi</h2>
        <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
          <tr><td style="padding:4px 12px 4px 0"><b>Ad</b></td><td>${escapeHtml(values.name)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0"><b>E-posta</b></td><td>${escapeHtml(values.email)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0"><b>Telefon</b></td><td>${escapeHtml(values.phone)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0"><b>Proje tipi</b></td><td>${escapeHtml(projectLabel)}</td></tr>
        </table>
        <p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(values.message)}</p>
      `,
    });

    if (error) throw new Error(error.message);
  } catch (cause) {
    console.error(
      "[contact] Mail gönderilemedi:",
      cause instanceof Error ? cause.message : "Bilinmeyen hata",
    );
    return {
      status: "error",
      message: `Mesaj gönderilemedi. Lütfen WhatsApp'tan veya ${CONTACT.email} adresinden ulaşın.`,
      values,
    };
  }

  return {
    status: "success",
    message: "Teşekkürler! Mesajınız bize ulaştı, 24 saat içinde dönüş yapacağız.",
  };
}
