<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class QuickUpdateProductPriceRequest extends FormRequest
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
        return [
            'product_cost' => 'required|numeric|min:0',
            'product_price' => 'required|numeric|gt:product_cost',
            'tax_type' => 'nullable|in:1,2',
            'order_tax' => 'nullable|numeric|min:0|max:100',
        ];
    }
}
