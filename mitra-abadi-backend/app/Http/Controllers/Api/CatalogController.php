<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;

class CatalogController extends Controller
{
    private function formatProduct(Product $product): array
    {
        $variants   = $product->variants ?? collect();
        $stockTotal = $variants->sum(fn($v) => $v->inventory?->stock_roll ?? 0);
        $threshold  = $variants->min(fn($v) => $v->inventory?->low_stock_threshold ?? 999) ?? 999;

        $badge = null;
        if ($stockTotal > 0 && $stockTotal <= $threshold) {
            $badge = 'Low Stock';
        } elseif ($product->created_at && $product->created_at->diffInDays(now()) <= 30) {
            $badge = 'New Arrival';
        }

        $baseUrl = config('app.url');
        $images  = $variants
            ->filter(fn($v) => $v->image_path)
            ->map(fn($v) => $baseUrl . '/storage/' . $v->image_path)
            ->values()
            ->toArray();

        return [
            'id'              => $product->id,
            'name'            => $product->name,
            'price_min'       => $product->price_min,
            'price_max'       => $product->price_max,
            'yard_per_roll'   => $product->yard_per_roll,
            'sku_code'        => $product->sku_code,
            'description'     => $product->description,
            'badge'           => $badge,
            'category'        => $product->category
                ? ['id' => $product->category->id, 'name' => $product->category->name]
                : null,
            'stock_total'     => $stockTotal,
            'dominant_colors' => $variants->pluck('color_hex')->filter()->values()->toArray(),
            'img'             => $images[0] ?? null,
            'thumbnails'      => $images,
            'variants'        => $variants->map(fn($v) => [
                'id'         => $v->id,
                'color_name' => $v->color_name,
                'color_hex'  => $v->color_hex,
                'image_path' => $v->image_path ? $baseUrl . '/storage/' . $v->image_path : null,
                'stock_roll' => $v->inventory?->stock_roll ?? 0,
            ])->values(),
        ];
    }

    public function index(Request $request)
    {
        $products = Product::with(['category', 'variants.inventory'])
            ->where('is_active', true)
            ->when($request->category_id, fn($q) => $q->where('category_id', $request->category_id))
            ->get();

        return response()->json([
            'status' => 'success',
            'data'   => $products->map(fn($p) => $this->formatProduct($p))->values(),
        ]);
    }

    public function show($id)
    {
        $product = Product::with(['category', 'variants.inventory'])->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'data'   => $this->formatProduct($product),
        ]);
    }

    public function categories()
    {
        return response()->json([
            'status' => 'success',
            'data'   => Category::withCount('products')->get(),
        ]);
    }
}
