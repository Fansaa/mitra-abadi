/**
 * Full-page loading screen — dipakai saat halaman sedang fetch data awal.
 */
export default function PageLoader({ text = "Memuat Data..." }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface gap-4">
      <svg
        className="w-10 h-10 text-[#e61e25] animate-spin"
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
