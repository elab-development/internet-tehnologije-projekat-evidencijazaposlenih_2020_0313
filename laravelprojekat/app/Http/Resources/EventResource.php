<?php

namespace App\Http\Resources;

use App\Models\EventType;
use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'start_datetime' => $this->start_datetime,
            'end_datetime' => $this->end_datetime,
            'event_type' => new EventTypeResource(EventType::find($this->event_type_id)),
            'user' => new UserResource(User::find($this->user_id)),
           
        ];
    }
}
