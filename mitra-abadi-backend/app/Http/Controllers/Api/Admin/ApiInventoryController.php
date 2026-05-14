<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Inventory;
use Illuminate\Http\Request;

class ApiInventoryController extends Controller
{
    public function index()
    {
        $inventories = Inventory::with('productVariant.product.category')->get();

        return response()->json(['status' => 'success', 'data' => $inventories]);
    }

    public function show($id)
    {
        $inventory = Inventory::with('productVariant.product.category')->findOrFail($id);

        return response()->json(['status' => 'success', 'data' => $inventory]);
    }

    public function update(Request $request, $id)
    {
        $inventory = Inventory::findOrFail($id);

        $request->validate([
            'stock_roll'          => 'required|integer|min:0',
            'stock_meter'         => 'nullable|numeric|min:0',
            'stock_yard'          => 'nullable|numeric|min:0',
            'low_stock_threshold' => 'nullable|integer|min:0',
        ]);

        $inventory->update($request->only(['stock_roll', 'stock_meter', 'stock_yard', 'low_stock_threshold']));

        return response()->json(['status' => 'success', 'data' => $inventory->fresh()]);
    }
}
