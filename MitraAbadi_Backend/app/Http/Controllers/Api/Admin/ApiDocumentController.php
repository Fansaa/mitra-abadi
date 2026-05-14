<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Barryvdh\DomPDF\Facade\Pdf;

class ApiDocumentController extends Controller
{
    public function invoice(int $orderId)
    {
        $order = Order::with(['items.productVariant.product'])->findOrFail($orderId);

        $pdf = Pdf::loadView('pdf.invoice', ['order' => $order]);

        return $pdf->download('invoice_' . $order->order_code . '.pdf');
    }

    public function packingList(int $orderId)
    {
        $order = Order::with(['items.productVariant.product'])->findOrFail($orderId);

        $pdf = Pdf::loadView('pdf.packing-list', ['order' => $order]);

        return $pdf->download('packing_list_' . $order->order_code . '.pdf');
    }
}
