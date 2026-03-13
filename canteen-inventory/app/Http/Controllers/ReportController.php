<?php

namespace App\Http\Controllers;
use App\Models\Order;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function getSalesReports() {
        return Order::select(DB::raw('DATE(created_at) as date'), DB::raw('SUM(total) as revenue'))
                    ->groupBy('date')->get();
    }
}
