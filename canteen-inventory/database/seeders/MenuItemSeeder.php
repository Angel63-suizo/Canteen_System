<?php

namespace Database\Seeders;

use App\Models\MenuItem;
use Illuminate\Database\Seeder;

class MenuItemSeeder extends Seeder
{
    public function run()
    {
        $items = [
            ['name' => 'Burger', 'category_id' => 1, 'price' => 50.00, 'status' => true],
            ['name' => 'Pizza', 'category_id' => 1, 'price' => 150.00, 'status' => true],
            ['name' => 'Coffee', 'category_id' => 3, 'price' => 30.00, 'status' => true],
            ['name' => 'Fries', 'category_id' => 2, 'price' => 40.00, 'status' => true],
            ['name' => 'Cake', 'category_id' => 4, 'price' => 60.00, 'status' => true],
            ['name' => 'Combo A', 'category_id' => 5, 'price' => 100.00, 'status' => true],
            ['name' => 'Soda', 'category_id' => 3, 'price' => 25.00, 'status' => true],
            ['name' => 'Sandwich', 'category_id' => 1, 'price' => 45.00, 'status' => true],
            ['name' => 'Tea', 'category_id' => 3, 'price' => 20.00, 'status' => true],
            ['name' => 'Cookie', 'category_id' => 4, 'price' => 15.00, 'status' => true],
        ];

        foreach ($items as $item) {
            MenuItem::create($item);
        }
    }
}
