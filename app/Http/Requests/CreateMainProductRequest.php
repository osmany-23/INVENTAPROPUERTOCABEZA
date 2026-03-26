<?php

namespace App\Http\Requests;

use App\Models\MainProduct;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class CreateMainProductRequest extends FormRequest
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
        if (request()->get('product_type') == MainProduct::SINGLE_PRODUCT) {
            return Product::$rules;
        }

        if (request()->get('product_type') == MainProduct::VARIATION_PRODUCT) {
            $variationData = $this->normalizeArrayPayload(request()->get('variation_data'));
            $this->merge([
                'variation_data' => $variationData,
            ]);

            return [
                'name' => 'required',
                'product_code' => 'required|unique:products',
                'product_category_id' => 'required|exists:product_categories,id',
                'brand_id' => 'required|exists:brands,id',
                'product_unit' => 'required',
                'sale_unit' => 'nullable',
                'purchase_unit' => 'nullable',
                'quantity_limit' => 'nullable',
                'notes' => 'nullable',
                'barcode_symbol' => 'required',
                'images.*' => 'image|mimes:jpg,jpeg,png',
                'variation_data.*.product_cost' => 'required|numeric',
                'variation_data.*.product_price' => 'required|numeric',
                'variation_data.*.stock_alert' => 'nullable',
                'variation_data.*.order_tax' => 'nullable|numeric',
                'variation_data.*.tax_type' => 'nullable',
                'variation_data.*.code' => 'required|unique:products',
            ];
        }

        if (request()->get('product_type') == MainProduct::BATCH_PRODUCT) {
            $batchData = $this->normalizeArrayPayload(request()->get('batch_data'));
            $this->merge([
                'batch_data' => $batchData,
            ]);

            return [
                'name' => 'required',
                'product_code' => 'required|unique:products,product_code',
                'code' => 'required|unique:products,code',
                'product_category_id' => 'required|exists:product_categories,id',
                'brand_id' => 'required|exists:brands,id',
                'product_unit' => 'required',
                'sale_unit' => 'nullable',
                'purchase_unit' => 'nullable',
                'quantity_limit' => 'nullable',
                'notes' => 'nullable',
                'barcode_symbol' => 'required',
                'images.*' => 'image|mimes:jpg,jpeg,png',
                'purchase_supplier_id' => 'required|exists:suppliers,id',
                'purchase_warehouse_id' => 'required|exists:warehouses,id',
                'purchase_status' => 'required',
                'batch_data' => 'required|array|min:1',
                'batch_data.*.codigo_lote_sistema' => 'nullable|string|max:255',
                'batch_data.*.lot_code' => 'nullable|string|max:255',
                'batch_data.*.lote_fabricante' => 'nullable|string|max:255',
                'batch_data.*.lot_barcode' => 'nullable|string|max:255|distinct',
                'batch_data.*.ubicacion' => 'nullable|string|max:255',
                'batch_data.*.descripcion' => 'nullable|string|max:1000',
                'batch_data.*.quantity' => 'required|numeric|gt:0',
                'batch_data.*.product_cost' => 'required|numeric|gt:0',
                'batch_data.*.product_price' => 'required|numeric|gt:0',
                'batch_data.*.received_at' => 'nullable|date',
                'batch_data.*.fecha_fabricacion' => 'nullable|date',
                'batch_data.*.manufactured_at' => 'nullable|date',
                'batch_data.*.fecha_vencimiento' => 'nullable|date',
                'batch_data.*.expires_at' => 'nullable|date',
                'batch_data.*.impuesto_tipo' => 'nullable|in:INCLUSIVO,EXCLUSIVO,1,2',
                'batch_data.*.impuesto_valor' => 'nullable|numeric|min:0|max:100',
            ];
        }

        return [];
    }

    public function withValidator(Validator $validator): void
    {
        if ((int) request()->get('product_type') !== MainProduct::BATCH_PRODUCT) {
            return;
        }

        $validator->after(function (Validator $validator) {
            $manufacturerLots = [];

            foreach ((array) $this->input('batch_data', []) as $index => $batch) {
                $manufacturerLot = trim((string) ($batch['lote_fabricante'] ?? $batch['lot_code'] ?? ''));
                $receivedAt = $batch['received_at'] ?? $this->input('purchase_date');
                $manufacturedAt = $batch['fecha_fabricacion'] ?? $batch['manufactured_at'] ?? null;
                $expiresAt = $batch['fecha_vencimiento'] ?? $batch['expires_at'] ?? null;

                if ($manufacturerLot === '') {
                    $validator->errors()->add(
                        "batch_data.$index.lote_fabricante",
                        'Cada lote debe tener lote de fabricante.'
                    );
                } else {
                    $normalizedManufacturerLot = mb_strtoupper($manufacturerLot);
                    if (in_array($normalizedManufacturerLot, $manufacturerLots, true)) {
                        $validator->errors()->add(
                            "batch_data.$index.lote_fabricante",
                            'Los lotes de fabricante no pueden repetirse.'
                        );
                    } else {
                        $manufacturerLots[] = $normalizedManufacturerLot;
                    }
                }

                if (! empty($manufacturedAt) && ! empty($expiresAt)) {
                    try {
                        if (Carbon::parse($expiresAt)->lt(Carbon::parse($manufacturedAt))) {
                            $validator->errors()->add(
                                "batch_data.$index.fecha_vencimiento",
                                'La fecha de vencimiento debe ser igual o posterior a la fecha de fabricacion.'
                            );
                        }
                    } catch (\Throwable) {
                        $validator->errors()->add(
                            "batch_data.$index.fecha_vencimiento",
                            'La fecha de vencimiento del lote no es valida.'
                        );
                    }
                }

                if (empty($receivedAt) || empty($expiresAt)) {
                    continue;
                }

                try {
                    if (Carbon::parse($expiresAt)->lt(Carbon::parse($receivedAt))) {
                        $validator->errors()->add(
                            "batch_data.$index.expires_at",
                            'La fecha de vencimiento debe ser igual o posterior a la fecha de compra.'
                        );
                    }
                } catch (\Throwable) {
                    $validator->errors()->add(
                        "batch_data.$index.expires_at",
                        'La fecha de vencimiento del lote no es valida.'
                    );
                }
            }
        });
    }

    public function messages(): array
    {
        return [
            'code.unique' => __('messages.error.code_taken'),
            'variation_data.*.product_cost.required' => 'The product cost field is required.',
            'variation_data.*.product_price.required' => 'The product price field is required.',
            'variation_data.*.product_cost.numeric' => 'The product cost must be a number.',
            'variation_data.*.product_price.numeric' => 'The product price must be a number.',
            'variation_data.*.order_tax.numeric' => 'The order tax must be a number.',
            'variation_data.*.code.unique' => 'The code has already been taken.',
            'batch_data.required' => 'Debe agregar al menos un lote.',
            'batch_data.array' => 'El detalle de lotes no es valido.',
            'batch_data.min' => 'Debe agregar al menos un lote.',
            'batch_data.*.lot_barcode.distinct' => 'Los codigos de barras de lote no pueden repetirse.',
            'batch_data.*.quantity.gt' => 'La cantidad del lote debe ser mayor a cero.',
            'batch_data.*.product_cost.gt' => 'El precio de compra del lote debe ser mayor a cero.',
            'batch_data.*.product_price.gt' => 'El precio de venta del lote debe ser mayor a cero.',
            'batch_data.*.descripcion.max' => 'La descripcion del lote no puede superar los 1000 caracteres.',
            'batch_data.*.impuesto_tipo.in' => 'El tipo de impuesto del lote no es valido.',
            'batch_data.*.impuesto_valor.max' => 'El impuesto del lote no puede superar el 100%.',
        ];
    }

    private function normalizeArrayPayload(mixed $value): array
    {
        if (is_array($value)) {
            return $value;
        }

        if (is_string($value) && $value !== '') {
            $decoded = json_decode($value, true);

            return is_array($decoded) ? $decoded : [];
        }

        return [];
    }
}
