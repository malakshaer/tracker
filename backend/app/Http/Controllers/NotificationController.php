<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Kreait\Firebase\Contract\Database;

class NotificationController extends Controller
{
    private $database;

    public function __construct()
    {
        $this->database = \App\Services\FirebaseService::connect();
    }

    //send a Notification
    public function sendNotification()
    {
        $this->database
            ->getReference('notifications/')
            ->push([
                'message' => "Your car is Active now!",
                'is_read' => 0,
                'created_at' => ['.sv' => 'timestamp']
            ])
            ->getKey();

        return response()->json('Message sent successfully');
    }

    //Show All Notifications
    public function getAllNotifications()
    {
        return response()->json($this->database->getReference('notifications/')
            ->getValue());
    }

    //Show Single Notification
    public function getSingleNotification(Request $request)
    {
        return response()->json($this->database
            ->getReference('notifications/' . $request['id'])
            ->getValue());
    }

    //Read Notification
    public function readNotification(Request $request)
    {
        $this->database
            ->getReference('notifications/' . $request['id'])
            ->update([
                'is_read' => 1,
            ]);

        return response()->json('Message is read');
    }

    //Delete Notification
    public function deleteNotification(Request $request)
    {
        $this->database
            ->getReference('notifications/' . $request['id'])
            ->remove();

        return response()->json('Notification deleted');
    }

    //Delete all Notifications
    public function deleteAllNotifications()
    {
        $this->database->getReference('notifications/')
            ->remove();

        return response()->json('All Notifications Deleted');
    }
}
