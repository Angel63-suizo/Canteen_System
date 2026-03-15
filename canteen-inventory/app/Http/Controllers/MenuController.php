<?php

namespace App\Http\Controllers;
use App\Models\MenuItem;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function index() {
    return MenuItem::with('category')->get();
    return MenuItem::where('status', true)->get();
}
    public function store(Request $request) {
    $validated = $request->validate([
        'category_id' => 'required|exists:categories,id', // Validates that category exists
        'name' => 'required|string|max:255',
        'price' => 'required|numeric',
        'status' => 'boolean',
        'stock_quantity' => 'required|integer|min:0',
    ]);
    return MenuItem::create($validated);
}

public function update(Request $request, $id) 
{
    $item = MenuItem::findOrFail($id);
    $validated = $request->validate([ 
        'category_id' => 'required|exists:categories,id', // Validates that category exists
        'name' => 'required|string|max:255',
        'price' => 'required|numeric',
        'status' => 'boolean',
        'stock_quantity' => 'required|integer|min:0',
     ]);
    $item->update($validated);
    return response()->json(['message' => 'Success', 'data' => $item]);
}

public function destroy($id) 
{
    $item = MenuItem::findOrFail($id);
    $item->delete();
    
    return response()->json(['message' => 'Deleted successfully']);
}

    public function toggleAvailability($id) {
        $item = MenuItem::findOrFail($id);
        $item->status = !$item->status;
        $item->save();
        return response()->json(['message' => 'Status updated']);
    }

    public function getCategories() {
    return \App\Models\Category::all(); 
    }
}
