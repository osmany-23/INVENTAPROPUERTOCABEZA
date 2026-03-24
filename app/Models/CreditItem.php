<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CreditItem extends BaseModel
{
    use HasFactory;

    protected $table = 'credit_items';

    protected $fillable = [
        'credit_id',
        'sale_item_id',
        'product_id',
        'warehouse_id',
        'quantity',
        'product_price',
        'sub_total',
        'source',
        'note',
    ];

    protected $casts = [
        'credit_id' => 'integer',
        'sale_item_id' => 'integer',
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

    public function saleItem(): BelongsTo
    {
        return $this->belongsTo(SaleItem::class, 'sale_item_id', 'id');
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }

    public function warehouse(): BelongsTo
    {
        return $this->belongsTo(Warehouse::class, 'warehouse_id', 'id');
    }

    public function returns(): HasMany
    {
        return $this->hasMany(CreditItemReturn::class, 'credit_item_id', 'id');
    }
}
