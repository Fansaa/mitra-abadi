<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    /**
     * Menampilkan daftar pelanggan unik dari riwayat pesanan.
     * Karena tidak ada registrasi pelanggan mandiri (sesuai PRD),
     * data pelanggan diambil dari tabel orders.
     */
    public function index(Request $request)
    {
        $customers = Order::select('customer_name', 'customer_phone')
            ->selectRaw('COUNT(*) as total_orders')
            ->selectRaw('SUM(total_amount) as total_spent')
            ->selectRaw('MAX(created_at) as last_order_at')
            ->when($request->search, function ($query, $search) {
                $query->where('customer_name', 'like', "%{$search}%")
                    ->orWhere('customer_phone', 'like', "%{$search}%");
            })
            ->groupBy('customer_name', 'customer_phone')
            ->orderByDesc('total_spent')
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Admin/Customers/Index', [
            'customers' => $customers,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Menampilkan riwayat pesanan dari pelanggan tertentu.
     */
    public function show(Request $request)
    {
        $request->validate([
            'customer_name' => 'required|string',
        ]);

        $orders = Order::where('customer_name', $request->customer_name)
            ->with('items.productVariant.product')
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Customers/Show', [
            'customerName' => $request->customer_name,
            'orders' => $orders,
        ]);
    }
}
