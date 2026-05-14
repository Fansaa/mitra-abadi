<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InventoryLog extends Model
{
    protected $fillable = [
        'inventory_id',
        'admin_id',
        'type',
        'qty_roll',
        'qty_meter',
        'notes',
    ];

    public function inventory()
    {
        return $this->belongsTo(Inventory::class);
    }

    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_id');
    }
}
