# Mitra Abadi - Textile Archive Management System

Mitra Abadi adalah platform manajemen arsip digital dan inventaris tekstil yang dirancang untuk mengelola spesimen kain, memantau stok, serta mencatat pesanan secara efisien. Proyek ini mengintegrasikan kemudahan manajemen backend Laravel dengan antarmuka frontend React yang modern dan reaktif melalui Inertia.js.

## 🚀 Teknologi Utama

- **Backend**: Laravel 12 (PHP 8.2+)
- **Frontend**: React.js dengan Inertia.js
- **Authentikasi**: Laravel Breeze (Inertia Stack)
- **Styling**: Tailwind CSS v4
- **Database**: MySQL / MariaDB
- **Icons**: Material Symbols Outlined (Google Fonts)

## 📋 Panduan Instalasi

Ikuti langkah-langkah berikut untuk menjalankan proyek di mesin lokal Anda:

### 1. Persiapan Awal
Pastikan Anda sudah menginstal **PHP (8.2+)**, **Composer**, **Node.js (18+)**, dan server database (seperti MySQL).

### 2. Klon Repositori
```bash
git clone https://github.com/username/mitra-abadi.git
cd mitra-abadi
```

### 3. Instal Dependensi Backend (Composer)
```bash
composer install
```

### 4. Instal Dependensi Frontend (NPM)
```bash
npm install
```

### 5. Konfigurasi Lingkungan (.env)
Salin file `.env.example` menjadi `.env` dan sesuaikan pengaturan database Anda.
```bash
cp .env.example .env
```
*Buka file `.env` dan isi bagian `DB_DATABASE`, `DB_USERNAME`, dan `DB_PASSWORD` sesuai database lokal Anda.*

### 6. Generate Application Key
```bash
php artisan key:generate
```

### 7. Migrasi & Seeding Database
Jalankan perintah ini untuk membuat tabel dan mengisi data awal (termasuk akun admin dan contoh katalog produk).
```bash
php artisan migrate --seed
```

### 8. Hubungkan Storage
Untuk mendukung fitur upload gambar produk:
```bash
php artisan storage:link
```

### 9. Jalankan Proyek
Buka **dua terminal** berbeda untuk menjalankan server Laravel dan compiler Vite:

**Terminal 1 (Laravel Server):**
```bash
php artisan serve
```

**Terminal 2 (Vite Compiler):**
```bash
npm run dev
```

Akses aplikasi melalui: `http://127.0.0.1:8000`

---

## 🔐 Akses Admin (Default)

Setelah melakukan seeding, Anda dapat masuk ke Dashboard Admin menggunakan akun berikut:

- **URL**: `http://127.0.0.1:8000/login`
- **Email**: `admin@mitraabadi.com` (atau email yang diset di DatabaseSeeder)
- **Password**: `password`

## ✨ Fitur Utama

- **Catalog Explorer**: Etalase produk dengan filter kategori dan pencarian dinamis.
- **Specimen Archive**: Pendataan detail teknis kain (GSM, Komposisi, Lebar, dll).
- **Inventory Tracking**: Monitoring stok per roll dengan notifikasi stok menipis.
- **Manual Order Entry**: Pencatatan pesanan langsung (POS Style) untuk admin.
- **Admin Dashboard**: Visualisasi ringkas mengenai total penjualan dan status operasional.

---
© 2026 Mitra Abadi Development Team
