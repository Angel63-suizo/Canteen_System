<?php

namespace Database\Seeders;
use App\Models\Product;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            CategorySeeder::class,
        ]);

        $this->call([
           MenuItemSeeder::class,
           OrderSeeder::class,
        ]);

        $this->call([
            OrderItemSeeder::class,
        ]);

    }
}
