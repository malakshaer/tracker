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

    Route::controller(NotificationController::class)->group(function () {
        Route::post('/sendNotification', 'sendNotification');
        Route::get('/getAllNotifications', 'getAllNotifications');
        Route::get('/getSingleNotification/{id}', 'getSingleNotification');
        Route::put('/readNotification/{id}', 'readNotification');
        Route::delete('/deleteNotification/{id}', 'deleteNotification');
        Route::delete('/deleteAllNotifications', 'deleteAllNotifications');
    });

    Route::controller(CarController::class)->group(function () {
        Route::post('/createNewCar', 'createNewCar');
        Route::get('/getAllCars', 'getAllCars');
        Route::get('/getCar/{id}', 'getCar');
        Route::put('/editCar/{id}', 'editCar');
        Route::put('/changeCarStatus/{id}', 'changeCarStatus'); //
        Route::delete('/deleteAllCars', 'deleteAllCars');
        Route::delete('/deleteCar/{id}', 'deleteCar');
    });
});
