<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\CreatePurchaseRequest;
use App\Http\Requests\UpdatePurchaseRequest;
use App\Http\Resources\PurchaseCollection;
use App\Http\Resources\PurchaseResource;
use App\Models\ManageStock;
use App\Models\Purchase;
use App\Models\PurchaseReturnItem;
use App\Models\Setting;
use App\Models\Supplier;
use App\Models\Warehouse;
use App\Repositories\PurchaseRepository;
use Barryvdh\DomPDF\Facade\Pdf;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class PurchaseAPIController
 */
class PurchaseAPIController extends AppBaseController
{
    /** @var PurchaseRepository */
    private $purchaseRepository;

    public function __construct(PurchaseRepository $purchaseRepository)
    {
        $this->purchaseRepository = $purchaseRepository;
    }

    public function index(Request $request): PurchaseCollection
    {
        abort_unless(hasPermissionStrict('purchase.view'), 403);

        $perPage = getPageSize($request);
        $search = $request->filter['search'] ?? '';
        $supplier = (Supplier::where('name', 'LIKE', "%$search%")->get()->count() != 0);
        $warehouse = (Warehouse::where('name', 'LIKE', "%$search%")->get()->count() != 0);
        $purchases = $this->purchaseRepository;
        if ($supplier || $warehouse) {
            $purchases->whereHas('supplier', function (Builder $q) use ($search, $supplier) {
                if ($supplier) {
                    $q->where('name', 'LIKE', "%$search%");
                }
            })->whereHas('warehouse', function (Builder $q) use ($search, $warehouse) {
                if ($warehouse) {
                    $q->where('name', 'LIKE', "%$search%");
                }
            });
        }

        if ($request->get('start_date') && $request->get('end_date')) {
            $purchases->whereBetween('date', [$request->get('start_date'), $request->get('end_date')]);
        }

        if ($request->get('warehouse_id')) {
            $purchases->where('warehouse_id', $request->get('warehouse_id'));
        }

        if ($request->get('status')) {
            $purchases->where('status', $request->get('status'));
        }

        $purchases = $purchases->with(['purchaseItems', 'supplier'])->paginate($perPage);
        PurchaseResource::usingWithCollection();

        return new PurchaseCollection($purchases);
    }

    public function store(CreatePurchaseRequest $request): PurchaseResource
    {
        abort_unless(hasPermissionStrict('purchase.create'), 403);

        $input = $request->all();
        $purchase = $this->purchaseRepository->storePurchase($input);

        return new PurchaseResource($purchase);
    }

    public function show($id): PurchaseResource
    {
        abort_unless(hasPermissionStrict('purchase.view'), 403);

        $purchase = $this->purchaseRepository
            ->with($this->purchaseItemRelations())
            ->find($id);

        return new PurchaseResource($purchase);
    }

    public function edit(Purchase $purchase): PurchaseResource
    {
        abort_unless(hasPermissionStrict('purchase.view'), 403);

        $purchase = $purchase->load($this->purchaseItemRelations());

        return new PurchaseResource($purchase);
    }

    public function update(UpdatePurchaseRequest $request, $id): PurchaseResource
    {
        abort_unless(hasPermissionStrict('purchase.update'), 403);

        $input = $request->all();
        $purchase = $this->purchaseRepository->updatePurchase($input, $id);

        return new PurchaseResource($purchase);
    }

    public function destroy($id): JsonResponse
    {
        abort_unless(hasPermissionStrict('purchase.delete'), 403);

        try {
            DB::beginTransaction();
            $purchase = $this->purchaseRepository->with('purchaseItems')->where('id', $id)->first();
            foreach ($purchase->purchaseItems as $purchaseItem) {
                $product = ManageStock::whereWarehouseId($purchase->warehouse_id)
                    ->whereProductId($purchaseItem['product_id'])
                    ->first();
                if ($product) {
                    if ($product->quantity >= $purchaseItem['quantity']) {
                        $totalQuantity = $product->quantity - $purchaseItem['quantity'];
                        $product->update([
                            'quantity' => $totalQuantity,
                        ]);
                    } else {
                        throw new UnprocessableEntityHttpException(__('messages.error.available_quantity'));
                    }
                }
            }
            $this->purchaseRepository->delete($id);
            DB::commit();

            return $this->sendSuccess('Purchase Deleted successfully');
        } catch (Exception $e) {
            DB::rollBack();
            throw new UnprocessableEntityHttpException($e->getMessage());
        }
    }

