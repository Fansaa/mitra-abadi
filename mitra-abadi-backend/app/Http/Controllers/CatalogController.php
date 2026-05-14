<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CatalogController extends Controller
{
    /**
     * Menampilkan halaman katalog utama (Fabric Catalog Landing Page).
     * Fitur: filter kategori, filter warna, pencarian teks.
     */
    public function index(Request $request)
    {
        $categories = Category::withCount('products')->get();

        $products = Product::with(['category', 'variants.inventory'])
            ->where('is_active', true)
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('composition', 'like', "%{$search}%");
            })
            ->when($request->category, function ($query, $categorySlug) {
                $query->whereHas('category', fn($q) => $q->where('slug', $categorySlug));
            })
            ->when($request->color, function ($query, $color) {
                $query->whereHas('variants', fn($q) => $q->where('color_name', 'like', "%{$color}%"));
            })
            ->when($request->gsm_min, function ($query, $gsmMin) {
                $query->where('gsm', '>=', $gsmMin);
            })
            ->when($request->gsm_max, function ($query, $gsmMax) {
                $query->where('gsm', '<=', $gsmMax);
            })
            ->latest()
            ->get();

        return Inertia::render('Catalog/Index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category', 'color', 'gsm_min', 'gsm_max']),
        ]);
    }

    /**
     * Menampilkan detail produk kain (Fabric Detail + Order View).
     * Menampilkan spesifikasi teknis, varian warna, stok, dan tombol Pesan via WhatsApp.
     */
    public function show(string $slug)
    {
        $product = Product::with(['category', 'variants.inventory'])
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        // Produk terkait dari kategori yang sama
        $relatedProducts = Product::with(['variants.inventory'])
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->where('is_active', true)
            ->inRandomOrder()
            ->take(4)
            ->get();

        return Inertia::render('Catalog/Show', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
        ]);
    }

    /**
     * Menampilkan produk berdasarkan kategori tertentu (Category Detail).
     */
    public function category(string $slug)
    {
        $category = Category::where('slug', $slug)->firstOrFail();

        $products = Product::with(['variants.inventory'])
            ->where('category_id', $category->id)
            ->where('is_active', true)
            ->latest()
            ->paginate(12);

        $categories = Category::withCount('products')->get();

        return Inertia::render('Catalog/Category', [
            'currentCategory' => $category,
            'products' => $products,
            'categories' => $categories,
        ]);
    }
}
