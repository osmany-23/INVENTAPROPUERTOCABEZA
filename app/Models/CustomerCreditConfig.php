<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CustomerCreditConfig extends BaseModel
{
    use HasFactory;

    public const STATUS_ACTIVE = 'activo';
    public const STATUS_BLOCKED = 'bloqueado';

    protected $table = 'customer_credit_configs';

    protected $fillable = [
        'customer_id',
        'credit_limit',
        'current_balance',
        'allow_exceed',
        'interest_rate',
        'max_installments',
        'status',
    ];

    protected $casts = [
        'customer_id' => 'integer',
        'credit_limit' => 'double',
        'current_balance' => 'double',
        'allow_exceed' => 'boolean',
        'interest_rate' => 'double',
        'max_installments' => 'integer',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'id');
    }
}
