<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Credit extends BaseModel
{
    use HasFactory;

    public const STATUS_PENDING = 'pendiente';
    public const STATUS_PAID = 'pagado';
    public const STATUS_OVERDUE = 'vencido';

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
        'status',
        'start_date',
        'due_date',
        'note',
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
        'start_date' => 'date',
        'due_date' => 'date',
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
        return $this->hasMany(CreditPayment::class, 'credit_id', 'id');
    }

    public function installmentItems(): HasMany
    {
        return $this->hasMany(CreditInstallment::class, 'credit_id', 'id')->orderBy('installment_number');
    }

    public function logs(): HasMany
    {
        return $this->hasMany(CreditLog::class, 'credit_id', 'id')->latest('id');
    }
}
