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

    //Each car added has a unique key
    public function createNewCar(Request $request)
    {
        $this->database
            ->getReference('cars/')
            ->push([
                'carName' => $request['carName'],
                'status' => 'Not Active',
                'longitude' => $request['longitude'],
                'latitude' => $request['latitude'],
                'pin' => $request['pin'],
            ])->getKey();

        return response()->json('Car has been created successfully');
    }

    //Change Car status
    public function changeCarStatus(Request $request)
    {
        $this->database
            ->getReference('cars/' . $request['id'])
            ->update([
                'status' => "Active",
            ]);

        return response()->json('Car is Active now');
    }

    //Get All Cars of the User
    public function getAllCars()
    {
        return response()->json($this->database
            ->getReference('cars/')
            ->getValue());
    }

    //Get single car details
    public function getCar(Request $request)
    {
        return response()->json($this->database
            ->getReference('cars/' . $request['id'])
            ->getValue());
    }

    //Edit or update Car Details
    public function editCar(Request $request)
    {
        $this->database->getReference('cars/' . $request['id'])
            ->update([
                'carName' => $request['carName'],
                'longitude' => $request['longitude'],
                'latitude' => $request['latitude'],
                'pin' => $request['pin'],

            ]);

        return response()->json('Car has been updated');
    }

    //Delete Car
    public function deleteCar(Request $request)
    {
        $this->database
            ->getReference('cars/' . $request['id'])
            ->remove();

        return response()->json('car has been deleted');
    }

    //Delete all cars
    public function deleteAllCars()
    {
        $this->database->getReference('cars/')
            ->remove();

        return response()->json('All Cars Deleted');
    }
}
