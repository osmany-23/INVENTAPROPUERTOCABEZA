<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\CreateSalePaymentRequest;
use App\Http\Resources\SalesPaymentResource;
use App\Models\Sale;
use App\Models\SalesPayment;
use App\Repositories\SalesPaymentRepository;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

class SalesPaymentAPIController extends AppBaseController
{
    /** @var SalesPaymentRepository */
    private $salesPaymentRepository;

    /**
     * SalesPaymentAPIController constructor.
     */
    public function __construct(SalesPaymentRepository $salesPaymentRepository)
    {
        $this->salesPaymentRepository = $salesPaymentRepository;
    }

    /**
     * @return array
     */
    public function getAllPayments(Sale $sale)
    {
        $data = [
            'sale_id' => $sale->id,
            'data' => $sale->payments,
        ];

        return $data;
    }

    public function createSalePayment(Sale $sale, CreateSalePaymentRequest $request): SalesPaymentResource
    {
        $input = $request->all();

        $salePayment = $this->salesPaymentRepository->storeSalePayment($input, $sale);

        return new SalesPaymentResource($salePayment);
    }

    public function updateSalePayment(SalesPayment $salesPayment, Request $request): SalesPaymentResource
    {
        $input = $request->all();

        $salePayment = $this->salesPaymentRepository->updateSalePayment($input, $salesPayment);

        return new SalesPaymentResource($salePayment);
    }

    public function deletePayment($id)
    {
        try {
            DB::beginTransaction();

            $salePayment = SalesPayment::whereId($id)->firstOrFail();
            $saleID = $salePayment->sale_id;
            $sale = Sale::findOrFail($saleID);
            $this->salesPaymentRepository->ensureSalePaymentAllowed($sale);

            SalesPayment::findOrFail($id)->delete();
            $this->salesPaymentRepository->recalculateSalePaymentSummary((int) $saleID);

            DB::commit();

            return $this->sendSuccess('Payment deleted successfully');
        } catch (Exception $e) {
            DB::rollBack();
            throw new UnprocessableEntityHttpException($e->getMessage());
        }
    }
}
