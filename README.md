# APLIKACIJA ZA EVIDENCIJU PRISUSTVA ZAPOSLENIH

 Aplikacija ima tri korisničke uloge: 
1.	Gost – korisnik koji nije ulogovan
2.	Zaposleni – korisnik koji je ulogovan, pripada određenoj katedri
3.	Administrator

Za svaku od uloga su dostupne različite funkcionalnosti. Za korisnika koji nema nalog (gost) je dostupan pregled početne stranice na kojoj se nalaze detalji o samoj aplikaciji. Ovi korisnici takođe imaju mogućnost kreiranja naloga, procesom registracije ili prijave na sistem (ukoliko imaju nalog). 

Za korisnike koji su ulogovani na sistem, a imaju ulogu zaposlenog, nakon same prijave se otvara stranica koja predstavlja njihov lični kalendar. Na tom kalendaru se nalaze razni tipovi događaja: javni, privatni, događaji na nivou katedre. Na ovoj stranici korisnik može da obriše, izmeni ili doda novi događaj, kao i da ih filtrira po tipu događaja. Kako bi se korisnici lakše snalazili obezbeđen je prikaz 7 dana počevši od trenutnog datuma, a ukoliko korisnici žele da vide prethodnu ili sledeću nedelju to mogu učiniti klikom na odgovrajuće dugme. Korisnicima je na ovoj stranici takođe obezbeđeno eksportovanje događaja u .ics fajl, kao i evidentiranje prisustva na događajima koji su tipa Nastava. 

Kako bi korisnici što efikasnije organizovali svoje događaje, obezbeđen je i godišnji kaledar u koji su upisani verski praznici, kako bi zaposleni mogli da znaju koji dani su neradni. 

Kada se u aplikaciju prijavi korisnik koji je administrator, njemu treba omogućiti dodatno uvid u sve katedre koje postoje u bazi podataka, kao i njihovu pretragu i sortiranje. Takođe administratori imaju mogućnost upravljanja nad zaposlenima, pa tako je potrebno obezbediti i tabelarni prikaz zaposlenih, pretraga zaposlenih kao i mogućnost brisanja zaposlenih iz baze podataka. 
Kako bi iskustvo administratora bilo upotpunjeno, potrebno je kreirati i stranicu na kojoj će admin moći da vidi statistike upotrebe same aplikacije.

# UPUTSTVO ZA POKRETANJE

    cd laravelprojekat
    php artisan serve

    cd reactaplikacija
    npm start
