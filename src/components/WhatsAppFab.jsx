import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER, WHATSAPP_GREETING } from "../utils/constants";

const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_GREETING
)}`;

/**
 * Always mounted, no mount animation and no ping pulse: a looping ring on a
 * permanently visible control is noise, and animating it in on every page
 * load just delays the one thing it is asking for.
 */
export default function WhatsAppFab() {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat WhatsApp"
      className="fixed bottom-safe right-safe z-50 grid h-14 w-14 place-items-center rounded-full bg-wa text-cream shadow-lift transition-transform duration-120 hover:scale-105 active:scale-95"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
