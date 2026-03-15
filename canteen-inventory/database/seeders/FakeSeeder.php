<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class FakeSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        // Create 10 dummy users
        for ($i = 0; $i < 10; $i++) {
            DB::table('users')->insert([
                'name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'password' => Hash::make('password'), 
                'role' => 'customer', 
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}