<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\CreateSaleRequest;
use App\Http\Requests\UpdateSaleRequest;
use App\Http\Resources\SaleCollection;
use App\Http\Resources\SaleResource;
use App\Models\Customer;
use App\Models\Hold;
use App\Models\Product;
use App\Models\Sale;
use App\Models\Setting;
use App\Models\Warehouse;
use App\Repositories\SaleRepository;
use App\Services\ProductBatchService;
use Barryvdh\DomPDF\Facade\Pdf;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Picqer\Barcode\BarcodeGeneratorPNG;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class SaleAPIController
 */
class SaleAPIController extends AppBaseController
{
    /** @var saleRepository */
    private $saleRepository;

    public function __construct(SaleRepository $saleRepository)
    {
        $this->saleRepository = $saleRepository;
    }

    public function index(Request $request): SaleCollection
    {
        abort_unless(hasPermissionStrict('pos.view'), 403);

        $perPage = getPageSize($request);
        $search = $request->filter['search'] ?? '';
        $customer = (Customer::where('name', 'LIKE', "%$search%")->get()->count() != 0);
        $warehouse = (Warehouse::where('name', 'LIKE', "%$search%")->get()->count() != 0);

        $sales = $this->saleRepository;
        if ($customer || $warehouse) {
            $sales->whereHas('customer', function (Builder $q) use ($search, $customer) {
                if ($customer) {
                    $q->where('name', 'LIKE', "%$search%");
                }
            })->whereHas('warehouse', function (Builder $q) use ($search, $warehouse) {
                if ($warehouse) {
                    $q->where('name', 'LIKE', "%$search%");
                }
            });
        }

        if ($request->get('start_date') && $request->get('end_date')) {
            $sales->whereBetween('date', [$request->get('start_date'), $request->get('end_date')]);
        }

        if ($request->get('warehouse_id')) {
            $sales->where('warehouse_id', $request->get('warehouse_id'));
        }

        if ($request->get('customer_id')) {
            $sales->where('customer_id', $request->get('customer_id'));
        }

        if ($request->get('status') && $request->get('status') != 'null') {
            $sales->Where('status', $request->get('status'));
        }

        if ($request->get('payment_status') && $request->get('payment_status') != 'null') {
            $sales->where('payment_status', $request->get('payment_status'));
        }

        if ($request->get('payment_type') && $request->get('payment_type') != 'null') {
            $sales->where('payment_type', $request->get('payment_type'));
        }

        if (Schema::hasTable('credits')) {
            $sales->with('credit');
        }

        $sales = $sales->paginate($perPage);

        SaleResource::usingWithCollection();

        return new SaleCollection($sales);
    }

    public function store(CreateSaleRequest $request): SaleResource
    {
        abort_unless(hasPermissionStrict('pos.create_sale'), 403);

        if (isset($request->hold_ref_no)) {
            $holdExist = Hold::whereReferenceCode($request->hold_ref_no)->first();
            if (!empty($holdExist)) {
                $holdExist->delete();
            }
        }
        $input = $request->all();
        $this->ensureSalePriceEditingPermission($input['sale_items'] ?? []);
        $sale = $this->saleRepository->storeSale($input);

        return new SaleResource($sale);
    }

    public function show($id): SaleResource
    {
        abort_unless(hasPermissionStrict('pos.view'), 403);

        $sale = $this->saleRepository->find($id);
        $sale->load('saleItems.product.stocks', 'saleItems.batchAllocations.batch', 'warehouse', 'customer');

        return new SaleResource($sale);
    }

    public function edit(Sale $sale): SaleResource
    {
        abort_unless(hasPermissionStrict('pos.view'), 403);

        $sale = $sale->load('saleItems.product.stocks', 'saleItems.batchAllocations.batch', 'warehouse');

        return new SaleResource($sale);
    }

    public function update(UpdateSaleRequest $request, $id): SaleResource
    {
        abort_unless(hasPermissionStrict('pos.edit_sale'), 403);

        $input = $request->all();
        $this->ensureSalePriceEditingPermission($input['sale_items'] ?? []);
        $sale = $this->saleRepository->updateSale($input, $id);

        return new SaleResource($sale);
    }

    public function destroy($id): JsonResponse
    {
        abort_unless(hasPermissionStrict('pos.delete_sale'), 403);

        try {
            DB::beginTransaction();
            $sale = $this->saleRepository->with('saleItems')->where('id', $id)->first();
            if ($sale && app(ProductBatchService::class)->batchTablesExist()) {
                app(ProductBatchService::class)->releaseSaleAllocations($sale);
            }
            foreach ($sale->saleItems as $saleItem) {
                manageStock($sale->warehouse_id, $saleItem['product_id'], $saleItem['quantity']);
            }
            if (File::exists(Storage::path('sales/barcode-' . $sale->reference_code . '.png'))) {
                File::delete(Storage::path('sales/barcode-' . $sale->reference_code . '.png'));
            }
            $this->saleRepository->delete($id);
            DB::commit();

            return $this->sendSuccess('Sale Deleted successfully');
        } catch (Exception $e) {
            DB::rollBack();
            throw new UnprocessableEntityHttpException($e->getMessage());
        }
    }

