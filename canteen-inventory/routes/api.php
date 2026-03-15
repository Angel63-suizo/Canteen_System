<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/login', [AuthController::class, 'login']);

// Authenticated routes
Route::middleware('auth:sanctum')->group(function () {
    
    // Shared Logout
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Shared Menu & Categories (Accessible by all authenticated roles)
    Route::get('/menu', [MenuController::class, 'index']);
    Route::get('/categories', [MenuController::class, 'getCategories']);

    // --- ADMIN & CASHIER ACCESS ---
    Route::middleware('role:admin,cashier')->group(function () {
        Route::post('/menu', [MenuController::class, 'store']);
        Route::put('/menu/{id}', [MenuController::class, 'update']);
        Route::delete('/menu/{id}', [MenuController::class, 'destroy']);
        
        Route::get('/orders', [OrderController::class, 'index']);
        Route::post('/orders', [OrderController::class, 'store']);
        Route::patch('/orders/{id}/status', [OrderController::class, 'updateStatus']);
    });

    // --- ADMIN ONLY ACCESS ---
    Route::middleware('role:admin')->group(function () {
        Route::get('/dashboard/stats', [DashboardController::class, 'getStats']);
        Route::patch('/menu/{id}/toggle', [MenuController::class, 'toggleAvailability']);
        Route::get('/inventory', [InventoryController::class, 'index']);
        Route::patch('/inventory/{id}/update', [InventoryController::class, 'updateStock']);
        Route::get('/reports', [ReportController::class, 'getSalesReports']);
    });

    // --- CUSTOMER ACCESS ---
    Route::middleware('role:customer')->group(function () {
        Route::post('/customer/orders', [OrderController::class, 'store']);
        Route::get('/customer/orders/history', [OrderController::class, 'myOrders']);
    });
});