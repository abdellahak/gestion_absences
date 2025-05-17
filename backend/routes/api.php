<?php

use App\Http\Controllers\admin\FiliereController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\AlreadyLoggedInMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::middleware(AlreadyLoggedInMiddleware::class)->controller(AuthController::class)->group(function(){
    Route::post("login", "login");
    Route::post("register", "register");
});

Route::middleware(["auth:sanctum", "role:admin"])->group(function(){
    Route::controller(FiliereController::class)->group(function(){
        Route::get("filieres", "index");
        Route::get("filieres/{id}", "show");
        Route::put("filieres/{id}", "update");
        Route::delete("filieres/{id}", "destroy");
        Route::post("filieres", "store");
    });
});

Route::middleware(["auth:sanctum"])->group(function(){
    Route::controller(ProfileController::class)->group(function(){
        Route::get("myprofile", "getUser");
        Route::put("myprofile", "updateProfile");
    });
});

Route::middleware("auth:sanctum")->controller(AuthController::class)->group(function(){
    Route::get("user", "getUser");
    Route::post("logout", "logout");
});
