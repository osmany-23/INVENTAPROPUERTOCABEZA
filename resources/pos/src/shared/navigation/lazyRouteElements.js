import { lazy } from "react";
import {
    LazyBaseUnits as BaseUnits,
    LazyBrands as Brands,
    LazyCreateProduct as CreateProduct,
    LazyCredits as Credits,
    LazyDashboard as Dashboard,
    LazyEditProduct as EditProduct,
    LazyProduct as Product,
    LazyProductBatchManager as ProductBatchManager,
    LazyProductCategory as ProductCategory,
    LazyProductDetail as ProductDetail,
    LazyUnits as Units,
    LazyVariation as Variation,
} from "./routePreload";

export const Currencies = lazy(() => import("../../components/currency/Currencies"));
export const Warehouses = lazy(() => import("../../components/warehouse/Warehouses"));
export const CreateWarehouse = lazy(() =>
    import("../../components/warehouse/CreateWarehouse")
);
export const EditWarehouse = lazy(() =>
    import("../../components/warehouse/EditWarehouse")
);
export const Suppliers = lazy(() => import("../../components/supplier/Suppliers"));
export const CreateSupplier = lazy(() =>
    import("../../components/supplier/CreateSupplier")
);
export const EditSupplier = lazy(() =>
    import("../../components/supplier/EditSupplier")
);
export const Customers = lazy(() => import("../../components/customer/Customers"));
export const CreateCustomer = lazy(() =>
    import("../../components/customer/CreateCustomer")
);
export const EditCustomer = lazy(() =>
    import("../../components/customer/EditCustomer")
);
export const User = lazy(() => import("../../components/users/User"));
export const CreateUser = lazy(() => import("../../components/users/CreateUser"));
export const EditUser = lazy(() => import("../../components/users/EditUser"));
export const UserDetail = lazy(() => import("../../components/users/UserDetail"));
export const UpdateProfile = lazy(() =>
    import("../../components/user-profile/UpdateProfile")
);
export const Settings = lazy(() => import("../../components/settings/Settings"));
export const ExpenseCategory = lazy(() =>
    import("../../components/expense-category/ExpenseCategory")
);
export const Expenses = lazy(() => import("../../components/expense/Expenses"));
export const CreateExpense = lazy(() =>
    import("../../components/expense/CreateExpense")
);
export const EditExpense = lazy(() => import("../../components/expense/EditExpense"));
export const Purchases = lazy(() => import("../../components/purchase/Purchases"));
export const CreatePurchase = lazy(() =>
    import("../../components/purchase/CreatePurchase")
);
export const EditPurchase = lazy(() =>
    import("../../components/purchase/EditPurchase")
);
export const PurchaseDetails = lazy(() =>
    import("../../components/purchase/PurchaseDetails")
);
export const PosMainPage = lazy(() =>
    import("../../frontend/components/PosMainPage")
);
export const PrintData = lazy(() =>
    import("../../frontend/components/printModal/PrintData")
);
export const Sales = lazy(() => import("../../components/sales/Sales"));
export const CreateSale = lazy(() => import("../../components/sales/CreateSale"));
export const EditSale = lazy(() => import("../../components/sales/EditSale"));
export const SaleReturn = lazy(() =>
    import("../../components/saleReturn/SaleReturn")
);
export const CreateSaleReturn = lazy(() =>
    import("../../components/saleReturn/CreateSaleReturn")
);
export const EditSaleReturn = lazy(() =>
    import("../../components/saleReturn/EditSaleReturn")
);
export const SaleReturnDetails = lazy(() =>
    import("../../components/saleReturn/SaleReturnDetails")
);
export const SaleDetails = lazy(() => import("../../components/sales/SaleDetails"));
export const PurchaseReturn = lazy(() =>
    import("../../components/purchaseReturn/PurchaseReturn")
);
export const CreatePurchaseReturn = lazy(() =>
    import("../../components/purchaseReturn/CreatePurchaseReturn")
);
export const EditPurchaseReturn = lazy(() =>
    import("../../components/purchaseReturn/EditPurchaseReturn")
);
export const PurchaseReturnDetails = lazy(() =>
    import("../../components/purchaseReturn/PurchaseReturnDetails")
);
export const WarehouseReport = lazy(() =>
    import("../../components/report/warehouseReport/WarehouseReport")
);
export const SaleReport = lazy(() =>
    import("../../components/report/saleReport/SaleReport")
);
export const StockReport = lazy(() =>
    import("../../components/report/stockReport/StockReport")
);
export const StockDetails = lazy(() =>
    import("../../components/report/stockReport/StockDetails")
);
export const TopSellingProductsReport = lazy(() =>
    import("../../components/report/topSellingReport/TopSellingProductsReport")
);
export const PurchaseReport = lazy(() =>
    import("../../components/report/purchaseReport/PurchaseReport")
);
export const PrintBarcode = lazy(() =>
    import("../../components/printBarcode/PrintBarcode")
);
export const Role = lazy(() => import("../../components/roles/Role"));
export const CreateRole = lazy(() => import("../../components/roles/CreateRole"));
export const EditRole = lazy(() => import("../../components/roles/EditRole"));
export const Adjustments = lazy(() =>
    import("../../components/adjustments/Adjustments")
);
export const CreateAdjustment = lazy(() =>
    import("../../components/adjustments/CreateAdjustment")
);
export const EditAdjustMent = lazy(() =>
    import("../../components/adjustments/EditAdjustMent")
);
export const WarehouseDetail = lazy(() =>
    import("../../components/warehouse/WarehouseDetail")
);
export const ProductQuantityReport = lazy(() =>
    import("../../components/report/productQuantityReport/ProductQuantityReport")
);
export const BatchExpiryReport = lazy(() =>
    import("../../components/report/batchExpiryReport/BatchExpiryReport")
);
export const Transfers = lazy(() => import("../../components/transfers/Transfers"));
export const EditTransfer = lazy(() =>
    import("../../components/transfers/EditTransfer")
);
export const CreateTransfer = lazy(() =>
    import("../../components/transfers/CreateTransfer")
);
export const Prefixes = lazy(() => import("../../components/settings/Prefixes"));
export const SuppliersReport = lazy(() =>
    import("../../components/report/supplier-report/SuppliersReport")
);
export const SupplierReportDetails = lazy(() =>
    import("../../components/report/supplier-report/SupplierReportDetails")
);
export const EmailTemplates = lazy(() =>
    import("../../components/Email-templates/EmailTemplates")
);
export const EditEmailTemplate = lazy(() =>
    import("../../components/Email-templates/EditEmailTemplate")
);
export const Quotations = lazy(() =>
    import("../../components/quotations/Quotations")
);
export const CreateQuotation = lazy(() =>
    import("../../components/quotations/CreateQuotation")
);
export const EditQuotation = lazy(() =>
    import("../../components/quotations/EditQuotation")
);
export const CreateQuotationSale = lazy(() =>
    import("../../components/quotations/CreateQuotationSale")
);
export const QuotationDetails = lazy(() =>
    import("../../components/quotations/QuotationDetails")
);
export const MailSettings = lazy(() =>
    import("../../components/settings/MailSettings")
);
export const SmsTemplates = lazy(() =>
    import("../../components/sms-templates/SmsTemplates")
);
export const EditSmsTemplate = lazy(() =>
    import("../../components/sms-templates/EditSmsTemplate")
);
export const BestCustomerReport = lazy(() =>
    import("../../components/report/best-customerReport/BestCustomerReport")
);
export const ProfitLossReport = lazy(() =>
    import("../../components/report/ProfitLossReport/ProfitLossReport")
);
export const CustomerReportDetails = lazy(() =>
    import("../../components/report/customer-report/CustomerReportDetails")
);
export const CustomersReport = lazy(() =>
    import("../../components/report/customer-report/CustomersReport")
);
export const SmsApi = lazy(() => import("../../components/sms-api/SmsApi"));
export const EditSaleReturnFromSale = lazy(() =>
    import("../../components/saleReturn/EditSaleReturnFromSale")
);
export const Language = lazy(() => import("../../components/languages/Language"));
export const EditLanguageData = lazy(() =>
    import("../../components/languages/EditLanguageData")
);
export const RegisterReport = lazy(() =>
    import("../../components/report/registerReport/RegisterReport")
);
export const ReceiptSettings = lazy(() =>
    import("../../components/settings/ReceiptSettings")
);

export {
    BaseUnits,
    Brands,
    CreateProduct,
    Credits,
    Dashboard,
    EditProduct,
    Product,
    ProductBatchManager,
    ProductCategory,
    ProductDetail,
    Units,
    Variation,
};
