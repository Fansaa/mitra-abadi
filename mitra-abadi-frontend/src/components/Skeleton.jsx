/**
 * Skeleton shimmer primitive.
 * Gunakan className untuk mengatur ukuran, radius, dll.
 * Contoh: <Sk className="h-4 w-32 rounded" />
 */
export default function Sk({ className = "" }) {
  return (
    <div
      className={`bg-surface-container-high animate-pulse rounded ${className}`}
    />
  );
}
