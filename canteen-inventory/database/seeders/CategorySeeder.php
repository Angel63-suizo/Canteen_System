<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use \App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = ['Meals', 'Snacks', 'Beverages', 'Desserts', 'Combos'];

        foreach ($categories as $cat) {
            Category::create(['name' => $cat]);
        }
    }
}
