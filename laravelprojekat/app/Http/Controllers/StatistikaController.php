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
    
      
        // Broj novih korisnika po periodu (npr. mesečno)
        $newUsersPerMonth = User::whereYear('created_at', now()->year)
                                ->whereMonth('created_at', now()->month)
                                ->count();
    
      
       
    
        return response()->json([
            'users_per_department' => $usersPerDepartment,
            'department_count' => $departmentCount,
            'total_employees' => $totalEmployees,
            'total_admins' => $totalAdmins,
            'average_employees_per_department' => $averageEmployeesPerDepartment,
           
            'new_users_per_month' => $newUsersPerMonth,
           
           
        ]);
    }
    
}
