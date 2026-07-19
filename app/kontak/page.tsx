import type { Metadata } from "next";
import { DashedRule } from "@/components/DashedRule";
import { socialLinks, type SocialLink } from "@/lib/socialLinks";

export const metadata: Metadata = {
  title: "Kontak — SS Strap",
};

export default function KontakPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16 sm:px-10">
      <h1 className="font-display text-4xl text-parchment sm:text-5xl">
        Hubungi Kami
      </h1>
      <p className="mt-3 text-parchment-dim">
        Sapa kami lewat channel di bawah ini.
      </p>

      <DashedRule className="my-10" />

      <div className="flex flex-col gap-3">
        {socialLinks.map((link) => (
          <ChannelCard key={link.key} link={link} />
        ))}
      </div>
    </main>
  );
}

function ChannelCard({ link }: { link: SocialLink }) {
  const badge = (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brass font-display text-sm text-brass">
      {link.initials}
    </span>
  );

  const text = (
    <div>
      <p className="font-display text-lg text-parchment">{link.label}</p>
      <p className="mt-0.5 text-sm text-parchment-dim">
        {link.href ? "Buka channel" : "Link segera tersedia"}
      </p>
    </div>
  );

  if (!link.href) {
    return (
      <div className="flex items-center gap-4 rounded-lg border border-thread/20 bg-hide p-5 opacity-50">
        {badge}
        {text}
      </div>
    );
  }

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 rounded-lg border border-thread/20 bg-hide p-5 transition-colors hover:border-brass/60"
    >
      {badge}
      {text}
    </a>
  );
}
