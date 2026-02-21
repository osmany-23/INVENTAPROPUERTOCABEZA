<?php

namespace App\Repositories;

use App\Models\ManageStock;
use App\Models\Product;
use App\Models\Purchase;
use App\Models\PurchaseItem;
use App\Models\PurchaseReturn;
use App\Models\PurchaseReturnItem;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class PurchaseReturnRepository
 */
class PurchaseReturnRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'date',
        'reference_code',
        'tax_rate',
        'tax_amount',
        'discount',
        'shipping',
        'grand_total',
        'received_amount',
        'paid_amount',
        'payment_type',
        'notes',
        'created_at',
    ];

    /**
     * @var string[]
     */
    protected $allowedFields = [
        'date',
        'tax_rate',
        'tax_amount',
        'discount',
        'shipping',
        'grand_total',
        'received_amount',
        'notes',
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
        return PurchaseReturn::class;
    }

    /**
     * @return mixed
     */
    public function storePurchaseReturn($input)
    {
        try {
            DB::beginTransaction();
            $input['purchase_return_items'] = array_values(array_filter(
                $input['purchase_return_items'] ?? [],
                fn ($item) => (float) ($item['quantity'] ?? 0) > 0
            ));
            if (empty($input['purchase_return_items'])) {
                throw new UnprocessableEntityHttpException('Please Enter Attlist One Quantity.');
            }
            foreach ($input['purchase_return_items'] as $purchase_return_items) {
                if ($purchase_return_items['quantity'] == 0) {
                    throw new UnprocessableEntityHttpException('Please Enter Attlist One Quantity.');
                }
            }

            $purchaseReturnInputArray = Arr::only($input, [
                'supplier_id', 'warehouse_id', 'date', 'tax_rate', 'tax_amount', 'discount', 'shipping', 'grand_total',
                'received_amount', 'paid_amount', 'payment_type', 'notes', 'status', 'payment_status',
            ]);

            $purchaseReturn = PurchaseReturn::create($purchaseReturnInputArray);

            if (!empty($input['purchase_id'])) {
                $this->validatePurchaseReturnQuantities(
                    (int) $input['purchase_id'],
                    $input['purchase_return_items']
                );
            }

            $purchaseReturn = $this->storePurchaseReturnItems($purchaseReturn, $input);
            $productIds = collect($input['purchase_return_items'])->pluck('product_id')->filter()->unique()->values()->toArray();
            $stockByProduct = ManageStock::whereWarehouseId($input['warehouse_id'])
                ->whereIn('product_id', $productIds)
                ->get()
                ->keyBy('product_id');
            $purchasedProductIds = PurchaseItem::whereIn('product_id', $productIds)
                ->whereHas('purchase', function (Builder $q) use ($input) {
                    $q->where('supplier_id', $input['supplier_id'])
                        ->where('warehouse_id', $input['warehouse_id']);
                })
                ->pluck('product_id')
                ->unique()
                ->toArray();
            $purchasedProductLookup = array_flip($purchasedProductIds);

            foreach ($input['purchase_return_items'] as $saleItem) {
                $productId = (int) ($saleItem['product_id'] ?? 0);
                $product = $stockByProduct->get($productId);
                $purchaseExist = isset($purchasedProductLookup[$productId]);
                if ($purchaseExist) {
                    if ($product && $product->quantity >= $saleItem['quantity']) {
                        $totalQuantity = $product->quantity - $saleItem['quantity'];
                        $product->update([
                            'quantity' => $totalQuantity,
                        ]);
                        $stockByProduct->put($productId, $product);
                    } else {
                        throw new UnprocessableEntityHttpException('Quantity must be less than Available quantity.');
                    }
                } else {
                    throw new UnprocessableEntityHttpException('Purchase Does Not exist');
                }
            }
            DB::commit();

            return $purchaseReturn;
        } catch (Exception $e) {
            DB::rollBack();
            throw new UnprocessableEntityHttpException($e->getMessage());
        }
    }

    /**
     * @return mixed
     */
    public function storePurchaseReturnItems($purchaseReturn, $input)
    {
        foreach ($input['purchase_return_items'] as $purchaseReturnItem) {
            $items = $this->calculationPurchaseReturnItems($purchaseReturnItem);
            $purchaseReturnItem = new PurchaseReturnItem($items);
            $purchaseReturn->purchaseReturnItems()->save($purchaseReturnItem);
        }

        $subTotalAmount = $purchaseReturn->purchaseReturnItems()->sum('sub_total');
        if ($input['discount'] <= $subTotalAmount) {
            $input['grand_total'] = $subTotalAmount - $input['discount'];
        } else {
            throw new UnprocessableEntityHttpException('Discount amount should not be greater than total.');
        }
        if ($input['tax_rate'] <= 100 && $input['tax_rate'] >= 0) {
            $input['tax_amount'] = $input['grand_total'] * $input['tax_rate'] / 100;
        } else {
            throw new UnprocessableEntityHttpException('Please enter tax value between 0 to 100.');
        }
        $input['grand_total'] = $input['grand_total'] + $input['tax_amount'];
        if ($input['shipping'] <= $input['grand_total'] && $input['shipping'] >= 0) {
            $input['grand_total'] += $input['shipping'];
        } else {
            throw new UnprocessableEntityHttpException(__('messages.error.shipping_amount_not_be_greater'));
        }

        if ($input['payment_status'] == PurchaseReturn::PAID) {
            $input['received_amount'] = $input['grand_total'];
        }

        $input['reference_code'] = getSettingValue('purchase_return_code').'_111'.$purchaseReturn->id;
        $purchaseReturn->update($input);

        return $purchaseReturn;
    }

    /**
     * @return mixed
     */
    public function calculationPurchaseReturnItems($purchaseReturnItem)
    {
        $validator = Validator::make($purchaseReturnItem, PurchaseReturnItem::$rules);
        if ($validator->fails()) {
            throw new UnprocessableEntityHttpException($validator->errors()->first());
        }

        //discount calculation
        $perItemDiscountAmount = 0;
        $purchaseReturnItem['net_unit_cost'] = $purchaseReturnItem['product_cost'];
        if ($purchaseReturnItem['discount_type'] == PurchaseReturn::PERCENTAGE) {
            if ($purchaseReturnItem['discount_value'] <= 100 && $purchaseReturnItem['discount_value'] >= 0) {
                $purchaseReturnItem['discount_amount'] = ($purchaseReturnItem['discount_value'] * $purchaseReturnItem['product_cost'] / 100) * $purchaseReturnItem['quantity'];
                $perItemDiscountAmount = $purchaseReturnItem['discount_amount'] / $purchaseReturnItem['quantity'];
                $purchaseReturnItem['net_unit_cost'] -= $perItemDiscountAmount;
            } else {
                throw new UnprocessableEntityHttpException('Please enter discount value between 0 to 100.');
            }
        } elseif ($purchaseReturnItem['discount_type'] == PurchaseReturn::FIXED) {
            if ($purchaseReturnItem['discount_value'] <= $purchaseReturnItem['product_cost'] && $purchaseReturnItem['discount_value'] >= 0) {
                $purchaseReturnItem['discount_amount'] = $purchaseReturnItem['discount_value'] * $purchaseReturnItem['quantity'];
                $perItemDiscountAmount = $purchaseReturnItem['discount_amount'] / $purchaseReturnItem['quantity'];
                $purchaseReturnItem['net_unit_cost'] -= $perItemDiscountAmount;
            } else {
                throw new UnprocessableEntityHttpException("Please enter  discount's value between product's price.");
            }
        }
        //tax calculation
        $perItemTaxAmount = 0;
        if ($purchaseReturnItem['tax_value'] <= 100 && $purchaseReturnItem['tax_value'] >= 0) {
            if ($purchaseReturnItem['tax_type'] == PurchaseReturn::EXCLUSIVE) {
                $purchaseReturnItem['tax_amount'] = (($purchaseReturnItem['net_unit_cost'] * $purchaseReturnItem['tax_value']) / 100) * $purchaseReturnItem['quantity'];
                $perItemTaxAmount = $purchaseReturnItem['tax_amount'] / $purchaseReturnItem['quantity'];
            } elseif ($purchaseReturnItem['tax_type'] == PurchaseReturn::INCLUSIVE) {
                $purchaseReturnItem['tax_amount'] = ($purchaseReturnItem['net_unit_cost'] * $purchaseReturnItem['tax_value']) / (100 + $purchaseReturnItem['tax_value']) * $purchaseReturnItem['quantity'];
                $perItemTaxAmount = $purchaseReturnItem['tax_amount'] / $purchaseReturnItem['quantity'];
                $purchaseReturnItem['net_unit_cost'] -= $perItemTaxAmount;
            }
        } else {
            throw new UnprocessableEntityHttpException('Please enter tax value between 0 to 100 ');
        }
        $purchaseReturnItem['sub_total'] = ($purchaseReturnItem['net_unit_cost'] + $perItemTaxAmount) * $purchaseReturnItem['quantity'];

        return $purchaseReturnItem;
    }

    /**
     * @return mixed
     */
    public function updatePurchaseReturn($input, $id)
    {
        try {
            DB::beginTransaction();
            $input['purchase_return_items'] = array_values(array_filter(
                $input['purchase_return_items'] ?? [],
                fn ($item) => (float) ($item['quantity'] ?? 0) > 0
            ));
            if (empty($input['purchase_return_items'])) {
                throw new UnprocessableEntityHttpException('Please Enter Attlist One Quantity.');
            }
            foreach ($input['purchase_return_items'] as $purchase_return_items) {
                if ($purchase_return_items['quantity'] == 0) {
                    throw new UnprocessableEntityHttpException('Please Enter Attlist One Quantity.');
                }
            }
            $purchaseReturn = PurchaseReturn::findOrFail($id);
            $purchaseId = !empty($input['purchase_id']) ? (int) $input['purchase_id'] : null;
            if (!empty($purchaseId)) {
                $this->validatePurchaseReturnQuantities(
                    $purchaseId,
                    $input['purchase_return_items'],
                    (int) $purchaseReturn->id
                );
            }
            $purchaseReturnItemIds = PurchaseReturnItem::wherePurchaseReturnId($id)->pluck('id')->toArray();
            $purchaseReturnItemOldIds = [];
            $incomingProductIds = collect($input['purchase_return_items'])->pluck('product_id')->filter()->unique()->values()->toArray();
            $stockByProduct = ManageStock::whereWarehouseId($input['warehouse_id'])
                ->whereIn('product_id', $incomingProductIds)
                ->get()
                ->keyBy('product_id');
            $purchasedProductIds = PurchaseItem::whereIn('product_id', $incomingProductIds)
                ->whereHas('purchase', function (Builder $q) use ($input) {
                    $q->where('supplier_id', $input['supplier_id'])
                        ->where('warehouse_id', $input['warehouse_id']);
                })
                ->pluck('product_id')
                ->unique()
                ->toArray();
            $purchasedProductLookup = array_flip($purchasedProductIds);
            foreach ($input['purchase_return_items'] as $key => $purchaseReturnItem) {
                //get different ids & update
                $purchaseReturnItemOldIds[$key] = $purchaseReturnItem['purchase_return_item_id'];
                $purchaseReturnItemArr = Arr::only($purchaseReturnItem, [
                    'purchase_return_item_id', 'product_id', 'product_cost', 'net_unit_cost', 'tax_type', 'tax_value',
                    'tax_amount', 'discount_type', 'discount_value', 'discount_amount', 'purchase_unit', 'quantity',
                    'sub_total',
                ]);
                $this->updateItem($purchaseReturnItemArr, $input['warehouse_id']);
                //create new product items
                if (is_null($purchaseReturnItem['purchase_return_item_id'])) {
                    $purchaseReturnItem = $this->calculationPurchaseReturnItems($purchaseReturnItem);
                    $purchaseReturnItemArr = Arr::only($purchaseReturnItem, [
                        'purchase_return_item_id', 'product_id', 'product_cost', 'net_unit_cost', 'tax_type',
                        'tax_value',
                        'tax_amount', 'discount_type', 'discount_value', 'discount_amount', 'purchase_unit', 'quantity',
                        'sub_total',
                    ]);
                    $purchaseReturn->purchaseReturnItems()->create($purchaseReturnItemArr);
                    $productId = (int) ($purchaseReturnItem['product_id'] ?? 0);
                    $product = $stockByProduct->get($productId);
                    $purchaseExist = isset($purchasedProductLookup[$productId]);
                    if ($purchaseExist) {
                        if ($product) {
                            if ($product->quantity >= $purchaseReturnItem['quantity']) {
                                $product->update([
                                    'quantity' => $product->quantity - $purchaseReturnItem['quantity'],
                                ]);
                                $stockByProduct->put($productId, $product);
                            } else {
                                throw new UnprocessableEntityHttpException('Quantity must be less than Available quantity.');
                            }
                        }
                    } else {
                        throw new UnprocessableEntityHttpException('Purchase Does Not exist');
                    }
                }
            }
            $removeItemIds = array_diff($purchaseReturnItemIds, $purchaseReturnItemOldIds);
            //delete remove product
            if (! empty(array_values($removeItemIds))) {
                foreach ($removeItemIds as $removeItemId) {
                    // remove quantity manage storage
                    $oldProduct = PurchaseReturnItem::whereId($removeItemId)->first();
                    $productQuantity = ManageStock::whereWarehouseId($input['warehouse_id'])->whereProductId($oldProduct->product_id)->first();
                    if ($productQuantity) {
                        if ($oldProduct) {
                            $productQuantity->update([
                                'quantity' => $productQuantity->quantity + $oldProduct->quantity,
                            ]);
                        }
                    } else {
                        ManageStock::create([
                            'warehouse_id' => $input['warehouse_id'],
                            'product_id' => $oldProduct->product_id,
                            'quantity' => $oldProduct->quantity,
                        ]);
                    }
                }
                PurchaseReturnItem::whereIn('id', array_values($removeItemIds))->delete();
            }
            $purchase = $this->updatePurchaseReturnCalculation($input, $id);
            DB::commit();

            return $purchase;
        } catch (Exception $e) {
            DB::rollBack();
            throw new UnprocessableEntityHttpException($e->getMessage());
        }
    }

    public function updateItem($purchaseReturnItem, $warehouseId): bool
    {
        try {
            $purchaseReturnItem = $this->calculationPurchaseReturnItems($purchaseReturnItem);
            $item = PurchaseReturnItem::whereId($purchaseReturnItem['purchase_return_item_id']);
            $product = ManageStock::whereWarehouseId($warehouseId)->whereProductId($purchaseReturnItem['product_id'])->first();
            $oldItem = PurchaseReturnItem::whereId($purchaseReturnItem['purchase_return_item_id'])->first();
            if ($oldItem && $oldItem->quantity != $purchaseReturnItem['quantity']) {
                $totalQuantity = 0;
                if ($oldItem->quantity > $purchaseReturnItem['quantity']) {
                    if ($product) {
                        $totalQuantity = $product->quantity + ($oldItem->quantity - $purchaseReturnItem['quantity']);
                        $product->update([
                            'quantity' => $totalQuantity,
                        ]);
                    } else {
                        ManageStock::create([
                            'warehouse_id' => $warehouseId,
                            'product_id' => $purchaseReturnItem['product_id'],
                            'quantity' => $totalQuantity,
                        ]);
                    }
                } elseif ($oldItem->quantity < $purchaseReturnItem['quantity']) {
                    $totalQuantity = $product->quantity - ($purchaseReturnItem['quantity'] - $oldItem->quantity);
                    if ($product->quantity < ($purchaseReturnItem['quantity'] - $oldItem->quantity)) {
                        throw new UnprocessableEntityHttpException('Quantity must be less than Available quantity.');
                    }
                    $product->update([
                        'quantity' => $totalQuantity,
                    ]);
                }
            }
            unset($purchaseReturnItem['purchase_return_item_id']);
            $item->update($purchaseReturnItem);

            return true;
        } catch (Exception $e) {
            throw new UnprocessableEntityHttpException($e->getMessage());
        }
    }

    /**
     * @return mixed
     */
    public function updatePurchaseReturnCalculation($input, $id)
    {
        $purchaseReturn = PurchaseReturn::findOrFail($id);
        $subTotalAmount = $purchaseReturn->purchaseReturnItems()->sum('sub_total');

        if ($input['discount'] > $subTotalAmount || $input['discount'] < 0) {
            throw new UnprocessableEntityHttpException('Discount amount should not be greater than total.');
        }
        $input['grand_total'] = $subTotalAmount - $input['discount'];
        if ($input['tax_rate'] > 100 || $input['tax_rate'] < 0) {
            throw new UnprocessableEntityHttpException('Please enter tax value between 0 to 100.');
        }
        $input['tax_amount'] = $input['grand_total'] * $input['tax_rate'] / 100;

        $input['grand_total'] += $input['tax_amount'];

        if ($input['shipping'] > $input['grand_total'] || $input['shipping'] < 0) {
            throw new UnprocessableEntityHttpException(__('messages.error.shipping_amount_not_be_greater'));
        }

        $input['grand_total'] += $input['shipping'];

        if ($input['payment_status'] == PurchaseReturn::PAID) {
            $input['received_amount'] = $input['grand_total'];
        } else {
            $input['received_amount'] = 0;
        }

        $purchaseReturnInputArray = Arr::only($input, [
            'supplier_id', 'warehouse_id', 'date', 'tax_rate', 'tax_amount', 'discount', 'shipping', 'grand_total',
            'received_amount', 'paid_amount', 'payment_type', 'notes', 'status', 'payment_status',
        ]);
        $purchaseReturn->update($purchaseReturnInputArray);

        return $purchaseReturn;
    }

    /**
     * Validate returned quantity per product against original purchase quantity.
     * Max return qty = purchased qty for the selected purchase.
     */
    protected function validatePurchaseReturnQuantities(
        int $purchaseId,
        array $purchaseReturnItems,
        ?int $excludePurchaseReturnId = null
    ): void {
        $purchase = Purchase::find($purchaseId);
        if (!$purchase) {
            throw new UnprocessableEntityHttpException('The selected purchase does not exist.');
        }

        $purchaseQtyByProduct = PurchaseItem::where('purchase_id', $purchaseId)
            ->select('product_id', DB::raw('SUM(quantity) as total_qty'))
            ->groupBy('product_id')
            ->pluck('total_qty', 'product_id')
            ->map(fn ($qty) => (float) $qty)
            ->toArray();

        $requestedQtyByProduct = [];
        foreach ($purchaseReturnItems as $item) {
            $productId = (int) ($item['product_id'] ?? 0);
            $quantity = (float) ($item['quantity'] ?? 0);
            if ($productId <= 0) {
                continue;
            }
            $requestedQtyByProduct[$productId] = ($requestedQtyByProduct[$productId] ?? 0) + $quantity;
        }

        foreach ($requestedQtyByProduct as $productId => $requestedQty) {
            $purchasedQty = (float) ($purchaseQtyByProduct[$productId] ?? 0);
            $maxAllowed = max(0, $purchasedQty);

            if ($requestedQty > $maxAllowed) {
                $productName = Product::whereKey($productId)->value('name') ?: 'product';
                throw new UnprocessableEntityHttpException(
                    "Return quantity for {$productName} exceeds available amount. Max allowed: {$maxAllowed}."
                );
            }
        }
    }
}
