// API:n perusosoite
const API_PERUS = "http://127.0.0.1:8000";

// Sivun elementit, joihin viestit ja kurssit tulostetaan
const viesti = document.getElementById("viesti");
const taulu = document.getElementById("taulu");

// Tunnuskenttien nimet tietokannassa
const KENTAT = { opettajaId: "tunnusnumero", opiskelijaId: "opiskelijanumero", tilaId: "tunnus", kurssiId: "tunnus" };

// Hakee JSON-datan annetusta polusta ja tarkistaa onnistuiko pyyntö
async function haeJson(polku) {
  const vastaus = await fetch(API_PERUS + polku);
  if (!vastaus.ok) throw new Error(polku + ": palvelin vastasi virheellä " + vastaus.status);
  return vastaus.json();
}

// Hakee kaikki tiedot ja käynnistää näyttämisen
async function haeKurssit() {
  try {
    const [kurssit, opettajat, opiskelijat, tilat, kirjautumiset] = await Promise.all([
      haeJson("/kurssit"), haeJson("/opettajat"), haeJson("/opiskelijat"), haeJson("/tilat"), haeJson("/kurssikirjautumiset"),
    ]);
    // Jos kursseja ei ole, kerrotaan siitä eikä jatketa
    if (kurssit.length === 0) { viesti.textContent = "Ei kursseja."; return; }
    naytaKurssit(kurssit, opettajat, opiskelijat, tilat, kirjautumiset);
  } catch (virhe) {
    // Jos jokin haku epäonnistuu näytetään virheviesti
    viesti.textContent = "Tietojen haku epäonnistui: " + virhe.message;
    viesti.classList.add("virhe");
  }
}

// Luo yhden tekstirivin (p-elementin) ja lisää sen kohteeseen
function lisaaRivi(kohde, teksti) {
  const p = document.createElement("p");
  p.textContent = teksti;
  kohde.appendChild(p);
}

// Palauttaa henkilön/tilan nimen riippumatta siitä mitä nimikenttiä on
function nimi(rivi) {
  if (!rivi) return null;
  if (rivi.nimi) return rivi.nimi;
  if (rivi.etunimi || rivi.sukunimi) return [rivi.etunimi, rivi.sukunimi].filter(Boolean).join(" ");
  return "(nimi puuttuu)";
}

// Näyttää jokaisen kurssin omana kokonaisuutenaan
function naytaKurssit(kurssit, opettajat, opiskelijat, tilat, kirjautumiset) {

  taulu.innerHTML = ""; // tyhjennetään vanha sisältö
  kurssit.forEach((kurssi) => {
    const kurssiDiv = document.createElement("div");
    kurssiDiv.classList.add("kurssi");
    // Kurssin nimi otsikoksi
    const otsikko = document.createElement("h3");
    otsikko.textContent = kurssi.nimi;
    kurssiDiv.appendChild(otsikko);

    // Etsitään kurssin opettaja ja tila tunnuksen perusteella (== sallii vertailun vaikka toinen olisi merkkijono ja toinen luku)
    const opettaja = opettajat.find((o) => o[KENTAT.opettajaId] == kurssi.opettaja_id);
    const tila = tilat.find((t) => t[KENTAT.tilaId] == kurssi.tila_id);

    // Kurssille kirjautuneet opiskelijat: suodatetaan kurssin kirjautumiset ja haetaan niitä vastaavat opiskelijat
    const kurssinOpiskelijat = kirjautumiset
      .filter((k) => k.kurssi_id == kurssi[KENTAT.kurssiId])
      .map((k) => opiskelijat.find((o) => o[KENTAT.opiskelijaId] == k.opiskelija_id))
      .filter(Boolean); // poistetaan tyhjät (opiskelijaa ei löytynyt)

    // Lopuksi lisätään kurssin tiedot näkymään
    lisaaRivi(kurssiDiv, "Kuvaus: " + kurssi.kuvaus);
    lisaaRivi(kurssiDiv, "Alkupäivä: " + kurssi.alkupaiva);
    lisaaRivi(kurssiDiv, "Lopetuspäivä: " + kurssi.loppupaiva);
    lisaaRivi(kurssiDiv, "Opettaja: " + (nimi(opettaja) || "ei tiedossa"));
    lisaaRivi(kurssiDiv, "Tila: " + (nimi(tila) || "ei tiedossa"));
    lisaaRivi(kurssiDiv, "Opiskelijat: " + (kurssinOpiskelijat.length ? kurssinOpiskelijat.map(nimi).join(", ") : "ei ilmoittautuneita"));

    taulu.appendChild(kurssiDiv);
  });
}

haeKurssit();