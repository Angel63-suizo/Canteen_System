<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\MenuItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function store(Request $request)
{
    return DB::transaction(function () use ($request) {
        $order = Order::create([
            'user_id' => $request->user_id,
            'order_number' => 'ORD-' . strtoupper(uniqid()),
            'status' => 'Pending',
        ]);

        foreach ($request->items as $item) {
            $menuItem = MenuItem::findOrFail($item['menu_item_id']);
            
            $menuItem->decrement('stock_quantity', $item['quantity']);
            
            $lineTotal = $menuItem->price * $item['quantity'];

            OrderItem::create([
                'order_id' => $order->id,
                'menu_item_id' => $menuItem->id,
                'quantity' => $item['quantity'],
                'total' => $lineTotal, 
            ]);
        }

        return response()->json(['message' => 'Order placed successfully', 'order' => $order], 201);
    });
}
}
