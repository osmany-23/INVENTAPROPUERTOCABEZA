<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CreditRestructure extends BaseModel
{
    use HasFactory;

    protected $table = 'credit_restructures';

    public $timestamps = false;

    protected $fillable = [
        'credit_id',
        'old_balance',
        'new_balance',
        'old_terms',
        'new_terms',
        'reason',
        'created_at',
    ];

    protected $casts = [
        'credit_id' => 'integer',
        'old_balance' => 'double',
        'new_balance' => 'double',
        'created_at' => 'datetime',
    ];

    public function credit(): BelongsTo
    {
        return $this->belongsTo(Credit::class, 'credit_id', 'id');
    }
}
