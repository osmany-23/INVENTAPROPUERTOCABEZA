<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\CreateMainProductRequest;
use App\Http\Requests\UpdateMainProductRequest;
use App\Http\Resources\MainProductCollection;
use App\Http\Resources\MainProductResource;
use App\Models\MainProduct;
use App\Models\Product;
use App\Models\PurchaseItem;
use App\Models\SaleItem;
use App\Models\VariationProduct;
use App\Repositories\MainProductRepository;
use App\Repositories\ProductRepository;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

class MainProductAPIController extends AppBaseController
{
    /** @var MainProductRepository */
    private $mainProductRepository;

    public function __construct(MainProductRepository $mainProductRepository)
    {
        $this->mainProductRepository = $mainProductRepository;
    }

    public function fastList(Request $request): JsonResponse
    {
        abort_unless(hasPermissionStrict('products.view'), 403);

        $perPage = (int) $request->input('page.size', 20);
        $perPage = max(min($perPage, 100), 1);
        $currentPage = max((int) $request->input('page.number', 1), 1);

        $filters = $request->input('filter', []);
        $search = trim((string) data_get($filters, 'search', ''));
        $productUnit = $request->input('product_unit');
        $brandId = (int) $request->input('brand_id', 0);
        $productCategoryId = (int) $request->input('product_category_id', 0);
        $warehouseId = (int) $request->input('warehouse_id', 0);

        $sortValue = (string) $request->input('sort', '-created_at');
        $sortDirection = str_starts_with($sortValue, '-') ? 'desc' : 'asc';
        $sortField = ltrim($sortValue, '-');
        $allowedSorts = [
            'name' => 'main_products.name',
            'code' => 'main_products.code',
            'created_at' => 'main_products.created_at',
            'brand_name' => 'brands.name',
            'product_unit' => 'base_units.name',
            'in_stock' => 'stock.in_stock',
            'min_price' => 'meta.min_price',
            'max_price' => 'meta.max_price',
        ];
        $sortColumn = $allowedSorts[$sortField] ?? 'main_products.created_at';

        $stockSubQuery = DB::table('products as products_for_stock')
            ->leftJoin('manage_stocks as manage_stocks', function ($join) use ($warehouseId) {
                $join->on('manage_stocks.product_id', '=', 'products_for_stock.id');
                if ($warehouseId > 0) {
                    $join->where('manage_stocks.warehouse_id', $warehouseId);
                }
            })
            ->select(
                'products_for_stock.main_product_id',
                DB::raw('COALESCE(SUM(manage_stocks.quantity), 0) as in_stock')
            )
            ->groupBy('products_for_stock.main_product_id');

        $metaSubQuery = DB::table('products as products_for_meta')
            ->select(
                'products_for_meta.main_product_id',
                DB::raw('MIN(products_for_meta.product_price) as min_price'),
                DB::raw('MAX(products_for_meta.product_price) as max_price'),
                DB::raw('MIN(products_for_meta.brand_id) as brand_id'),
                DB::raw('MIN(products_for_meta.product_category_id) as product_category_id'),
                DB::raw('MIN(products_for_meta.created_at) as first_product_created_at'),
                DB::raw("SUBSTRING_INDEX(GROUP_CONCAT(COALESCE(products_for_meta.notes, '') ORDER BY products_for_meta.created_at DESC SEPARATOR '|||'), '|||', 1) as latest_notes")
            )
            ->groupBy('products_for_meta.main_product_id');

        $query = DB::table('main_products')
            ->leftJoinSub($metaSubQuery, 'meta', function ($join) {
                $join->on('meta.main_product_id', '=', 'main_products.id');
            })
            ->leftJoinSub($stockSubQuery, 'stock', function ($join) {
                $join->on('stock.main_product_id', '=', 'main_products.id');
            })
            ->leftJoin('brands', 'brands.id', '=', 'meta.brand_id')
            ->leftJoin('base_units', 'base_units.id', '=', 'main_products.product_unit')
            ->select([
                'main_products.id',
                'main_products.name',
                'main_products.code',
                'main_products.created_at',
                DB::raw('COALESCE(meta.min_price, 0) as min_price'),
                DB::raw('COALESCE(meta.max_price, 0) as max_price'),
                DB::raw('COALESCE(meta.latest_notes, "") as latest_notes'),
                DB::raw('COALESCE(stock.in_stock, 0) as in_stock'),
                DB::raw('COALESCE(brands.name, "") as brand_name'),
                DB::raw('COALESCE(base_units.name, "") as product_unit_name'),
                'meta.product_category_id',
            ]);

        if (! empty($search)) {
            $likeSearch = '%'.$search.'%';
            $query->where(function ($builder) use ($likeSearch) {
                $builder
                    ->where('main_products.name', 'LIKE', $likeSearch)
                    ->orWhere('main_products.code', 'LIKE', $likeSearch)
                    ->orWhere('brands.name', 'LIKE', $likeSearch)
                    ->orWhere('meta.latest_notes', 'LIKE', $likeSearch)
                    ->orWhereExists(function ($searchSubQuery) use ($likeSearch) {
                        $searchSubQuery
                            ->select(DB::raw(1))
                            ->from('products as search_products')
                            ->whereColumn('search_products.main_product_id', 'main_products.id')
                            ->where(function ($productsSearchBuilder) use ($likeSearch) {
                                $productsSearchBuilder
                                    ->where('search_products.name', 'LIKE', $likeSearch)
                                    ->orWhere('search_products.code', 'LIKE', $likeSearch);
                            });
                    });
            });
        }

        if (! empty($productUnit) && $productUnit !== '0') {
            $query->where('main_products.product_unit', $productUnit);
        }

        if ($brandId > 0) {
            $query->where('meta.brand_id', $brandId);
        }

        if ($productCategoryId > 0) {
            $query->where('meta.product_category_id', $productCategoryId);
        }

        if ($warehouseId > 0) {
            $query->whereRaw('COALESCE(stock.in_stock, 0) > 0');
        }

        $paginator = $query
            ->orderBy($sortColumn, $sortDirection)
            // Keep pagination stable when many rows share the same primary sort value.
            ->when(
                $sortColumn !== 'main_products.id',
                fn ($builder) => $builder->orderBy('main_products.id', $sortDirection)
            )
            ->paginate($perPage, ['*'], 'page[number]', $currentPage);

        $pageItems = collect($paginator->items());
        $productIds = $pageItems
            ->pluck('id')
            ->filter()
            ->map(fn ($id) => (int) $id)
            ->values()
            ->all();

        $imageUrlsByProductId = collect();
        if (! empty($productIds)) {
            $mediaRows = DB::table('media')
                ->select([
                    'model_id',
                    'id',
                    'file_name',
                    'disk',
                ])
                ->where('model_type', MainProduct::class)
                ->where('collection_name', MainProduct::PATH)
                ->whereIn('model_id', $productIds)
                ->orderBy('model_id')
                ->orderBy('id')
                ->get();

            $imageUrlsByProductId = $mediaRows
                ->groupBy(fn ($mediaRow) => (string) $mediaRow->model_id)
                ->map(function ($rows) {
                    $allValidUrls = $rows
                        ->map(function ($mediaRow) {
                            $imagePath = MainProduct::PATH.'/'.$mediaRow->id.'/'.$mediaRow->file_name;
                            $imageDisk = $mediaRow->disk ?: config('app.media_disc');

                            // Skip broken media rows that reference missing files.
                            if (! Storage::disk($imageDisk)->exists($imagePath)) {
                                return null;
                            }

                            $resolvedImageUrl = Storage::disk($imageDisk)->url($imagePath);

                            $imageUrl = str_starts_with($resolvedImageUrl, 'http')
                                ? $resolvedImageUrl
                                : url($resolvedImageUrl);

                            return [
                                'url' => $imageUrl,
                                'file_name' => mb_strtolower((string) $mediaRow->file_name),
                            ];
                        })
                        ->filter()
                        ->values();

                    if ($allValidUrls->isEmpty()) {
                        return [];
                    }

                    // Prefer real images and drop placeholder files when possible.
                    $realImageUrls = $allValidUrls
                        ->reject(function ($media) {
                            return str_contains($media['file_name'], 'placeholder') ||
                                str_contains($media['file_name'], 'no-image') ||
                                str_contains($media['file_name'], 'no_image');
                        })
                        ->pluck('url')
                        ->values()
                        ->all();

                    if (! empty($realImageUrls)) {
                        return $realImageUrls;
                    }

                    return $allValidUrls
                        ->pluck('url')
                        ->values()
                        ->all();
                });
        }

        $data = collect($paginator->items())
            ->map(function ($item) use ($imageUrlsByProductId) {
                $imageUrls = $imageUrlsByProductId->get((string) $item->id, []);
                $fullDescription = trim((string) $item->latest_notes);
                $shortDescription = $fullDescription;
                if (mb_strlen($shortDescription) > 140) {
                    $shortDescription = mb_substr($shortDescription, 0, 140).'...';
                }

                return [
                    'type' => MainProduct::JSON_API_TYPE,
                    'id' => (int) $item->id,
                    'attributes' => [
                        'name' => $item->name,
                        'code' => $item->code,
                        'brand_name' => $item->brand_name,
                        'min_price' => (float) $item->min_price,
                        'max_price' => (float) $item->max_price,
                        'in_stock' => (float) $item->in_stock,
                        'description' => $shortDescription,
                        'full_description' => $fullDescription,
                        'created_at' => $item->created_at,
                        'product_unit' => [
                            'name' => $item->product_unit_name,
                        ],
                        'images' => [
                            'imageUrls' => $imageUrls,
                        ],
                    ],
                    'links' => [
                        'self' => route('main-products.show', $item->id),
                    ],
                ];
            })
            ->values();

        return response()->json([
            'data' => $data,
            'meta' => [
                'total' => $paginator->total(),
                'per_page' => $paginator->perPage(),
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
            ],
        ]);
    }


