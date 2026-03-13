<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\MenuItem;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class OrderItemSeeder extends Seeder
{
    public function run()
    {
        $orders = Order::all();
        $menuItems = MenuItem::all();

        foreach ($orders as $order) {
            $randomItems = $menuItems->random(rand(1, 3));
            
            foreach ($randomItems as $item) {
                $quantity = rand(1, 5); 
                
                $total = $item->price * $quantity; 

                DB::table('order_items')->insert([
                    'order_id' => $order->id,
                    'menu_item_id' => $item->id,
                    'quantity' => $quantity,
                    'total' => $total, 
                ]);
            }
        }
    }
}