<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Packing List {{ $order->order_code }}</title>
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
            font-size: 24px;
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
            width: 130px;
        }
        .meta-table td:last-child {
            color: #1a1a1a;
            font-weight: 500;
        }
        .customer-box {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 14px 16px;
        }
        .customer-name {
            font-size: 13px;
            font-weight: bold;
            color: #1a1a1a;
            margin-bottom: 4px;
        }
        .customer-detail {
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
            background: #f1f5f9 !important;
            color: #1a1a1a !important;
            font-weight: bold;
            font-size: 11px;
            padding: 10px 12px !important;
            border-top: 2px solid #1a56a0;
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
        .checklist-section {
            margin-bottom: 24px;
        }
        .checklist-title {
            font-size: 9px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #888;
            margin-bottom: 10px;
        }
        .checklist-item {
            font-size: 11px;
            color: #1a1a1a;
            margin-bottom: 8px;
            line-height: 1.5;
        }
        .signature-section {
            display: table;
            width: 100%;
            margin-top: 24px;
        }
        .signature-block {
            display: table-cell;
            width: 50%;
            text-align: center;
            padding: 0 20px;
        }
        .signature-label {
            font-size: 10px;
            font-weight: bold;
            color: #1a1a1a;
            margin-bottom: 60px;
        }
        .signature-line {
            border-top: 1px solid #1a1a1a;
            padding-top: 6px;
            font-size: 10px;
            color: #555;
        }
        .footer {
            border-top: 1px solid #e2e8f0;
            padding-top: 14px;
            text-align: center;
            font-size: 9px;
            color: #aaa;
            margin-top: 24px;
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
                <div class="doc-title">PACKING LIST</div>
                <div class="doc-subtitle">Daftar Barang Pengiriman</div>
            </div>
        </div>
    </div>

    {{-- META SECTION --}}
    <div class="meta-section">
        <div class="meta-left">
            <div class="section-label">Informasi Pesanan</div>
            <table class="meta-table">
                <tr>
                    <td>Nomor Pesanan</td>
                    <td>: <strong>{{ $order->order_code }}</strong></td>
                </tr>
                <tr>
                    <td>Tanggal</td>
                    <td>: {{ \Carbon\Carbon::parse($order->created_at)->format('d/m/Y') }}</td>
                </tr>
            </table>
        </div>
        <div class="meta-right">
            <div class="section-label">Data Pelanggan</div>
            <div class="customer-box">
                <div class="customer-name">{{ $order->customer_name }}</div>
                <div class="customer-detail">
                    @if($order->customer_phone)
                        Telp: {{ $order->customer_phone }}<br>
                    @endif
                    @if($order->customer_address)
                        {{ $order->customer_address }}
                    @endif
                </div>
            </div>
        </div>
    </div>

    {{-- ITEMS TABLE --}}
    <div class="section-label">Daftar Barang</div>
    <table class="items-table">
        <thead>
            <tr>
                <th style="width: 32px;">No</th>
                <th>Nama Produk</th>
                <th>Warna</th>
                <th class="text-center">Qty (Roll)</th>
                <th class="text-center">Qty (Meter)</th>
                <th>Keterangan</th>
            </tr>
        </thead>
        <tbody>
            @php $totalRoll = 0; $totalMeter = 0; @endphp
            @forelse($order->items as $index => $item)
                @php
                    $variant = $item->productVariant;
                    $product = $variant?->product;
                    $productName = $product?->name ?? '-';
                    $colorName = $variant?->color_name ?? '-';
                    $totalRoll += $item->qty_roll ?? 0;
                    $totalMeter += $item->qty_meter ?? 0;
                @endphp
                <tr>
                    <td class="text-center">{{ $index + 1 }}</td>
                    <td>{{ $productName }}</td>
                    <td>{{ $colorName }}</td>
                    <td class="text-center">{{ $item->qty_roll ?? '-' }}</td>
                    <td class="text-center">{{ $item->qty_meter ?? '-' }}</td>
                    <td></td>
                </tr>
            @empty
                <tr>
                    <td colspan="6" style="text-align: center; padding: 20px; color: #888;">
                        Tidak ada item pesanan.
                    </td>
                </tr>
            @endforelse
            <tr class="total-row">
                <td colspan="3" style="text-align: right;">TOTAL</td>
                <td class="text-center">{{ $totalRoll }} Roll</td>
                <td class="text-center">{{ $totalMeter }} Meter</td>
                <td></td>
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

    {{-- CHECKLIST --}}
    <div class="checklist-section">
        <div class="checklist-title">Pemeriksaan Barang</div>
        <div class="checklist-item">&#9633; Barang telah diperiksa oleh gudang</div>
        <div class="checklist-item">&#9633; Barang siap dikirim</div>
    </div>

    {{-- SIGNATURE --}}
    <div class="signature-section">
        <div class="signature-block">
            <div class="signature-label">Disiapkan Oleh</div>
            <div class="signature-line">( _________________________ )</div>
        </div>
        <div class="signature-block">
            <div class="signature-label">Diperiksa Oleh</div>
            <div class="signature-line">( _________________________ )</div>
        </div>
    </div>

    {{-- FOOTER --}}
    <div class="footer">
        Dokumen ini dibuat secara otomatis oleh sistem Mitra Abadi.
    </div>

</body>
</html>
