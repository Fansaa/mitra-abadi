<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Menampilkan daftar produk kain (Specimen Entry / Archive Explorer).
     */
    public function index(Request $request)
    {
        $products = Product::with(['category', 'variants.inventory'])
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->when($request->category_id, function ($query, $categoryId) {
                $query->where('category_id', $categoryId);
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        $categories = Category::all();

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category_id']),
        ]);
    }

    /**
     * Menampilkan form tambah produk baru (Add New Textile Specimen).
     */
    public function create()
    {
        $categories = Category::all();

        return Inertia::render('Admin/Products/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Menyimpan produk baru beserta varian warnanya ke database.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'sku_code' => 'nullable|string|max:255',
            'gsm' => 'nullable|integer|min:1',
            'width_cm' => 'nullable|numeric|min:0',
            'meter_per_roll' => 'nullable|numeric|min:0',
            'yard_per_roll' => 'nullable|numeric|min:0',
            'is_active' => 'boolean',
            // Varian
            'variants' => 'nullable|array',
            'variants.*.color_name' => 'required|string|max:255',
            'variants.*.color_hex' => 'nullable|string|max:7',
            'variants.*.pattern' => 'nullable|string|max:255',
            'variants.*.image' => 'nullable|image|max:2048',
        ]);

        $validated['slug'] = Str::slug($validated['name']) . '-' . Str::random(5);

        $product = Product::create($validated);

        // Simpan varian jika ada
        if ($request->has('variants')) {
            foreach ($request->variants as $index => $variantData) {
                $imagePath = null;
                if (isset($variantData['image']) && $variantData['image']) {
                    $imagePath = $variantData['image']->store('products/variants', 'public');
                }

                $product->variants()->create([
                    'color_name' => $variantData['color_name'],
                    'color_hex' => $variantData['color_hex'] ?? null,
                    'pattern' => $variantData['pattern'] ?? null,
                    'image_path' => $imagePath,
                ]);
            }
        }

        return redirect()->route('admin.products.index')
            ->with('success', 'Produk berhasil ditambahkan.');
    }

    /**
     * Menampilkan detail produk (Specimen Detail).
     */
    public function show(Product $product)
    {
        $product->load(['category', 'variants.inventory']);

        return Inertia::render('Admin/Products/Show', [
            'product' => $product,
        ]);
    }

    /**
     * Menampilkan form edit produk (Edit Specimen).
     */
    public function edit(Product $product)
    {
        $product->load('variants');
        $categories = Category::all();

        return Inertia::render('Admin/Products/Edit', [
            'product' => $product,
            'categories' => $categories,
        ]);
    }

    /**
     * Memperbarui data produk di database.
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'sku_code' => 'nullable|string|max:255',
            'gsm' => 'nullable|integer|min:1',
            'width_cm' => 'nullable|numeric|min:0',
            'meter_per_roll' => 'nullable|numeric|min:0',
            'yard_per_roll' => 'nullable|numeric|min:0',
            'is_active' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['name']) . '-' . Str::random(5);

        $product->update($validated);

        return redirect()->route('admin.products.index')
            ->with('success', 'Produk berhasil diperbarui.');
    }

    /**
     * Menghapus produk (soft delete).
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('admin.products.index')
            ->with('success', 'Produk berhasil dihapus.');
    }
}
