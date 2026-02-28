<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserCredentialsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $userId = $this->resolveRouteUserId();

        return [
            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email')->ignore($userId),
            ],
            'password' => 'required|min:6|confirmed',
            'password_confirmation' => 'required|min:6',
        ];
    }

    private function resolveRouteUserId(): ?int
    {
        $routeUser = $this->route('user');
        if (! $routeUser) {
            $routeUser = $this->route('id');
        }
        if (! $routeUser) {
            $routeUser = $this->input('user_id', $this->input('id'));
        }

        if (is_object($routeUser) && isset($routeUser->id)) {
            return (int) $routeUser->id;
        }

        if (is_object($routeUser) && method_exists($routeUser, 'getKey')) {
            return (int) $routeUser->getKey();
        }

        if (is_numeric($routeUser)) {
            return (int) $routeUser;
        }

        return null;
    }
}
