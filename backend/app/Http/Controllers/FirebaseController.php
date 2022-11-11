<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Kreait\Firebase\Factory;
use Kreait\Firebase\Auth;
use Firebase\Auth\Token\Exception\InvalidToken;
use Kreait\Firebase\Exception\Auth\RevokedIdToken;

class FirebaseController extends Controller
{
    protected $auth, $database;

    public function __construct()
    {
        $this->database = \App\Services\FirebaseService::connect();
    }

    public function signUp(Request $request)
    {
        $name = $request['name'];
        $email = $request['email'];
        $password = bcrypt($request['password']);

        try {
            $newUser = $this->auth->createUserWithEmailAndPassword($name, $email, $password);
            dd($newUser);
        } catch (\Throwable $e) {
            switch ($e->getMessage()) {
                case 'The email address is already in use by another account.':
                    dd("Email invalid");
                    break;
                case 'A password must be a string with at least 6 characters.':
                    dd("password must be at least 6 characters");
                    break;
                default:
                    dd($e->getMessage());
                    break;
            }
        }
    }

    public function signIn(Request $request)
    {
        $email = $request['email'];
        $password = $request['password'];

        try {
            $signInResult = $this->auth->signInWithEmailAndPassword($email, $password);

            Session::put('firebaseUserId', $signInResult->firebaseUserId());
            Session::put('idToken', $signInResult->idToken());
            Session::save();

            dd($signInResult);
        } catch (\Throwable $e) {
            switch ($e->getMessage()) {
                case 'INVALID_PASSWORD':
                    dd("invalid password");
                    break;
                case 'EMAIL_NOT_FOUND':
                    dd("Email not found");
                    break;
                default:
                    dd($e->getMessage());
                    break;
            }
        }
    }

    public function signOut()
    {
        if (Session::has('firebaseUserId') && Session::has('idToken')) {
            $this->auth->revokeRefreshTokens(Session::get('firebaseUserId'));
            Session::forget('firebaseUserId');
            Session::forget('idToken');
            Session::save();
            dd("Logout User");
        } else {
            dd("login User");
        }
    }
}
