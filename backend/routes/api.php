<?php


use App\Http\Controllers\Survellaint\SurveillantDemandeAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\admin\GroupController;
use App\Http\Controllers\admin\FiliereController;
use App\Http\Middleware\AlreadyLoggedInMiddleware;
use App\Http\Controllers\admin\FormateurController;
use App\Http\Controllers\admin\StagiaireController;
use App\Http\Controllers\Stagiaire\AvertissementController;
use App\Http\Controllers\Stagiaire\JustificationController;
use App\Http\Controllers\Survellaint\SurveillantController;
use App\Http\Controllers\Survellaint\SurvellaintController;
use App\Http\Controllers\admin\SurveillantGeneralController;
use App\Http\Controllers\formateur\FormateurGroupeController;
use App\Http\Controllers\formateur\FormateurAbsenceController;
use App\Http\Controllers\Stagiaire\StagiaireAbsenceController;
use App\Http\Controllers\formateur\FormateurStagiaireController;
use App\Http\Controllers\surveillant\SurveillantGroupController;
use App\Http\Controllers\Stagiaire\DemandeAuthorisationController;
use App\Http\Controllers\surveillant\SurveillantFiliereController;
use App\Http\Controllers\Survellaint\SurveillantAbsencesController;
use App\Http\Controllers\surveillant\SurveillantStagiaireController;

Route::middleware(AlreadyLoggedInMiddleware::class)->controller(AuthController::class)->group(function () {
    Route::post("login", "login");
    Route::post("register", "register");
});

Route::middleware(["auth:sanctum", "role:admin|surveillant"])->prefix("admin")->group(function () {
    Route::controller(FiliereController::class)->group(function () {
        Route::get("filieres", "index");
        Route::get("filieres/{id}", "show");
        Route::put("filieres/{id}", "update");
        Route::delete("filieres/{id}", "destroy");
        Route::post("filieres", "store");
    });
    Route::controller(GroupController::class)->group(function () {
        Route::get("groupes", "index");
        Route::get("groupes/{id}", "show");
        Route::put("groupes/{id}", "update");
        Route::delete("groupes/{id}", "destroy");
        Route::post("groupes", "store");
    });
    Route::controller(StagiaireController::class)->group(function () {
        Route::get("stagiaires", "index");
        Route::get("stagiaires/{id}", "show");
        Route::put("stagiaires/{id}", "update");
        Route::delete("stagiaires/{id}", "destroy");
        Route::post("stagiaires", "store");
    });
    Route::controller(FormateurController::class)->group(function(){
        Route::get("formateurs", "index");
        Route::get("formateurs/{id}", "show");
        Route::put("formateurs/{id}", "update");
        Route::delete("formateurs/{id}", "destroy");
        Route::post("formateurs", "store");
    });
});

Route::middleware(["auth:sanctum", "role:formateur"])->prefix("formateur")->group(function () {
    Route::controller(FormateurGroupeController::class)->group(function(){
        Route::get("groupes", "index");
    });
    Route::controller(FormateurStagiaireController::class)->group(function(){
        Route::get("groupes/stagiaires", "stagiaires");
        Route::get("groupes/{groupeId}/stagiaires", "stagiaires");
    });
    Route::controller(FormateurAbsenceController::class)->group(function(){
        Route::post('absences', 'store');
    });
});
Route::middleware(["auth:sanctum", "role:surveillant"])->prefix("surveillant")->group(function () {
    Route::controller(SurveillantAbsencesController::class)->group(function () {
       Route::get('absences', 'index');
        Route::get('justifications/download/{id}', 'download');
        Route::put('justifications/{id}', 'update');
        
    });
    Route::controller(SurveillantDemandeAuthController::class)->group(function () {
        Route::get('demandes', 'index');
        Route::put('demandes/{id}', 'update');
        
    });
});

Route::middleware(["auth:sanctum"])->group(function () {
    Route::controller(ProfileController::class)->group(function () {
        Route::get("myprofile", "getUser");
        Route::put("myprofile", "updateProfile");
        Route::put('/update-password', "updatePassword");
    });
});





Route::middleware("auth:sanctum")->controller(AuthController::class)->group(function(){
    Route::get("user", "getUser");
    Route::post("logout", "logout");
});


Route::middleware(['auth:sanctum', 'role:stagiaire'])->group(function () {
   
    Route::controller(StagiaireAbsenceController::class)->group(function () {
        Route::get('stagiaire/absences', 'index');
        
    });
     Route::controller(DemandeAuthorisationController::class)->group(function () {
        Route::get('stagiaire/demandes', 'index');
        Route::post('stagiaire/demandes', 'store');
        Route::put('stagiaire/demandes/{id}', 'update');
        Route::delete('stagiaire/demandes/{id}', 'destroy');
        Route::get('stagiaire/download/{id}', 'download');
    });
    Route::controller(JustificationController::class)->group(function () {
        Route::get('stagiaire/justifications', 'index');
        Route::post('stagiaire/justifications', 'store');
        Route::get('stagiaire/justifications/{id}', 'show');
        Route::put('stagiaire/justifications/{id}', 'update');
        Route::delete('stagiaire/justifications/{id}', 'destroy');
        Route::get('stagiaire/justifications/download/{id}',  'download');
    });
    Route::controller(AvertissementController::class)->group(function () {
        Route::get('stagiaire/avertissements', 'index');
    });
});