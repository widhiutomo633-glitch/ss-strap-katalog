// Signature element SS Strap: garis putus-putus ganda, meniru saddle stitch.
// Dipakai konsisten sebagai pemisah section di seluruh halaman.
export function DashedRule({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-[3px] ${className}`} aria-hidden="true">
      <div className="border-t border-dashed border-thread/70" />
      <div className="border-t border-dashed border-thread/70" />
    </div>
  );
}
