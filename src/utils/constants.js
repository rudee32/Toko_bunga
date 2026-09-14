import { formatRupiah } from "../data/products";

export const WHATSAPP_NUMBER = "6289674289400";

export const SOCIALS = {
  instagram: "https://www.instagram.com/sekarfloristt",
  shopee: "https://shopee.co.id/shop/103041030",
  tokopedia: "https://www.tokopedia.com/sekarfloristt",
};

export const buildOrderMessage = (items, data) => {
  const lines = [
    "Halo Sekar Floristt, saya ingin memesan:",
    "",
    ...items.map(
      (i, idx) =>
        `${idx + 1}. ${i.name} (${i.code}) x${i.qty} = ${formatRupiah(i.total)}`
    ),
    "",
    `*Total: ${formatRupiah(items.reduce((a, b) => a + b.total, 0))}*`,
    "",
    "_Data Pemesanan:_",
    `Ucapan: ${data.ucapan || "-"}`,
    `Nama Pengirim: ${data.name || "-"}`,
    `Alamat Tujuan: ${data.alamat || "-"}`,
    `No. Penerima: ${data.phone || "-"}`,
    `Ukuran Bunga: ${data.ukuran || "-"}`,
    `Tanggal Kirim: ${data.tanggal || "-"}`,
  ];
  return lines.join("\n");
};

export const openWhatsApp = (message) => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
};
