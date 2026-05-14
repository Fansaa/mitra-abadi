<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Inventory;
use App\Models\InventoryLog;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class InventoryController extends Controller
{
    /**
     * Menampilkan daftar inventaris kain dengan info stok.
     * Kolom: Nama Spesimen, Kategori, Stok (Roll/Meter/Yard), GSM, Lebar, Status.
     */
    public function index(Request $request)
    {
        $inventories = Inventory::with(['productVariant.product.category'])
            ->when($request->search, function ($query, $search) {
                $query->whereHas('productVariant.product', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                });
            })
            ->when($request->status, function ($query, $status) {
                if ($status === 'low') {
                    $query->whereColumn('stock_roll', '<=', 'low_stock_threshold');
                } elseif ($status === 'available') {
                    $query->whereColumn('stock_roll', '>', 'low_stock_threshold');
                }
            })
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Admin/Inventory/Index', [
            'inventories' => $inventories,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    /**
     * Menampilkan form penyesuaian stok untuk varian produk tertentu.
     */
    public function edit(Inventory $inventory)
    {
        $inventory->load('productVariant.product');

        return Inertia::render('Admin/Inventory/Edit', [
            'inventory' => $inventory,
        ]);
    }

    /**
     * Memperbarui stok dan mencatat log perubahan (audit trail).
     * Otomatis menghitung stock_meter dan stock_yard dari stock_roll.
     */
    public function update(Request $request, Inventory $inventory)
    {
        $validated = $request->validate([
            'type' => 'required|in:masuk,keluar,koreksi',
            'qty_roll' => 'required|numeric|min:0.01',
            'notes' => 'nullable|string|max:500',
        ]);

        DB::transaction(function () use ($validated, $inventory) {
            $product = $inventory->productVariant->product;
            $qtyRoll = $validated['qty_roll'];

            // Hitung perubahan berdasarkan tipe
            if ($validated['type'] === 'masuk') {
                $inventory->stock_roll += $qtyRoll;
            } elseif ($validated['type'] === 'keluar') {
                if ($inventory->stock_roll < $qtyRoll) {
                    abort(422, 'Jumlah keluar melebihi stok yang tersedia.');
                }
                $inventory->stock_roll -= $qtyRoll;
            } else { // koreksi
                $inventory->stock_roll = $qtyRoll;
            }

            // Auto-kalkulasi meter dan yard berdasarkan roll
            $inventory->stock_meter = $inventory->stock_roll * $product->meter_per_roll;
            $inventory->stock_yard = $inventory->stock_roll * $product->yard_per_roll;
            $inventory->last_updated_by = Auth::id();
            $inventory->save();

            // Catat log perubahan stok (audit trail)
            InventoryLog::create([
                'inventory_id' => $inventory->id,
                'admin_id' => Auth::id(),
                'type' => $validated['type'],
                'qty_roll' => $qtyRoll,
                'qty_meter' => $qtyRoll * $product->meter_per_roll,
                'notes' => $validated['notes'] ?? null,
            ]);
        });

        return redirect()->route('admin.inventory.index')
            ->with('success', 'Stok berhasil diperbarui.');
    }

    /**
     * Menampilkan log histori perubahan stok untuk audit trail.
     */
    public function logs(Inventory $inventory)
    {
        $inventory->load('productVariant.product');

        $logs = InventoryLog::where('inventory_id', $inventory->id)
            ->with('admin')
            ->latest()
            ->paginate(20);

        return Inertia::render('Admin/Inventory/Logs', [
            'inventory' => $inventory,
            'logs' => $logs,
        ]);
    }
}
