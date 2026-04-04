<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;
use Laravel\Sanctum\PersonalAccessToken;

class SessionActivityService
{
    private ?bool $hasLastActivityColumn = null;

    public function timeoutMinutes(): int
    {
        return max(1, (int) config('session_activity.timeout_minutes', 60));
    }

    public function refreshIntervalMinutes(): int
    {
        return max(0, (int) config('session_activity.refresh_interval_minutes', 1));
    }

    public function hasExpired($lastActivity): bool
    {
        if (! $lastActivity instanceof Carbon) {
            return false;
        }

        return $lastActivity->lte(now()->subMinutes($this->timeoutMinutes()));
    }

    public function shouldRefresh($lastActivity): bool
    {
        if (! $lastActivity instanceof Carbon) {
            return true;
        }

        $refreshInterval = $this->refreshIntervalMinutes();

        if ($refreshInterval === 0) {
            return true;
        }

        return $lastActivity->lte(now()->subMinutes($refreshInterval));
    }

    public function touch(User $user, bool $force = false): void
    {
        if (! $this->supportsLastActivityColumn()) {
            return;
        }

        if (! $force && ! $this->shouldRefresh($user->last_activity)) {
            return;
        }

        $user->forceFill([
            'last_activity' => now(),
        ])->save();
    }

    public function invalidateRequestSession(Request $request, ?User $user = null): void
    {
        $user = $user instanceof User ? $user : $request->user();

        if ($user instanceof User) {
            $this->invalidateCurrentAccessToken($user->currentAccessToken());
        }

        if ($request->hasSession()) {
            $request->session()->invalidate();
            $request->session()->regenerateToken();
        }

        Auth::guard('web')->logout();
    }

    public function invalidateCurrentAccessToken($accessToken): void
    {
        if ($accessToken instanceof PersonalAccessToken) {
            $accessToken->delete();
        }
    }

    public function resolveLastActivityForAccessToken($accessToken): ?Carbon
    {
        if (! $accessToken) {
            return null;
        }

        $tokenable = $accessToken->tokenable;

        if ($tokenable instanceof User && $tokenable->last_activity instanceof Carbon) {
            return $tokenable->last_activity;
        }

        if ($accessToken->last_used_at instanceof Carbon) {
            return $accessToken->last_used_at;
        }

        return $accessToken->created_at instanceof Carbon ? $accessToken->created_at : null;
    }

    public function supportsLastActivityColumn(): bool
    {
        if ($this->hasLastActivityColumn !== null) {
            return $this->hasLastActivityColumn;
        }

        $this->hasLastActivityColumn = Schema::hasTable('users')
            && Schema::hasColumn('users', 'last_activity');

        return $this->hasLastActivityColumn;
    }
}
