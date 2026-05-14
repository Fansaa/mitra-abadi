<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\ChatbotController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\InventoryController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\DocumentController;
use App\Http\Controllers\Admin\ReportController;
use App\Http\Controllers\Admin\CustomerController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Portal Pembeli (Public Routes)
|--------------------------------------------------------------------------
*/

// Halaman utama → redirect ke katalog
Route::get('/', function () {
    return redirect()->route('catalog.index');
});

// Katalog Produk
Route::get('/katalog', [CatalogController::class, 'index'])->name('catalog.index');
Route::get('/katalog/kategori/{slug}', [CatalogController::class, 'category'])->name('catalog.category');
Route::get('/katalog/{slug}', [CatalogController::class, 'show'])->name('catalog.show');

// Halaman Statis
Route::get('/tentang-kami', [PageController::class, 'about'])->name('about');
Route::get('/hubungi-kami', [PageController::class, 'contact'])->name('contact');

/*
|--------------------------------------------------------------------------
| Portal Admin (Authenticated + Role Admin)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {

    // Dashboard
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    // Manajemen Kategori
    Route::resource('categories', CategoryController::class);

    // Manajemen Produk
    Route::resource('products', ProductController::class);

    // Manajemen Inventori
    Route::get('/inventory', [InventoryController::class, 'index'])->name('inventory.index');
    Route::get('/inventory/{inventory}/edit', [InventoryController::class, 'edit'])->name('inventory.edit');
    Route::put('/inventory/{inventory}', [InventoryController::class, 'update'])->name('inventory.update');
    Route::get('/inventory/{inventory}/logs', [InventoryController::class, 'logs'])->name('inventory.logs');

    // Manajemen Pesanan
    Route::resource('orders', OrderController::class)->only(['index', 'create', 'store', 'show']);
    Route::patch('/orders/{order}/status', [OrderController::class, 'updateStatus'])->name('orders.updateStatus');

    // Generate Dokumen
    Route::get('/documents', [DocumentController::class, 'index'])->name('documents.index');
    Route::get('/documents/invoice/{order}', [DocumentController::class, 'generateInvoice'])->name('documents.invoice');
    Route::get('/documents/packing-list/{order}', [DocumentController::class, 'generatePackingList'])->name('documents.packingList');

    // Database Pelanggan
    Route::get('/customers', [CustomerController::class, 'index'])->name('customers.index');
    Route::get('/customers/show', [CustomerController::class, 'show'])->name('customers.show');

    // Laporan Penjualan
    Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');
});

/*
|--------------------------------------------------------------------------
| Profil User (Authenticated)
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
