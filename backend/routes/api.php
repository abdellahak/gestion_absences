<?php

use App\Http\Controllers\AuthController;
use App\Http\Middleware\AlreadyLoggedInMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::middleware(AlreadyLoggedInMiddleware::class)->controller(AuthController::class)->group(function(){
    Route::post("login", "login");
    Route::post("register", "register");
});

Route::middleware("auth:sanctum")->controller(AuthController::class)->group(function(){
    Route::get("user", "getUser");
    Route::post("logout", "logout");
});
