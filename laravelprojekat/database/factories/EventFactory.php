<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $startDateTime = $this->faker->dateTimeBetween('now', '+1 month');
        $endDateTime = Carbon::parse($startDateTime)->addHours(mt_rand(1, 6));

        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'start_datetime' => $startDateTime,
            'end_datetime' => $endDateTime,
            'event_type_id' => mt_rand(1, 6),  
            'user_id' => mt_rand(1, 10),  
        ];
    }
}
