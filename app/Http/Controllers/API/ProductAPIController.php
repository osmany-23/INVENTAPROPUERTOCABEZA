<?php

namespace App\Http\Controllers\API;

use App\Exports\ProductExcelExport;
use App\Http\Controllers\AppBaseController;
use App\Http\Requests\CreateProductRequest;
use App\Http\Requests\QuickUpdateProductPriceRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductCollection;
use App\Http\Resources\ProductResource;
use App\Imports\ProductImport;
use App\Models\MainProduct;
use App\Models\Product;
use App\Models\PurchaseItem;
use App\Models\SaleItem;
use App\Models\VariationProduct;
use App\Repositories\ProductRepository;
use App\Services\ProductBatchService;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

class ProductAPIController extends AppBaseController
{
    /** @var ProductRepository */
    private $productRepository;

    private ProductBatchService $productBatchService;

    public function __construct(
        ProductRepository $productRepository,
        ProductBatchService $productBatchService
    )
    {
        $this->productRepository = $productRepository;
        $this->productBatchService = $productBatchService;
    }

    public function index(Request $request): ProductCollection
    {
        abort_unless(hasPermissionStrict('products.view'), 403);

        $perPage = getPageSize($request);
        $query = Product::query();

        if ($request->get('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                ->orWhere('code', 'LIKE', "%{$search}%")
                ->orWhere('notes', 'LIKE', "%{$search}%"); // 👈 Añadido
            });
        }

        if ($request->get('product_unit')) {
            $query->where('product_unit', $request->get('product_unit'));
        }

        if ($request->get('warehouse_id') && $request->get('warehouse_id') != 'null') {
            $warehouseId = $request->get('warehouse_id');
            $query->whereHas('stock', function ($q) use ($warehouseId) {
                $q->where('manage_stocks.warehouse_id', $warehouseId);
            })->with([
                'stock' => function (HasOne $q) use ($warehouseId) {
                    $q->where('manage_stocks.warehouse_id', $warehouseId);
                },
            ]);
        }

        // Support filtering by brand and category coming from frontend (eg. filter[brand_id], filter[product_category_id])
        $filters = $request->get('filter');
        if (is_array($filters)) {
            if (!empty($filters['brand_id'])) {
                $query->where('brand_id', $filters['brand_id']);
            }
            if (!empty($filters['product_category_id'])) {
                $query->where('product_category_id', $filters['product_category_id']);
            }
        }

        $products = $query->paginate($perPage);
        ProductResource::usingWithCollection();

