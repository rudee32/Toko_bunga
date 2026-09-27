import { formatRupiah } from "../data/products";

/** Digits only — this is interpolated into a wa.me URL. */
export const WHATSAPP_NUMBER = "6289674289400";

export const WHATSAPP_GREETING =
  "Halo Sekar Floristt, saya ingin tanya dan memesan rangkaian bunga.";

export const SOCIALS = {
  instagram: "https://www.instagram.com/sekarfloristt",
  shopee: "https://shopee.co.id/shop/103041030",
  tokopedia: "https://www.tokopedia.com/sekarfloristt",
};

/**
 * Google Maps listing for the Kotabaru, Gondokusuman shop.
 *
 * `rating` is deliberately null. The listing carries 5.0 from 354 reviews, but
 * it is unclaimed and its business name, phone and Instagram do not match this
 * site — publishing the number here would attribute one entity's reviews to
 * another. Set it once that is confirmed, not before.
 *
 * The address below is taken from the listing and is the only contact detail
 * sourced from Maps; the phone, Instagram and opening hours all come from the
 * shop's own site and are left untouched.
 */
export const MAPS = {
  rating: null,
  reviewCount: null,
  address:
    "Jl. Ahmad Jazuli No.49, Kotabaru, Kec. Gondokusuman, Yogyakarta 55224",
  shortAddress: "Jl. Ahmad Jazuli No.49, Yogyakarta",
  coordinates: { lat: -7.7878636, lng: 110.3685852 },
  placeId: "ChIJ0Rm0pC9Yei4RAi4iwIYftZw",
  profileUrl:
    "https://www.google.com/maps/place/?q=place_id:ChIJ0Rm0pC9Yei4RAi4iwIYftZw",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=" +
    "-7.7878636,110.3685852&destination_place_id=ChIJ0Rm0pC9Yei4RAi4iwIYftZw",
};

export const OPENING_HOURS = [
  { day: "Senin – Jumat", time: "08.00 – 20.00" },
  { day: "Sabtu", time: "08.00 – 20.00" },
  { day: "Minggu", time: "08.00 – 20.00" },
];

export const buildOrderMessage = (items, data) =>
  [
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
  ].join("\n");

export const openWhatsApp = (message) => {
  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener,noreferrer"
  );
};
