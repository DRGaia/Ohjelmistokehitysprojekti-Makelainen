
// Osoite, josta tiedot haetaan
const API_OSOITE = "http://127.0.0.1:8000/kurssit";

const viesti = document.getElementById("viesti");
const taulu = document.getElementById("taulu");

async function haeKurssit() {
  // try/catch jos jokin menee pieleen
  try {
    // Lähetetään pyyntö palvelimelle
    const vastaus = await fetch(API_OSOITE);

    // Tarkistetaan, onnistuiko pyyntö
    if (!vastaus.ok) {
      throw new Error("Palvelin vastasi virheellä: " + vastaus.status);
    }

    // Muutetaan JSON JavaScript-taulukoksi
    const kurssit = await vastaus.json();

    // Jos lista on tyhjä
    if (kurssit.length === 0) {
      viesti.textContent = "Ei kursseja.";
      return;
    }

    // Näytetään kurssit
    naytaKurssit(kurssit);

  } catch (virhe) {
    viesti.textContent =
      "Tietojen haku epäonnistui: " + virhe.message;
    viesti.classList.add("virhe");
  }
}

// Näytetään jokainen kurssi omana kokonaisuutenaan
function naytaKurssit(data) {

  data.forEach(kurssi => {

    const kurssiDiv = document.createElement("div");
    kurssiDiv.classList.add("kurssi");

    // Kurssin nimi
    const otsikko = document.createElement("h2");
    otsikko.textContent = kurssi.nimi;

    // Kuvaus
    const kuvaus = document.createElement("p");
    kuvaus.textContent = "Kuvaus: " + kurssi.kuvaus;

    // Alkupäivä
    const alku = document.createElement("p");
    alku.textContent = "Alkupäivä: " + kurssi.alkupaiva;

    // Loppupäivä
    const loppu = document.createElement("p");
    loppu.textContent = "Loppupäivä: " + kurssi.loppupaiva;

    // Opettajan nimi
    const opettaja = document.createElement("p");
    opettaja.textContent = "Opettajan tunnus: " + kurssi.opettaja_id;

    // Tilan nimi
    const tila = document.createElement("p");
    tila.textContent = "Tilan tunnus: " + kurssi.tila_id;

    // Lisätään tiedot kurssin näkymään
    kurssiDiv.appendChild(otsikko);
    kurssiDiv.appendChild(kuvaus);
    kurssiDiv.appendChild(alku);
    kurssiDiv.appendChild(loppu);
    kurssiDiv.appendChild(opettaja);
    kurssiDiv.appendChild(tila);

    taulu.appendChild(kurssiDiv);
  });
}

haeKurssit();