<?php

namespace App\Repositories;

use App\Mail\MailSender;
use App\Models\Customer;
use App\Models\MailTemplate;
use App\Models\ManageStock;
use App\Models\Sale;
use App\Models\SaleItem;
use App\Models\SaleReturn;
use App\Models\SaleReturnItem;
use App\Models\SalesPayment;
use App\Models\SmsSetting;
use App\Models\SmsTemplate;
use App\Services\ProductBatchService;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class SaleRepository
 */
class SaleReturnRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'date',
        'tax_rate',
        'tax_amount',
        'discount',
        'shipping',
        'grand_total',
        'paid_amount',
        'payment_type',
        'note',
        'created_at',
        'reference_code',
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
        'note',
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
        return SaleReturn::class;
    }

    public function storeSaleReturn($input): SaleReturn
    {
        try {
            DB::beginTransaction();

            $saleID = $input['sale_id'];

            $sale = Sale::whereId($saleID)->first();

            if (empty($sale)) {
                throw new UnprocessableEntityHttpException('Sale Does Not exist');
            }

            if ($sale->credit()->exists() && $this->hasCreditInventoryReturnFlow()) {
                throw new UnprocessableEntityHttpException('Las ventas a credito deben devolverse desde el modulo de creditos.');
            }
            $this->assertNoTrackedBatchProducts(
                collect($input['sale_return_items'] ?? [])->pluck('product_id')->filter()->all(),
                'Los productos con control por lote no pueden devolverse desde ventas hasta asignar lote especifico.'
            );

            $input['date'] = $input['date'] ?? date('Y/m/d');
            $saleReturnInputArray = Arr::only($input, [
                'customer_id', 'warehouse_id', 'tax_rate', 'tax_amount', 'discount', 'shipping', 'grand_total',
                'paid_amount', 'payment_type', 'note', 'date', 'status', 'sale_id',
            ]);

            /** @var Sale $sale */
            $saleReturn = SaleReturn::create($saleReturnInputArray);
            $saleReturn = $this->storeSaleReturnItems($saleReturn, $input);

            foreach ($input['sale_return_items'] as $saleReturnItem) {
                $qty = (float) ($saleReturnItem['quantity'] ?? 0);
                if ($qty <= 0) {
                    continue;
                }
                $this->increaseWarehouseStock(
                    (int) $input['warehouse_id'],
                    (int) $saleReturnItem['product_id'],
                    $qty
                );
            }
            $this->reconcileSaleFinancialSummary((int) $input['sale_id']);

            $mailTemplate = MailTemplate::where('type', MailTemplate::MAIL_TYPE_SALE_RETURN)->first();
            $smsTemplate = SmsTemplate::where('type', SmsTemplate::SMS_TYPE_SALE_RETURN)->first();

            $subject = 'Customer sale return';

            $customer = Customer::whereId($saleReturn->customer_id)->first();

            $search = [
                '{customer_name}', '{sales_return_id}', '{sales_return_date}', '{sales_return_amount}', '{app_name}',
            ];

            $replace = [
                $customer->name, $saleReturn->reference_code, $saleReturn->date, number_format($saleReturn->grand_total, 2),
                getSettingValue('company_name'),
            ];

            if (! empty($mailTemplate) && $mailTemplate->status == MailTemplate::ACTIVE) {
                $data['data'] = str_replace($search, $replace, $mailTemplate->content);

                Mail::to($customer->email)
                    ->send(new MailSender('emails.mail-sender', $subject, $data));
            }

            if (! empty($smsTemplate) && $smsTemplate->status == SmsTemplate::ACTIVE) {
                $message = str_replace($search, $replace, $smsTemplate->content);

                $client = new \GuzzleHttp\Client();

                $url = SmsSetting::where('key', 'url')->value('value');
                //                $token = SmsSetting::where('key', 'token')->value('value');
                //            $url = "https://xrjv8e.api.infobip.com/sms/2/text/advanced";

                $data = SmsSetting::where('key', 'payload')->value('value');

                $data = preg_replace('/\s/', '', $data);

                $data = json_decode($data, true);

                $toKey = SmsSetting::where('key', 'mobile_key')->value('value');
                $number = $customer->phone;

                $messageKey = SmsSetting::where('key', 'message_key')->value('value');

                $data = replaceArrayValue($data, $toKey, $number);
                $data = replaceArrayValue($data, $messageKey, $message);

                $response = $client->post($url, [
                    'headers' => [
                        'Content-Type' => 'application/json',
                        'Accept' => 'application/json',
                    ],
                    'form_params' => [$data],
                ]);
            }

            DB::commit();

            return $saleReturn;
        } catch (Exception $e) {
            DB::rollBack();
            throw new UnprocessableEntityHttpException($e->getMessage());
        }
    }

    /**
     * @return mixed
     */
    public function storeSaleReturnItems($saleReturn, $input)
    {
        $saleId = (int) $input['sale_id'];
        $requestedQtyByProduct = $this->buildRequestedReturnMap($input['sale_return_items']);
        if (empty($requestedQtyByProduct)) {
            throw new UnprocessableEntityHttpException('Please Enter Atleast One Quantity.');
        }
        $this->assertRequestedQtyWithinLimit($saleId, $requestedQtyByProduct);

        $createdItems = 0;
        foreach ($input['sale_return_items'] as $saleReturnItem) {
            if ((float) ($saleReturnItem['quantity'] ?? 0) <= 0) {
                continue;
            }

            $item = $this->calculationSaleReturnItems($saleReturnItem);
            $saleReturnItem = new SaleReturnItem($item);
            $saleReturn->saleReturnItems()->save($saleReturnItem);
            $createdItems++;
        }

        if ($createdItems === 0) {
            throw new UnprocessableEntityHttpException('Please Enter Atleast One Quantity.');
        }

        $subTotalAmount = $saleReturn->saleReturnItems()->sum('sub_total');

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
        $input['grand_total'] += $input['tax_amount'];
        if ($input['shipping'] <= $input['grand_total'] && $input['shipping'] >= 0) {
            $input['grand_total'] += $input['shipping'];
        } else {
            throw new UnprocessableEntityHttpException(__('messages.error.shipping_amount_not_be_greater'));
        }

        $input['reference_code'] = getSettingValue('sale_return_code').'_111'.$saleReturn->id;
        $saleReturn->update($input);

        return $saleReturn;
    }

    /**
     * @return mixed
     */
    public function calculationSaleReturnItems($saleReturnItem)
    {
        $validator = Validator::make($saleReturnItem, SaleReturnItem::$rules);
        if ($validator->fails()) {
            throw new UnprocessableEntityHttpException($validator->errors()->first());
        }

        //discount calculation
        $perItemDiscountAmount = 0;
        $saleReturnItem['net_unit_price'] = $saleReturnItem['product_price'];
        if ($saleReturnItem['discount_type'] == SaleReturn::PERCENTAGE) {
            if ($saleReturnItem['discount_value'] <= 100 && $saleReturnItem['discount_value'] >= 0) {
                $saleReturnItem['discount_amount'] = ($saleReturnItem['discount_value'] * $saleReturnItem['product_price'] / 100) * $saleReturnItem['quantity'];
                if ($saleReturnItem['quantity'] == 0) {
                    $perItemDiscountAmount = 0;
                } else {
                    $perItemDiscountAmount = $saleReturnItem['discount_amount'] / $saleReturnItem['quantity'];
                }
                $saleReturnItem['net_unit_price'] -= $perItemDiscountAmount;
            } else {
                throw new UnprocessableEntityHttpException('Please enter discount value between 0 to 100.');
            }
        } elseif ($saleReturnItem['discount_type'] == SaleReturn::FIXED) {
            if ($saleReturnItem['discount_value'] <= $saleReturnItem['product_price'] && $saleReturnItem['discount_value'] >= 0) {
                $saleReturnItem['discount_amount'] = $saleReturnItem['discount_value'] * $saleReturnItem['quantity'];
                if ($saleReturnItem['quantity'] == 0) {
                    $perItemDiscountAmount = 0;
                } else {
                    $perItemDiscountAmount = $saleReturnItem['discount_amount'] / $saleReturnItem['quantity'];
                }
                $saleReturnItem['net_unit_price'] -= $perItemDiscountAmount;
            } else {
                throw new UnprocessableEntityHttpException("Please enter  discount's value between product's price.");
            }
        }

        //tax calculation
        $perItemTaxAmount = 0;
        if ($saleReturnItem['tax_value'] <= 100 && $saleReturnItem['tax_value'] >= 0) {
            if ($saleReturnItem['tax_type'] == SaleReturn::EXCLUSIVE) {
                $saleReturnItem['tax_amount'] = (($saleReturnItem['net_unit_price'] * $saleReturnItem['tax_value']) / 100) * $saleReturnItem['quantity'];
                if ($saleReturnItem['quantity'] == 0) {
                    $perItemTaxAmount = 0;
                } else {
                    $perItemTaxAmount = $saleReturnItem['tax_amount'] / $saleReturnItem['quantity'];
                }
            } elseif ($saleReturnItem['tax_type'] == SaleReturn::INCLUSIVE) {
                $saleReturnItem['tax_amount'] = ($saleReturnItem['net_unit_price'] * $saleReturnItem['tax_value']) / (100 + $saleReturnItem['tax_value']) * $saleReturnItem['quantity'];
                if ($saleReturnItem['quantity'] == 0) {
                    $perItemTaxAmount = 0;
                } else {
                    $perItemTaxAmount = $saleReturnItem['tax_amount'] / $saleReturnItem['quantity'];
                }

                $saleReturnItem['net_unit_price'] -= $perItemTaxAmount;
            }
        } else {
            throw new UnprocessableEntityHttpException('Please enter tax value between 0 to 100 ');
        }
        $saleReturnItem['sub_total'] = ($saleReturnItem['net_unit_price'] + $perItemTaxAmount) * $saleReturnItem['quantity'];

        return $saleReturnItem;
    }

    /**
     * @return mixed
     */
    public function updateSaleReturn($input, $id)
    {
        try {
            DB::beginTransaction();
            $saleReturn = SaleReturn::findOrFail($id);
            $saleId = (int) $input['sale_id'];
            $sale = Sale::whereId($saleId)->first();
            if ($sale && $sale->credit()->exists() && $this->hasCreditInventoryReturnFlow()) {
                throw new UnprocessableEntityHttpException('Las ventas a credito deben devolverse desde el modulo de creditos.');
            }
            $this->assertNoTrackedBatchProducts(
                collect($input['sale_return_items'] ?? [])->pluck('product_id')->filter()->all(),
                'Los productos con control por lote no pueden devolverse desde ventas hasta asignar lote especifico.'
            );
            $saleReturnItemIds = SaleReturnItem::whereSaleReturnId($id)->pluck('id')->toArray();
            $saleReturnItemOldIds = [];

            $requestedQtyByProduct = $this->buildRequestedReturnMap($input['sale_return_items']);
            if (empty($requestedQtyByProduct)) {
                throw new UnprocessableEntityHttpException('Please Enter Atleast One Quantity.');
            }
            $this->assertRequestedQtyWithinLimit($saleId, $requestedQtyByProduct, (int) $saleReturn->id);

            foreach ($input['sale_return_items'] as $saleReturnItem) {
                $qty = (float) ($saleReturnItem['quantity'] ?? 0);
                $saleReturnItemId = $saleReturnItem['sale_return_item_id'] ?? null;
                if ($qty <= 0) {
                    continue;
                }

                $saleReturnItemArray = Arr::only($saleReturnItem, [
                    'sale_return_item_id', 'product_id', 'product_price', 'net_unit_price', 'tax_type', 'tax_value',
                    'tax_amount', 'discount_type', 'discount_value', 'discount_amount', 'sale_unit', 'quantity',
                    'sub_total',
                ]);

                if (empty($saleReturnItemId)) {
                    $calculated = $this->calculationSaleReturnItems($saleReturnItemArray);
                    $createPayload = Arr::only($calculated, [
                        'product_id', 'product_price', 'net_unit_price', 'tax_type', 'tax_value', 'tax_amount',
                        'discount_type', 'discount_value', 'discount_amount', 'sale_unit', 'quantity', 'sub_total',
                    ]);
                    $saleReturn->saleReturnItems()->create($createPayload);
                    $this->increaseWarehouseStock((int) $input['warehouse_id'], (int) $saleReturnItemArray['product_id'], (float) $saleReturnItemArray['quantity']);
                    continue;
                }

                $saleReturnItemOldIds[] = $saleReturnItemId;
                $this->updateItem($saleReturnItemArray, $input['warehouse_id']);
            }
            $removeItemIds = array_diff($saleReturnItemIds, $saleReturnItemOldIds);
            //delete remove product
            if (! empty(array_values($removeItemIds))) {
                foreach ($removeItemIds as $removeItemId) {
                    // remove quantity manage storage
                    $oldProduct = SaleReturnItem::whereId($removeItemId)->first();
                    $productQuantity = ManageStock::whereWarehouseId($input['warehouse_id'])->whereProductId($oldProduct->product_id)->first();
                    if ($productQuantity && $oldProduct) {
                        if ($oldProduct->quantity <= $productQuantity->quantity) {
                            $this->decreaseWarehouseStock((int) $input['warehouse_id'], (int) $oldProduct->product_id, (float) $oldProduct->quantity);
                        }
                    } else {
                        throw new UnprocessableEntityHttpException('Quantity must be less than Available quantity.');
                    }
                }
                SaleReturnItem::whereIn('id', array_values($removeItemIds))->delete();
            }

            $saleReturn = $this->updateSaleReturnCalculation($input, $id);
            $this->reconcileSaleFinancialSummary($saleId);
            DB::commit();

            return $saleReturn;
        } catch (Exception $e) {
            DB::rollBack();
            throw new UnprocessableEntityHttpException($e->getMessage());
        }
    }

    public function updateItem($saleReturnItem, $warehouseId): bool
    {
        try {
            $saleReturnItem = $this->calculationSaleReturnItems($saleReturnItem);
            $oldItem = SaleReturnItem::whereId($saleReturnItem['sale_return_item_id'])->first();
            if (! $oldItem) {
                throw new UnprocessableEntityHttpException('Sale return item not found.');
            }

            $newProductId = (int) $saleReturnItem['product_id'];
            $oldProductId = (int) $oldItem->product_id;
            $newQty = (float) $saleReturnItem['quantity'];
            $oldQty = (float) $oldItem->quantity;

            if ($newProductId !== $oldProductId) {
                $this->decreaseWarehouseStock((int) $warehouseId, $oldProductId, $oldQty);
                $this->increaseWarehouseStock((int) $warehouseId, $newProductId, $newQty);
            } elseif ($oldQty != $newQty) {
                $qtyDelta = $newQty - $oldQty;
                if ($qtyDelta > 0) {
                    $this->increaseWarehouseStock((int) $warehouseId, $newProductId, $qtyDelta);
                } else {
                    $this->decreaseWarehouseStock((int) $warehouseId, $newProductId, abs($qtyDelta));
                }
            }

            unset($saleReturnItem['sale_return_item_id']);
            $oldItem->update($saleReturnItem);

            return true;
        } catch (Exception $e) {
            throw new UnprocessableEntityHttpException($e->getMessage());
        }
    }

    /**
     * @return mixed
     */
    public function updateSaleReturnCalculation($input, $id)
    {
        $saleReturn = SaleReturn::findOrFail($id);
        $subTotalAmount = $saleReturn->saleReturnItems()->sum('sub_total');

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

        $saleReturnInputArray = Arr::only($input, [
            'customer_id', 'warehouse_id', 'tax_rate', 'tax_amount', 'discount', 'shipping', 'grand_total',
            'received_amount', 'paid_amount', 'payment_type', 'note', 'date', 'status', 'payment_status',
        ]);
        $saleReturn->update($saleReturnInputArray);

        return $saleReturn;
    }

    private function buildRequestedReturnMap(array $returnItems): array
    {
        $requestedQtyByProduct = [];
        foreach ($returnItems as $item) {
            $productId = (int) ($item['product_id'] ?? 0);
            $qty = (float) ($item['quantity'] ?? 0);
            if ($productId <= 0 || $qty <= 0) {
                continue;
            }
            $requestedQtyByProduct[$productId] = ($requestedQtyByProduct[$productId] ?? 0) + $qty;
        }

        return $requestedQtyByProduct;
    }

    private function assertRequestedQtyWithinLimit(int $saleId, array $requestedQtyByProduct, ?int $excludeSaleReturnId = null): void
    {
        foreach ($requestedQtyByProduct as $productId => $requestedQty) {
            $soldQty = (float) SaleItem::where('sale_id', $saleId)->where('product_id', $productId)->sum('quantity');
            if ($soldQty <= 0) {
                throw new UnprocessableEntityHttpException('You can not return given product as there is no sales for it.');
            }

            $returnedQtyQuery = SaleReturnItem::where('product_id', $productId)
                ->whereHas('saleReturn', function (Builder $query) use ($saleId, $excludeSaleReturnId) {
                    $query->where('sale_id', $saleId);
                    if (! empty($excludeSaleReturnId)) {
                        $query->where('id', '!=', $excludeSaleReturnId);
                    }
                });
            $returnedQty = (float) $returnedQtyQuery->sum('quantity');
            $remainingQty = $soldQty - $returnedQty;

            if ($remainingQty <= 0 || $requestedQty > $remainingQty) {
                throw new UnprocessableEntityHttpException('Remaining sales to return is '.$remainingQty.' and you are returning '.$requestedQty);
            }
        }
    }

    public function increaseWarehouseStock(int $warehouseId, int $productId, float $qty): void
    {
        if ($qty <= 0) {
            return;
        }

        $stock = ManageStock::whereWarehouseId($warehouseId)->whereProductId($productId)->first();
        if ($stock) {
            $stock->update(['quantity' => (float) $stock->quantity + $qty]);

            return;
        }

        ManageStock::create([
            'warehouse_id' => $warehouseId,
            'product_id' => $productId,
            'quantity' => $qty,
        ]);
    }

    public function decreaseWarehouseStock(int $warehouseId, int $productId, float $qty): void
    {
        if ($qty <= 0) {
            return;
        }

        $stock = ManageStock::whereWarehouseId($warehouseId)->whereProductId($productId)->first();
        if (! $stock || (float) $stock->quantity < $qty) {
            throw new UnprocessableEntityHttpException('Quantity must be less than Available quantity.');
        }

        $stock->update(['quantity' => (float) $stock->quantity - $qty]);
    }

    public function revertSaleReturnStock(SaleReturn $saleReturn): void
    {
        foreach ($saleReturn->saleReturnItems as $saleReturnItem) {
            $qty = (float) $saleReturnItem->quantity;
            if ($qty <= 0) {
                continue;
            }
            $this->decreaseWarehouseStock(
                (int) $saleReturn->warehouse_id,
                (int) $saleReturnItem->product_id,
                $qty
            );
        }
    }

    public function reconcileSaleFinancialSummary(int $saleId): void
    {
        $sale = Sale::whereId($saleId)->first();
        if (! $sale) {
            return;
        }

        $totalReturned = (float) SaleReturn::where('sale_id', $saleId)->sum('grand_total');
        $collectedPayments = (float) SalesPayment::whereSaleId($saleId)->sum('amount');
        $netSaleAmount = max((float) $sale->grand_total - $totalReturned, 0);
        $retainedAmount = min($collectedPayments, $netSaleAmount);

        if ($netSaleAmount == 0) {
            $paymentStatus = Sale::PAID;
        } elseif ($retainedAmount <= 0) {
            $paymentStatus = Sale::UNPAID;
        } elseif ($retainedAmount < $netSaleAmount) {
            $paymentStatus = Sale::PARTIAL_PAID;
        } else {
            $paymentStatus = Sale::PAID;
        }

        $sale->update([
            'is_return' => SaleReturn::where('sale_id', $saleId)->exists() ? 1 : 0,
            'paid_amount' => $retainedAmount,
            'payment_status' => $paymentStatus,
        ]);
    }

    private function hasCreditInventoryReturnFlow(): bool
    {
        return Schema::hasTable('credit_items') && Schema::hasTable('credit_item_returns');
    }

    private function assertNoTrackedBatchProducts(array $productIds, string $message): void
    {
        if (! app(ProductBatchService::class)->batchTablesExist()) {
            return;
        }

        app(ProductBatchService::class)->assertTrackedProductsNotPresent($productIds, $message);
    }
}
