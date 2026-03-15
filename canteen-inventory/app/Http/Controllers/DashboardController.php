<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\MenuItem;
use App\Models\Category;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Carbon\CarbonPeriod;

class DashboardController extends Controller
{
    public function getStats()
    {
        $salesTrend = Order::selectRaw('DATE(created_at) as date, SUM(total) as revenue')
            ->where('created_at', '>=', now()->subDays(30))
            ->groupBy('date')
            ->orderBy('date', 'asc') 
            ->get();

        $period = CarbonPeriod::create(now()->subDays(30), now());
        $filledSalesTrend = collect($period)->map(function ($date) use ($salesTrend) {
            $formattedDate = $date->format('Y-m-d');
            $match = $salesTrend->firstWhere('date', $formattedDate);
            return [
                'date' => $date->format('M d'), 
                'revenue' => $match ? (float)$match->revenue : 0
            ];
        });

        return response()->json([
            'total_revenue' => Order::sum('total'),
            'total_orders' => Order::count(),
            'avg_order_value' => Order::avg('total'),
            'today_orders' => Order::whereDate('created_at', today())->count(),
            
            'best_sellers' => MenuItem::with('category')
                ->withCount(['orderItems as total_sold' => function($query) {
                    $query->select(DB::raw('sum(quantity)'));
                }])
                ->orderBy('total_sold', 'desc')
                ->limit(5)
                ->get(),

            'sales_trend' => $filledSalesTrend, 
            
            'category_data' => Category::withCount(['menuItems as value' => function($q) {
                $q->join('order_items', 'menu_items.id', '=', 'order_items.menu_item_id')
                  ->select(DB::raw('sum(quantity)'));
            }])->get()
        ]);
    }
}