<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\OrderItem;

class MenuItem extends Model
{

   use SoftDeletes;
   protected $fillable = ['category_id', 'name', 'price', 'status', 'stock_quantity'];
   protected $casts = ['price' => 'decimal:2'];

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

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class, 'menu_item_id');
    }
}
