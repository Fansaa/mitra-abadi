<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\Inventory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Menampilkan halaman dashboard admin dengan metrik utama:
     * - Total penjualan
     * - Pesanan aktif
     * - Item stok kritis
     * - Pipeline pesanan terbaru
     */
    public function index()
    {
        $totalSales = Order::where('status', 'selesai')->sum('total_amount');

        $activeOrders = Order::whereIn('status', ['konfirmasi', 'proses'])->count();

        $lowStockItems = Inventory::where('stock_roll', '<=', \DB::raw('low_stock_threshold'))
            ->with('productVariant.product')
            ->get();

        $recentOrders = Order::with('items.productVariant.product')
            ->latest()
            ->take(10)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'totalSales' => $totalSales,
            'activeOrders' => $activeOrders,
            'lowStockItems' => $lowStockItems,
            'recentOrders' => $recentOrders,
        ]);
    }
}