        return new ProductCollection($products);
    }

    public function posFeed(Request $request): JsonResponse
    {
        abort_unless(
            hasPermissionStrict('products.view') || hasPermissionStrict('pos.view'),
            403
        );

        $warehouseId = (int) $request->input('warehouse_id');
        $page = max((int) $request->input('page.number', 1), 1);
        $pageSize = max(min((int) $request->input('page.size', 80), 200), 1);
        $search = trim((string) $request->input('search', ''));
        $searchLength = mb_strlen($search);
        $prefixSearch = $search !== '' ? $search.'%' : '';
        $likeSearch = '%'.$search.'%';
        $supportsContainsSearch = $searchLength >= 2;
        $filters = $request->input('filter', []);
        $brandId = (int) Arr::get($filters, 'brand_id', 0);
        $categoryId = (int) Arr::get($filters, 'product_category_id', 0);

        $stockQuery = DB::table('manage_stocks')
            ->select('product_id', DB::raw('SUM(quantity) as quantity'))
            ->when($warehouseId > 0, function ($query) use ($warehouseId) {
                $query->where('warehouse_id', $warehouseId);
            })
            ->groupBy('product_id');

        $mainProductImageQuery = DB::table('media')
            ->select('model_id', DB::raw('MIN(id) as media_id'))
            ->where('model_type', MainProduct::class)
            ->where('collection_name', MainProduct::PATH)
            ->groupBy('model_id');

        $productsQuery = Product::query()
            ->select([
                'products.id',
                'products.name',
                'products.code',
                'products.product_code',
                'products.product_cost',
                'products.product_price',
                'products.product_unit',
                'products.sale_unit',
                'products.stock_alert',
                'products.order_tax',
                'products.tax_type',
                DB::raw('COALESCE(main_products.product_type, '.MainProduct::SINGLE_PRODUCT.') as main_product_type'),
                'variation_types.name as variation_type_name',
                DB::raw('CASE WHEN variation_products.id IS NULL THEN 0 ELSE 1 END as is_variant_product'),
                DB::raw('COALESCE(stock.quantity, 0) as stock_quantity'),
                DB::raw('COALESCE(base_units.name, "") as product_unit_name'),
                'product_media.id as image_media_id',
                'product_media.file_name as image_file_name',
                'product_media.disk as image_disk',
                DB::raw(
                    Schema::hasTable('product_batch_settings')
                        ? 'COALESCE(product_batch_settings.track_batches, 0) as batch_enabled'
                        : '0 as batch_enabled'
                ),
            ])
            ->leftJoinSub($stockQuery, 'stock', function ($join) {
                $join->on('stock.product_id', '=', 'products.id');
            })
            ->leftJoin('base_units', 'base_units.id', '=', 'products.product_unit')
            ->leftJoin('main_products', 'main_products.id', '=', 'products.main_product_id')
            ->leftJoin('variation_products', 'variation_products.product_id', '=', 'products.id')
            ->leftJoin('variation_types', 'variation_types.id', '=', 'variation_products.variation_type_id')
            ->when(Schema::hasTable('product_batch_settings'), function ($query) {
                $query->leftJoin(
                    'product_batch_settings',
                    'product_batch_settings.product_id',
                    '=',
                    'products.id'
                );
            })
            ->leftJoinSub($mainProductImageQuery, 'main_product_image', function ($join) {
                $join->on('main_product_image.model_id', '=', 'products.main_product_id');
            })
            ->leftJoin('media as product_media', 'product_media.id', '=', 'main_product_image.media_id')
            ->whereRaw('COALESCE(stock.quantity, 0) > 0')
            ->when($brandId > 0, function ($query) use ($brandId) {
                $query->where('products.brand_id', $brandId);
            })
            ->when($categoryId > 0, function ($query) use ($categoryId) {
                $query->where('products.product_category_id', $categoryId);
            })
            ->when($search !== '', function ($query) use (
                $search,
                $prefixSearch,
                $likeSearch,
                $supportsContainsSearch
            ) {
                $query->where(function ($subQuery) use (
                    $search,
                    $prefixSearch,
                    $likeSearch,
                    $supportsContainsSearch
                ) {
                    $subQuery->where('products.code', $search)
                        ->orWhere('products.product_code', $search)
                        ->orWhere('products.code', 'LIKE', $prefixSearch)
                        ->orWhere('products.product_code', 'LIKE', $prefixSearch)
                        ->orWhere('products.name', 'LIKE', $prefixSearch);

                    if ($supportsContainsSearch) {
                        $subQuery->orWhere('products.name', 'LIKE', $likeSearch)
                            ->orWhere('products.code', 'LIKE', $likeSearch)
                            ->orWhere('products.product_code', 'LIKE', $likeSearch);
                    }
                });

                $query->orderByRaw(
                    'CASE
                        WHEN products.code = ? THEN 0
                        WHEN products.product_code = ? THEN 1
                        WHEN products.code LIKE ? THEN 2
                        WHEN products.product_code LIKE ? THEN 3
                        WHEN products.name LIKE ? THEN 4
                        ELSE 5
                    END',
                    [$search, $search, $prefixSearch, $prefixSearch, $prefixSearch]
                );
            })
            ->orderBy('products.name');

        $rows = $productsQuery
            ->forPage($page, $pageSize + 1)
            ->get();

        $hasMorePages = $rows->count() > $pageSize;
        $visibleProducts = $rows->take($pageSize);
        $canViewPurchasePrice = hasPermissionStrict('view_purchase_price') ||
            hasPermissionStrict('products.view_purchase_price');
        $batchOverviews = [];

        if (
            $warehouseId > 0 &&
            $this->productBatchService->batchTablesExist() &&
            $visibleProducts->isNotEmpty()
        ) {
            $batchOverviews = $this->productBatchService->getPosBatchOverviews(
                $visibleProducts->pluck('id')->map(fn ($id) => (int) $id)->all(),
                $warehouseId
            );
        }

        $data = $visibleProducts->map(function ($product) use ($batchOverviews, $canViewPurchasePrice, $warehouseId) {
            $imageUrl = '';
            if (! empty($product->image_media_id) && ! empty($product->image_file_name)) {
                $imagePath = MainProduct::PATH.'/'.$product->image_media_id.'/'.$product->image_file_name;
                $imageDisk = $product->image_disk ?: config('app.media_disc');
                $resolvedUrl = Storage::disk($imageDisk)->url($imagePath);
                $imageUrl = str_starts_with($resolvedUrl, 'http') ? $resolvedUrl : url($resolvedUrl);
            }

            $batchOverview = $batchOverviews[(int) $product->id] ?? null;

            return [
                'id' => (int) $product->id,
                'attributes' => [
                    'name' => $product->name,
                    'code' => $product->code,
                    'product_code' => $product->product_code,
                    'barcode_url' => Storage::url('product_barcode/barcode-PR_'.$product->id.'.png'),
                    'product_cost' => $canViewPurchasePrice ? (float) $product->product_cost : 0,
                    'product_price' => (float) $product->product_price,
                    'product_unit' => $product->product_unit,
                    'sale_unit' => $product->sale_unit,
                    'stock_alert' => $product->stock_alert,
                    'product_type' => (int) $product->main_product_type,
                    'main_product_type' => (int) $product->main_product_type,
                    'is_variant_product' => (bool) $product->is_variant_product
                        || (int) $product->main_product_type === MainProduct::VARIATION_PRODUCT,
                    'is_batch_product' => (bool) $product->batch_enabled
                        || (int) $product->main_product_type === MainProduct::BATCH_PRODUCT,
                    'variation_product' => $product->variation_type_name ? [
                        'variation_type_name' => $product->variation_type_name,
                    ] : null,
                    'order_tax' => is_null($product->order_tax) ? 0 : (float) $product->order_tax,
                    'tax_type' => is_null($product->tax_type) ? 1 : (int) $product->tax_type,
                    'product_unit_name' => [
                        'name' => $product->product_unit_name,
                    ],
                    'stock' => [
                        'quantity' => (float) $product->stock_quantity,
                        'warehouse_id' => $warehouseId,
                    ],
                    'batch_enabled' => (bool) $product->batch_enabled,
                    'batch_status' => $batchOverview['status'] ?? null,
                    'batch_context' => ! empty($batchOverview['batch_id']) ? [
                        'id' => (int) $batchOverview['batch_id'],
                        'codigo_lote_sistema' => $batchOverview['next_codigo_lote_sistema'] ?? null,
                        'lote_fabricante' => $batchOverview['next_lote_fabricante'] ?? null,
                        'lot_code' => $batchOverview['next_lot_code'] ?? null,
                        'lot_barcode' => $batchOverview['next_lot_barcode'] ?? null,
                        'expires_at' => $batchOverview['next_expires_at'] ?? null,
                        'available_quantity' => (float) ($batchOverview['next_available_quantity'] ?? 0),
                    ] : null,
                    'batch_card' => $batchOverview,
                    'images' => [
                        'imageUrls' => $imageUrl ? [$imageUrl] : [],
                    ],
                ],
            ];
        })->values();

        return response()->json([
            'data' => $data,
            'meta' => [
                'page' => $page,
                'page_size' => $pageSize,
                'has_more_pages' => $hasMorePages,
            ],
        ]);
    }

    public function adjustmentFastSearch(Request $request): JsonResponse
    {
        abort_unless(hasPermissionStrict('products.view'), 403);

        $warehouseId = (int) $request->input('warehouse_id');
        $search = trim((string) $request->input('search', ''));
        $limit = max(min((int) $request->input('limit', 20), 100), 1);
        $exactCode = filter_var($request->input('exact_code', false), FILTER_VALIDATE_BOOLEAN);
        $includeNoStock = filter_var($request->input('include_no_stock', false), FILTER_VALIDATE_BOOLEAN);

        if ($warehouseId <= 0 || $search === '') {
            return response()->json([
                'data' => [],
                'meta' => [
                    'count' => 0,
                ],
            ]);
        }

        $stockQuery = DB::table('manage_stocks')
            ->select('product_id', DB::raw('SUM(quantity) as quantity'))
            ->where('warehouse_id', $warehouseId)
            ->groupBy('product_id');

        $searchLength = mb_strlen($search);
        $likeSearch = '%'.$search.'%';
        $prefixSearch = $search.'%';
        $supportsContainsSearch = $searchLength >= 2;

        $query = DB::table('products')
            ->select([
                'products.id',
                'products.name',
                'products.code',
                'products.product_code',
                'products.product_cost',
                'products.product_price',
                'products.product_unit',
                'products.sale_unit',
                'products.purchase_unit',
                'products.quantity_limit',
                'products.order_tax',
                'products.tax_type',
                DB::raw('COALESCE(main_products.product_type, '.MainProduct::SINGLE_PRODUCT.') as main_product_type'),
                'variation_types.name as variation_type_name',
                DB::raw('CASE WHEN variation_products.id IS NULL THEN 0 ELSE 1 END as is_variant_product'),
                DB::raw('COALESCE(stock.quantity, 0) as stock_quantity'),
                'sale_units.short_name as sale_unit_short_name',
                'purchase_units.short_name as purchase_unit_short_name',
                'product_units.name as product_unit_name',
                DB::raw(
                    Schema::hasTable('product_batch_settings')
                        ? 'COALESCE(product_batch_settings.track_batches, 0) as batch_enabled'
                        : '0 as batch_enabled'
                ),
            ])
            ->when(
                $includeNoStock,
                function ($query) use ($stockQuery) {
                    $query->leftJoinSub($stockQuery, 'stock', function ($join) {
                        $join->on('stock.product_id', '=', 'products.id');
                    });
                },
                function ($query) use ($stockQuery) {
                    $query->joinSub($stockQuery, 'stock', function ($join) {
                        $join->on('stock.product_id', '=', 'products.id');
                    });
                }
            )
            ->leftJoin('units as sale_units', 'sale_units.id', '=', 'products.sale_unit')
            ->leftJoin('units as purchase_units', 'purchase_units.id', '=', 'products.purchase_unit')
            ->leftJoin('base_units as product_units', 'product_units.id', '=', 'products.product_unit')
            ->leftJoin('main_products', 'main_products.id', '=', 'products.main_product_id')
            ->leftJoin('variation_products', 'variation_products.product_id', '=', 'products.id')
            ->leftJoin('variation_types', 'variation_types.id', '=', 'variation_products.variation_type_id');

        if (Schema::hasTable('product_batch_settings')) {
            $query->leftJoin(
                'product_batch_settings',
                'product_batch_settings.product_id',
                '=',
                'products.id'
            );
        }

        if ($exactCode) {
            $query->where(function ($subQuery) use ($search) {
                $subQuery->where('products.code', $search)
                    ->orWhere('products.product_code', $search);
            });
        } else {
            $query->where(function ($subQuery) use ($search, $prefixSearch, $likeSearch, $supportsContainsSearch) {
                $subQuery->where('products.code', $search)
                    ->orWhere('products.product_code', $search)
                    ->orWhere('products.code', 'LIKE', $prefixSearch)
                    ->orWhere('products.product_code', 'LIKE', $prefixSearch)
                    ->orWhere('products.name', 'LIKE', $prefixSearch);

                // Avoid broad full-scan matches on single-char queries.
                if ($supportsContainsSearch) {
                    $subQuery->orWhere('products.code', 'LIKE', $likeSearch)
                        ->orWhere('products.product_code', 'LIKE', $likeSearch)
                        ->orWhere('products.name', 'LIKE', $likeSearch);
                }
            });
        }

        $rows = $query
            ->orderByRaw(
                'CASE
                    WHEN products.code = ? THEN 0
                    WHEN products.product_code = ? THEN 1
                    WHEN products.code LIKE ? THEN 2
                    WHEN products.product_code LIKE ? THEN 3
                    WHEN products.name LIKE ? THEN 4
                    ELSE 5
                END',
                [$search, $search, $prefixSearch, $prefixSearch, $prefixSearch]
            )
            ->orderBy('products.name')
            ->limit($limit)
            ->get();

        $canViewPurchasePrice = hasPermissionStrict('view_purchase_price') ||
            hasPermissionStrict('products.view_purchase_price');

        $data = $rows->map(function ($product) use ($warehouseId, $canViewPurchasePrice) {
            return [
                'id' => (int) $product->id,
                'attributes' => [
                    'name' => $product->name,
                    'code' => $product->code,
                    'product_code' => $product->product_code,
                    'barcode_url' => Storage::url('product_barcode/barcode-PR_'.$product->id.'.png'),
                    'product_cost' => $canViewPurchasePrice ? (float) $product->product_cost : 0,
                    'product_price' => (float) $product->product_price,
                    'product_unit' => $product->product_unit,
                    'sale_unit' => $product->sale_unit,
                    'purchase_unit' => $product->purchase_unit,
                    'quantity_limit' => $product->quantity_limit,
                    'product_type' => (int) $product->main_product_type,
                    'main_product_type' => (int) $product->main_product_type,
                    'batch_enabled' => (bool) $product->batch_enabled,
                    'is_batch_product' => (bool) $product->batch_enabled
                        || (int) $product->main_product_type === MainProduct::BATCH_PRODUCT,
                    'is_variant_product' => (bool) $product->is_variant_product
                        || (int) $product->main_product_type === MainProduct::VARIATION_PRODUCT,
                    'variation_product' => $product->variation_type_name ? [
                        'variation_type_name' => $product->variation_type_name,
                    ] : null,
                    'order_tax' => is_null($product->order_tax) ? 0 : (float) $product->order_tax,
                    'tax_type' => is_null($product->tax_type) ? 1 : (int) $product->tax_type,
                    'product_unit_name' => [
                        'name' => $product->product_unit_name ?? '',
                        'short_name' => $product->product_unit_name ?? '',
                    ],
                    'sale_unit_name' => [
                        'short_name' => $product->sale_unit_short_name ?: ($product->product_unit_name ?? ''),
                    ],
                    'purchase_unit_name' => [
                        'short_name' => $product->purchase_unit_short_name ?: ($product->product_unit_name ?? ''),
                    ],
                    'stock' => [
                        'quantity' => (float) $product->stock_quantity,
                        'warehouse_id' => $warehouseId,
                    ],
                ],
            ];
        })->values();

        return response()->json([
            'data' => $data,
            'meta' => [
                'count' => $data->count(),
            ],
        ]);
    }

    /**
     * @return ProductResource|JsonResponse
     */
    public function store(CreateProductRequest $request)
    {
        abort_unless(hasPermissionStrict('products.create'), 403);

        $input = $request->all();

        if ($input['main_product_id']) {
            $mainProduct = MainProduct::find($input['main_product_id']);
            if ($mainProduct->product_type == MainProduct::SINGLE_PRODUCT) {
                return $this->sendError('You can add variations for single type product');
            }
        }

        if ($input['barcode_symbol'] == Product::EAN8 && strlen($input['code']) != 7) {
            return $this->sendError('Please enter 7 digit code');
        }

        if ($input['barcode_symbol'] == Product::UPC && strlen($input['code']) != 11) {
            return $this->sendError(' Please enter 11 digit code');
        }

        $product = $this->productRepository->storeProduct($input);

        VariationProduct::create([
            'product_id' => $product->id,
            'variation_id' => $input['variation_id'],
            'variation_type_id' => $input['variation_type'],
            'main_product_id' => $input['main_product_id'],
        ]);

        return new ProductResource($product);
    }

    public function show($id): ProductResource
    {
        abort_unless(hasPermissionStrict('products.view'), 403);

        $product = $this->productRepository->find($id);

        return new ProductResource($product);
    }

    public function update(UpdateProductRequest $request, $id): ProductResource
    {
        abort_unless(hasPermissionStrict('products.update'), 403);

        $input = $request->all();

        $product = $this->productRepository->updateProduct($input, $id);

        return new ProductResource($product);
    }

    public function quickUpdatePrice(QuickUpdateProductPriceRequest $request, Product $product): ProductResource
    {
        abort_unless(hasPermissionStrict('products.update'), 403);

        $payload = $request->only(['product_cost', 'product_price', 'tax_type', 'order_tax']);
        $product->update($payload);

        return new ProductResource($product->fresh());
    }

    public function destroy($id): JsonResponse
    {
        abort_unless(hasPermissionStrict('products.delete'), 403);

        $purchaseItemModels = [
            PurchaseItem::class,
        ];
        $saleItemModels = [
            SaleItem::class,
        ];
        $purchaseResult = canDelete($purchaseItemModels, 'product_id', $id);
        $saleResult = canDelete($saleItemModels, 'product_id', $id);
        if ($purchaseResult || $saleResult) {
            return $this->sendError(__('messages.error.product_cant_deleted'));
        }

        if (File::exists(Storage::path('product_barcode/barcode-PR_' . $id . '.png'))) {
            File::delete(Storage::path('product_barcode/barcode-PR_' . $id . '.png'));
        }

        $product = $this->productRepository->find($id);
        $mainProduct = MainProduct::withCount('products')->find($product->main_product_id);

        if ($mainProduct->product_type == MainProduct::VARIATION_PRODUCT && $mainProduct->products_count <= 1) {
            return $this->sendError('You can not delete last variation product');
        }

        VariationProduct::where('product_id', $id)->delete();

        $this->productRepository->delete($id);

        return $this->sendSuccess('Product deleted successfully');
    }

    public function productImageDelete($mediaId): JsonResponse
    {
        abort_unless(hasPermissionStrict('products.update'), 403);

        $media = Media::where('id', $mediaId)->firstOrFail();
        $media->delete();

        return $this->sendSuccess('Product image deleted successfully');
    }

    public function importProducts(Request $request): JsonResponse
    {
        abort_unless(hasPermissionStrict('products.create'), 403);

        Excel::import(new ProductImport, request()->file('file'));

        return $this->sendSuccess('Products imported successfully');
    }

    public function getProductExportExcel(Request $request): JsonResponse
    {
        abort_unless(hasPermissionStrict('products.view'), 403);

        if (Storage::exists('excel/product-excel-export.xlsx')) {
            Storage::delete('excel/product-excel-export.xlsx');
        }
        Excel::store(new ProductExcelExport, 'excel/product-excel-export.xlsx');

        $data['product_excel_url'] = Storage::url('excel/product-excel-export.xlsx');

        return $this->sendResponse($data, 'Product retrieved successfully');
    }

    public function getAllProducts()
    {
        abort_unless(hasPermissionStrict('products.view'), 403);

        $products = Product::all();
        $data = [];

        foreach ($products as $product) {
            $data[] = [
                'id' => $product->id,
                'name' => $product->name,
            ];
        }

        return $this->sendResponse($data, 'Products retrieve successfully.');
    }
}
