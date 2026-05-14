import { useState } from "react";
import AdminLayout from '@/Components/layout/AdminLayout';

const initialItems = [
  {
    id: 1,
    sku: "RS-4092",
    name: "Crimson Raw Silk",
    type: "Silk",
    origin: "Kyoto",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCB2qd27NJvDLcxKf33PpBwgZb5LjciaZ6zC4ch3u7OZ1BwI6IHQaZRv5j_aw1ciV_IgffJ57RvveWb2tjnFzkjm0jlhSfHmI_DRaYWSVDljR-WCoxQo-0xHjLjdn9HW730QnRiwaiNCcxAGSY2N-S9EaoE8SzrZ2cI8Ufa7fDQjyHL8zjB82_DAVDKZoyRSFK0Ix8rEJG3WNa17VUDrMrVgM13KvuTvkNZ60QsFPAz_ij6Zt7P1tXbxdyPsLBqL53kFf49ssEiRq-y",
    yardage: 12,
    available: 22,
    subtotal: "1,440.00",
    priceRange: "850.000 - 1.200.000",
    warning: false,
  },
  {
    id: 2,
    sku: "IT-8810",
    name: "Indigo Twill Heavyweight",
    type: "Cotton",
    origin: "Okayama",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD49VTpKzLlkgV3nzF_ue0lZa5h6cLS9sIsKaQuKFkZWT-_53D2qmeRmdBN68gmTLatgkU4eJEgnNPmfgk4urtpFdqKXJsMx_ddvy3fqxEsnLmHUzcVUznPu6hLA1A9GAgoqQE-B8NKzOHEebtkRu8uv8OFZqY7R-oJ77IvKhpOlNYPaSC-WyLQXrhdhD5BwblC5xUrsnBQLo1V9uviw0Fo9Wnpf9J7t966GqpbaSPi_oopTpX0GHcmlrRrrOQTzPC6wrEXJxXhqN8",
    yardage: 30,
    available: 22,
    subtotal: "1,650.00",
    priceRange: "350.000 - 550.000",
    warning: true,
  },
];

