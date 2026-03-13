<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;

// Public Auth route
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    
    // --- Admin Access ---
    Route::middleware('role:admin')->group(function () {
        Route::apiResource('menu', MenuController::class); // Full CRUD for menu [cite: 36]
        Route::patch('/menu/{id}/toggle', [MenuController::class, 'toggleAvailability']); // Toggle availability 
        Route::get('/reports', [ReportController::class, 'getSalesReports']); // Sales dashboard 
        Route::patch('/inventory/{id}', [InventoryController::class, 'updateStock']); // Adjust stock 
    });

    // --- Cashier Access ---
    Route::middleware('role:cashier')->group(function () {
        Route::post('/orders', [OrderController::class, 'store']); // Order processing [cite: 44]
        Route::get('/menu', [MenuController::class, 'index']); // Menu viewing [cite: 20]
    });

    // --- Customer Access ---
    Route::middleware('role:customer')->group(function () {
        Route::get('/menu', [MenuController::class, 'index']); // Browse menu [cite: 21]
        Route::get('/orders/history', [OrderController::class, 'index']); // View history [cite: 21]
    });
});