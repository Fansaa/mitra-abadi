<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice {{ $order->order_code }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'DejaVu Sans', Arial, sans-serif;
            font-size: 12px;
            color: #1a1a1a;
            background: #ffffff;
            padding: 40px;
        }
        .header {
            border-bottom: 3px solid #1a56a0;
            padding-bottom: 20px;
            margin-bottom: 24px;
        }
        .header-top {
            display: table;
            width: 100%;
        }
        .company-info {
            display: table-cell;
            vertical-align: top;
        }
        .doc-title-block {
            display: table-cell;
            vertical-align: top;
            text-align: right;
        }
        .company-name {
            font-size: 24px;
            font-weight: bold;
            color: #1a56a0;
            letter-spacing: 1px;
        }
        .company-tagline {
            font-size: 11px;
            color: #555;
            margin-top: 2px;
        }
        .company-address {
            font-size: 10px;
            color: #666;
            margin-top: 6px;
            line-height: 1.5;
        }
        .doc-title {
            font-size: 28px;
            font-weight: bold;
            color: #1a56a0;
            letter-spacing: 2px;
        }
        .doc-subtitle {
            font-size: 10px;
            color: #888;
            margin-top: 4px;
        }
        .meta-section {
            display: table;
            width: 100%;
            margin-bottom: 24px;
        }
        .meta-left {
            display: table-cell;
            vertical-align: top;
            width: 50%;
        }
        .meta-right {
            display: table-cell;
            vertical-align: top;
            width: 50%;
        }
        .section-label {
            font-size: 9px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #888;
            margin-bottom: 8px;
        }
        .meta-table {
            width: 100%;
            border-collapse: collapse;
        }
        .meta-table td {
            padding: 3px 0;
            font-size: 11px;
        }
        .meta-table td:first-child {
            color: #666;
            width: 110px;
        }
        .meta-table td:last-child {
            color: #1a1a1a;
            font-weight: 500;
        }
        .status-badge {
            display: inline-block;
            padding: 3px 10px;
            border-radius: 12px;
            font-size: 10px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .status-pending { background: #fef3c7; color: #92400e; }
        .status-processing { background: #dbeafe; color: #1e40af; }
        .status-completed { background: #d1fae5; color: #065f46; }
        .status-cancelled { background: #fee2e2; color: #991b1b; }
        .billed-to-box {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 14px 16px;
        }
        .billed-to-name {
            font-size: 13px;
            font-weight: bold;
            color: #1a1a1a;
            margin-bottom: 4px;
        }
        .billed-to-detail {
            font-size: 10px;
            color: #555;
            line-height: 1.6;
        }
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .items-table thead tr {
            background: #1a56a0;
            color: #ffffff;
        }
        .items-table thead th {
            padding: 10px 12px;
            text-align: left;
            font-size: 10px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .items-table thead th.text-right {
            text-align: right;
        }
        .items-table thead th.text-center {
            text-align: center;
        }
        .items-table tbody tr {
            border-bottom: 1px solid #e2e8f0;
        }
        .items-table tbody tr:nth-child(even) {
            background: #f8fafc;
        }
        .items-table tbody td {
            padding: 10px 12px;
            font-size: 11px;
            color: #1a1a1a;
            vertical-align: top;
        }
        .items-table tbody td.text-right {
            text-align: right;
        }
        .items-table tbody td.text-center {
            text-align: center;
        }
        .total-row td {
            background: #1a56a0 !important;
            color: #ffffff !important;
            font-weight: bold;
            font-size: 12px;
            padding: 12px !important;
        }
        .total-row td.text-right {
            text-align: right;
        }
        .notes-box {
            background: #fffbeb;
            border-left: 4px solid #f59e0b;
            border-radius: 4px;
            padding: 12px 16px;
            margin-bottom: 20px;
        }
        .notes-label {
            font-size: 9px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #92400e;
            margin-bottom: 4px;
        }
        .notes-text {
            font-size: 11px;
            color: #78350f;
            line-height: 1.5;
        }
        .footer {
            border-top: 1px solid #e2e8f0;
            padding-top: 14px;
            text-align: center;
            font-size: 9px;
            color: #aaa;
            margin-top: 24px;
        }
        .divider {
            border: none;
            border-top: 1px solid #e2e8f0;
            margin: 20px 0;
        }
    </style>
</head>
<body>

    {{-- HEADER --}}
    <div class="header">
        <div class="header-top">
            <div class="company-info">
                <div class="company-name">MITRA ABADI</div>
                <div class="company-tagline">Distributor Bahan Tekstil Terpercaya</div>
                <div class="company-address">
                    Jl. Tekstil No. 1, Bandung, Jawa Barat 40111<br>
                    Telp: (022) 1234-5678
                </div>
            </div>
            <div class="doc-title-block">
                <div class="doc-title">INVOICE</div>
                <div class="doc-subtitle">Dokumen Tagihan Resmi</div>
            </div>
        </div>
    </div>

    {{-- META SECTION --}}
    <div class="meta-section">
        <div class="meta-left">
            <div class="section-label">Informasi Invoice</div>
            <table class="meta-table">
                <tr>
                    <td>No. Invoice</td>
                    <td>: <strong>{{ $order->order_code }}</strong></td>
                </tr>
                <tr>
                    <td>Tanggal</td>
                    <td>: {{ \Carbon\Carbon::parse($order->created_at)->format('d/m/Y') }}</td>
                </tr>
                <tr>
                    <td>Status</td>
                    <td>:
                        @php
                            $statusMap = [
                                'pending'    => ['label' => 'Menunggu',   'class' => 'status-pending'],
                                'processing' => ['label' => 'Diproses',   'class' => 'status-processing'],
                                'completed'  => ['label' => 'Selesai',    'class' => 'status-completed'],
                                'cancelled'  => ['label' => 'Dibatalkan', 'class' => 'status-cancelled'],
                            ];
                            $statusInfo = $statusMap[$order->status] ?? ['label' => $order->status, 'class' => 'status-pending'];
                        @endphp
                        <span class="status-badge {{ $statusInfo['class'] }}">{{ $statusInfo['label'] }}</span>
                    </td>
                </tr>
            </table>
        </div>
        <div class="meta-right">
            <div class="section-label">Ditagihkan Kepada</div>
            <div class="billed-to-box">
                <div class="billed-to-name">{{ $order->customer_name }}</div>
                <div class="billed-to-detail">
                    @if($order->customer_phone)
                        Telp: {{ $order->customer_phone }}<br>
                    @endif
                    @if($order->customer_email)
                        Email: {{ $order->customer_email }}<br>
                    @endif
                    @if($order->customer_address)
                        {{ $order->customer_address }}
                    @endif
                </div>
            </div>
        </div>
    </div>

    {{-- ITEMS TABLE --}}
    <div class="section-label">Rincian Pesanan</div>
    <table class="items-table">
        <thead>
            <tr>
                <th style="width: 32px;">No</th>
                <th>Nama Produk</th>
                <th>Warna</th>
                <th class="text-center">Qty (Roll)</th>
                <th class="text-center">Qty (Meter)</th>
                <th class="text-right">Harga/Meter</th>
                <th class="text-right">Subtotal</th>
            </tr>
        </thead>
        <tbody>
            @forelse($order->items as $index => $item)
                @php
                    $variant = $item->productVariant;
                    $product = $variant?->product;
                    $productName = $product?->name ?? '-';
                    $colorName = $variant?->color_name ?? '-';
                @endphp
                <tr>
                    <td class="text-center">{{ $index + 1 }}</td>
                    <td>{{ $productName }}</td>
                    <td>{{ $colorName }}</td>
                    <td class="text-center">{{ $item->qty_roll ?? '-' }}</td>
                    <td class="text-center">{{ $item->qty_meter ?? '-' }}</td>
                    <td class="text-right">Rp {{ number_format($item->price_per_meter ?? 0, 0, ',', '.') }}</td>
                    <td class="text-right">Rp {{ number_format($item->subtotal ?? 0, 0, ',', '.') }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="7" style="text-align: center; padding: 20px; color: #888;">
                        Tidak ada item pesanan.
                    </td>
                </tr>
            @endforelse
            <tr class="total-row">
                <td colspan="6" style="text-align: right; padding-right: 16px;">TOTAL AMOUNT</td>
                <td class="text-right">Rp {{ number_format($order->total_amount ?? 0, 0, ',', '.') }}</td>
            </tr>
        </tbody>
    </table>

    {{-- NOTES --}}
    @if($order->notes)
        <div class="notes-box">
            <div class="notes-label">Catatan</div>
            <div class="notes-text">{{ $order->notes }}</div>
        </div>
    @endif

    {{-- FOOTER --}}
    <div class="footer">
        Dokumen ini dibuat secara otomatis oleh sistem Mitra Abadi.
    </div>

</body>
</html>
