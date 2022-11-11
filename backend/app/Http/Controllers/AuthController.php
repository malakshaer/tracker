<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Dotenv\Util\Str;
use Dotenv\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Stevebauman\Location\Facades\Location;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials);

        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        $currentUserInfo = Location::get($_SERVER['REMOTE_ADDR']);
        $user = User::find(Auth::user()->id);

        if ($currentUserInfo) {
            $user->latitude = $currentUserInfo->latitude;
            $user->longitude = $currentUserInfo->longitude;
            $user->save();
        }

        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
            'authorization' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }

    // public function register(Request $request)
    // {
    //     $request->validate([
    //         'name' => 'required|string|max:255',
    //         'email' => 'required|string|email|max:255|unique:users',
    //         'password' => 'required|string|min:8',
    //     ]);

    //     if ($request->fails()) {
    //         return response()->json($request->errors()->toJson(), 400);
    //     }

    //     $user = User::create([
    //         'name' => $request->name,
    //         'email' => $request->email,
    //         'password' => bcrypt($request->password),
    //     ]);

    //     $token = Auth::login($user);
    //     return response()->json([
    //         'status' => 'success',
    //         'message' => 'User created successfully',
    //         'user' => $user,
    //         'authorization' => [
    //             'token' => $token,
    //             'type' => 'bearer',
    //         ]
    //     ]);
    // }

    public function register(Request $request)
    {
        $confirmation_code = rand(100, 1000);

        $request->validate([
            'name' => 'required|string|min:3|max:100',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'confirmation_code' => $confirmation_code,
            'profile_image' => $request->profile_image
        ]);

        if ($user->save()) {
            $token = Auth::login($user);
            return response()->json([
                'status' => 'success',
                'message' => 'User created successfully',
                'user' => $user,
                'authorization' => [
                    'token' => $token,
                    'type' => 'bearer',
                ]
            ]);
        }
    }

    // public function register(Request $request)
    // {

    //     $request->validate([
    //         'name' => 'required|string|min:3|max:30',
    //         'email' => 'required|string|email|max:100|unique:users',
    //         'password' => 'required|string|confirmed|min:6',
    //     ]);

    //     if ($request->fails()) {
    //         return response()->json($request->errors()->toJson(), 400);
    //     }

    //     $user = User::create(array_merge(
    //         $request->validated(),
    //         ['password' => bcrypt($request->password)],
    //     ));

    //     $token = JWTAuth::fromUser($user);

    //     dd($this->sendNotification());

    //     $user->$this->sendNotification();

    //     return response()->json([
    //         'message' => 'successfully created',
    //         'user' => $user,
    //         'token' => $token,
    //     ], 201);
    // }



    public function checkCode(Request $request)
    {
        $data = $request->all();
        $usersCount = User::where('confirmation_code', $data['confirmation_code'])->count();
        if ($usersCount > 0) {
            echo 'false';
        } else {
            echo 'true';
        }
    }

    public function checkEmail(Request $request)
    {
        $data = $request->all();
        $usersCount = User::where('email', $data['email'])->count();
        if ($usersCount > 0) {
            echo 'false';
        } else {
            echo 'true';
        }
    }

    public function me()
    {
        return response()->json(auth()->user());
    }


    // protected function respondWithToken($token)
    // {
    //     return response()->json([
    //         'access_token' => $token,
    //         'token_type' => 'bearer',
    //         'expires_in' => auth()->factory()->getTTL() * 60
    //     ]);
    // }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
            'authorization' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }
}
