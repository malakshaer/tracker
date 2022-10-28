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



    //Edit or update user
    public function editUser(Request $request)
    {

        $user = User::where('id', $request->id)->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'profile_image' => $request->profile_image
        ]);

        if ($request->encryptedImage) {
            $image_id = time();
            $image = base64_decode($request->encryptedImage);
            $path = storage_path('images\\')  . $image_id . "." . $request->extension;
            file_put_contents($path, $image);
            $user->image = $image_id . "." . $request->extension;
        }


        return response()->json(
            [
                'status' => 200,
                'message' => 'Profile Updated'
            ]
        );
    }
}
