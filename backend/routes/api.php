<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ScoreController;


Route::post('/check-score', [ScoreController::class, 'checkScore']);
Route::get('/report', [ScoreController::class, 'report']);
Route::get('/top10-group-a', [ScoreController::class, 'top10GroupA']);