export default function ManualOrderEntry() {
  const [items, setItems] = useState(initialItems);
  const [customer, setCustomer] = useState({ ref: "", phone: "", email: "" });
  const [logistics, setLogistics] = useState("");

  const updateItem = (id, field, value) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, [field]: value } : it)));
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const hasWarning = items.some((it) => it.warning);

  return (
    <div className="px-8 pb-24">
      {/* Page header */}
      <div className="py-12 flex justify-between items-end">
        <div className="max-w-2xl">
          <h2 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface mb-2">
            Manual Order Entry
          </h2>
          <p className="font-body text-on-surface-variant text-lg leading-relaxed">
            Record direct sales and external requests. Verify meterage availability before
            finalization.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="font-body text-sm uppercase tracking-widest font-semibold text-primary underline underline-offset-4 decoration-1 hover:text-primary-container transition-colors px-4 py-2">
            Clear Draft
          </button>
        </div>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Multi-step Form */}
        <div className="lg:col-span-8 space-y-12">
          {/* Step 1: Customer Details */}
          <section className="bg-surface-container-lowest p-8 md:p-10 rounded-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-surface-container-high group-hover:bg-primary transition-colors duration-500"></div>
            <div className="flex items-baseline gap-4 mb-8">
              <span className="font-headline text-4xl font-black text-surface-container-highest select-none">
                01
              </span>
              <h3 className="font-headline text-xl font-bold tracking-tight text-on-surface">
                Customer Details
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="md:col-span-2">
                <label className="block font-body text-xs uppercase tracking-widest font-semibold text-on-surface-variant mb-2">
                  Client Reference
                </label>
                <input
                  type="text"
                  value={customer.ref}
                  onChange={(e) => setCustomer({ ...customer, ref: e.target.value })}
                  placeholder="e.g., WhatsApp - Maria G."
                  className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-body text-on-surface placeholder-surface-dim transition-colors"
                />
              </div>
              <div>
                <label className="block font-body text-xs uppercase tracking-widest font-semibold text-on-surface-variant mb-2">
                  Contact Number
                </label>
                <div className="flex relative">
                  <span className="material-symbols-outlined absolute left-0 top-2 text-surface-dim">
                    phone
                  </span>
                  <input
                    type="tel"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 pl-8 pr-0 py-2 font-body text-on-surface placeholder-surface-dim transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block font-body text-xs uppercase tracking-widest font-semibold text-on-surface-variant mb-2">
                  Email (Optional)
                </label>
                <div className="flex relative">
                  <span className="material-symbols-outlined absolute left-0 top-2 text-surface-dim">
                    mail
                  </span>
                  <input
                    type="email"
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    placeholder="client@studio.com"
                    className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 pl-8 pr-0 py-2 font-body text-on-surface placeholder-surface-dim transition-colors"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Step 2: Specimen Allocation */}
          <section className="bg-surface-container-lowest p-8 md:p-10 rounded-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
            <div className="flex items-baseline gap-4 mb-8">
              <span className="font-headline text-4xl font-black text-surface-container-highest select-none">
                02
              </span>
              <h3 className="font-headline text-xl font-bold tracking-tight text-on-surface">
                Specimen Allocation
              </h3>
            </div>

            {/* Search */}
            <div className="mb-8">
              <div className="relative bg-surface-container-low rounded-lg p-1 flex items-center">
                <span className="material-symbols-outlined text-on-surface-variant ml-3">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search by SKU, Origin, or Weave Type..."
                  className="w-full bg-transparent border-none focus:ring-0 font-body text-on-surface placeholder-on-surface-variant py-3 px-4"
                />
              </div>
            </div>

            {/* Selected Items */}
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`flex flex-col sm:flex-row gap-6 p-6 bg-surface-container-low rounded-lg relative overflow-hidden ${
                    item.warning ? "border border-outline-variant/30" : ""
                  }`}
                >
                  <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 bg-surface-container-highest rounded-md overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className={`w-full h-full object-cover mix-blend-multiply opacity-90 ${
                        item.warning ? "grayscale-[20%]" : ""
                      }`}
                    />
                    <span className="absolute top-2 left-2 bg-surface-container-lowest/80 backdrop-blur-md px-2 py-0.5 rounded-full font-body text-[10px] uppercase tracking-widest font-bold text-on-surface">
                      {item.type}
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-headline font-bold text-lg text-on-surface">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-on-surface-variant hover:text-primary transition-colors"
                        >
                          <span className="material-symbols-outlined">close</span>
                        </button>
                      </div>
                      <p className="font-body text-xs uppercase tracking-widest text-on-surface-variant">
                        SKU: {item.sku} • Origin: {item.origin}
                      </p>
                      <p className="font-body text-[11px] uppercase tracking-widest text-on-surface-variant/70 mt-1">
                        Range: IDR {item.priceRange}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-x-8 gap-y-4 items-end">
                      {/* Yardage */}
                      <div>
                        <label
                          className={`block font-body text-[10px] uppercase tracking-widest font-semibold mb-1 ${
                            item.warning ? "text-primary" : "text-on-surface-variant"
                          }`}
                        >
                          Req. Yardage
                        </label>
                        <div
                          className={`flex items-center border-b pb-1 w-24 ${
                            item.warning ? "border-primary" : "border-on-surface"
                          }`}
                        >
                          <input
                            type="number"
                            value={item.yardage}
                            onChange={(e) =>
                              updateItem(item.id, "yardage", e.target.value)
                            }
                            className={`w-full bg-transparent border-none p-0 focus:ring-0 font-body text-lg font-medium text-center ${
                              item.warning ? "text-primary" : ""
                            }`}
                          />
                          <span
                            className={`font-body text-xs ml-1 ${
                              item.warning ? "text-primary" : "text-on-surface-variant"
                            }`}
                          >
                            yd
                          </span>
                        </div>
                      </div>

                      {/* Stock Status */}
                      <div>
                        <div className="flex items-center gap-2">
                          {item.warning ? (
                            <>
                              <span className="material-symbols-outlined fill text-sm text-primary">
                                warning
                              </span>
                              <span className="font-body text-xs font-semibold text-primary uppercase tracking-wider">
                                Shortfall: {item.yardage - item.available}yd (Avail:{" "}
                                {item.available}yd)
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="material-symbols-outlined fill text-sm text-tertiary-container">
                                check_circle
                              </span>
                              <span className="font-body text-xs font-semibold text-tertiary-container uppercase tracking-wider">
                                Available: {item.available}yd
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Subtotal - editable manual */}
                      <div className="ml-auto text-right">
                        <label className="block font-body text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">
                          Subtotal
                        </label>
                        <div className="flex items-center border-b border-on-surface pb-1 w-36 ml-auto">
                          <span className="font-body text-sm font-bold text-on-surface mr-1">
                            IDR
                          </span>
                          <input
                            type="text"
                            value={item.subtotal}
                            onChange={(e) =>
                              updateItem(item.id, "subtotal", e.target.value)
                            }
                            placeholder="0,00"
                            className="w-full bg-transparent border-none p-0 focus:ring-0 font-headline text-base font-bold text-on-surface text-right"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {items.length === 0 && (
                <div className="text-center py-12 text-on-surface-variant">
                  <p className="font-body text-sm">No specimens selected. Use search above.</p>
                </div>
              )}
            </div>
          </section>

          {/* Step 3: Logistics */}
          <section className="bg-surface-container-lowest p-8 md:p-10 rounded-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-surface-container-high group-hover:bg-primary transition-colors duration-500"></div>
            <div className="flex items-baseline gap-4 mb-8">
              <span className="font-headline text-4xl font-black text-surface-container-highest select-none">
                03
              </span>
              <h3 className="font-headline text-xl font-bold tracking-tight text-on-surface">
                Logistics & Handling
              </h3>
            </div>
            <div>
              <label className="block font-body text-xs uppercase tracking-widest font-semibold text-on-surface-variant mb-2">
                Delivery Address / Notes
              </label>
              <textarea
                rows="3"
                value={logistics}
                onChange={(e) => setLogistics(e.target.value)}
                placeholder="Enter full address or specific handling instructions..."
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-body text-on-surface placeholder-surface-dim transition-colors resize-none"
              />
            </div>
          </section>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4 relative">
          <div className="sticky top-24 bg-surface-container-lowest p-8 rounded-xl shadow-[0_0_40px_rgba(26,28,28,0.06)]">
            <h3 className="font-headline text-lg font-bold tracking-tight text-on-surface mb-6 border-b border-surface-container-highest pb-4">
              Order Summary
            </h3>

            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`flex justify-between items-start ${
                    item.warning ? "opacity-50" : ""
                  }`}
                >
                  <div>
                    <span
                      className={`block font-body text-sm font-medium flex items-center gap-1 ${
                        item.warning ? "text-primary" : "text-on-surface"
                      }`}
                    >
                      {item.warning && (
                        <span className="material-symbols-outlined text-[14px]">warning</span>
                      )}
                      {item.name}
                    </span>
                    <span className="block font-body text-[10px] uppercase tracking-widest text-on-surface-variant mt-0.5">
                      {item.yardage}yd
                      {item.warning && ` (${item.yardage - item.available}yd Shortfall)`}
                    </span>
                  </div>
                  <span
                    className={`font-body text-sm text-on-surface ${
                      item.warning ? "line-through" : ""
                    }`}
                  >
                    IDR {item.subtotal}
                  </span>
                </div>
              ))}

              <div className="flex justify-between items-start pt-4 border-t border-surface-container-highest">
                <span className="font-body text-sm text-on-surface-variant">Subtotal</span>
                <span className="font-body text-sm text-on-surface">
                  IDR{" "}
                  {items
                    .filter((i) => !i.warning)
                    .reduce(
                      (acc, i) =>
                        acc + parseFloat(i.subtotal.replace(/\./g, "").replace(",", ".") || 0),
                      0
                    )
                    .toLocaleString("id-ID", { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between items-start">
                <span className="font-body text-sm text-on-surface-variant">
                  Shipping (Standard)
                </span>
                <span className="font-body text-sm text-on-surface">IDR 45.000</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="font-body text-sm text-on-surface-variant">Tax (Estimated)</span>
                <span className="font-body text-sm text-on-surface">IDR 118.800</span>
              </div>
            </div>

            <div className="pt-6 border-t border-surface-container-highest mb-8">
              <div className="flex justify-between items-end">
                <span className="font-body text-xs uppercase tracking-widest font-bold text-on-surface">
                  Estimated Total
                </span>
                <span className="font-headline text-2xl font-black text-on-surface tracking-tight">
                  IDR{" "}
                  {(
                    items
                      .filter((i) => !i.warning)
                      .reduce(
                        (acc, i) =>
                          acc + parseFloat(i.subtotal.replace(/\./g, "").replace(",", ".") || 0),
                        0
                      ) +
                    45000 +
                    118800
                  ).toLocaleString("id-ID", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {hasWarning && (
                <div className="p-4 bg-error-container/30 rounded-md border border-error/20 flex gap-3">
                  <span className="material-symbols-outlined text-error shrink-0">error</span>
                  <p className="font-body text-xs text-on-surface leading-relaxed">
                    Inventory validation failed for {items.filter((i) => i.warning).length} item.
                    Please adjust meterage or remove the item before proceeding.
                  </p>
                </div>
              )}

              <button
                disabled={hasWarning}
                className={`w-full py-4 px-6 rounded-md font-bold text-sm tracking-wide transition-colors duration-300 flex items-center justify-center gap-2 ${
                  hasWarning
                    ? "bg-surface-container-highest text-on-surface-variant cursor-not-allowed"
                    : "bg-primary-container text-on-primary-container hover:bg-primary"
                }`}
              >
                <span className="material-symbols-outlined text-sm">
                  {hasWarning ? "lock" : "receipt_long"}
                </span>
                Create Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ManualOrderEntry.layout = page => <AdminLayout children={page} />;