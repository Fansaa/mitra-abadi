import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function LoginAdmin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Email atau password salah."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-surface">
      <main className="w-full max-w-[1000px] grid grid-cols-1 md:grid-cols-2 bg-surface-container-lowest overflow-hidden min-h-[600px]">
        {/* Image Canvas */}
        <div className="hidden md:block relative h-full bg-surface-container-high">
          <img
            alt="Textile Archive"
            className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-80"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3mEEX2YZJ9alGQOyfN5Wf9uvQ7R35AtnoYJa5G8Inui2XjTjAM1_QEaaCVZtMwtfE-A641fQY6b3yqbrE_plKcjPap7_VIgPNW6sP5v2hOZtrRR_i0WQGVkZA7b9XwrJ5amcaDg2H7SXZNB-h5CDGXPdMbW5lggp3XX0UrmQ_PFZHO6Hv-N1-23llWn8q3Bxrv9CFu8mQRONvQwjrmeu3FvM-HDR7SJqDWxglSCZN12A2epeCDRdR0NYHzNgcm3zrTtDpK1NkISIg"
          />
          <div className="absolute inset-0 bg-surface/20 backdrop-blur-[2px] flex items-end p-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-on-surface mb-2">
                Mitra Abadi
              </h2>
              <p className="text-on-surface/80 font-medium">Sistem Manajemen Distribusi Tekstil</p>
            </div>
          </div>
        </div>

        {/* Login Canvas */}
        <div className="p-8 md:p-16 flex flex-col justify-center relative">
          <div className="mb-12">
            <span className="material-symbols-outlined fill text-4xl text-primary mb-6 block">
              museum
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">
              Portal Admin
            </h1>
            <p className="text-on-surface/70 font-medium tracking-wide">Akses Portal Admin</p>
          </div>

          {error && (
            <div
              className="mb-8 p-4 bg-error-container text-on-error-container flex items-start gap-3 rounded"
              role="alert"
            >
              <span className="material-symbols-outlined mt-0.5">error</span>
              <p className="text-sm font-medium leading-relaxed">
                {error}
              </p>
            </div>
          )}

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="relative">
              <label
                className="block text-xs font-bold uppercase tracking-widest text-on-surface/60 mb-2"
                htmlFor="email"
              >
                Alamat Email
              </label>
              <div className="flex items-center">
                <span className="material-symbols-outlined text-on-surface/50 mr-3">mail</span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@mitraabadi.com"
                  required
                  className="w-full text-on-surface font-medium pb-2 placeholder-on-surface/30 bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="relative">
              <label
                className="block text-xs font-bold uppercase tracking-widest text-on-surface/60 mb-2"
                htmlFor="password"
              >
                Kata Sandi
              </label>
              <div className="flex items-center">
                <span className="material-symbols-outlined text-on-surface/50 mr-3">lock</span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full text-on-surface font-medium pb-2 placeholder-on-surface/30 bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-on-surface/50 hover:text-primary transition-colors ml-2"
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? "visibility" : "visibility_off"}
                  </span>
                </button>
              </div>
            </div>

            <div className="pt-8 flex flex-col gap-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-container text-on-primary-container py-4 px-6 rounded-md font-bold tracking-wide hover:bg-primary transition-colors duration-300 flex justify-center items-center gap-2 disabled:opacity-60"
              >
                {loading ? "Memverifikasi..." : "Masuk"}
                {!loading && <span className="material-symbols-outlined text-sm">arrow_forward</span>}
              </button>
              <a
                href="#"
                className="text-center text-sm font-medium text-on-surface/60 hover:text-primary transition-colors inline-block mx-auto border-b border-transparent hover:border-primary pb-0.5"
              >
                Lupa kata sandi?
              </a>
            </div>
          </form>

          <div className="mt-auto pt-16 text-center md:text-left">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-on-surface/40">
              © 2025 Mitra Abadi. Hak Cipta Dilindungi.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}