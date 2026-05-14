/**
 * Inline section loader — dipakai di dalam card/tabel saat data belum tersedia.
 */
export default function SectionLoader({ text = "Memuat Data..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
      <svg
        className="w-8 h-8 text-[#e61e25] animate-spin"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        />
      </svg>
      <p className="text-stone-400 text-sm font-semibold">{text}</p>
    </div>
  );
}
