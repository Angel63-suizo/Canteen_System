<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\MenuItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\StoreOrderRequest;
use Exception;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['orderItems.menuItem'])
                   ->latest()
                   ->get();
                   
        return response()->json($orders);
    }

public function store(StoreOrderRequest $request)
{
    try {
        $result = DB::transaction(function () use ($request) {
            $order = Order::create([
                'user_id' => $request->user_id ?? auth()->id(),
                'order_number' => 'ORD-' . strtoupper(uniqid()),
                'status' => 'Pending',
                'total' => 0,
            ]);

            $calculatedTotal = 0;
            foreach ($request->items as $item) {
                $menuItem = MenuItem::findOrFail($item['menu_item_id']);
                if ($menuItem->stock_quantity < $item['quantity']) {
                    throw new Exception("Insufficient stock: {$menuItem->name}");
                }
                
                $itemTotal = $menuItem->price * $item['quantity'];
                $calculatedTotal += $itemTotal;
                $menuItem->decrement('stock_quantity', $item['quantity']);
                
                OrderItem::create([
                    'order_id' => $order->id,
                    'menu_item_id' => $menuItem->id,
                    'quantity' => $item['quantity'],
                    'total' => $itemTotal,
                ]);
            }
            
            $order->update(['total' => $calculatedTotal]);

            return [
                'message' => 'Order placed successfully', 
                'order_id' => $order->id,
                'final_total' => (float) $order->total
            ];
        });

        return response()->json($result, 201);

    } catch (Exception $e) {
        return response()->json([
            'message' => $e->getMessage()
        ], 422);
    }
}

    public function updateStatus(Request $request, $id)
    {
        $request->validate(['status' => 'required|string']);
        $order = Order::findOrFail($id);
        $order->update(['status' => $request->status]);
        return response()->json(['message' => "Order updated to {$request->status} successfully"]);
    }

    public function myOrders() {
        return Order::where('user_id', auth()->id())->latest()->get();
    }
}