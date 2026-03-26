<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductBatchSetting extends BaseModel
{
    use HasFactory;

    protected $table = 'product_batch_settings';

    protected $fillable = [
        'product_id',
        'track_batches',
        'alert_days',
        'deny_expired_sale',
    ];

    protected $casts = [
        'product_id' => 'integer',
        'track_batches' => 'boolean',
        'alert_days' => 'integer',
        'deny_expired_sale' => 'boolean',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }
}
