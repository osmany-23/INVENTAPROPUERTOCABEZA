<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\CreateSupplierRequest;
use App\Http\Requests\UpdateSupplierRequest;
use App\Http\Resources\SupplierCollection;
use App\Http\Resources\SupplierResource;
use App\Imports\SupplierImport;
use App\Models\Purchase;
use App\Repositories\SupplierRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use Prettus\Validator\Exceptions\ValidatorException;

/**
 * Class SupplierAPIController
 */
class SupplierAPIController extends AppBaseController
{
    /** @var SupplierRepository */
    private $supplierRepository;

    public function __construct(SupplierRepository $supplierRepository)
    {
        $this->supplierRepository = $supplierRepository;
    }

    public function index(Request $request): SupplierCollection
    {
        abort_unless(hasPermissionStrict('supplier.view'), 403);

        $perPage = getPageSize($request);
        $suppliers = $this->supplierRepository->paginate($perPage);
        SupplierResource::usingWithCollection();

        return new SupplierCollection($suppliers);
    }

    /**
     * @throws ValidatorException
     */
    public function store(CreateSupplierRequest $request): SupplierResource
    {
        abort_unless(hasPermissionStrict('supplier.create'), 403);

        $input = $request->all();
        $supplier = $this->supplierRepository->create($input);

        return new SupplierResource($supplier);
    }

    public function show($id): SupplierResource
    {
        abort_unless(hasPermissionStrict('supplier.view'), 403);

        $supplier = $this->supplierRepository->find($id);

        return new SupplierResource($supplier);
    }

    /**
     * @throws ValidatorException
     */
    public function update(UpdateSupplierRequest $request, $id): SupplierResource
    {
        abort_unless(hasPermissionStrict('supplier.update'), 403);

        $input = $request->all();
        $supplier = $this->supplierRepository->update($input, $id);

        return new SupplierResource($supplier);
    }

    public function destroy($id): JsonResponse
    {
        abort_unless(hasPermissionStrict('supplier.delete'), 403);

        $purchaseModel = [
            Purchase::class,
        ];
        $useSupplier = canDelete($purchaseModel, 'supplier_id', $id);
        if ($useSupplier) {
            $this->sendError('Supplier can\'t be deleted.');
        }
        $this->supplierRepository->delete($id);

        return $this->sendSuccess('Supplier deleted successfully');
    }

    public function importSuppliers(Request $request): JsonResponse
    {
        abort_unless(hasPermissionStrict('supplier.create'), 403);

        Excel::import(new SupplierImport(), request()->file('file'));

        return $this->sendSuccess('Suppliers imported successfully');
    }
}
