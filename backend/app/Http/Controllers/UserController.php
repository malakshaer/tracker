<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Auth;
use Illuminate\Support\Facades\Auth as FacadesAuth;
use Tymon\JWTAuth\Contracts\Providers\Auth as ProvidersAuth;

class UserController extends Controller
{

    //Show User Profile
    public function showProfile()
    {
        $user = Auth::user();
        return response()->json(
            [
                'status' => 200,
                'user' => $user,
            ]
        );
    }

    //Edit or update user
    public function editUser(Request $request)
    {

        $user = Auth::user();

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $image_name = $image->getClientOriginalName();
            $image->move(public_path('/images'), $image_name);
            $image_path = "/images/" . $image_name;
        }

        $user->update($request->all());

        return response()->json(
            [
                'status' => 'success',
                'user' => $user,
            ]
        );
    }

    //Delete User
    public function deleteAccount()
    {
        Auth::user()->delete();

        return response()->json('Account has been deleted');
    }

    //Get all users
    public function getAllUsers()
    {
        $users =  User::all();

        return response()->json([
            'status' => 'success',
            'data' => $users
        ]);

        return response()->json(["status" => "Error"]);
    }

    //Get Statistics
    // public function getStats()
    // {
    //     $numberOfUsers = count(User::all());
    //     $numberOfCars = count(Cars::all());
    // }

    //Get number of users
    public function getUserCount()
    {
        $users = count(User::all());

        return response()->json([
            'status' => 'success',
            'data' => $users
        ]);
    }
}
