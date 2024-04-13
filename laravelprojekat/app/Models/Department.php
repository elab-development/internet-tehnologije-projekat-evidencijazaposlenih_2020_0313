<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'description', 'address', 'contact_phone', 'contact_email', 'head_of_department', 'number_of_employees', 'budget', 'founding_year', 'facilities',
    ];
    /*description: Opis katedre.
        address: Adresa katedre.
        contact_phone: Telefon katedre.
        contact_email: Email adresa katedre.
        head_of_department: Šef katedre.
        number_of_employees: Broj zaposlenih u katedri.
        budget: Budžet katedre.
        founding_year: Godina osnivanja katedre.
        facilities: Informacije o prostorijama ili laboratorijama koje poseduje katedra. */

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function events()
    {
        return $this->hasMany(Event::class);
    }
}
