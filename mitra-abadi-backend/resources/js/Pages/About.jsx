import { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";

const LOGO_URL =
  "https://lh3.googleusercontent.com/aida/ADBb0ujnrpgxqFDgJOU5bT05a85dhoBmQy3-xC3qhaW-yKMEHovr6VydmMVlZ_zU1Ft5nm6CI99xNBhhUi5JRAuTXpKlM_AULSKkYPFZXd3rRQl5sEO_cyyx7PVGc0m9UNepQqio1m79zgY3pYSgVAjQzWvNoT4p0vUbYAjhVMbgsiLtWlRj0STkrlmJ70Rx1aKGqEFCOb6SiyKFSbAspvf49ozIZAn2NYF99zfWNlz40V1X-dilFCBfSmbkqaQ-YH38hdKtLL5IvmCssyk";

const FABRIC_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDM-M0H7Jio-GyDm_uA65YUsF-ClGVquKbzPPaMTOoMKlqKo_Wl4tdlxnL2xBEATHCola-KLT3dLHDp_oIOTtOU8SXGwmNJJ_6uuh1768s7dg7LntZC8YtJZyPwfVurVscF5zBJUE6PDD971KtPw8gRLZ4ukkocoASVek8u0M8PL3zPNiJstFX1S7nSERvETgKYJO4G1wfLX4fUJEa9J6UzmapxsRbQzsJ9IWWbA1Fi9znol9Ydvpa3ZFagPsLz12D_ZJVbch1-xqcP";

function Chip({ children }) {
  return (
    <span
      style={{
        display: "inline-block",
        background: "#ffdad6",
        color: "#bd0015",
        fontSize: "0.68rem",
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        padding: "4px 12px",
        borderRadius: "20px",
        marginBottom: "16px",
      }}
    >
      {children}
    </span>
  );
}

function BtnPrimary({ href, children }) {
  return (
    <a
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#e61e25",
        color: "#fff",
        padding: "14px 32px",
        borderRadius: "6px",
        fontSize: "0.75rem",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        textDecoration: "none",
        boxShadow: "0 2px 12px rgba(189,0,21,0.18)",
        transition: "background 0.2s, box-shadow 0.2s, transform 0.15s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#bd0015";
        e.currentTarget.style.boxShadow = "0 6px 24px rgba(189,0,21,0.28)";
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#e61e25";
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(189,0,21,0.18)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {children}
    </a>
  );
}

function BtnSecondary({ href, target, children }) {
  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noreferrer" : undefined}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#e61e25",
        color: "#fff",
        padding: "11px 24px",
        borderRadius: "5px",
        fontSize: "0.72rem",
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        textDecoration: "none",
        boxShadow: "0 2px 8px rgba(189,0,21,0.15)",
        transition: "background 0.2s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#bd0015")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "#e61e25")}
    >
      {children}
    </a>
  );
}

function ExploreLink({ href, children }) {
  return (
    <a
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        color: "#bd0015",
        fontSize: "0.72rem",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        textDecoration: "none",
        borderBottom: "1px solid #e7bdb8",
        paddingBottom: "3px",
        transition: "color 0.2s, border-color 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "#e61e25";
        e.currentTarget.style.borderColor = "#e61e25";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "#bd0015";
        e.currentTarget.style.borderColor = "#e7bdb8";
      }}
    >
      {children}
      <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
        arrow_forward
      </span>
    </a>
  );
}

