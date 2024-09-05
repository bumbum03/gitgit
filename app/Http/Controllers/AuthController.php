<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\role;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function me()
    {
        return response()->json(auth()->user());
    }

    public function login(Request $request)
    {
        try {
            $validator = Validator::make($request->post(), [
                'email' => 'required|email|max:255',
                'password' => 'required'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => $validator->errors()->first()
                ], 422);
            }

            if (!$token = auth()->attempt($validator->validate())) {
                return response()->json([
                    'status' => false,
                    'message' => 'Email / password salah!'
                ], 401);
            }

            $user = auth()->user();

            $role = $user->role;

            if ($role->id === 1) {
                return response()->json([
                    'status' => true,
                    'message' => 'Login Berhasil',
                    'user' => auth()->user(),
                    'token' => $token,
                    'role' => $role
                ]);
            } elseif ($role->id === 2) { {
                return response()->json([
                    'status' => true,
                    'message' => 'Login Berhasil',
                    'user' => auth()->user(),
                    'token' => $token,
                    'role' => $role
                ]);
            }
        }
    } catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json([
            'status' => false,
            'message' => $e->getMessage()
        ], 500);
    }
    }

    public function register(Request $request)
    {
        try {
            $validateData = $request->validate([
                'nama' => 'required|string',
                'email' => 'required|email|string|max:255|unique:users',
                'nomor' => 'required|unique:users',
                'password' => 'required|string|min:8|confirmed'
            ]);
            $validateData['role_id'] = 2;

            $user = User::created($validateData);

            $role = role::findById($validateData['role_id']);
            $user->assignRole($role);

            return response()->json([
                'user' => $user
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 422);
        }
    }
}
