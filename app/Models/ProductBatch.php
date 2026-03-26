<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProductBatch extends BaseModel
{
    use HasFactory;

    public const STATUS_AVAILABLE = 'available';
    public const STATUS_EXPIRING = 'expiring';
    public const STATUS_EXPIRED = 'expired';
    public const STATUS_DEPLETED = 'depleted';
    public const TAX_TYPE_EXCLUSIVE = 'EXCLUSIVO';
    public const TAX_TYPE_INCLUSIVE = 'INCLUSIVO';

    protected $table = 'product_batches';

    protected $fillable = [
        'product_id',
        'warehouse_id',
        'codigo_lote_sistema',
        'lote_fabricante',
        'lot_code',
        'lot_barcode',
        'ubicacion',
        'descripcion',
        'fecha_fabricacion',
        'fecha_vencimiento',
        'impuesto_tipo',
        'impuesto_valor',
        'purchase_id',
        'received_quantity',
        'available_quantity',
        'expires_at',
        'received_at',
        'status',
        'note',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'product_id' => 'integer',
        'warehouse_id' => 'integer',
        'fecha_fabricacion' => 'date',
        'fecha_vencimiento' => 'date',
        'impuesto_valor' => 'float',
        'purchase_id' => 'integer',
        'received_quantity' => 'float',
        'available_quantity' => 'float',
        'expires_at' => 'date',
        'received_at' => 'date',
        'created_by' => 'integer',
        'updated_by' => 'integer',
    ];

    protected static function booted(): void
    {
        static::saving(function (self $batch) {
            $manufacturerLot = trim((string) ($batch->lote_fabricante ?? ''));
            $legacyLotCode = trim((string) ($batch->lot_code ?? ''));

            if ($manufacturerLot === '' && $legacyLotCode !== '') {
                $manufacturerLot = $legacyLotCode;
            }

            if ($legacyLotCode === '' && $manufacturerLot !== '') {
                $legacyLotCode = $manufacturerLot;
            }

            $batch->lote_fabricante = $manufacturerLot !== '' ? $manufacturerLot : null;
            $batch->lot_code = $legacyLotCode !== '' ? $legacyLotCode : null;

            $batch->fecha_fabricacion = $batch->normalizeDateValue($batch->fecha_fabricacion);
            $batch->fecha_vencimiento = $batch->normalizeDateValue(
                $batch->fecha_vencimiento ?? $batch->expires_at
            );
            $batch->expires_at = $batch->normalizeDateValue(
                $batch->expires_at ?? $batch->fecha_vencimiento
            );

            $description = trim((string) ($batch->descripcion ?? ''));
            $legacyNote = trim((string) ($batch->note ?? ''));
            if ($description === '' && $legacyNote !== '') {
                $description = $legacyNote;
            }
            if ($legacyNote === '' && $description !== '') {
                $legacyNote = $description;
            }

            $batch->descripcion = $description !== '' ? $description : null;
            $batch->note = $legacyNote !== '' ? $legacyNote : null;

            $taxType = strtoupper(trim((string) ($batch->impuesto_tipo ?? self::TAX_TYPE_EXCLUSIVE)));
            if (! in_array($taxType, [self::TAX_TYPE_EXCLUSIVE, self::TAX_TYPE_INCLUSIVE], true)) {
                $taxType = self::TAX_TYPE_EXCLUSIVE;
            }

            $batch->impuesto_tipo = $taxType;
            $batch->impuesto_valor = round((float) ($batch->impuesto_valor ?? 0), 2);
        });

        static::created(function (self $batch) {
            if (! empty($batch->codigo_lote_sistema)) {
                return;
            }

            $batch->forceFill([
                'codigo_lote_sistema' => self::formatSystemLotCode((int) $batch->id),
            ])->saveQuietly();
        });
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }

    public function warehouse(): BelongsTo
    {
        return $this->belongsTo(Warehouse::class, 'warehouse_id', 'id');
    }

    public function setting(): BelongsTo
    {
        return $this->belongsTo(ProductBatchSetting::class, 'product_id', 'product_id');
    }

    public function movements(): HasMany
    {
        return $this->hasMany(ProductBatchMovement::class, 'product_batch_id', 'id');
    }

    public function purchase(): BelongsTo
    {
        return $this->belongsTo(Purchase::class, 'purchase_id', 'id');
    }

    public function purchaseLots(): HasMany
    {
        return $this->hasMany(PurchaseLot::class, 'lote_id', 'id');
    }

    public function saleAllocations(): HasMany
    {
        return $this->hasMany(SaleItemBatch::class, 'product_batch_id', 'id');
    }

    public static function formatSystemLotCode(int $id): string
    {
        return 'LOTE-'.str_pad((string) $id, 3, '0', STR_PAD_LEFT);
    }

    private function normalizeDateValue(mixed $value): ?string
    {
        if (empty($value)) {
            return null;
        }

        if ($value instanceof Carbon) {
            return $value->format('Y-m-d');
        }

        return Carbon::parse($value)->format('Y-m-d');
    }
}
