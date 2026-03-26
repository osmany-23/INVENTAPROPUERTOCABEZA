<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PurchaseLot extends BaseModel
{
    use HasFactory;

    protected $table = 'purchase_lots';

    protected $fillable = [
        'purchase_detail_id',
        'lote_id',
        'cantidad',
        'costo_unitario',
        'precio_venta',
    ];

    protected $casts = [
        'purchase_detail_id' => 'integer',
        'lote_id' => 'integer',
        'cantidad' => 'float',
        'costo_unitario' => 'float',
        'precio_venta' => 'float',
    ];

    public function purchaseItem(): BelongsTo
    {
        return $this->belongsTo(PurchaseItem::class, 'purchase_detail_id', 'id');
    }

    public function batch(): BelongsTo
    {
        return $this->belongsTo(ProductBatch::class, 'lote_id', 'id');
    }
}
