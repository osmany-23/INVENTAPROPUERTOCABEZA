<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\AppBaseController;
use App\Models\Credit;
use App\Services\CreditService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CreditAPIController extends AppBaseController
{
    public function __construct(private readonly CreditService $creditService)
    {
    }

    public function dashboard(Request $request): JsonResponse
    {
        abort_unless(hasPermissionStrict('pos.view'), 403);

        $data = $this->creditService->getDashboardData($request->only(['search', 'status']));

        return $this->sendResponse($data, 'Credit dashboard retrieved successfully');
    }

    public function show(Credit $credit): JsonResponse
    {
        abort_unless(hasPermissionStrict('pos.view'), 403);

        return $this->sendResponse(
            $this->creditService->getCreditDetail($credit),
            'Credit detail retrieved successfully'
        );
    }

    public function checkLimit(Request $request): JsonResponse
    {
        abort_unless(hasPermissionStrict('pos.view'), 403);

        $data = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'amount' => 'required|numeric|min:0.01',
        ]);

        return $this->sendResponse(
            $this->creditService->checkLimit((int) $data['customer_id'], (float) $data['amount']),
            'Credit limit checked successfully'
        );
    }

    public function upsertCustomerConfig(Request $request): JsonResponse
    {
        abort_unless(hasPermissionStrict('pos.create_sale'), 403);

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
            'allow_exceed' => (bool) $config->allow_exceed,
            'interest_rate' => (float) $config->interest_rate,
            'max_installments' => (int) $config->max_installments,
            'status' => $config->status,
        ], 'Customer credit config saved successfully');
    }

    public function storeManual(Request $request): JsonResponse
    {
        abort_unless(hasPermissionStrict('pos.create_sale'), 403);

        $data = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'total_amount' => 'required|numeric|min:0.01',
            'interest_rate' => 'nullable|numeric|min:0',
            'installments' => 'nullable|integer|min:1',
            'start_date' => 'nullable|date',
            'due_date' => 'nullable|date',
            'note' => 'nullable|string',
        ]);

        $credit = $this->creditService->createManualCredit($data);

        return $this->sendResponse(
            $this->creditService->getCreditDetail($credit),
            'Manual credit created successfully'
        );
    }

    public function capturePayment(Request $request, Credit $credit): JsonResponse
    {
        abort_unless(hasPermissionStrict('pos.create_sale'), 403);

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
}
