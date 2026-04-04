<?php

namespace App\Http\Middleware;

use App\Models\User;
use App\Services\SessionActivityService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureSessionIsActive
{
    public function __construct(private readonly SessionActivityService $sessionActivity)
    {
    }

    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user instanceof User) {
            return $next($request);
        }

        $lastActivity = $user->last_activity instanceof \Illuminate\Support\Carbon
            ? $user->last_activity
            : $this->sessionActivity->resolveLastActivityForAccessToken($user->currentAccessToken());

        if ($this->sessionActivity->hasExpired($lastActivity)) {
            $this->sessionActivity->invalidateRequestSession($request, $user);

            return response()->json([
                'success' => false,
                'message' => 'Session expired due to inactivity.',
                'code' => 'SESSION_EXPIRED',
                'session_expired' => true,
                'timeout_minutes' => $this->sessionActivity->timeoutMinutes(),
            ], Response::HTTP_UNAUTHORIZED);
        }

        $response = $next($request);
        $this->sessionActivity->touch($user);

        return $response;
    }
}
