<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CreditLog extends BaseModel
{
    use HasFactory;

    protected $table = 'credit_logs';

    public $timestamps = false;

    protected $fillable = [
        'credit_id',
        'action',
        'description',
        'created_at',
    ];

    protected $casts = [
        'credit_id' => 'integer',
        'created_at' => 'datetime',
    ];

    public function credit(): BelongsTo
    {
        return $this->belongsTo(Credit::class, 'credit_id', 'id');
    }
}
