<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use App\Firebase\Guard as FirebaseGuard;
use App\Firebase\FirebaseUserProvider;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    public function boot()
    {
        $this->registerPolicies();

        \Illuminate\Support\Facades\Auth::provider('firebaseuserprovider', function ($app, array $config) {
            return new FirebaseUserProvider($app['hash'], $config['model']);
        });
    }
}
