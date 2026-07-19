import Image from "next/image";
import { DashedRule } from "./DashedRule";
import { socialLinks } from "@/lib/socialLinks";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10">
      <DashedRule className="mb-8" />

      <Image
        src="/logo/logo_full.png"
        alt="SS Strap"
        width={64}
        height={64}
        className="h-16 w-16"
      />

      <p className="mt-6 max-w-xl text-sm text-parchment-dim">
        SS Strap adalah rumah produksi strap kulit handmade dari Wonogiri,
        Jawa — mengerjakan kulit eksotis dan fine grain untuk pasar lokal dan
        ekspor sejak 2018.
      </p>

      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
        {socialLinks.map((link) =>
          link.href ? (
            <a
              key={link.key}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-parchment-dim transition-colors hover:text-brass"
            >
              {link.label}
            </a>
          ) : (
            <span key={link.key} className="text-sm text-parchment-dim/40">
              {link.label}
            </span>
          ),
        )}
      </div>

      <p className="mt-8 font-mono text-xs text-parchment-dim/60">
        © {new Date().getFullYear()} SS Strap.
      </p>
    </footer>
  );
}
