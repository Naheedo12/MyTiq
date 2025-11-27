<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Events\UserRegistered;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Mail;
use App\Mail\WelcomeMail;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'user',
        ]);

        // déclenche l'event — listener lit $user et enverra le mail
        event(new UserRegistered($user));

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Inscription réussie. Un email de bienvenue sera envoyé.',
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    public function login(LoginRequest $request)
    {
        $user = User::where('email', $request->email)->first();

        if (! $user || !Hash::check($request->password, $user->password)) {
            return response(['message' => 'Invalid credentials'], 401);
        }

        $token = $user->createToken('authtoken')->plainTextToken;

        return response([
            'message' => 'Login successful!',
            'user' => $user,
            'token' => $token
        ], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response(['message' => 'Logged out successfully']);
    }
}
