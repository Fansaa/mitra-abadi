<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    protected $fillable = [
        'product_variant_id',
        'stock_roll',
        'stock_meter',
        'stock_yard',
        'low_stock_threshold',
        'last_updated_by',
    ];

    public function productVariant()
    {
        return $this->belongsTo(ProductVariant::class);
    }

    public function lastUpdatedBy()
    {
        return $this->belongsTo(User::class, 'last_updated_by');
    }

    public function logs()
    {
        return $this->hasMany(InventoryLog::class);
    }
}
