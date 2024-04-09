<?php

namespace App\Http\Controllers;

use App\Mail\EventCreatedMail;
use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class EventController extends Controller
{
    public function index()
    {
        // Dobij trenutno ulogovanog korisnika
        $user = Auth::user();
    
        // Identifikacija tipova događaja na nivou katedre
        $departmentEventTypes = ['Ispit', 'Sastanak', 'Nastava', 'Ostalo'];
    
        // Dobijanje događaja na nivou katedre kreiranih od strane drugih korisnika u istoj katedri
        $departmentEvents = Event::whereIn('event_type_id', function ($query) use ($departmentEventTypes) {
            $query->select('id')->from('event_types')->whereIn('name', $departmentEventTypes);
        })->whereHas('user', function ($query) use ($user) {
            $query->where('department_id', $user->department_id)->where('id', '!=', $user->id);
        })->get();
    
        // Dobijanje događaja kreiranih od strane trenutno ulogovanog korisnika
        $userEvents = Event::where('user_id', $user->id)->get();
    
        // Spajanje kolekcija događaja
        $events = $userEvents->merge($departmentEvents);
    
        return response()->json(['events' => $events]);
    }
    

    public function show($id)
    {
        $event = Event::findOrFail($id);

        return response()->json(['event' => $event]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'description' => 'required|string',
            'start_datetime' => 'required|date',
            'end_datetime' => 'required|date|after:start_datetime',
            'event_type_id' => 'required|exists:event_types,id',
        ]);

        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->toArray());
        }

        $user_id = Auth::id(); // Dobij ID trenutno ulogovanog korisnika

        $event = Event::create(array_merge($request->all(), ['user_id' => $user_id]));
        $this->posaljiObavestenje($event);  //salje email sa obavestenjem svih ucesnika u dogadjajima
        return response()->json(['event' => $event], 201);
    }

    public function update(Request $request, $id)
    {
        $event = Event::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'description' => 'required|string',
            'start_datetime' => 'required|date',
            'end_datetime' => 'required|date|after:start_datetime',
            'event_type_id' => 'required|exists:event_types,id',
        ]);

        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->toArray());
        }

        $user_id = Auth::id(); // Dobij ID trenutno ulogovanog korisnika

        $event->update(array_merge($request->all(), ['user_id' => $user_id]));

        return response()->json(['event' => $event]);
    }

    public function destroy($id)
    {
        $event = Event::findOrFail($id);
        $event->delete();

        return response()->json(['message' => 'Event deleted successfully']);
    }

    /*ICS (iCalendar) je format datoteka koji se koristi za razmenu informacija o kalendarima između različitih 
    aplikacija i platformi. Glavna svrha ICS formata je omogućiti jednostavnu razmenu informacija o događajima, 
    poput datuma, vremena, lokacije i drugih detalja, između različitih kalendar aplikacija i uređaja. */
    public function exportToICS()
    {
        // Dobij trenutno ulogovanog korisnika
        $user = Auth::user();

        // Identifikacija tipova događaja na nivou katedre
        $departmentEventTypes = ['Ispit', 'Sastanak', 'Nastava', 'Ostalo'];

        // Dobijanje događaja na nivou katedre kreiranih od strane drugih korisnika u istoj katedri
        $departmentEvents = Event::whereIn('event_type_id', function ($query) use ($departmentEventTypes) {
            $query->select('id')->from('event_types')->whereIn('name', $departmentEventTypes);
        })->whereHas('user', function ($query) use ($user) {
            $query->where('department_id', $user->department_id)->where('id', '!=', $user->id);
        })->get();

        // Dobijanje događaja kreiranih od strane trenutno ulogovanog korisnika
        $userEvents = Event::where('user_id', $user->id)->get();

        // Spajanje kolekcija događaja
        $events = $userEvents->merge($departmentEvents);

        // Kreiramo prazan string za sadržaj .ics fajla
        $icsContent = "BEGIN:VCALENDAR\r\n";
        $icsContent .= "VERSION:2.0\r\n";
        $icsContent .= "PRODID:-//hacksw/handcal//NONSGML v1.0//EN\r\n";

        foreach ($events as $event) {
            // Formatiramo datume u format koji se koristi u .ics fajlu (ISO 8601)
            $startDateTime = Carbon::parse($event->start_datetime)->toIso8601String();
            $endDateTime = Carbon::parse($event->end_datetime)->toIso8601String();

            // Kreiramo UID za svaki događaj koristeći UUID
            $eventUid = Str::uuid()->toString();

            // Kreiramo linije za svaki događaj u .ics formatu
            $icsContent .= "BEGIN:VEVENT\r\n";
            $icsContent .= "UID:{$eventUid}\r\n";
            $icsContent .= "DTSTAMP:{$startDateTime}\r\n";
            $icsContent .= "DTSTART:{$startDateTime}\r\n";
            $icsContent .= "DTEND:{$endDateTime}\r\n";
            $icsContent .= "SUMMARY:{$event->title}\r\n";
            $icsContent .= "DESCRIPTION:{$event->description}\r\n";
            $icsContent .= "END:VEVENT\r\n";
        }

        // Završavamo .ics fajl
        $icsContent .= "END:VCALENDAR";

        // Postavljamo HTTP zaglavlje za preuzimanje .ics fajla
        return response($icsContent)
            ->header('Content-Type', 'text/calendar')
            ->header('Content-Disposition', 'attachment; filename="events.ics"');
    }


    public function posaljiObavestenje($event)
    {
        // Dobijanje trenutno ulogovanog korisnika
        $user = Auth::user();

        // Slanje mejla korisniku koji je kreirao događaj
        Mail::to($user->email)->send(new EventCreatedMail($event));

        // Provera da li je događaj na nivou katedre
        $eventTypes = ['Ispit', 'Sastanak', 'Nastava', 'Ostalo'];
        if(in_array($event->eventType->name, $eventTypes)){
            // Dobijanje svih korisnika iste katedre
            $departmentUsers = User::where('department_id', $user->department_id)->where('id', '!=', $user->id)->get();

            // Slanje mejla svim korisnicima katedre
            foreach($departmentUsers as $departmentUser){
                Mail::to($departmentUser->email)->send(new EventCreatedMail($event));
            }
        }
    }
}
