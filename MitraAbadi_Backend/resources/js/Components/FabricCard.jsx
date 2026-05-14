import { Link } from "@inertiajs/react";

function FabricCard({ fabric }) {
  return (
    <Link
      href={`/katalog/${fabric.slug || fabric.id}`}
      className="group flex flex-col cursor-pointer"
    >
      <div className="group flex flex-col">
        <div className="relative overflow-hidden aspect-[4/5] bg-[#f1edec] mb-5 rounded-sm">
          <img
            src={fabric.image || fabric.img}
            alt={fabric.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {fabric.badge && fabric.badgeStyle !== "low-stock" && (
            <div className="absolute top-4 left-4">
              <span
                className={`px-3 py-1 text-[9px] font-label font-black uppercase tracking-widest shadow-sm ${
                  fabric.badgeStyle === "primary"
                    ? "bg-[#e61e25] text-white"
                    : "bg-white/90 backdrop-blur text-[#e61e25]"
                }`}
              >
                {fabric.badge}
              </span>
            </div>
          )}
          {fabric.badge && fabric.badgeStyle === "low-stock" && (
            <div className="absolute bottom-4 right-4">
              <span className="px-2 py-1 bg-[#e61e25] text-white text-[8px] font-label uppercase tracking-widest font-bold rounded-sm">
                {fabric.badge}
              </span>
            </div>
          )}
        </div>
        <div className="space-y-1">
          <div className="flex justify-between items-baseline">
            <h2 className="text-xl font-extrabold text-stone-900 group-hover:text-[#e61e25] transition-colors font-[Manrope]">
              {fabric.name}
            </h2>
            <span className="text-lg font-bold text-[#e61e25] font-[Manrope]">
              {fabric.price}
            </span>
          </div>
          <div className="flex gap-6 pt-4 border-t border-stone-200/50">
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-widest text-stone-500 font-bold">
                Weight
              </span>
              <span className="text-[11px] font-bold text-stone-800">
                {fabric.weight}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-widest text-stone-500 font-bold">
                Width
              </span>
              <span className="text-[11px] font-bold text-stone-800">
                {fabric.width}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-widest text-stone-500 font-bold">
                Ref ID
              </span>
              <span className="text-[11px] font-bold text-stone-800">
                {fabric.refId}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default FabricCard;
