<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\AppBaseController;
use App\Http\Resources\CreditSectionCollection;
use App\Models\Credit;
use App\Services\CreditInventoryService;
use App\Services\CreditService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CreditAPIController extends AppBaseController
{
    public function __construct(
        private readonly CreditService $creditService,
        private readonly CreditInventoryService $creditInventoryService
    )
    {
    }

    public function index(Request $request): JsonResponse
    {
        abort_unless(hasPermissionStrict('ver_creditos'), 403);

        $data = $request->validate([
            'page' => 'nullable|integer|min:1',
            'limit' => 'nullable|integer|min:1|max:50',
            'search' => 'nullable|string',
            'status' => 'nullable|in:pendiente,parcial,pagado,vencido',
            'estado' => 'nullable|in:pendiente,parcial,pagado,vencido',
            'section' => 'nullable|in:credits,customers,overdue,interest',
        ]);

        $sectionData = $this->creditService->paginateDashboardSection($data);

        return (new CreditSectionCollection(
            collect($sectionData['data'] ?? []),
            $sectionData['meta'] ?? [],
            $sectionData['section'] ?? 'credits'
        ))
            ->additional([
                'success' => true,
                'message' => 'Credit records retrieved successfully',
                'setup_required' => (bool) ($sectionData['setup_required'] ?? false),
            ])
            ->response();
    }

    public function dashboard(Request $request): JsonResponse
    {
        abort_unless(hasPermissionStrict('ver_creditos'), 403);

        $data = $this->creditService->getDashboardData();

        return $this->sendResponse($data, 'Credit dashboard retrieved successfully');
    }

    public function alertSummary(Request $request): JsonResponse
    {
        abort_unless(hasPermissionStrict('ver_creditos'), 403);

        return $this->sendResponse(
            $this->creditService->getAlertSummary($request->user()),
            'Credit alert summary retrieved successfully'
        );
    }

    public function alertFeed(Request $request): JsonResponse
    {
        abort_unless(hasPermissionStrict('ver_creditos'), 403);

        return $this->sendResponse(
            $this->creditService->getAlertFeed($request->user()),
            'Credit alerts retrieved successfully'
        );
    }

    public function updateAlertSettings(Request $request): JsonResponse
    {
        abort_unless(hasPermissionStrict('ver_creditos'), 403);

        $data = $request->validate([
            'credit_alert_days' => 'required|integer|min:0|max:30',
        ]);

        return $this->sendResponse(
            $this->creditService->updateAlertDaysPreference(
                $request->user(),
                (int) $data['credit_alert_days']
            ),
            'Credit alert settings updated successfully'
        );
    }

    public function show(Credit $credit): JsonResponse
    {
        abort_unless(hasPermissionStrict('ver_detalle_credito'), 403);

        return $this->sendResponse(
            $this->creditService->getCreditDetail($credit),
            'Credit detail retrieved successfully'
        );
    }

    public function printableState(Credit $credit): JsonResponse
    {
        abort_unless(hasPermissionStrict('ver_detalle_credito'), 403);

        return $this->sendResponse(
            $this->creditService->getPrintableCreditState($credit),
            'Printable credit state retrieved successfully'
        );
    }

    public function checkLimit(Request $request): JsonResponse
    {
        abort_unless(
            hasPermissionStrict('ver_creditos') || hasPermissionStrict('crear_creditos'),
            403
        );

        $data = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'amount' => 'required|numeric|min:0.01',
            'interest_rate' => 'nullable|numeric|min:0',
        ]);

        return $this->sendResponse(
            $this->creditService->checkLimit(
                (int) $data['customer_id'],
                (float) $data['amount'],
                array_key_exists('interest_rate', $data) ? (float) $data['interest_rate'] : null
            ),
            'Credit limit checked successfully'
        );
    }

    public function upsertCustomerConfig(Request $request): JsonResponse
    {
        abort_unless(hasPermissionStrict('editar_creditos'), 403);

        $data = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'credit_limit' => 'required|numeric|min:0',
            'allow_exceed' => 'nullable|boolean',
            'interest_rate' => 'nullable|numeric|min:0',
            'max_installments' => 'nullable|integer|min:1',
            'status' => 'nullable|in:activo,bloqueado',
        ]);

        $config = $this->creditService->upsertCustomerConfig($data);

        return $this->sendResponse([
            'id' => $config->id,
            'customer_id' => $config->customer_id,
            'customer_name' => optional($config->customer)->name,
            'credit_limit' => (float) $config->credit_limit,
            'current_balance' => (float) $config->current_balance,
            'used_credit' => (float) $config->current_balance,
            'available_credit' => round((float) $config->credit_limit - (float) $config->current_balance, 2),
            'allow_exceed' => (bool) $config->allow_exceed,
            'interest_rate' => (float) $config->interest_rate,
            'max_installments' => (int) $config->max_installments,
            'status' => $config->status,
        ], 'Customer credit config saved successfully');
    }

    public function storeManual(Request $request): JsonResponse
    {
        abort_unless(hasPermissionStrict('crear_creditos'), 403);

        $data = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'total_amount' => 'required|numeric|min:0.01',
            'interest_rate' => 'nullable|numeric|min:0',
            'installments' => 'nullable|integer|min:1',
            'start_date' => 'nullable|date',
            'due_date' => 'nullable|date',
            'note' => 'nullable|string',
            'warehouse_id' => 'nullable|exists:warehouses,id',
            'items' => 'nullable|array',
            'items.*.product_id' => 'nullable|integer|exists:products,id',
            'items.*.quantity' => 'nullable|numeric|min:0.01',
        ]);

        $credit = $this->creditService->createManualCredit($data);

        return $this->sendResponse(
            $this->creditService->getCreditDetail($credit),
            'Manual credit created successfully'
        );
    }

    public function updateTerms(Request $request, Credit $credit): JsonResponse
    {
        abort_unless(hasPermissionStrict('editar_creditos'), 403);

        $data = $request->validate([
            'installments' => 'nullable|integer|min:1',
            'credit_type' => 'required|in:automatico,manual,libre',
            'interest_rate' => 'nullable|numeric|min:0',
            'start_date' => 'required|date',
            'due_date' => 'nullable|date',
            'note' => 'nullable|string',
        ]);

        $credit = $this->creditService->updateCreditTerms($credit, $data);

        return $this->sendResponse(
            $this->creditService->getCreditDetail($credit),
            'Credit updated successfully'
        );
    }

    public function restructure(Request $request, Credit $credit): JsonResponse
    {
        abort_unless(hasPermissionStrict('editar_creditos'), 403);

        $data = $request->validate([
            'installments' => 'nullable|integer|min:1',
            'credit_type' => 'required|in:automatico,manual,libre',
            'interest_rate' => 'nullable|numeric|min:0',
            'start_date' => 'required|date',
            'due_date' => 'nullable|date',
            'note' => 'nullable|string',
            'reason' => 'required|string',
        ]);

        $credit = $this->creditService->restructureCredit($credit, $data);

        return $this->sendResponse(
            $this->creditService->getCreditDetail($credit),
            'Credit restructured successfully'
        );
    }

    public function capturePayment(Request $request, Credit $credit): JsonResponse
    {
        abort_unless(hasPermissionStrict('registrar_pagos_credito'), 403);

        $data = $request->validate([
            'amount' => 'required|numeric|min:0.01',
            'payment_type' => 'nullable|integer|in:1,2,3,4',
            'payment_method' => 'nullable|string|max:100',
            'note' => 'nullable|string',
        ]);

        $credit = $this->creditService->recordPayment($credit, $data);

        return $this->sendResponse(
            $this->creditService->getCreditDetail($credit),
            'Credit payment registered successfully'
        );
    }

    public function captureReturn(Request $request, Credit $credit): JsonResponse
    {
        abort_unless(hasPermissionStrict('editar_creditos'), 403);

        $data = $request->validate([
            'items' => 'required|array',
            'items.*.credit_item_id' => 'required|integer',
            'items.*.quantity' => 'required|numeric|min:0.01',
            'note' => 'nullable|string',
        ]);

        $credit = $this->creditService->recordReturn($credit, $data);

        return $this->sendResponse(
            $this->creditService->getCreditDetail($credit),
            'Credit return registered successfully'
        );
    }

    public function productReport(Request $request): JsonResponse
    {
        abort_unless(
            hasPermissionStrict('ver_creditos') || hasPermissionStrict('ver_detalle_credito'),
            403
        );

        $validated = $request->validate([
            'product_id' => 'required|integer|exists:products,id',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
        ]);

        $paginator = $this->creditInventoryService->paginateProductMovements((int) $validated['product_id'], [
            'search' => $request->filter['search'] ?? $request->get('search'),
            'start_date' => $validated['start_date'] ?? null,
            'end_date' => $validated['end_date'] ?? null,
            'sort' => $request->get('sort'),
            'page_size' => (int) $request->input('page.size', 10),
            'page_number' => (int) $request->input('page.number', 1),
        ]);

        $rows = collect($paginator->items())->map(function ($row) {
            return [
                'id' => $row->row_id,
                'attributes' => [
                    'created_at' => $row->movement_at,
                    'date' => $row->movement_date,
                    'reference_code' => $row->reference_code,
                    'product_name' => $row->product_name,
                    'customer_name' => $row->customer_name,
                    'warehouse_name' => $row->warehouse_name,
                    'quantity' => (float) $row->quantity,
                    'product_price' => (float) $row->product_price,
                    'sub_total' => (float) $row->sub_total,
                    'movement_type' => $row->movement_type,
                    'movement_type_label' => $row->movement_type === CreditInventoryService::MOVEMENT_TYPE_CREDIT_RETURN
                        ? 'Devolucion'
                        : 'Credito',
                    'movement_badge' => $row->movement_type === CreditInventoryService::MOVEMENT_TYPE_CREDIT_RETURN
                        ? 'danger'
                        : 'primary',
                ],
            ];
        })->values();

        return response()->json([
            'success' => true,
            'data' => $rows,
            'meta' => [
                'total' => $paginator->total(),
                'current_page' => $paginator->currentPage(),
                'per_page' => $paginator->perPage(),
            ],
        ]);
    }
}
