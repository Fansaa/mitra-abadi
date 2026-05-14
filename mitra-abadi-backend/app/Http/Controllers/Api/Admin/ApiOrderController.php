<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ApiOrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('items.productVariant.product')
            ->latest()
            ->get()
            ->map(function ($order) {
                $orderData = $order->toArray();
                $orderData['items'] = $order->items->map(fn($item) => [
                    'id'               => $item->id,
                    'product_variant_id' => $item->product_variant_id,
                    'product_name'     => $item->productVariant?->product?->name ?? '-',
                    'color_name'       => $item->productVariant?->color_name ?? '-',
                    'qty_roll'         => $item->qty_roll,
                    'qty_meter'        => $item->qty_meter,
                    'price_per_meter'  => $item->price_per_meter,
                    'subtotal'         => $item->subtotal,
                ])->toArray();
                return $orderData;
            });

        return response()->json(['status' => 'success', 'data' => $orders]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'customer_name'              => 'required|string|max:255',
            'customer_phone'             => 'nullable|string|max:20',
            'customer_email'             => 'nullable|email|max:255',
            'customer_address'           => 'nullable|string',
            'notes'                      => 'nullable|string',
            'items'                      => 'required|array|min:1',
            'items.*.product_variant_id' => 'required|exists:product_variants,id',
            'items.*.qty_roll'           => 'required|numeric|min:0.01',
            'items.*.price_per_meter'    => 'required|numeric|min:0',
        ]);

        $order = DB::transaction(function () use ($request) {
            $totalAmount = 0;
            $itemsData   = [];

            foreach ($request->items as $item) {
                $variant        = ProductVariant::with(['product', 'inventory'])->findOrFail($item['product_variant_id']);
                $meterPerRoll   = $variant->product->meter_per_roll ?? 1;
                $yardPerRoll    = $variant->product->yard_per_roll ?? ($meterPerRoll * 1.0936);
                $subtotal       = $item['qty_roll'] * $meterPerRoll * $item['price_per_meter'];
                $totalAmount   += $subtotal;

                $itemsData[] = [
                    'product_variant_id' => $item['product_variant_id'],
                    'qty_roll'           => $item['qty_roll'],
                    'qty_meter'          => $item['qty_roll'] * $meterPerRoll,
                    'price_per_meter'    => $item['price_per_meter'],
                    'subtotal'           => $subtotal,
                ];

                // FR-15: Kurangi stok secara otomatis saat pesanan dikonfirmasi
                if ($variant->inventory) {
                    $variant->inventory->decrement('stock_roll', $item['qty_roll']);
                    $variant->inventory->decrement('stock_meter', $item['qty_roll'] * $meterPerRoll);
                    $variant->inventory->decrement('stock_yard', $item['qty_roll'] * $yardPerRoll);
                }
            }

            $order = Order::create([
                'order_code'       => 'ORD-' . strtoupper(Str::random(8)),
                'admin_id'         => $request->user()->id,
                'customer_name'    => $request->customer_name,
                'customer_phone'   => $request->customer_phone,
                'customer_email'   => $request->customer_email,
                'customer_address' => $request->customer_address,
                'notes'            => $request->notes,
                'status'           => 'pending',
                'total_amount'     => $totalAmount,
            ]);

            $order->items()->createMany($itemsData);

            return $order;
        });

        return response()->json([
            'status' => 'success',
            'data'   => $order->load('items.productVariant.product'),
        ], 201);
    }
}
