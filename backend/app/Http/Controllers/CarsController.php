<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Car;
use Exception;
use Auth;

class CarsController extends Controller
{
    //Create a new car
    public function createNewCar(Request $request)
    {
        $car = new Car;

        $car->carName = $request->carName;
        $car->pin = $request->pin;
        $car->longitude = $request->longitude;
        $car->latitude = $request->latitude;
        $car->user_id = Auth::user()->id;

        $car->save();
        return response()->json("Car added", 200);
    }

    //Get all Cars
    public function getAllCars()
    {
        $cars =  Car::all();

        return response()->json([
            'status' => 'success',
            'data' => $cars
        ]);

        return response()->json(["status" => "Error"]);
    }

    //Get Single Car
    public function getCar($id)
    {
        $car = Car::find($id);

        if ($car) {
            return response()->json([
                'status' => 'success',
                'data' => $car
            ]);
        } else {
            return response()->json("Car not found", 404);
        }
    }

    //Edit Car
    public function editCar(Request $request)
    {
        try {
            $car = Car::find($request->car_id);
            $car->update($request->all());

            return response()->json("Car updated", 200);
        } catch (Exception $e) {
            return response()->json("Car not found", 404);
        }
    }

    //Delete Single Car
    public function deleteCar(Request $request)
    {
        $car = Car::find($request->car_id);

        if ($car) {
            $car->delete();
            return response()->json("Car deleted", 200);
        } else {
            return response()->json("Car not found", 404);
        }
    }

    //Delete All Cars
    public function deleteAllCars()
    {
        $user = Auth::user();
        $cars = $user->cars;
        foreach ($cars as $car) {
            $car->delete();
        }
        return response()->json([
            'status' => 'success',
        ]);

        return response()->json(["status" => "Error"]);
    }

    //Get all cars of a user
    public function getUserCars()
    {
        $user = Auth::user();
        $cars = $user->cars;
        return response()->json(["cars" => $cars]);
    }

    //Get location of a car
    public function getLocation(Request $request)
    {
        $car = Car::find($request->car_id);

        $car->update($request->all());

        return response()->json(
            [
                'status' => 'success',
                'user' => $car,
            ]
        );
    }

    //Give the car latitude and longitude
    public function UpdateLocation()
    {
        $cars = Car::all();
        foreach ($cars as $car) {
            $car->latitude = $car->latitude + 0.0001;
            $car->longitude = $car->longitude + 0.0001;
            $car->save();
        }
        return response()->json("Location updated", 200);
    }

    //Update the car location
    public function updateCarLocation(Request $request)
    {
        $car = Car::find($request->car_id);
        $car->latitude = $request->latitude;
        $car->longitude = $request->longitude;
        $car->save();
        return response()->json("Location updated", 200);
    }

    //Get the car location
    public function getCarLocation($id)
    {
        $car = Car::find($id);
        return response()->json([
            'status' => 'success',
            'data' => $car
        ]);
    }

    //Get the car count
    public function getCarCount()
    {
        $cars = count(Car::all());

        return response()->json([
            'status' => 'success',
            'data' => $cars
        ]);
    }
}
