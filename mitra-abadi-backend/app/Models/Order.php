<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'order_code',
        'admin_id',
        'customer_name',
        'customer_phone',
        'customer_email',
        'customer_address',
        'status',
        'notes',
        'total_amount',
    ];

    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_id');
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }
}
