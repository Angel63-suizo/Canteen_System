<?php

namespace App\Http\Controllers;
use App\Models\MenuItem;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function index() { return MenuItem::all(); }
    public function toggleAvailability($id) {
        $item = MenuItem::findOrFail($id);
        $item->status = !$item->status;
        $item->save();
        return response()->json(['message' => 'Status updated']);
    }
}
