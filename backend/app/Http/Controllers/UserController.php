<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

    // //Create a user
    // public function create(Request $request)
    // {
    //     $this->database
    //         ->getReference('users/')
    //         ->set([
    //             'name' => $request['name'],
    //             'email' => $request['email'],
    //             'password' => bcrypt($request['password'])
    //         ]);

    //     return response()->json('User has been created successfully');
    // }

    //Show User Profile
    public function showProfile($id)
    {
        return User::where("id", $id)->get();
    }
}
