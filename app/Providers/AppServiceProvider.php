<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\ServiceProvider;
use Laravel\Sanctum\Sanctum;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Sanctum::authenticateAccessTokensUsing(function ($accessToken, bool $isValid) {
            $expiration = config('sanctum.expiration');
            if (! $expiration) {
                return $isValid;
            }

            if (! $accessToken || ! ($accessToken->tokenable instanceof User)) {
                return false;
            }

            if ($accessToken->expires_at && $accessToken->expires_at->isPast()) {
                return false;
            }

            $lastActivity = $accessToken->last_used_at ?? $accessToken->created_at;
            if (! $lastActivity) {
                return false;
            }

            return $lastActivity->gt(now()->subMinutes($expiration));
        });
    }
}
