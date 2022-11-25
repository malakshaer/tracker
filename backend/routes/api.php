<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CarsController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\AdminMiddleware;


Route::group(["prefix" => "auth"], function () {

    Route::controller(AuthController::class)->group(function () {
        Route::post("/login", 'login');
        Route::post("/register", 'register');
    });
    Route::middleware(['auth:api'])->group(function () {

        Route::controller(UserController::class)->group(function () {
            Route::get('/showProfile', 'showProfile');
            Route::put('/editUser', 'editUser');
            Route::delete('/deleteAccount', 'deleteAccount');
        });

        Route::controller(NotificationController::class)->group(function () {
            Route::post('/sendNotification', 'sendNotification');
            Route::get('/getAllNotifications', 'getAllNotifications');
            Route::get('/getSingleNotification/{id}', 'getSingleNotification');
            Route::put('/readNotification/{id}', 'readNotification');
            Route::delete('/deleteNotification/{id}', 'deleteNotification');
            Route::delete('/deleteAllNotifications', 'deleteAllNotifications');
        });

        Route::controller(CarsController::class)->group(function () {
            Route::post('/createNewCar', 'createNewCar');
            Route::get('/getAllCars', 'getAllCars');
            Route::get('/getCar/{id}', 'getCar');
            Route::get('/getUserCars', 'getUserCars');
            Route::put('/editCar', 'editCar');
            Route::delete('/deleteAllCars', 'deleteAllCars');
            Route::delete('/deleteCar', 'deleteCar');
        });
    });

    Route::middleware([AdminMiddleware::class])->group(function () {
        Route::get("/getAllUsers", [UserController::class, "getAllUsers"]);
        Route::get("/getAllCars", [CarsController::class, "getAllCars"]);
        Route::get("/getUserCount", [UserController::class, "getUserCount"]);
        Route::get("/getCarCount", [CarsController::class, "getCarCount"]);
    });
});
Route::put("/UpdateLocation", [CarsController::class, "UpdateLocation"]);
Route::put("/updateCarLocation", [CarsController::class, "updateCarLocation"]);
Route::get("/getCarLocation/{id}", [CarsController::class, "getCarLocation"]);
