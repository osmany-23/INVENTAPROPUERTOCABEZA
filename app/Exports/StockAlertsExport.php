<?php

namespace App\Exports;

use App\Models\ManageStock;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Cell\DataType;
use Illuminate\Support\Collection;

class StockAlertsExport implements FromCollection, WithHeadings, WithEvents
{
    protected $warehouse;
    protected $quantity;

    public function __construct($warehouse = null, $quantity = null)
    {
        $this->warehouse = $warehouse;
        $this->quantity = $quantity;
    }

    public function collection()
    {
        $query = ManageStock::with(['product', 'warehouse'])->where('alert', true);

        if ($this->warehouse && $this->warehouse !== 'null') {
            $query->where('warehouse_id', $this->warehouse);
        }

        if ($this->quantity !== null && $this->quantity !== '') {
            $query->where('quantity', $this->quantity);
        }

        $items = $query->get();

        $rows = $items->map(function ($item) {
            // Determine stock actual: prefer ManageStock->quantity, fallback to product->stock->quantity if present
            $stockActual = null;
            if (isset($item->quantity)) {
                $stockActual = $item->quantity;
            } elseif (isset($item->product) && isset($item->product->stock) && isset($item->product->stock->quantity)) {
                $stockActual = $item->product->stock->quantity;
            } else {
                $stockActual = 0;
            }

            // Ensure numeric (keep decimals)
            if (is_numeric($stockActual)) {
                $stockActual = $stockActual + 0; // cast to number
            }

            return [
                $item->product->code ?? '',
                $item->product->name ?? '',
                $item->warehouse->name ?? '',
                $stockActual,
                $item->product->stock_alert ?? '',
            ];
        });

        // store rows for AfterSheet event to set explicit cell types
        $this->exportRows = $rows->toArray();

        return new Collection($this->exportRows);
    }

    public function headings(): array
    {
        return ['Código', 'Producto', 'Depósito', 'Stock actual', 'Cantidad de alerta'];
    }

    /**
     * Register events to ensure numeric 0 is written explicitly as numeric cell.
     */
    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                $sheet = $event->sheet->getDelegate();
                // start at row 2 (headers at row 1)
                if (empty($this->exportRows) || !is_array($this->exportRows)) {
                    return;
                }
                $rowIndex = 2;
                foreach ($this->exportRows as $row) {
                    // column D is index 3 (0-based in our array)
                    $stockValue = isset($row[3]) ? $row[3] : null;

                    // If stock value is numeric (including 0), write explicitly as numeric
                    if ($stockValue !== null && $stockValue !== '') {
                        if (is_numeric($stockValue)) {
                            $sheet->setCellValueExplicit('D' . $rowIndex, $stockValue, DataType::TYPE_NUMERIC);
                        } else {
                            // non-numeric, write as string
                            $sheet->setCellValueExplicit('D' . $rowIndex, $stockValue, DataType::TYPE_STRING);
                        }
                    } else {
                        // leave cell empty
                        $sheet->setCellValue('D' . $rowIndex, '');
                    }

                    $rowIndex++;
                }
            },
        ];
    }
}
