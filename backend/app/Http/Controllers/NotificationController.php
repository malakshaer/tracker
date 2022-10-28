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
}
