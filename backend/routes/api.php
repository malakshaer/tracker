<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\AuthController;


Route::group(["prefix" => "auth"], function () {

    Route::controller(AuthController::class)->group(function () {
        Route::post("/login", 'login');
        Route::post("/register", 'register');
    });

    Route::controller(UserController::class)->group(function () {
        Route::get('/showProfile/{id}', 'showProfile');
        Route::put('/editUser/{data}', 'editUser');
        Route::delete('/deleteAccount/{id}', 'deleteAccount');
    });
});
