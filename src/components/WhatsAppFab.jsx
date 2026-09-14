import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "../utils/constants";

export default function WhatsAppFab() {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Halo Sekar Floristt, saya ingin memesan rangkaian bunga yang berkualitas. Bisa dibantu?"
  )}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-green-500 text-white shadow-glow hover:bg-green-400 transition-colors"
      aria-label="Chat WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20 pointer-events-none" />
    </motion.a>
  );
}
