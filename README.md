# Ohjelmistokehitysprojekti-Makelainen

# Tehtävä:

Tehtävän tarkoitus on luoda kurssinhallintatyökalu. Työkalu on kahdessa osassa. Tietokanta ja Käyttöliittymä. 

## Tietokannassa tulee olemaan:

### Opiskelijat
Opiskelijoilla on viisi arvoa.
- Opiskelija numero
- Etunimi
- Sukunimi
- Syntymäpäivä
- Vuosikurssi

### Opettajat
Opetajilla on neljä arvoa.
- Tunnusluku
- Etunimi
- Sukunimi
- Aine

### Kurssit
Kurssilla on seitsemän arvoa.
- Tunnus
- Nimi
- Kuvaus
- Alkupäivä
- Loppupäivä
- Opettaja
- Tila

### Tilat
Tiloilla on kolme arvoa.
- Tunnus
- Nimi
- Kapasiteetti

### Kurssikirjautuminen
Kurssikirjautumisella on 4 arvoa.
- Tunnus
- Opiskelija
- Kurssi
- Kirjautumisaikamäärä

Voit käyttää tässä tehtävässä XAMPPia tai Kukkulan SQL-palvelinta. Luo uusi kanta, siihen tarvittavat taulut ja niiden välille tarvittavat relaatiot. Luo kaikkiin tauluihin myös ainakin muutama rivi tietoa. Jos haluat, voit generoida testidataa esim. osoitteessa mockaroo.com/ (valitse formaatiksi SQL). Huomaa kuitenkin, että kun luot taulujen relaatiot, niin datan pitää olla yhteensopiva luodun rakenteen kanssa. 

Esimerkiksi jos sinulla on 10 opettajaa, joiden tunnukset ovat 1 - 10, sinulla ei voi olla kurssitaulun opettajakentässä numeroa 11!

## Käyttöliittymä

### Toteuta lisäksi kantaan web-käyttöliittymä, joka täyttää seuraavat speksit:

Opettajia, opiskelijoita, kursseja ja kirjautumisia pitää pystyä lisäämään, poistamaan ja muokkaamaan
Kustakin kurssista on oltava näkymä, jossa näkyy kurssin nimi, kuvaus, alku- ja loppupäivä, vastaavan opettajan nimi, tilan nimi sekä kurssille ilmoittautuneet opiskelijat. Opiskelijoista on näytettävä nimi ja vuosikurssi
Kustakin opiskelijasta on oltava näkymä, jossa näkyy opiskelijan tiedot ja lista kaikista kursseista, joille opiskelija on kirjautunut. Kursseista on näytettävä nimi ja aloituspäivämäärä
Kustakin opettajasta on oltava näkymä, jossa on opettajan nimi, aine sekä kaikki kurssit, joista opettaja vastaa. Kursseista on näytettävä nimi, alku- ja loppupäivä sekä tilan nimi
Kustakin tilasta on oltava näkymä, jossa on tilan nimi ja kapasiteetti sekä kaikki kurssit, jotka pidetään tilassa. Kursseista on näytettävä nimi, vastaava opettaja, alku- ja loppupäivä sekä osallistujien määrä. Jos kurssilla on osallistujia enemmän kuin tilassa on kapasiteettia, rivillä on näytettävä varoituskuvake
Voit käyttää web-käyttöliittymän toteutukseen mitä teknologiaa haluat. Voit palauttaa projektin joko Kukkulan web-serverille tai toteuttaa sen GitHubiin omaan repoonsa. Jos käytät XAMPPia, ota kannasta export, ja lisää se repoon.

Palauta seuraavalle sivulle linkki kurssienhallintaprojektiin: joko GitHubiin projektin repoon tai web-kansioosi Kukkulan palvelimelle.