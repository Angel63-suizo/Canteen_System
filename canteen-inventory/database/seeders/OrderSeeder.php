<?php

namespace Database\Seeders;

use App\Models\Order;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    public function run()
    {
        for ($i = 1; $i <= 20; $i++) {
            Order::create([
                'user_id' => 1, 
                'order_number' => 'ORD-' . str_pad($i, 3, '0', STR_PAD_LEFT),
                'status' => 'Pending',
            ]);
        }
    }
}
