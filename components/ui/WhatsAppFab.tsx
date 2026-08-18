import { CONTACT } from "@/lib/site";

// Mobile-only floating action button. On desktop the navbar's "Teklif Al" is
// always on screen, so this would just be clutter — on a phone the navbar CTA
// lives behind the menu button, and WhatsApp is how most leads actually arrive.
export default function WhatsAppFab() {
  return (
    <a
      href={CONTACT.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile yazın"
      className="fixed right-5 bottom-5 z-90 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(0,0,0,.45)] transition-transform duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white md:hidden"
    >
      <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M17.5 14.4c-.3-.1-1.6-.8-1.8-.9-.2-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.1.2-.3.2-.6.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.2-.4.1-.2 0-.4 0-.5-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.5 1 2.6c.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.6-.6 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3z" />
        <path d="M12 2a10 10 0 00-8.5 15.3L2 22l4.8-1.4A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-3 .9.9-2.9-.2-.3A8 8 0 1112 20z" />
      </svg>
    </a>
  );
}
