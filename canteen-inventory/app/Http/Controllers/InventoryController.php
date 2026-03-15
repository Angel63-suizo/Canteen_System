<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use App\Models\InventoryLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InventoryController extends Controller
{
    public function index()
    {
        return response()->json(MenuItem::all());
    }

    public function updateStock(Request $request, $id) 
{
    $request->validate([
        'quantity_change' => 'required|integer',
        'reason' => 'required|string|max:255',
    ]);

    return DB::transaction(function () use ($request, $id) {
        $menuItem = MenuItem::findOrFail($id);

        $menuItem->stock_quantity += $request->quantity_change;
        $menuItem->save();

        InventoryLog::create([
            'menu_item_id' => $menuItem->id,
            'change' => $request->quantity_change, 
            'reason' => $request->reason,
        ]);

        return response()->json([
            'message' => 'Inventory updated successfully',
            'new_stock' => $menuItem->stock_quantity
        ], 200);
    });
    }
}
