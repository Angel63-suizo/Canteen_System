<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\MenuItem;
use Illuminate\Support\Str;
use Carbon\Carbon;

class OrderSeeder extends Seeder
{
    public function run()
    {
        $menuItems = MenuItem::all();
        $userIds = [1, 2, 3]; 
        $statuses = ['Pending', 'Preparing', 'Ready', 'Completed'];

        for ($i = 0; $i < 200; $i++) {
            // 1. Pick random items for the order
            $itemsInOrder = $menuItems->random(rand(1, 4));
            $totalOrderAmount = 0;

            // 2. Insert the main order
            // Matches columns: user_id, order_number, status, total, created_at, updated_at
            $orderId = DB::table('orders')->insertGetId([
                'user_id' => $userIds[array_rand($userIds)],
                'order_number' => 'ORD-' . strtoupper(Str::random(12)),
                'status' => $statuses[array_rand($statuses)],
                'total' => 0, // Placeholder, updated below
                'created_at' => Carbon::now()->subDays(rand(0, 30)),
                'updated_at' => Carbon::now(),
            ]);

            // 3. Link items to the order
            foreach ($itemsInOrder as $item) {
                $quantity = rand(1, 3);
                $priceAtPurchase = $item->price;
                $lineItemTotal = $priceAtPurchase * $quantity; 
                
                $totalOrderAmount += $lineItemTotal;

                // Matches columns: order_id, menu_item_id, quantity, total, created_at, updated_at
                DB::table('order_items')->insert([
                    'order_id' => $orderId,
                    'menu_item_id' => $item->id,
                    'quantity' => $quantity,
                    'total' => $lineItemTotal, // Your new column
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ]);
            }

            // 4. Update the total on the main order record
            DB::table('orders')->where('id', $orderId)->update(['total' => $totalOrderAmount]);
        }
    }
}