import React from 'react';
import { Link } from 'react-router-dom';
import { RiCalendar2Line, RiAddCircleLine, RiFileList2Line, RiBarChart2Line } from 'react-icons/ri';
import './HomePage.css';  

function HomePage() {
  return (
    <div className="home-page">
      <header className="header">
        <h1>Dobrodošli na aplikaciju za evidenciju prisustva zaposlenih na nastavi</h1>
        <p>Organizujte svoje događaje na jednostavan način</p>
      </header>
      <main className="main-content">
        <section className="section section-calendar">
          <RiCalendar2Line className="icon" />
          <h2>Kalendar dogadjaja</h2>
          <p>Pogledajte svoje događaje u kalendaru i organizujte svoje vreme.</p>
        </section>
        <section className="section section-events">
          <RiAddCircleLine className="icon" />
          <h2>Dodaj novi dogadjaj</h2>
          <p>Dodajte novi događaj u kalendar i obavestite svoje kolege.</p>
        </section>
        <section className="section section-types">
          <RiFileList2Line className="icon" />
          <h2>Tipovi dogadjaja</h2>
          <p>Pregledajte različite tipove događaja i organizujte ih prema potrebama.</p>
        </section>
        <section className="section section-importance">
          <RiBarChart2Line className="icon" />
          <h2>Zašto je kalendar dogadjaja važan?</h2>
          <p>Organizacija je ključna za uspeh. Kalendar Dogadjaja vam omogućava da efikasno upravljate svojim vremenom, planirate sastanke, događaje i obaveze, i ostanete fokusirani na prioritete.</p>
          <p>Bez obzira da li ste zaposleni, menadžer, student ili preduzetnik, dobar kalendar može da vam olakša život, smanji stres i poveća produktivnost.</p>
        </section>
      </main>
      <footer className="footer">
        <p>&copy; 2024 Kalendar Dogadjaja</p>
      </footer>
    </div>
  );
}

export default HomePage;
