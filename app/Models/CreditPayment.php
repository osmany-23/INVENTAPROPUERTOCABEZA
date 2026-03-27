<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CreditPayment extends BaseModel
{
    use HasFactory;

    public const ENTRY_TYPE_PAYMENT = 'PAGO';
    public const ENTRY_TYPE_INITIAL_PAYMENT = 'PAGO_INICIAL';

    protected $table = 'credit_payments';

    public $timestamps = false;

    protected $fillable = [
        'credit_id',
        'amount',
        'payment_type',
        'payment_method',
        'entry_type',
        'note',
        'created_at',
    ];

    protected $casts = [
        'credit_id' => 'integer',
        'amount' => 'double',
        'payment_type' => 'integer',
        'entry_type' => 'string',
        'created_at' => 'datetime',
    ];

    public function credit(): BelongsTo
    {
        return $this->belongsTo(Credit::class, 'credit_id', 'id');
    }
}
