<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateUserProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        $id = Auth::id();

        return [
            'first_name' => 'required',
            'last_name' => 'required',
            'phone' => [
                'required',
                'numeric',
                Rule::unique('users', 'phone')->ignore($id),
            ],
            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email')->ignore($id),
            ],
            'image' => 'image|mimes:jpg,jpeg,png',
        ];
    }
}
