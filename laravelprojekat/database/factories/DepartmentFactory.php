<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Department>
 */
class DepartmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => $this->faker->word,
            'description' => $this->faker->paragraph,
            'address' => $this->faker->address,
            'contact_phone' => $this->faker->phoneNumber,
            'contact_email' => $this->faker->unique()->safeEmail,
            'head_of_department' => $this->faker->name,
            'number_of_employees' => $this->faker->numberBetween(5, 50),
            'budget' => $this->faker->numberBetween(10000, 500000),
            'founding_year' => $this->faker->numberBetween(1970, 2022),
            'facilities' => $this->faker->word,
        ];
    }
}
