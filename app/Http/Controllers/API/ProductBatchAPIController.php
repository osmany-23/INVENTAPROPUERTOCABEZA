<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\AppBaseController;
use App\Models\Product;
use App\Models\ProductBatch;
use App\Services\ProductBatchService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductBatchAPIController extends AppBaseController
{
    public function __construct(private readonly ProductBatchService $productBatchService)
    {
    }

    public function show(Product $product): JsonResponse
    {
        abort_unless(hasPermissionStrict('ver_lotes'), 403);

        return $this->sendResponse(
            $this->productBatchService->getProductBatchDashboard($product),
            'Batch dashboard retrieved successfully.'
        );
    }

    public function updateSettings(Request $request, Product $product): JsonResponse
    {
        abort_unless(hasPermissionStrict('asignar_lotes'), 403);

        return $this->sendResponse(
            $this->productBatchService->updateSettings($product, $request->all()),
            'Batch settings updated successfully.'
        );
    }

    public function store(Request $request, Product $product): JsonResponse
    {
        abort_unless(hasPermissionStrict('crear_lotes'), 403);

        return $this->sendResponse(
            $this->productBatchService->createBatch($product, $request->all()),
            'Batch created successfully.'
        );
    }

    public function update(Request $request, Product $product, ProductBatch $batch): JsonResponse
    {
        abort_unless(hasPermissionStrict('editar_lotes'), 403);

        return $this->sendResponse(
            $this->productBatchService->updateBatch($product, $batch, $request->all()),
            'Batch updated successfully.'
        );
    }

    public function scan(Request $request): JsonResponse
    {
        abort_unless(hasPermissionStrict('ver_lotes'), 403);

        $warehouseId = (int) $request->get('warehouse_id');
        $code = (string) $request->get('code', '');

        return $this->sendResponse(
            $this->productBatchService->resolvePosScan($warehouseId, $code),
            'Scan resolved successfully.'
        );
    }

    public function alertSummary(Request $request): JsonResponse
    {
        abort_unless(
            hasPermissionStrict('ver_lotes') || hasPermissionStrict('ver_stock_lote'),
            403
        );

        return $this->sendResponse(
            $this->productBatchService->getAlertSummary($request->filled('warehouse_id') ? (int) $request->get('warehouse_id') : null),
            'Batch alert summary retrieved successfully.'
        );
    }

    public function alerts(Request $request): JsonResponse
    {
        abort_unless(
            hasPermissionStrict('ver_lotes') || hasPermissionStrict('ver_stock_lote'),
            403
        );

        return $this->sendResponse(
            $this->productBatchService->getAlertFeed(
                $request->filled('warehouse_id') ? (int) $request->get('warehouse_id') : null,
                $request->filled('days') ? (int) $request->get('days') : null
            ),
            'Batch alerts retrieved successfully.'
        );
    }

    public function report(Request $request): JsonResponse
    {
        abort_unless(hasPermissionStrict('ver_stock_lote'), 403);

        return $this->sendResponse(
            $this->productBatchService->getExpiryReport($request->all()),
            'Batch expiry report retrieved successfully.'
        );
    }
}
