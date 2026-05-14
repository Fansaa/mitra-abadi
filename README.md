# Mitra Abadi — Sistem Informasi Distribusi Tekstil

Aplikasi web untuk manajemen dan katalog produk kain distribusi **Mitra Abadi**. Dibangun dengan Laravel (REST API) dan React + Vite sebagai antarmuka pengguna.

---

## Struktur Proyek

```
mitra-abadi/
├── mitra-abadi-backend/    # REST API — Laravel 11
└── mitra-abadi-frontend/   # Antarmuka pengguna — React + Vite
```

---

## Fitur

### Halaman Publik (User)
- **Katalog Kain** — browsing produk dengan filter kategori dan palet warna
- **Detail Produk** — spesifikasi lengkap, varian warna, range harga
- **Chatbot AI** — asisten virtual berbasis Gemini AI yang menjawab pertanyaan seputar produk
- **Halaman Tentang** — profil perusahaan

### Panel Admin
- **Dashboard** — statistik penjualan, stok menipis, dan grafik transaksi
- **Manajemen Inventori** — tambah, edit, hapus produk beserta varian warna dan gambar
- **Manajemen Kategori** — kelola kategori material kain
- **Riwayat Transaksi** — pencatatan pesanan masuk

---

## Tech Stack

| Bagian | Teknologi |
|---|---|
| Backend | Laravel 11, PHP 8.2 |
| Database | MySQL |
| Auth | Laravel Sanctum (token-based) |
| AI Chatbot | Google Gemini 3.1 Flash-Lite |
| Frontend | React 18, Vite |
| Styling | Tailwind CSS |
| HTTP Client | Axios |

---

## Cara Menjalankan

### Prasyarat
- PHP 8.2+, Composer
- Node.js 18+, NPM
- MySQL (Laragon / XAMPP / lokal)

---

### 1. Backend (Laravel)

```bash
cd mitra-abadi-backend

# Install dependencies
composer install

# Salin file environment
cp .env.example .env

# Generate app key
php artisan key:generate
```

Edit file `.env`, sesuaikan konfigurasi database dan API key:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=mitra_abadi
DB_USERNAME=root
DB_PASSWORD=

GEMINI_API_KEY=        # https://aistudio.google.com/apikey
WHATSAPP_ADMIN_NUMBER=628123456789
```

```bash
# Buat database, jalankan migrasi dan seeder
php artisan migrate --seed

# Buat symbolic link untuk storage
php artisan storage:link

# Jalankan server
php artisan serve
```

API akan berjalan di `http://localhost:8000`

> **Akun admin default:**
> Email: `admin@mitraabadi.com` | Password: `password`

---

### 2. Frontend (React)

```bash
cd mitra-abadi-frontend

# Install dependencies
npm install

# Salin file environment
cp .env.example .env
```

Isi file `.env`:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_WHATSAPP_ADMIN_NUMBER=628123456789
```

```bash
# Jalankan development server
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

---

## Endpoint API Utama

| Method | Endpoint | Keterangan |
|---|---|---|
| `GET` | `/api/products` | Daftar semua produk aktif |
| `GET` | `/api/products/{id}` | Detail produk |
| `GET` | `/api/categories` | Daftar kategori |
| `POST` | `/api/chatbot/session` | Mulai sesi chatbot |
| `POST` | `/api/chatbot/message` | Kirim pesan ke chatbot |
| `POST` | `/api/auth/login` | Login admin |
| `GET` | `/api/admin/dashboard` | Data dashboard (auth) |
| `GET` | `/api/admin/products` | Manajemen produk (auth) |
| `GET` | `/api/admin/inventories` | Data inventori (auth) |

Koleksi Postman tersedia di `mitra-abadi-backend/Mitra_Abadi_Postman_Collection.json`

---

## Lisensi

Proyek ini dibuat untuk keperluan akademik — Mata Kuliah Computing Project, Semester 6.