    public function index(Request $request)
{
    abort_unless(hasPermissionStrict('products.view'), 403);

    $perPage = getPageSize($request);

    // Inicia consulta
    $query = MainProduct::query()->with([
        'products' => function ($q) {
            $q->select([
                'id',
                'name',
                'code',
                'product_code',
                'main_product_id',
                'product_category_id',
                'brand_id',
                'product_cost',
                'product_price',
                'product_unit',
                'sale_unit',
                'purchase_unit',
                'stock_alert',
                'quantity_limit',
                'order_tax',
                'tax_type',
                'notes',
                'barcode_symbol',
                'created_at',
            ])->with([
                'brand:id,name',
                'productCategory:id,name',
                'stock:id,product_id,warehouse_id,quantity',
                'stocks:id,product_id,warehouse_id,quantity',
                'stocks.warehouse:id,name',
                'variationProduct:id,product_id,variation_id,variation_type_id,main_product_id',
                'variationProduct.variation:id,name',
                'variationProduct.variationType:id,name',
                'mainProduct:id,name,code,product_unit,product_type',
            ]);
        },
    ]);

    // Filtro de texto
    if ($request->has('filter') && isset($request->filter['search'])) {
        $search = $request->filter['search'];

        $query->where(function ($q) use ($search) {
            $q->where('name', 'LIKE', "%{$search}%")
              ->orWhere('code', 'LIKE', "%{$search}%")
              ->orWhereHas('products', function ($sub) use ($search) {
                  $sub->where('notes', 'LIKE', "%{$search}%");
              });
        });
    }

    // Filtro por unidad
    if ($request->get('product_unit')) {
        $query->where('product_unit', $request->get('product_unit'));
    }

    // Filtro por marca
    if ($request->get('brand_id')) {
        $query->whereHas('products.brand', function ($q) use ($request) {
            $q->where('brands.id', $request->get('brand_id'));
        });
    }

    // Filtro por categoría
    if ($request->get('product_category_id')) {
        $query->whereHas('products.productCategory', function ($q) use ($request) {
            $q->where('product_categories.id', $request->get('product_category_id'));
        });
    }

    // Filtro por almacén
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

    // Paginación y respuesta
    $products = $query->paginate($perPage);
    MainProductResource::usingWithCollection();

    return new MainProductCollection($products);
}