export default function About() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { auth } = usePage().props;

  useEffect(() => {
    setMounted(true);
  }, []);

  const fadeUp = (delay = 0) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}s`,
  });

  const slideLeft = (delay = 0) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateX(0)" : "translateX(-32px)",
    transition: `opacity 0.8s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.8s cubic-bezier(.22,1,.36,1) ${delay}s`,
  });

  return (
    <div
      className="min-h-screen bg-[#fdf8f8] text-stone-900"
      style={{ fontFamily: "Manrope, sans-serif" }}
    >
      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 bg-stone-50/90 backdrop-blur-md border-b border-stone-200/20">
        <div className="flex justify-between items-center px-8 py-5 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-10">
            <span className="text-2xl font-bold tracking-tighter text-[#e61e25]">
              Mitra Abadi
            </span>
            <div className="hidden md:flex gap-7 items-center">
              {["Catalog", "Collections", "About", "Contact"].map((item) => (
                <a
                  key={item}
                  href={item === "Catalog" ? "/" : "about"}
                  className={`text-sm font-semibold tracking-tight transition-colors duration-200 ${item === "About"
                      ? "text-[#e61e25] border-b-2 border-[#e61e25] pb-0.5"
                      : "text-stone-600 hover:text-[#e61e25]"
                    }`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="relative hidden lg:block">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search archives..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(ITEMS_PER_PAGE);
                }}
                className="pl-9 pr-4 py-2 bg-stone-100 border-none rounded-full text-xs focus:ring-2 focus:ring-[#e61e25]/20 w-56 outline-none"
              />
            </div>
            <div className="flex gap-3">
              <button className="text-stone-600 hover:text-[#e61e25] transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </button>
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="text-stone-600 hover:text-[#e61e25] transition-colors flex items-center"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white border border-stone-100 rounded-md shadow-xl overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-stone-50 bg-stone-50/50">
                      <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Portal Akses</p>
                    </div>
                    {auth?.user ? (
                      <Link
                        href={route('admin.dashboard')}
                        className="block w-full text-left px-4 py-3 text-sm font-semibold text-stone-700 hover:bg-stone-50 hover:text-[#e61e25] transition-colors"
                      >
                        Dashboard Admin
                      </Link>
                    ) : (
                      <Link
                        href={route('login')}
                        className="block w-full text-left px-4 py-3 text-sm font-semibold text-stone-700 hover:bg-stone-50 hover:text-[#e61e25] transition-colors"
                      >
                        Login Admin
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main
        style={{
          paddingTop: "88px",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "88px 40px 0",
          flex: 1,
        }}
      >
        {/* Hero */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.3fr",
            gap: "64px",
            alignItems: "center",
            padding: "80px 0 96px",
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              ...slideLeft(0.15),
            }}
          >
            <img
              src={LOGO_URL}
              alt="Mitra Abadi Logo"
              style={{ width: "280px", height: "280px", objectFit: "contain" }}
            />
          </div>

          {/* Text */}
          <div style={fadeUp(0.25)}>
            <Chip>Tentang Kami</Chip>
            <h1
              style={{
                fontSize: "3.4rem",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 1.08,
                color: "#1a1c1c",
                marginBottom: "24px",
              }}
            >
              The Digital
              <br />
              <span style={{ color: "#bd0015" }}>Curator</span>
            </h1>
            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.75,
                color: "#5d3f3c",
                maxWidth: "540px",
              }}
            >
              Selamat datang di Mitra Abadi, toko kain terpercaya yang telah
              berdiri sejak tahun 2018. Kami menyediakan berbagai pilihan kain
              berkualitas untuk kebutuhan fashion, seragam, dekorasi, hingga
              kebutuhan tekstil lainnya dengan harga yang kompetitif dan
              pelayanan yang ramah.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section style={{ marginBottom: "96px" }}>
          <div
            style={{
              background: "#f3f3f3",
              padding: "64px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Left accent bar */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "6px",
                height: "100%",
                background: "#bd0015",
              }}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "64px",
                alignItems: "center",
              }}
            >
              {/* Fabric Image */}
              <div style={{ position: "relative", ...slideLeft(0.15) }}>
                <div
                  style={{
                    background: "#e2e2e2",
                    padding: "12px",
                    marginLeft: "-32px",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
                  }}
                >
                  <img
                    src={FABRIC_URL}
                    alt="Premium textiles"
                    style={{
                      width: "100%",
                      height: "380px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              </div>

              {/* Text */}
              <div style={fadeUp(0.35)}>
                <Chip>Kualitas &amp; Komitmen</Chip>
                <h2
                  style={{
                    fontSize: "2rem",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    marginBottom: "20px",
                    color: "#1a1c1c",
                  }}
                >
                  Dedikasi Pada
                  <br />
                  Kualitas
                </h2>
                <p
                  style={{
                    fontSize: "0.97rem",
                    lineHeight: 1.8,
                    color: "#5d3f3c",
                    marginBottom: "32px",
                  }}
                >
                  Dengan pengalaman dan komitmen yang kami bangun sejak awal
                  berdiri, kami terus berupaya menjadi mitra terbaik untuk
                  setiap kebutuhan kain Anda. Mitra Abadi hadir untuk memenuhi
                  kebutuhan pelanggan dengan mengutamakan kualitas produk dan
                  kepuasan layanan.
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    alignItems: "center",
                  }}
                >
                  <ExploreLink href="#">Explore Collection</ExploreLink>
                  <BtnPrimary href="#">Browse Full Catalog</BtnPrimary>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          style={{
            background: "#fff",
            padding: "80px 64px",
            borderTop: "1px solid #e2e2e2",
          }}
        >
          <div
            style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}
          >
            <Chip>Lokasi</Chip>
            <h3
              style={{
                fontSize: "2rem",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                marginBottom: "48px",
                color: "#1a1c1c",
              }}
            >
              Kunjungi Kami
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px",
                textAlign: "left",
              }}
            >
              {/* Alamat */}
              <div
                style={{
                  background: "#fff",
                  borderRadius: "8px",
                  padding: "32px",
                  boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "16px",
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{
                      fontSize: "28px",
                      color: "#bd0015",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    location_on
                  </span>
                  <div>
                    <p
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "#1a1c1c",
                        marginBottom: "10px",
                      }}
                    >
                      Alamat
                    </p>
                    <p
                      style={{
                        fontSize: "0.95rem",
                        lineHeight: 1.7,
                        color: "#5d3f3c",
                      }}
                    >
                      Taman Kopo Indah 2 Blok D4 No. 46
                      <br />
                      Bandung, Jawa Barat
                    </p>
                  </div>
                </div>
              </div>

              {/* Telepon / WA */}
              <div
                style={{
                  background: "#fff",
                  borderRadius: "8px",
                  padding: "32px",
                  boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "16px",
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{
                      fontSize: "28px",
                      color: "#bd0015",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    forum
                  </span>
                  <div>
                    <p
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "#1a1c1c",
                        marginBottom: "10px",
                      }}
                    >
                      Telepon / WhatsApp
                    </p>
                    <p
                      style={{
                        fontSize: "0.95rem",
                        color: "#5d3f3c",
                        marginBottom: "18px",
                      }}
                    >
                      0812-1425-7670
                    </p>
                    <BtnSecondary
                      href="https://wa.me/6281214257670"
                      target="_blank"
                    >
                      Hubungi Sekarang
                    </BtnSecondary>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-stone-200 bg-stone-50">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-10 max-w-screen-2xl mx-auto">
          <span className="text-sm text-stone-500">
            © 2024 Mitra Abadi Textile Archive. All rights reserved.
          </span>
          <div className="flex gap-8 mt-5 md:mt-0">
            {[
              "Privacy Policy",
              "Terms of Service",
              "Accessibility",
              "Sustainability",
            ].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm text-stone-500 hover:underline decoration-[#e61e25] underline-offset-4 transition-all"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
