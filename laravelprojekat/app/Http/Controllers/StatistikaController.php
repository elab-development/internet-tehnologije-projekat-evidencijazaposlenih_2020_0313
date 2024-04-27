<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Event;
use App\Models\User;
use Illuminate\Http\Request;

class StatistikaController extends Controller
{
    public function statistics()
    {
        // Broj korisnika po svakom departmanu
        $usersPerDepartment = Department::withCount('users')->get();
    
        // Broj departmana
        $departmentCount = Department::count();
    
        // Broj zaposlenih korisnika
        $totalEmployees = User::where('admin', 0)->count();
    
        // Broj korisnika koji su administratori
        $totalAdmins = User::where('admin', 1)->count();
    
        // Prosečan broj zaposlenih po departmanu
        $averageEmployeesPerDepartment = $totalEmployees / $departmentCount;
    
        // Broj korisnika koji su trenutno prijavljeni (ovo zavisi od implementacije)
    
        // Broj događaja po tipu događaja
        $eventsPerType = Event::select('event_type_id')->withCount('id')->get();
    
        // Prosečan broj događaja po korisniku
        $averageEventsPerUser = Event::count() / User::count();
    
        // Broj novih korisnika po periodu (npr. mesečno)
        $newUsersPerMonth = User::whereYear('created_at', now()->year)
                                ->whereMonth('created_at', now()->month)
                                ->count();
    
        // Broj zahteva po korisniku (uključujući i odgovore)
        $requestsPerUser = Request::where('status', '!=', 'draft')
                                    ->select('user_id')
                                    ->withCount('id')
                                    ->groupBy('user_id')
                                    ->get();
    
       
    
        return response()->json([
            'users_per_department' => $usersPerDepartment,
            'department_count' => $departmentCount,
            'total_employees' => $totalEmployees,
            'total_admins' => $totalAdmins,
            'average_employees_per_department' => $averageEmployeesPerDepartment,
            'events_per_type' => $eventsPerType,
            'average_events_per_user' => $averageEventsPerUser,
            'new_users_per_month' => $newUsersPerMonth,
            'requests_per_user' => $requestsPerUser,
           
        ]);
    }
    
}
