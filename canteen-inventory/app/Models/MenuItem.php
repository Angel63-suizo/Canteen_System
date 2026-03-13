<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
   protected $fillable = ['category_id', 'name', 'price', 'status'];

   public function category() {
        return $this->belongsTo(Category::class);
    }

    public function orders() {
    return $this->belongsToMany(Order::class, 'order_items')
                ->withPivot('quantity', 'price');
}

    public function inventoryLogs()
    {
        return $this->hasMany(InventoryLog::class);
    }
}
