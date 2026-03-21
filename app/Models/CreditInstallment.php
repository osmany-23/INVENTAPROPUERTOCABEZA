<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CreditInstallment extends BaseModel
{
    use HasFactory;

    public const STATUS_PENDING = 'pendiente';
    public const STATUS_PAID = 'pagado';
    public const STATUS_LATE = 'atrasado';

    protected $table = 'credit_installments';

    public $timestamps = false;

    protected $fillable = [
        'credit_id',
        'installment_number',
        'amount',
        'paid_amount',
        'due_date',
        'status',
        'paid_at',
        'created_at',
    ];

    protected $casts = [
        'credit_id' => 'integer',
        'installment_number' => 'integer',
        'amount' => 'double',
        'paid_amount' => 'double',
        'due_date' => 'date',
        'paid_at' => 'datetime',
        'created_at' => 'datetime',
    ];

    public function credit(): BelongsTo
    {
        return $this->belongsTo(Credit::class, 'credit_id', 'id');
    }
}
