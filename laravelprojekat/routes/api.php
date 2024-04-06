<?php

use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\EventTypeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('/event-types', [EventTypeController::class, 'index']);
Route::get('/event-types/{id}', [EventTypeController::class, 'show']);
Route::post('/event-types', [EventTypeController::class, 'store']);
Route::put('/event-types/{id}', [EventTypeController::class, 'update']);
Route::delete('/event-types/{id}', [EventTypeController::class, 'destroy']);
Route::get('/departments', [DepartmentController::class, 'index']);
Route::get('/departments/{id}', [DepartmentController::class, 'show']);
Route::post('/departments', [DepartmentController::class, 'store']);
Route::put('/departments/{id}', [DepartmentController::class, 'update']);
Route::delete('/departments/{id}', [DepartmentController::class, 'destroy']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