    /**
     * @throws \Spatie\MediaLibrary\MediaCollections\Exceptions\FileDoesNotExist
     * @throws \Spatie\MediaLibrary\MediaCollections\Exceptions\FileIsTooBig
     */
    public function pdfDownload(Sale $sale): JsonResponse
    {
        abort_unless(hasPermissionStrict('pos.view'), 403);

        ini_set('memory_limit','-1');
        $sale = $sale->load('customer', 'saleItems.product', 'saleItems.batchAllocations.batch', 'payments');
        $data = [];
        if (Storage::exists('pdf/Sale-' . $sale->reference_code . '.pdf')) {
            Storage::delete('pdf/Sale-' . $sale->reference_code . '.pdf');
        }
        $companyLogo = getLogoUrl();
        $barcodeDataUri = $this->buildSaleBarcodeDataUri($sale->reference_code);

        $companyLogo = (string) \Image::make($companyLogo)->encode('data-url');

        $pdf = PDF::loadView('pdf.sale-pdf', compact('sale', 'companyLogo', 'barcodeDataUri'));
        Storage::disk(config('app.media_disc'))->put('pdf/Sale-' . $sale->reference_code . '.pdf', $pdf->output());
        $data['sale_pdf_url'] = Storage::url('pdf/Sale-' . $sale->reference_code . '.pdf');

        return $this->sendResponse($data, 'pdf retrieved Successfully');
    }

    public function saleInfo(Sale $sale): JsonResponse
    {
        abort_unless(hasPermissionStrict('pos.view'), 403);

        // Incluye el usuario para "Atendido por"
        $sale = $sale->load('saleItems.product', 'saleItems.batchAllocations.batch', 'warehouse', 'customer', 'user', 'credit');

        $keyName = [
            'email', 'company_name', 'phone', 'address',
        ];

        $sale['company_info'] = Setting::whereIn('key', $keyName)->pluck('value', 'key')->toArray();
        $sale['barcode_url'] = $sale->reference_code
            ? route('barcode.generate', ['code' => $sale->reference_code])
            : null;

        // Campos adicionales para impresión (sin tocar la lógica de venta)
        $sale['sale_time'] = optional($sale->created_at)->format('h:i A');
        $sale['served_by'] = optional($sale->user)->name;
        $sale['change_return'] = max((float) ($sale->received_amount ?? 0) - (float) ($sale->grand_total ?? 0), 0);
        $sale['due_amount'] = $sale->dueAmount($sale->id);

        $credit = Schema::hasTable('credits') ? $sale->credit : null;
        $creditBalance = $credit ? round((float) $credit->balance, 2) : null;
        $creditTotal = $credit
            ? round((float) ($credit->total_with_interest ?: $credit->balance ?: $sale->grand_total), 2)
            : null;
        $creditPaymentStatusKey = null;
        $creditPaymentStatusLabel = null;

        if ($credit) {
            $creditPaymentStatusKey = 'credito';
            $creditPaymentStatusLabel = 'Crédito';

            if ($creditBalance <= 0) {
                $creditPaymentStatusKey = 'pagado';
                $creditPaymentStatusLabel = 'Pagado';
            } elseif ($creditTotal > 0 && $creditBalance < $creditTotal) {
                $creditPaymentStatusKey = 'parcial';
                $creditPaymentStatusLabel = 'Parcial';
            }
        }

        $sale['is_credit_sale'] = (bool) $credit;
        $sale['credit_id'] = $credit?->id;
        $sale['credit_balance'] = $creditBalance;
        $sale['credit_total'] = $creditTotal;
        $sale['credit_status'] = $credit?->status;
        $sale['credit_payment_status_key'] = $creditPaymentStatusKey;
        $sale['credit_payment_status_label'] = $creditPaymentStatusLabel;

        return $this->sendResponse($sale, 'Sale information retrieved successfully');
    }

    private function buildSaleBarcodeDataUri(?string $referenceCode): ?string
    {
        if (blank($referenceCode)) {
            return null;
        }

        $generator = new BarcodeGeneratorPNG();
        $barcode = $generator->getBarcode(
            $referenceCode,
            $generator::TYPE_CODE_128,
            3,
            60
        );

        return 'data:image/png;base64,'.base64_encode($barcode);
    }

    public function getSaleProductReport(Request $request): SaleCollection
    {
        abort_unless(hasPermissionStrict('pos.view'), 403);

        $perPage = getPageSize($request);
        $productId = $request->get('product_id');

        $sales = $this->saleRepository;
        if (Schema::hasTable('credit_items')) {
            $sales = $sales->whereDoesntHave('credit');
        }

        $sales = $sales->whereHas('saleItems', function ($q) use ($productId) {
                $q->where('product_id', '=', $productId);
            })
            ->with(['saleItems.product', 'saleItems.batchAllocations.batch', 'customer']);

        $sales = $sales->paginate($perPage);

        SaleResource::usingWithCollection();

        return new SaleCollection($sales);
    }

    private function ensureSalePriceEditingPermission(array $saleItems): void
    {
        if (empty($saleItems) || hasPermissionStrict('edit_pos_sale_price')) {
            return;
        }

        $productIds = collect($saleItems)
            ->pluck('product_id')
            ->filter()
            ->map(fn ($id) => (int) $id)
            ->unique()
            ->values()
            ->all();

        if (empty($productIds)) {
            return;
        }

        $productPrices = Product::query()
            ->whereIn('id', $productIds)
            ->pluck('product_price', 'id');

        foreach ($saleItems as $saleItem) {
            $productId = (int) ($saleItem['product_id'] ?? 0);
            $requestedPrice = $saleItem['product_price'] ?? null;

            if (
                $productId === 0 ||
                ! is_numeric($requestedPrice) ||
                ! $productPrices->has($productId)
            ) {
                continue;
            }

            $requestedPrice = (float) $requestedPrice;
            $originalPrice = (float) $productPrices->get($productId);

            if (abs($requestedPrice - $originalPrice) > 0.0001) {
                abort(403, 'No tiene permiso para editar el precio de venta en POS.');
            }
        }
    }
}
