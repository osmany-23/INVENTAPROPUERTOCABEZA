<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\AppBaseController;
use App\Http\Resources\SaleCollection;
use App\Http\Resources\SaleResource;
use App\Models\BaseUnit;
use App\Models\Customer;
use App\Models\Expense;
use App\Models\ManageStock;
use App\Models\Product;
use App\Models\Purchase;
use App\Models\PurchaseReturn;
use App\Models\Sale;
use App\Models\SaleReturn;
use App\Models\SalesPayment;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class DashboardAPIController extends AppBaseController
{
    private const DASHBOARD_CACHE_TTL_SECONDS = 45;

    public function getPurchaseSalesCounts(): JsonResponse
    {
        $today = Carbon::today();
        $data = Cache::remember(
            'dashboard:today-counts:'.$today->toDateString(),
            self::DASHBOARD_CACHE_TTL_SECONDS,
            function () use ($today) {
                return [
                    'today_sales' => (float) Sale::where('date', $today)->sum('grand_total'),
                    'today_purchases' => (float) Purchase::where('date', $today)->sum('grand_total'),
                    'today_sale_return' => (float) SaleReturn::where('date', $today)->sum('grand_total'),
                    'today_purchase_return' => (float) PurchaseReturn::where('date', $today)->sum('grand_total'),
                    'today_sales_received_count' => (float) SalesPayment::where('payment_date', $today)->sum('amount'),
                    'today_expense_count' => (float) Expense::where('date', $today)->sum('amount'),
                ];
            }
        );

        return $this->sendResponse($data, 'Sales Purchase Count Retrieved Successfully');
    }

    public function getAllPurchaseSalesCounts(): JsonResponse
    {
        $data = Cache::remember(
            'dashboard:all-counts',
            self::DASHBOARD_CACHE_TTL_SECONDS,
            function () {
                $allPurchaseReturnCount = (float) PurchaseReturn::sum('grand_total');

                return [
                    'all_sales_count' => (float) Sale::sum('grand_total'),
                    'all_sale_return_count' => (float) SaleReturn::sum('grand_total'),
                    'all_purchase_return_count' => $allPurchaseReturnCount,
                    'all_purchases_count' => (float) Purchase::sum('grand_total') - $allPurchaseReturnCount,
                    'all_sales_received_count' => (float) SalesPayment::sum('amount'),
                    'all_expense_count' => (float) Expense::sum('amount'),
                ];
            }
        );

        return $this->sendResponse($data, 'All Sales Purchase and returns Count Retrieved Successfully');
    }

    public function getRecentSales(): SaleCollection
    {
        $recentSales = Sale::latest()->take(5)->get();
        SaleResource::usingWithCollection();

        return new SaleCollection($recentSales);
    }

    public function getTopSellingProducts(): JsonResponse
    {
        $month = Carbon::now()->month;
        $year = Carbon::now()->year;
        $data = Cache::remember(
            "dashboard:top-selling-products:{$year}:{$month}",
            self::DASHBOARD_CACHE_TTL_SECONDS,
            function () use ($month, $year) {
                $topSellings = Product::leftJoin('sale_items', 'products.id', '=', 'sale_items.product_id')
                    ->whereMonth('sale_items.created_at', $month)
                    ->whereYear('sale_items.created_at', $year)
                    ->selectRaw('products.*, COALESCE(sum(sale_items.sub_total),0) grand_total')
                    ->selectRaw('products.*, COALESCE(sum(sale_items.quantity),0) total_quantity')
                    ->groupBy('products.id')
                    ->orderBy('total_quantity', 'desc')
                    ->latest()
                    ->take(5)
                    ->get();

                $preparedData = [];
                foreach ($topSellings as $topSelling) {
                    $preparedData[] = $topSelling->prepareTopSelling();
                }

                return $preparedData;
            }
        );

        return $this->sendResponse($data, 'Top Selling Products Retrieved Successfully');
    }

    public function getWeekSalePurchases(): JsonResponse
    {
        $todayKey = Carbon::today()->toDateString();
        $data = Cache::remember(
            "dashboard:week-sale-purchases:{$todayKey}",
            self::DASHBOARD_CACHE_TTL_SECONDS,
            function () {
                $count = 7;
                $days = [];
                $date = Carbon::tomorrow();
                for ($i = 0; $i < $count; $i++) {
                    $days[] = $date->subDay()->format('Y-m-d');
                }
                $day['days'] = array_reverse($days);
                $sales = Sale::whereBetween('date', [$day['days'][0], $day['days'][6]])
                    ->orderBy('date', 'desc')
                    ->groupBy('date')
                    ->get([
                        DB::raw('DATE_FORMAT(date,"%Y-%m-%d") as week'),
                        DB::raw('SUM(grand_total) as grand_total'),
                    ])->keyBy('week');
                $period = CarbonPeriod::create($day['days'][0], $day['days'][6]);
                $dates = array_map(function ($datePeriod) {
                    return $datePeriod->format('Y-m-d');
                }, iterator_to_array($period));

                $salesSeries = array_map(function ($datePeriod) use ($sales) {
                    $week = $datePeriod->format('Y-m-d');

                    return $sales->has($week) ? $sales->get($week)->grand_total : 0;
                }, iterator_to_array($period));

                $purchases = Purchase::whereBetween('date', [$day['days'][0], $day['days'][6]])
                    ->orderBy('date', 'desc')
                    ->groupBy('date')
                    ->get([
                        DB::raw('DATE_FORMAT(date,"%Y-%m-%d") as week'),
                        DB::raw('SUM(grand_total) as grand_total'),
                    ])->keyBy('week');
                $purchaseSeries = array_map(function ($datePeriod) use ($purchases) {
                    $week = $datePeriod->format('Y-m-d');

                    return $purchases->has($week) ? $purchases->get($week)->grand_total : 0;
                }, iterator_to_array($period));

                return [
                    'dates' => $dates,
                    'sales' => $salesSeries,
                    'purchases' => $purchaseSeries,
                ];
            }
        );

        return $this->sendResponse($data, 'Week of Sales Purchase Retrieved Successfully');
    }

    public function getYearlyTopSelling(): JsonResponse
    {
        $year = Carbon::now()->year;
        $data = Cache::remember(
            "dashboard:yearly-top-selling:{$year}",
            self::DASHBOARD_CACHE_TTL_SECONDS,
            function () use ($year) {
                $topSellings = Product::leftJoin('sale_items', 'products.id', '=', 'sale_items.product_id')
                    ->whereYear('sale_items.created_at', $year)
                    ->selectRaw('products.*, COALESCE(sum(sale_items.sub_total),0) grand_total')
                    ->selectRaw('products.*, COALESCE(sum(sale_items.quantity),0) total_quantity')
                    ->groupBy('products.id')
                    ->orderBy('total_quantity', 'desc')
                    ->take(5)
                    ->get();
                $preparedData = [
                    'name' => [],
                    'total_quantity' => [],
                ];
                foreach ($topSellings as $topSelling) {
                    $preparedData['name'][] = $topSelling->name;
                    $preparedData['total_quantity'][] = $topSelling->total_quantity;
                }

                return $preparedData;
            }
        );

        return $this->sendResponse($data, 'Yearly TopSelling Products Retrieved Successfully');
    }

    public function getTopCustomer(): JsonResponse
    {
        $month = Carbon::now()->month;
        $year = Carbon::now()->year;
        $data = Cache::remember(
            "dashboard:top-customers:{$year}:{$month}",
            self::DASHBOARD_CACHE_TTL_SECONDS,
            function () use ($month) {
                $topCustomers = Customer::leftJoin('sales', 'customers.id', '=', 'sales.customer_id')
                    ->whereMonth('date', $month)
                    ->select('customers.*', DB::raw('sum(sales.grand_total) as grand_total'))
                    ->groupBy('customers.id')
                    ->orderBy('grand_total', 'desc')
                    ->latest()
                    ->take(5)
                    ->get();
                $preparedData = [
                    'name' => [],
                    'grand_total' => [],
                ];
                foreach ($topCustomers as $topCustomer) {
                    $preparedData['name'][] = $topCustomer->name;
                    $preparedData['grand_total'][] = (float) $topCustomer->grand_total;
                }

                return $preparedData;
            }
        );

        return $this->sendResponse($data, 'Top Customers Retrieved Successfully');
    }

    public function stockAlerts(): JsonResponse
    {
        abort_unless(hasPermissionStrict('view_stock_alerts'), 403);

        $manageStocks = ManageStock::with(['warehouse', 'product'])
            ->where('alert', true)
            ->latest()
            ->get();

        $productUnitNames = BaseUnit::query()
            ->whereIn(
                'id',
                $manageStocks
                    ->pluck('product.product_unit')
                    ->filter()
                    ->unique()
                    ->values()
            )
            ->pluck('name', 'id');

        $productResponse = $manageStocks
            ->map(function (ManageStock $stock) use ($productUnitNames) {
                $product = $stock->product;
                if (! $product) {
                    return null;
                }

                return [
                    'id' => (int) $product->id,
                    'code' => $product->code,
                    'name' => $product->name,
                    'stock_alert' => (float) ($product->stock_alert ?? 0),
                    'product' => [
                        'stock_alert' => (float) ($product->stock_alert ?? 0),
                    ],
                    'stock' => [
                        'id' => (int) $stock->id,
                        'warehouse_id' => (int) $stock->warehouse_id,
                        'quantity' => (float) $stock->quantity,
                        'product_unit_name' => $productUnitNames->get($product->product_unit, ''),
                        'warehouse' => $stock->warehouse ? [
                            'id' => (int) $stock->warehouse->id,
                            'name' => $stock->warehouse->name,
                        ] : null,
                    ],
                ];
            })
            ->filter()
            ->values();

        return $this->sendResponse($productResponse, 'Stocks retrieved successfully');
    }
}
