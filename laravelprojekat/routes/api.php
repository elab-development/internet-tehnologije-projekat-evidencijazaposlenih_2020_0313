<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\EventTypeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;
use App\Http\Controllers\StatistikaController;

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

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
 
Route::get('/departments', [DepartmentController::class, 'index']);
Route::get('/departments/{id}', [DepartmentController::class, 'show']);

 
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
 

Route::middleware('auth:sanctum')->group(function () {
    // Nova ruta za dohvat zaposlenih korisnika
    Route::get('employees', [AuthController::class, 'getEmployees']);
    //KATEDRE
    Route::post('/departments', [DepartmentController::class, 'store']);
    Route::put('/departments/{id}', [DepartmentController::class, 'update']);
    Route::delete('/departments/{id}', [DepartmentController::class, 'destroy']);


      // API ruta za izvoz događaja ulogovanog korisnika u .ics fajl
      Route::get('/events/export', [EventController::class, 'exportToICS'])->name('events.export');

    //DOGADJAJI
    Route::get('/events', [EventController::class, 'index']);
    Route::get('/events/{id}', [EventController::class, 'show']);
    Route::post('/events', [EventController::class, 'store']);
    Route::put('/events/{id}', [EventController::class, 'update']);
    Route::delete('/events/{id}', [EventController::class, 'destroy']);

    //TIPOVI DOGADJAJA
    Route::get('/event-types', [EventTypeController::class, 'index']);
    Route::get('/event-types/{id}', [EventTypeController::class, 'show']);
    Route::post('/event-types', [EventTypeController::class, 'store']);
    Route::put('/event-types/{id}', [EventTypeController::class, 'update']);
    Route::delete('/event-types/{id}', [EventTypeController::class, 'destroy']);

    Route::delete('/employees/{id}', [AuthController::class, 'deleteEmployee']);


    //STATISTIKA
    Route::get('/statistics', [StatistikaController::class, 'statistics']);
   
});
