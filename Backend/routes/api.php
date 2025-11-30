<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\TicketController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/events',[EventController::class, 'index']);
Route::post('/newsletter/subscribe', [NewsletterController::class, 'subscribe']);
Route::get('/newsletter/confirm', [NewsletterController::class, 'confirm']);
Route::get('/newsletter/check', [NewsletterController::class, 'check']);



Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/tickets', [TicketController::class, 'index']);
    Route::post('/tickets', [TicketController::class, 'store']);
    Route::get('/tickets/{ticket}', [TicketController::class, 'show']);
    Route::delete('/tickets/{ticket}', [TicketController::class, 'destroy']);
    Route::get('/tickets/{ticket}/download', [TicketController::class, 'downloadPdf']);
});


Route::middleware('auth:sanctum','role:admin')->group(function () {
    Route::post('/events',[EventController::class, 'store']);
    Route::post('/events/{event}',[EventController::class, 'update']);
    Route::delete('/events/{event}',[EventController::class, 'destroy']);

    Route::get('/tickets_admin', [TicketController::class, 'index_admin']);
});

