# Mitra Abadi Web

Frontend web katalog dan admin panel untuk arsip tekstil Mitra Abadi.

Project ini dibangun dengan React + Vite, memakai Tailwind CSS v4, dan routing client-side lewat React Router.

## Ringkasan Project

- **Public/User side**: katalog kain, filter kategori/warna, detail produk, halaman tentang kami.
- **Admin side**: dashboard, inventaris, manajemen kategori, input manual order, dan form specimen entry.
- **Data source saat ini**: masih memakai data statis (dummy) di frontend, belum terhubung backend/database.
- **Autentikasi admin saat ini**: validasi login hardcoded (untuk kebutuhan prototyping).

## Tech Stack

- React `19`
- Vite `8`
- React Router DOM `7`
- Tailwind CSS `4`
- ESLint `10`

## Prasyarat

- Node.js `18+` (disarankan Node.js LTS terbaru)
- npm (biasanya sudah ikut instalasi Node.js)

## Cara Menjalankan Project

1. Clone repository:

   ```bash
   git clone <url-repo-kamu>
   cd mitra_abadi
   ```

2. Install dependency:

   ```bash
   npm install
   ```

3. Jalankan mode development:

   ```bash
   npm run dev
   ```

4. Buka URL dari terminal (umumnya `http://localhost:5173`).

## Scripts

- `npm run dev` -> menjalankan server development Vite.
- `npm run build` -> build production ke folder `dist`.
- `npm run preview` -> preview hasil build production secara lokal.
- `npm run lint` -> menjalankan ESLint.

## Daftar Route

### Public / User

- `/` -> halaman katalog (`Catalog`)
- `/catalog/:id` -> detail item katalog (`CatalogDetail`)
- `/about` -> halaman tentang kami (`About`)

### Admin

- `/admin/login` -> halaman login admin (`LoginAdmin`)
- `/admin/dashboard` -> dashboard admin (`Dashboard`)
- `/admin/inventory` -> daftar inventaris (`Inventory`)
- `/admin/inventory/:id` -> detail spesimen (`DetailSpesimen`)
- `/admin/inventory/:id/edit` -> edit spesimen (`EditSpesimen`)
- `/admin/manajemen-kategori` -> daftar kategori (`ManajemenKategori`)
- `/admin/manajemen-kategori/:id` -> detail kategori (`DetailKategori`)
- `/admin/manual-order-entry` -> input order manual (`ManualOrderEntry`)
- `/admin/specimen-entry` -> form tambah spesimen (`SpecimenEntry`)

## Login Default Admin

Saat ini login admin masih memakai validasi dummy di frontend:

- **Email**: `admin@mitraabadi.com`
- **Password**: `admin123`

Setelah login sukses, user diarahkan ke `/admin/dashboard`.

## Struktur Folder Utama

```text
src/
├── components/
│   ├── layout/AdminLayout.jsx
│   ├── ChatWindow.jsx
│   ├── FabricCard.jsx
│   ├── NavAdmin.jsx
│   └── SidebarAdmin.jsx
├── constants/
│   └── fabrics.js
├── pages/
│   ├── admin/
│   └── user/
├── App.jsx
├── index.css
└── main.jsx
```

## Catatan Penting

- Belum ada proteksi route admin (guard/middleware). Akses URL admin langsung masih memungkinkan tanpa sesi login real.
- Data katalog dan admin masih statis, jadi perubahan form belum tersimpan permanen.
- Komponen chat AI masih memanggil endpoint eksternal langsung dari client, jadi untuk production perlu arsitektur backend/proxy dan pengelolaan API key yang aman.
