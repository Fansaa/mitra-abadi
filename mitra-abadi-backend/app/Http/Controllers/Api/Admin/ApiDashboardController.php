<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Order;
use App\Models\Inventory;

class ApiDashboardController extends Controller
{
    public function index()
    {
        $totalProducts   = Product::count();
        $totalOrders     = Order::count();
        $lowStockCount   = Inventory::whereColumn('stock_roll', '<=', 'low_stock_threshold')->count();
        $totalRevenue    = Order::where('status', 'completed')->sum('total_amount');

        $recentOrders = Order::with('items.productVariant.product')
            ->latest()
            ->take(5)
            ->get()
            ->map(fn($order) => [
                'id'            => $order->id,
                'customer_name' => $order->customer_name,
                'product_name'  => $order->items->first()?->productVariant?->product?->name ?? '-',
                'qty_roll'      => $order->items->sum('qty_roll'),
                'total_amount'  => $order->total_amount,
                'status'        => $order->status,
                'created_at'    => $order->created_at,
            ]);

        return response()->json([
            'status' => 'success',
            'data'   => [
                'total_products'  => $totalProducts,
                'total_orders'    => $totalOrders,
                'low_stock_count' => $lowStockCount,
                'total_revenue'   => $totalRevenue,
                'recent_orders'   => $recentOrders,
            ],
        ]);
    }
}