    /**
     * @throws \Spatie\MediaLibrary\MediaCollections\Exceptions\FileDoesNotExist
     * @throws \Spatie\MediaLibrary\MediaCollections\Exceptions\FileIsTooBig
     */
    public function pdfDownload(Purchase $purchase): JsonResponse
    {
        abort_unless(hasPermissionStrict('purchase.view'), 403);

        ini_set('memory_limit', '-1');
        $purchase = $purchase->load('purchaseItems.product', 'supplier');

        $data = [];
        if (Storage::exists('pdf.purchase-pdf-'.$purchase->reference_code.'.pdf')) {
            Storage::delete('pdf.purchase-pdf-'.$purchase->reference_code.'.pdf');
        }

        $companyLogo = getLogoUrl();
        $companyLogo = (string) \Image::make($companyLogo)->encode('data-url');

        $pdf = PDF::loadView('pdf.purchase-pdf', compact('purchase', 'companyLogo'));
        Storage::disk(config('app.media_disc'))->put('pdf/Purchase-'.$purchase->reference_code.'.pdf', $pdf->output());
        $data['purchase_pdf_url'] = Storage::url('pdf/Purchase-'.$purchase->reference_code.'.pdf');

        return $this->sendResponse($data, 'pdf retrieved Successfully');
    }

    public function purchaseInfo(Purchase $purchase): JsonResponse
    {
        abort_unless(hasPermissionStrict('purchase.view'), 403);

        $purchase = $purchase->load($this->purchaseItemRelations());

        $purchase->purchaseItems->transform(function ($item) {
            $purchasedQty = (float) $item->quantity;
            $item->returned_quantity = 0;
            $item->max_return_quantity = $purchasedQty;

            if (Schema::hasTable('purchase_lots') && $item->relationLoaded('purchaseLots')) {
                $item->purchaseLots->transform(function ($purchaseLot) {
                    $returnedQuantity = (float) PurchaseReturnItem::query()
                        ->where('purchase_lot_id', $purchaseLot->id)
                        ->sum('quantity');

                    $purchaseLot->returned_quantity = round($returnedQuantity, 2);
                    $purchaseLot->max_return_quantity = round(
                        max((float) $purchaseLot->cantidad - $returnedQuantity, 0),
                        2
                    );

                    if ($purchaseLot->relationLoaded('batch') && $purchaseLot->batch) {
                        $this->trimPurchaseBatchPayload($purchaseLot->batch);
                    }

                    $this->trimPurchaseLotPayload($purchaseLot);

                    return $purchaseLot;
                });
            }

            if ($item->relationLoaded('batchReference') && $item->batchReference) {
                $this->trimPurchaseBatchPayload($item->batchReference);
            }

            return $item;
        });

        $keyName = [
            'email', 'company_name', 'phone', 'address',
        ];
        $purchase['company_info'] = Setting::whereIn('key', $keyName)->pluck('value', 'key')->toArray();

        return $this->sendResponse($purchase, 'Purchase information retrieved successfully');
    }

    public function getPurchaseProductReport(Request $request): PurchaseCollection
    {
        abort_unless(hasPermissionStrict('purchase.view'), 403);

        $perPage = getPageSize($request);
        $productId = $request->get('product_id');
        $purchases = $this->purchaseRepository->whereHas('purchaseItems', function ($q) use ($productId) {
            $q->where('product_id', '=', $productId);
        })->with(array_values(array_unique(array_merge(
            ['purchaseItems.product', 'purchaseItems.batchReference', 'supplier'],
            Schema::hasTable('purchase_lots') ? ['purchaseItems.purchaseLots.batch'] : []
        ))));

        $purchases = $purchases->paginate($perPage);
        PurchaseResource::usingWithCollection();

        return new PurchaseCollection($purchases);
    }

    private function trimPurchaseLotPayload($purchaseLot): void
    {
        $purchaseLot->makeHidden([
            'purchase_detail_id',
            'created_at',
            'updated_at',
        ]);
    }

    private function trimPurchaseBatchPayload($batch): void
    {
        $batch->makeHidden([
            'product_id',
            'purchase_id',
            'created_by',
            'updated_by',
            'received_quantity',
            'available_quantity',
            'received_at',
            'note',
            'created_at',
            'updated_at',
        ]);
    }

    private function purchaseItemRelations(): array
    {
        $relations = ['purchaseItems.product.stocks', 'purchaseItems.batchReference', 'supplier', 'warehouse'];
        if (Schema::hasTable('purchase_lots')) {
            $relations[] = 'purchaseItems.purchaseLots.batch';
        }

        return $relations;
    }
}
