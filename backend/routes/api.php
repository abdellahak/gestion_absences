<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\admin\GroupController;
use App\Http\Controllers\admin\FiliereController;
use App\Http\Middleware\AlreadyLoggedInMiddleware;
use App\Http\Controllers\admin\StagiaireController;
use App\Http\Controllers\Stagiaire\StagiaireAbsenceController;
use App\Http\Controllers\Stagiaire\StatusController;

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
    Route::controller(GroupController::class)->group(function(){
        Route::get("groupes", "index");
        Route::get("groupes/{id}", "show");
        Route::put("groupes/{id}", "update");
        Route::delete("groupes/{id}", "destroy");
        Route::post("groupes", "store");
    });
    Route::controller(StagiaireController::class)->group(function(){
        Route::get("stagiaires", "index");
        Route::get("stagiaires/{id}", "show");
        Route::put("stagiaires/{id}", "update");
        Route::delete("stagiaires/{id}", "destroy");
        Route::post("stagiaires", "store");
    });
});

Route::middleware("auth:sanctum")->controller(AuthController::class)->group(function(){
    Route::get("user", "getUser");
    Route::post("logout", "logout");
});


Route::middleware(['auth:sanctum', 'role:stagiaire'])->group(function () {
    Route::controller(StatusController::class)->group(function () {
        Route::get('stagiaire/status', 'index');
    });
    Route::controller(StagiaireAbsenceController::class)->group(function () {
        Route::get('stagiaire/absences', 'index');
    });
});