<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;
    protected $fillable = [
        'title', 'description', 'start_datetime', 'end_datetime', 'event_type_id', 'user_id',
    ];

    public function user() //pamtimo koji user je kreirao Event
    {
        return $this->belongsTo(User::class,'user_id');
    }

    public function eventType()
    {
        return $this->belongsTo(EventType::class, 'event_type_id');
    }
}
