<?php

namespace App\Repositories;

use App\Models\Sale;
use App\Models\SaleReturn;
use App\Models\SalesPayment;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class SalesPaymentRepository
 */
class SalesPaymentRepository extends BaseRepository
{
    public const CREDIT_SALE_PAYMENT_MESSAGE = 'Esta venta es a crédito. Los pagos deben realizarse desde el módulo de créditos.';

    /**
     * @var string[]
     */
    protected $fieldSearchable = [
        'payment_date',
        'payment_type',
        'amount',
    ];

    /**
     * @var string[]
     */
    protected $allowedFields = [
        'sale_id',
        'payment_date',
        'payment_type',
        'amount',
    ];

    /**
     * Return searchable fields
     */
    public function getFieldsSearchable(): array
    {
        return $this->fieldSearchable;
    }

    /**
     * Configure the Model
     **/
    public function model(): string
    {
        return SalesPayment::class;
    }

    /**
     * @return mixed
     */
    public function storeSalePayment($input, $sale)
    {
        try {
            DB::beginTransaction();

            $this->ensureSalePaymentAllowed($sale);
            $input['sale_id'] = $sale->id;
            $salePayment = SalesPayment::create($input);
            $this->recalculateSalePaymentSummary((int) $sale->id);

            DB::commit();

            return $salePayment;
        } catch (Exception $e) {
            DB::rollBack();
            throw new UnprocessableEntityHttpException($e->getMessage());
        }
    }

    /**
     * @return mixed
     */
    public function updateSalePayment($input, $salesPayment)
    {
        try {
            DB::beginTransaction();

            $sale = Sale::findOrFail((int) $salesPayment->sale_id);
            $this->ensureSalePaymentAllowed($sale);
            $salesPayment->update($input);
            $this->recalculateSalePaymentSummary((int) $salesPayment->sale_id);

            DB::commit();

            return $salesPayment;
        } catch (Exception $e) {
            DB::rollBack();
            throw new UnprocessableEntityHttpException($e->getMessage());
        }
    }

    public function recalculateSalePaymentSummary(int $saleId): void
    {
        $sale = Sale::whereId($saleId)->first();
        if (! $sale) {
            return;
        }

        $totalReturned = (float) SaleReturn::where('sale_id', $saleId)->sum('grand_total');
        $paymentsTotal = (float) SalesPayment::whereSaleId($saleId)->sum('amount');
        $netSaleAmount = max((float) $sale->grand_total - $totalReturned, 0);
        $retainedAmount = min($paymentsTotal, $netSaleAmount);

        if ($netSaleAmount == 0) {
            $paymentStatus = Sale::PAID;
        } elseif ($retainedAmount <= 0) {
            $paymentStatus = Sale::UNPAID;
        } elseif ($retainedAmount < $netSaleAmount) {
            $paymentStatus = Sale::PARTIAL_PAID;
        } else {
            $paymentStatus = Sale::PAID;
        }

        $latestPayment = SalesPayment::whereSaleId($saleId)->latest()->first();

        $sale->update([
            'payment_status' => $paymentStatus,
            'paid_amount' => $retainedAmount,
            'payment_type' => $latestPayment ? $latestPayment->payment_type : null,
        ]);
    }

    public function ensureSalePaymentAllowed(Sale $sale): void
    {
        if (Schema::hasTable('credits') && $sale->credit()->exists()) {
            throw new UnprocessableEntityHttpException(self::CREDIT_SALE_PAYMENT_MESSAGE);
        }
    }
}
