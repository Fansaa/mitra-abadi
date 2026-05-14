<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ApiCategoryController extends Controller
{
    public function index()
    {
        return response()->json([
            'status' => 'success',
            'data'   => Category::withCount('products')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string|unique:categories,name',
            'description' => 'nullable|string',
        ]);
        $validated['slug'] = Str::slug($validated['name']);

        try {
            $category = Category::create($validated);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 'error', 'message' => 'Nama atau slug kategori sudah digunakan.'], 422);
        }

        return response()->json(['status' => 'success', 'data' => $category], 201);
    }

    public function show($id)
    {
        $category = Category::withCount('products')->with('products')->findOrFail($id);

        return response()->json(['status' => 'success', 'data' => $category]);
    }

    public function update(Request $request, $id)
    {
        $category  = Category::findOrFail($id);
        $validated = $request->validate([
            'name'        => 'required|string|unique:categories,name,' . $id,
            'description' => 'nullable|string',
        ]);
        $validated['slug'] = Str::slug($validated['name']);

        try {
            $category->update($validated);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['status' => 'error', 'message' => 'Nama atau slug kategori sudah digunakan.'], 422);
        }

        return response()->json(['status' => 'success', 'data' => $category]);
    }

    public function destroy($id)
    {
        Category::findOrFail($id)->delete();

        return response()->json(['status' => 'success', 'message' => 'Kategori dihapus.']);
    }
}
