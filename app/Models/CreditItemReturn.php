<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CreditItemReturn extends BaseModel
{
    use HasFactory;

    protected $table = 'credit_item_returns';

    protected $fillable = [
        'credit_id',
        'credit_item_id',
        'product_id',
        'warehouse_id',
        'quantity',
        'product_price',
        'sub_total',
        'note',
    ];

    protected $casts = [
        'credit_id' => 'integer',
        'credit_item_id' => 'integer',
        'product_id' => 'integer',
        'warehouse_id' => 'integer',
        'quantity' => 'double',
        'product_price' => 'double',
        'sub_total' => 'double',
    ];

    public function credit(): BelongsTo
    {
        return $this->belongsTo(Credit::class, 'credit_id', 'id');
    }

    public function creditItem(): BelongsTo
    {
        return $this->belongsTo(CreditItem::class, 'credit_item_id', 'id');
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
