<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Car;
use Exception;

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
    public function editCar(Request $request, $id)
    {

        $car = Car::find($id);

        if ($car) {

            $car->carName = $request->carName;
            $car->pin = $request->pin;
            $car->longitude = $request->longitude;
            $car->latitude = $request->latitude;

            $car->update();

            return response()->json("car updated", 200);
        } else {
            return response()->json("car not found", 404);
        }
    }

    //Delete Single Car
    public function deleteCar($id)
    {
        $car = Car::find($id);

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
        Car::truncate();

        return response()->json([
            'status' => 'success',
        ]);

        return response()->json(["status" => "Error"]);
    }
}
