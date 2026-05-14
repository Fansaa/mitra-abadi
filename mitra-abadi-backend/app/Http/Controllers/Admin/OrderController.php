<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\ProductVariant;
use App\Models\Inventory;
use App\Models\InventoryLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Menampilkan daftar semua pesanan (Order History).
     */
    public function index(Request $request)
    {
        $orders = Order::with('admin')
            ->when($request->search, function ($query, $search) {
                $query->where('order_code', 'like', "%{$search}%")
                    ->orWhere('customer_name', 'like', "%{$search}%");
            })
            ->when($request->status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    /**
     * Menampilkan form Manual Order Entry (POS-style).
     * Digunakan untuk mencatat pesanan dari konfirmasi WhatsApp.
     */
    public function create()
    {
        $variants = ProductVariant::with(['product.category', 'inventory'])
            ->whereHas('product', fn($q) => $q->where('is_active', true))
            ->get();

        return Inertia::render('Admin/Orders/Create', [
            'variants' => $variants,
        ]);
    }

    /**
     * Menyimpan pesanan baru dan mengurangi stok secara otomatis.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_phone' => 'nullable|string|max:20',
            'customer_address' => 'nullable|string',
            'notes' => 'nullable|string|max:500',
            'items' => 'required|array|min:1',
            'items.*.product_variant_id' => 'required|exists:product_variants,id',
            'items.*.qty_roll' => 'required|numeric|min:0.01',
            'items.*.price_per_meter' => 'required|numeric|min:0',
        ]);

        $order = DB::transaction(function () use ($validated) {
            // Generate kode pesanan unik: MA-XXXX
            $lastOrder = Order::withTrashed()->latest('id')->first();
            $nextNumber = $lastOrder ? ($lastOrder->id + 1) : 1;
            $orderCode = 'MA-' . str_pad($nextNumber, 4, '0', STR_PAD_LEFT);

            $order = Order::create([
                'order_code' => $orderCode,
                'admin_id' => Auth::id(),
                'customer_name' => $validated['customer_name'],
                'customer_phone' => $validated['customer_phone'] ?? null,
                'customer_address' => $validated['customer_address'] ?? null,
                'status' => 'draft',
                'notes' => $validated['notes'] ?? null,
                'total_amount' => 0,
            ]);

            $totalAmount = 0;

            foreach ($validated['items'] as $itemData) {
                $variant = ProductVariant::with('product')->findOrFail($itemData['product_variant_id']);
                $product = $variant->product;

                $qtyMeter = $itemData['qty_roll'] * $product->meter_per_roll;
                $subtotal = $qtyMeter * $itemData['price_per_meter'];

                $order->items()->create([
                    'product_variant_id' => $itemData['product_variant_id'],
                    'qty_roll' => $itemData['qty_roll'],
                    'qty_meter' => $qtyMeter,
                    'price_per_meter' => $itemData['price_per_meter'],
                    'subtotal' => $subtotal,
                ]);

                $totalAmount += $subtotal;
            }

            $order->update(['total_amount' => $totalAmount]);

            return $order;
        });

        return redirect()->route('admin.orders.show', $order)
            ->with('success', 'Pesanan berhasil dibuat.');
    }

    /**
     * Menampilkan detail pesanan.
     */
    public function show(Order $order)
    {
        $order->load(['admin', 'items.productVariant.product', 'documents']);

        return Inertia::render('Admin/Orders/Show', [
            'order' => $order,
        ]);
    }

    /**
     * Memperbarui status pesanan (draft → konfirmasi → proses → selesai / batal).
     * Saat status berubah ke 'konfirmasi', stok dikurangi otomatis.
     */
    public function updateStatus(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => 'required|in:draft,konfirmasi,proses,selesai,batal',
        ]);

        $oldStatus = $order->status;
        $newStatus = $validated['status'];

        DB::transaction(function () use ($order, $oldStatus, $newStatus) {
            // Kurangi stok saat dikonfirmasi
            if ($oldStatus === 'draft' && $newStatus === 'konfirmasi') {
                foreach ($order->items as $item) {
                    $inventory = Inventory::where('product_variant_id', $item->product_variant_id)->first();
                    if ($inventory) {
                        $product = $item->productVariant->product;
                        $inventory->stock_roll -= $item->qty_roll;
                        $inventory->stock_meter = $inventory->stock_roll * $product->meter_per_roll;
                        $inventory->stock_yard = $inventory->stock_roll * $product->yard_per_roll;
                        $inventory->last_updated_by = Auth::id();
                        $inventory->save();

                        InventoryLog::create([
                            'inventory_id' => $inventory->id,
                            'admin_id' => Auth::id(),
                            'type' => 'keluar',
                            'qty_roll' => $item->qty_roll,
                            'qty_meter' => $item->qty_meter,
                            'notes' => "Pesanan {$order->order_code} dikonfirmasi.",
                        ]);
                    }
                }
            }

            // Kembalikan stok jika dibatalkan dari status konfirmasi/proses
            if (in_array($oldStatus, ['konfirmasi', 'proses']) && $newStatus === 'batal') {
                foreach ($order->items as $item) {
                    $inventory = Inventory::where('product_variant_id', $item->product_variant_id)->first();
                    if ($inventory) {
                        $product = $item->productVariant->product;
                        $inventory->stock_roll += $item->qty_roll;
                        $inventory->stock_meter = $inventory->stock_roll * $product->meter_per_roll;
                        $inventory->stock_yard = $inventory->stock_roll * $product->yard_per_roll;
                        $inventory->last_updated_by = Auth::id();
                        $inventory->save();

                        InventoryLog::create([
                            'inventory_id' => $inventory->id,
                            'admin_id' => Auth::id(),
                            'type' => 'masuk',
                            'qty_roll' => $item->qty_roll,
                            'qty_meter' => $item->qty_meter,
                            'notes' => "Pesanan {$order->order_code} dibatalkan. Stok dikembalikan.",
                        ]);
                    }
                }
            }

            $order->update(['status' => $newStatus]);
        });

        return redirect()->route('admin.orders.show', $order)
            ->with('success', 'Status pesanan diperbarui menjadi ' . $newStatus . '.');
    }
}
