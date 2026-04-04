<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;
use Laravel\Sanctum\NewAccessToken;
use Tests\TestCase;

class SessionActivityMiddlewareTest extends TestCase
{
    use DatabaseTransactions;

    protected function setUp(): void
    {
        parent::setUp();

        if (
            ! Schema::hasTable('users')
            || ! Schema::hasTable('personal_access_tokens')
            || ! Schema::hasColumn('users', 'last_activity')
        ) {
            $this->markTestSkipped('La migracion de last_activity aun no existe en este entorno de pruebas.');
        }

        Route::middleware(['api', 'auth:sanctum', 'session.activity'])
            ->get('/api/test-session-activity', function (Request $request) {
                return response()->json([
                    'success' => true,
                    'user_id' => $request->user()->id,
                ]);
            });
    }

    public function test_active_session_updates_last_activity(): void
    {
        $user = $this->createUser();
        $user->forceFill([
            'last_activity' => now()->subMinutes(5),
        ])->save();

        $plainTextToken = $this->issueToken($user);

        $response = $this
            ->withHeader('Authorization', 'Bearer '.$plainTextToken->plainTextToken)
            ->getJson('/api/test-session-activity');

        $response->assertOk();
        $this->assertTrue($user->fresh()->last_activity->gt(now()->subMinutes(1)));
    }

    public function test_expired_session_is_rejected_and_token_is_deleted(): void
    {
        $user = $this->createUser();
        $user->forceFill([
            'last_activity' => now()->subMinutes(61),
        ])->save();

        $plainTextToken = $this->issueToken($user);

        $response = $this
            ->withHeader('Authorization', 'Bearer '.$plainTextToken->plainTextToken)
            ->getJson('/api/test-session-activity');

        $response->assertUnauthorized()
            ->assertJson([
                'success' => false,
                'code' => 'SESSION_EXPIRED',
                'session_expired' => true,
            ]);

        $this->assertDatabaseMissing('personal_access_tokens', [
            'id' => $plainTextToken->accessToken->id,
        ]);
    }

    private function createUser(): User
    {
        $suffix = (string) (int) (microtime(true) * 1000000).random_int(100, 999);

        return User::create([
            'first_name' => 'Session',
            'last_name' => 'Tester',
            'email' => 'session_'.$suffix.'@example.test',
            'phone' => substr(strrev($suffix), 0, 12),
            'password' => Hash::make('password123'),
            'language' => 'sp',
        ]);
    }

    private function issueToken(User $user): NewAccessToken
    {
        return $user->createToken('session-test-token');
    }
}
