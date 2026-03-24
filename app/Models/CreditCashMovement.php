<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CreditCashMovement extends BaseModel
{
    use HasFactory;

    protected $table = 'credit_cash_movements';

    protected $fillable = [
        'credit_id',
        'credit_payment_id',
        'sale_id',
        'customer_id',
        'pos_register_id',
        'user_id',
        'type',
        'category',
        'source',
        'description',
        'amount',
        'principal_amount',
        'interest_amount',
        'payment_type',
        'payment_method',
        'movement_date',
    ];

    protected $casts = [
        'credit_id' => 'integer',
        'credit_payment_id' => 'integer',
        'sale_id' => 'integer',
        'customer_id' => 'integer',
        'pos_register_id' => 'integer',
        'user_id' => 'integer',
        'amount' => 'double',
        'principal_amount' => 'double',
        'interest_amount' => 'double',
        'payment_type' => 'integer',
        'movement_date' => 'datetime',
    ];

    public function credit(): BelongsTo
    {
        return $this->belongsTo(Credit::class, 'credit_id', 'id');
    }

    public function payment(): BelongsTo
    {
        return $this->belongsTo(CreditPayment::class, 'credit_payment_id', 'id');
    }

    public function register(): BelongsTo
    {
        return $this->belongsTo(POSRegister::class, 'pos_register_id', 'id');
    }
}
