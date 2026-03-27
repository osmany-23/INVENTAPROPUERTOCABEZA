<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Credit extends BaseModel
{
    use HasFactory;

    public const STATUS_PENDING = 'pendiente';
    public const STATUS_PARTIAL = 'parcial';
    public const STATUS_PAID = 'pagado';
    public const STATUS_OVERDUE = 'vencido';
    public const OPEN_STATUSES = [
        self::STATUS_PENDING,
        self::STATUS_PARTIAL,
        self::STATUS_OVERDUE,
    ];
    public const TYPE_AUTOMATIC = 'automatico';
    public const TYPE_MANUAL = 'manual';
    public const TYPE_FREE = 'libre';

    protected $table = 'credits';

    protected $fillable = [
        'sale_id',
        'customer_id',
        'total_amount',
        'principal_balance',
        'balance',
        'interest_rate',
        'total_with_interest',
        'installments',
        'credit_type',
        'status',
        'start_date',
        'due_date',
        'note',
        'restructured',
        'restructured_at',
        'previous_balance',
    ];

    protected $casts = [
        'sale_id' => 'integer',
        'customer_id' => 'integer',
        'total_amount' => 'double',
        'principal_balance' => 'double',
        'balance' => 'double',
        'interest_rate' => 'double',
        'total_with_interest' => 'double',
        'installments' => 'integer',
        'restructured' => 'boolean',
        'previous_balance' => 'double',
        'start_date' => 'date',
        'due_date' => 'date',
        'restructured_at' => 'datetime',
    ];

    public function sale(): BelongsTo
    {
        return $this->belongsTo(Sale::class, 'sale_id', 'id');
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'id');
    }

    public function payments(): HasMany
    {
        return $this->hasMany(CreditPayment::class, 'credit_id', 'id')
            ->orderBy('created_at')
            ->orderBy('id');
    }

    public function installmentItems(): HasMany
    {
        return $this->hasMany(CreditInstallment::class, 'credit_id', 'id')->orderBy('installment_number');
    }

    public function logs(): HasMany
    {
        return $this->hasMany(CreditLog::class, 'credit_id', 'id')->latest('id');
    }

    public function items(): HasMany
    {
        return $this->hasMany(CreditItem::class, 'credit_id', 'id')->orderBy('id');
    }

    public function itemReturns(): HasMany
    {
        return $this->hasMany(CreditItemReturn::class, 'credit_id', 'id')->latest('id');
    }

    public function restructures(): HasMany
    {
        return $this->hasMany(CreditRestructure::class, 'credit_id', 'id')->latest('id');
    }
}
