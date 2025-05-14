<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    function login(LoginRequest $request)
    {
        $data = $request->validated();
        if (Auth::attempt(["identifiant" => $data["identifiant"], "password" => $data["password"]])) {
            /** @var /App/Model/User **/
            $user = Auth::user();
            $token = $user->createToken("token")->plainTextToken;
            $expires = now()->addDay(30)->diffInDays(now(), true);
            $userData = [
                "id" => $user->id,
                "nom" => $user->nom,
                "prenom" => $user->prenom,
                "identifiant" => $user->identifiant,
                "email" => $user->email,
                "role" => $user->role
            ];

            return response()->json([
                "data" => [
                    "user" => $user,
                    "token" => $token,
                    "expires" => $expires
                ]
            ], 200);
        }
        return response()->json([
            "error" => "Identifiant ou mot de passe incorrect"
        ], 400);
    }

    function logout(){
        /** @var /App/Model/User **/
        $user = Auth::user();
        $user->tokens()->delete();
        return response()->json([
            "success" => true,
            "message" => "Déconnexion réussie"
        ], 200);
    }

    function getUser(){
        /** @var /App/Model/User **/
        $user = Auth::user();
        return response()->json([
            "data" => $user
        ], 200);
    }

    function register(RegisterRequest $request)
    {
        $data = $request->validated();
        $data["password"] = Hash::make($data["password"]);
        /** @var /App/Model/User **/
        $user = User::create($data);
        
        return response()->json([
            "data" => $user
        ], 201);
    }
}
