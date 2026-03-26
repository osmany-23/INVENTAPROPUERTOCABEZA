<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductBatchMovement extends BaseModel
{
    use HasFactory;

    protected $table = 'product_batch_movements';

    protected $fillable = [
        'product_batch_id',
        'product_id',
        'warehouse_id',
        'movement_type',
        'reference_type',
        'reference_id',
        'quantity',
        'quantity_before',
        'quantity_after',
        'note',
        'meta',
        'user_id',
    ];

    protected $casts = [
        'product_batch_id' => 'integer',
        'product_id' => 'integer',
        'warehouse_id' => 'integer',
        'reference_id' => 'integer',
        'quantity' => 'float',
        'quantity_before' => 'float',
        'quantity_after' => 'float',
        'meta' => 'array',
        'user_id' => 'integer',
    ];

    public function batch(): BelongsTo
    {
        return $this->belongsTo(ProductBatch::class, 'product_batch_id', 'id');
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }

    public function warehouse(): BelongsTo
    {
        return $this->belongsTo(Warehouse::class, 'warehouse_id', 'id');
    }
}
