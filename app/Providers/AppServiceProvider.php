<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $apiKey = config('app.api_key');
        $WS_INV_DEV = env('WS_INV_DEV');

        // Use the configuration values as needed
        // For example, bind the API key to the container
        $this->app->bind('api_key', function () use ($apiKey) {
            return $apiKey;
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // $this->app->bind('path.public', function() {
        //     return base_path().'/../public_html';
        //  });
    }
}
