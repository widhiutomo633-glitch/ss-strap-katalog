const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

export type SocialLink = {
  key: string;
  label: string;
  initials: string;
  href: string | null;
};

export const socialLinks: SocialLink[] = [
  {
    key: "instagram",
    label: "Instagram",
    initials: "IG",
    href: process.env.NEXT_PUBLIC_IG_URL || null,
  },
  {
    key: "shopee",
    label: "Shopee",
    initials: "SP",
    href: process.env.NEXT_PUBLIC_SHOPEE_URL || null,
  },
  {
    key: "tokopedia",
    label: "Tokopedia",
    initials: "TP",
    href: process.env.NEXT_PUBLIC_TOKOPEDIA_URL || null,
  },
  {
    key: "tiktok",
    label: "TikTok Shop",
    initials: "TT",
    href: process.env.NEXT_PUBLIC_TIKTOK_URL || null,
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    initials: "WA",
    href: whatsappNumber ? `https://wa.me/${whatsappNumber}` : null,
  },
];
