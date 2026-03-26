<?php

namespace App\Http\Requests;

use App\Models\Sale;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Class CreateSaleRequest
 */
class CreateSaleRequest extends FormRequest
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
        return array_merge(Sale::$rules, [
            'credit_sale' => 'nullable|boolean',
            'credit_enabled' => 'nullable|boolean',
            'credit_initial_payment' => 'nullable|numeric|min:0',
            'credit_type' => 'nullable|in:automatico,manual,libre',
            'credit_interest_rate' => 'nullable|numeric|min:0',
            'credit_installments' => 'nullable|integer|min:1',
            'credit_start_date' => 'nullable|date',
            'credit_due_date' => 'nullable|date',
        ]);
    }
}
