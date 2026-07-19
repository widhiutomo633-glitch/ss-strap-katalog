import Image from "next/image";
import Link from "next/link";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

const navLinks = [
  { href: "/katalog", label: "Katalog" },
  { href: "/tentang", label: "Tentang" },
  { href: "/kontak", label: "Kontak" },
];

export function Navbar() {
  return (
    <header className="border-b border-thread/20">
      <nav className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5 sm:px-10">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo/logo_monogram.png"
            alt="SS Strap"
            width={54}
            height={36}
            className="h-9 w-auto"
            priority
          />
          <span className="font-display text-lg text-parchment">SS Strap</span>
        </Link>

        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-parchment-dim transition-colors hover:text-parchment"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-brass px-4 py-2 text-sm font-medium text-brass-dark transition-opacity hover:opacity-90"
        >
          Chat WhatsApp
        </a>
      </nav>
    </header>
  );
}
