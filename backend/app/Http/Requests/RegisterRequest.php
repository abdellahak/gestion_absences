<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nom' => 'required',
            'prenom' => 'required',
            'identifiant' => 'required|unique:users,identifiant',
            'email' => 'nullable|email|unique:users,email',
            'password' => 'required',
        ];
    }

    /**
     * Get the validation messages that apply to the request.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'nom.required' => 'Veuillez entrer le nom',
            'prenom.required' => 'Veuillez entrer le prénom',
            'identifiant.required' => 'Veuillez entrer l\'identifiant',
            'identifiant.unique' => 'L\'identifiant existe déjà',
            'email.email' => 'Veuillez entrer un email valide',
            'email.unique' => 'L\'email existe déjà',
            'password.required' => 'Veuillez entrer le mot de passe',
        ];
    }
}
