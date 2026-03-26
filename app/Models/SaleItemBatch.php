<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SaleItemBatch extends BaseModel
{
    use HasFactory;

    protected $table = 'sale_item_batches';

    protected $fillable = [
        'sale_id',
        'sale_item_id',
        'product_id',
        'warehouse_id',
        'product_batch_id',
        'codigo_lote_sistema',
        'lote_fabricante',
        'lot_code',
        'lot_barcode',
        'ubicacion',
        'quantity',
        'fecha_fabricacion',
        'fecha_vencimiento',
        'expires_at',
        'impuesto_tipo',
        'impuesto_valor',
    ];

    protected $casts = [
        'sale_id' => 'integer',
        'sale_item_id' => 'integer',
        'product_id' => 'integer',
        'warehouse_id' => 'integer',
        'product_batch_id' => 'integer',
        'quantity' => 'float',
        'fecha_fabricacion' => 'date',
        'fecha_vencimiento' => 'date',
        'expires_at' => 'date',
        'impuesto_valor' => 'float',
    ];

    public function sale(): BelongsTo
    {
        return $this->belongsTo(Sale::class, 'sale_id', 'id');
    }

    public function saleItem(): BelongsTo
    {
        return $this->belongsTo(SaleItem::class, 'sale_item_id', 'id');
    }

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
