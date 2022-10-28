<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CarController extends Controller
{
    private $database;

    public function __construct()
    {
        $this->database = \App\Services\FirebaseService::connect();
    }

    //Add Car Details
    //Each car added has a unique key
    public function createNewCar(Request $request)
    {
        $this->database
            ->getReference('cars/')
            ->push([
                'name' => $request['name'],
                'status' => 'Not Active',
                'longitude' => $request['longitude'],
                'latitude' => $request['latitude'],
            ])->getKey();

        return response()->json('Car has been created successfully');
    }
}
