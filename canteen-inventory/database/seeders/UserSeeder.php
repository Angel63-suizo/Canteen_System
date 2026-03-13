<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
   public function run(): void
{
    // Create Admin
    User::create([
        'name' => 'System Admin',
        'email' => 'admin@canteen.com',
        'password' => Hash::make('password123'),
        'role' => 'admin',
    ]);

    // Create Cashier
    User::create([
        'name' => 'Main Cashier',
        'email' => 'cashier@canteen.com',
        'password' => Hash::make('password123'),
        'role' => 'cashier',
    ]);

    // Create a regular Customer
    User::create([
        'name' => 'John Doe',
        'email' => 'customer@gmail.com',
        'password' => Hash::make('password123'),
        'role' => 'customer',
    ]);
}
}
