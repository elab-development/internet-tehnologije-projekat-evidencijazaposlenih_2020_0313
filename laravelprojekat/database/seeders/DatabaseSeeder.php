<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Department;
use App\Models\Event;
use App\Models\EventType;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        // Seed event types
        $eventTypes = ['Javni', 'Privatni', 'Ispit', 'Sastanak', 'Nastava', 'Ostalo'];
        foreach ($eventTypes as $eventType) {
            EventType::factory()->create(['name' => $eventType]);
        }


        // Seed departments
        Department::factory()->count(10)->create()->each(function ($department) {
            // Seed users for each department
            User::factory()->count(5)->create(['department_id' => $department->id])->each(function ($user) {
                // Seed events for each user
                Event::factory()->count(5)->create(['user_id' => $user->id]);
            });
        });
        User::factory()->create([
            'firstName' => 'Nina',
            'lastName' => 'Maricic',
            'email' => 'nm20190015@student.fon.bg.ac.rs',
            'admin'=>1
        ]);

        User::factory()->create([
            'firstName' => 'Sofija',
            'lastName' => 'Kotur',
            'email' => 'sk20200313@student.fon.bg.ac.rs',
        ]);
       
    }
}
