<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Document;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Barryvdh\DomPDF\Facade\Pdf;
use Inertia\Inertia;

class DocumentController extends Controller
{
    /**
     * Menampilkan daftar dokumen yang pernah di-generate.
     */
    public function index(Request $request)
    {
        $documents = Document::with(['order', 'generatedBy'])
            ->when($request->type, function ($query, $type) {
                $query->where('type', $type);
            })
            ->latest('generated_at')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Documents/Index', [
            'documents' => $documents,
            'filters' => $request->only(['type']),
        ]);
    }

    /**
     * Generate Invoice PDF berbahasa Indonesia untuk pesanan tertentu.
     */
    public function generateInvoice(Order $order)
    {
        $order->load(['items.productVariant.product', 'admin']);

        $pdf = Pdf::loadView('pdf.invoice', [
            'order' => $order,
        ]);

        $filename = 'invoice_' . $order->order_code . '_' . now()->format('Ymd') . '.pdf';
        $path = 'documents/invoices/' . $filename;

        // Simpan file PDF ke storage
        \Storage::disk('public')->put($path, $pdf->output());

        // Catat rekaman dokumen di database
        Document::create([
            'order_id' => $order->id,
            'type' => 'invoice',
            'file_path' => $path,
            'generated_by' => Auth::id(),
            'generated_at' => now(),
        ]);

        return $pdf->download($filename);
    }

    /**
     * Generate Packing List PDF berbahasa Indonesia untuk pesanan tertentu.
     */
    public function generatePackingList(Order $order)
    {
        $order->load(['items.productVariant.product', 'admin']);

        $pdf = Pdf::loadView('pdf.packing-list', [
            'order' => $order,
        ]);

        $filename = 'packing_list_' . $order->order_code . '_' . now()->format('Ymd') . '.pdf';
        $path = 'documents/packing-lists/' . $filename;

        \Storage::disk('public')->put($path, $pdf->output());

        Document::create([
            'order_id' => $order->id,
            'type' => 'packing_list',
            'file_path' => $path,
            'generated_by' => Auth::id(),
            'generated_at' => now(),
        ]);

        return $pdf->download($filename);
    }
}