    public function show($id): MainProductResource
    {
        abort_unless(hasPermissionStrict('products.view'), 403);

        /** @var MainProduct $mainProduct */
        $mainProduct = $this->mainProductRepository->find($id);

        return new MainProductResource($mainProduct);
    }

    public function store(CreateMainProductRequest $request)
    {
        abort_unless(hasPermissionStrict('products.create'), 403);

        $input = $request->all();

        if ($input['barcode_symbol'] == Product::EAN8 && strlen($input['code']) != 7) {
            return $this->sendError('Please enter 7 digit code');
        }

        if ($input['barcode_symbol'] == Product::UPC && strlen($input['code']) != 11) {
            return $this->sendError(' Please enter 11 digit code');
        }

        try {
            DB::beginTransaction();

            $productRepo = app(ProductRepository::class);
            $mainProduct = MainProduct::create([
                'name' => $input['name'],
                'code' => $input['product_code'],
                'product_unit' => $input['product_unit'],
                'product_type' => $input['product_type'],
            ]);

            if (isset($input['images']) && !empty($input['images'])) {
                foreach ($input['images'] as $image) {
                    $product['image_url'] = $mainProduct->addMedia($image)->toMediaCollection(
                        MainProduct::PATH,
                        config('app.media_disc')
                    );
                }
            }

            $input['main_product_id'] = $mainProduct->id;
            if ($input['product_type'] == 2) {
                $commonProductInput = Arr::except($input, 'variation_data');

                $variationData = $input['variation_data'];
                foreach ($variationData as $key => $variation) {
                    $variation = array_merge($variation, $commonProductInput);
                    $product = $productRepo->storeProduct($variation);

                    VariationProduct::create([
                        'product_id' => $product->id,
                        'variation_id' => $variation['variation_id'],
                        'variation_type_id' => $variation['variation_type_id'],
                        'main_product_id' => $mainProduct->id,
                    ]);
                }
            } else {
                $product = $productRepo->storeProduct($input);
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw new UnprocessableEntityHttpException($e->getMessage());
        }

        return new MainProductResource($product);
    }

    public function update(UpdateMainProductRequest $request, $id): MainProductResource
    {
        abort_unless(hasPermissionStrict('products.update'), 403);

        $input = $request->all();
        $mainProduct = MainProduct::find($id);

        $mainProduct->update([
            'name' => $input['name'],
            'code' => $input['product_code'],
            'product_unit' => $input['product_unit'],
        ]);


        if (isset($input['images']) && !empty($input['images'])) {
            foreach ($input['images'] as $image) {
                $product['image_url'] = $mainProduct->addMedia($image)->toMediaCollection(
                    MainProduct::PATH,
                    config('app.media_disc')
                );
            }
        }

        $products = Product::with('variationType')->where('main_product_id', $id)->get();

        foreach ($products as $product) {
            if ($mainProduct->product_type == MainProduct::VARIATION_PRODUCT) {
                $input['code'] = $input['product_code'] . '-' . strtoupper($product->variationType->name);
            } else {
                $input['code'] = $input['product_code'];
            }
            $productRepo = app(ProductRepository::class);
            $product = $productRepo->updateProduct($input, $product->id);
        }

        return new MainProductResource($product);
    }

    public function destroy($id): JsonResponse
    {
        abort_unless(hasPermissionStrict('products.delete'), 403);

        try {
            DB::beginTransaction();
            $products = Product::where('main_product_id', $id)->get();

            foreach ($products as $product) {

                $purchaseItemModels = [
                    PurchaseItem::class,
                ];
                $saleItemModels = [
                    SaleItem::class,
                ];

                $purchaseResult = canDelete($purchaseItemModels, 'product_id', $product->id);
                $saleResult = canDelete($saleItemModels, 'product_id', $product->id);

                if ($purchaseResult || $saleResult) {
                    return $this->sendError(__('messages.error.product_cant_deleted'));
                }

                if (File::exists(Storage::path('product_barcode/barcode-PR_' . $product->id . '.png'))) {
                    File::delete(Storage::path('product_barcode/barcode-PR_' . $product->id . '.png'));
                }
                $product->delete();
            }

            VariationProduct::where('main_product_id', $id)->delete();

            $this->mainProductRepository->delete($id);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendError($e->getMessage());
        }

        return $this->sendSuccess('Product deleted successfully');
    }
}
