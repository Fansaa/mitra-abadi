<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReportController extends Controller
{
    /**
     * Menampilkan halaman laporan performa penjualan.
     * Metrik: total penjualan per periode, produk terlaris, tren bulanan.
     */
    public function index(Request $request)
    {
        $startDate = $request->start_date ?? now()->startOfMonth()->toDateString();
        $endDate = $request->end_date ?? now()->toDateString();

        // Total penjualan pada rentang tanggal
        $totalSales = Order::where('status', 'selesai')
            ->whereBetween('created_at', [$startDate, $endDate . ' 23:59:59'])
            ->sum('total_amount');

        $totalOrders = Order::where('status', 'selesai')
            ->whereBetween('created_at', [$startDate, $endDate . ' 23:59:59'])
            ->count();

        // Penjualan per bulan (12 bulan terakhir)
        $monthlySales = Order::where('status', 'selesai')
            ->where('created_at', '>=', now()->subMonths(12))
            ->select(
                DB::raw('YEAR(created_at) as year'),
                DB::raw('MONTH(created_at) as month'),
                DB::raw('SUM(total_amount) as total'),
                DB::raw('COUNT(*) as count')
            )
            ->groupBy('year', 'month')
            ->orderBy('year')
            ->orderBy('month')
            ->get();

        // Produk terlaris berdasarkan jumlah meter terjual
        $topProducts = DB::table('order_items')
            ->join('orders', 'orders.id', '=', 'order_items.order_id')
            ->join('product_variants', 'product_variants.id', '=', 'order_items.product_variant_id')
            ->join('products', 'products.id', '=', 'product_variants.product_id')
            ->where('orders.status', 'selesai')
            ->whereBetween('orders.created_at', [$startDate, $endDate . ' 23:59:59'])
            ->select(
                'products.name',
                DB::raw('SUM(order_items.qty_meter) as total_meter'),
                DB::raw('SUM(order_items.subtotal) as total_revenue')
            )
            ->groupBy('products.id', 'products.name')
            ->orderByDesc('total_revenue')
            ->limit(10)
            ->get();

        return Inertia::render('Admin/Reports/Index', [
            'totalSales' => $totalSales,
            'totalOrders' => $totalOrders,
            'monthlySales' => $monthlySales,
            'topProducts' => $topProducts,
            'filters' => [
                'start_date' => $startDate,
                'end_date' => $endDate,
            ],
        ]);
    }
}
