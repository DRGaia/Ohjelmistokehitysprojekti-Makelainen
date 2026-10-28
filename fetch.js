// Osoite, josta tiedot haetaan
const API_OSOITE = "http://127.0.0.1:8000/kurssit";

const viesti = document.getElementById("viesti"); 
const taulu = document.getElementById("taulu"); 
const otsikot = document.getElementById("otsikot");
const rivit = document.getElementById("rivit");

async function haeKurssit() {
  // try/catch jos jokin menee pieleen ohjelma ei kaadu vaan menee catchiin joka näyttää virheilmoituksen
  try {
    // Lähetetään pyyntö ja await = odotetaan vastausta   
    const vastaus = await fetch(API_OSOITE);

    // Virhetesti ja viesti
    if (!vastaus.ok) {
      throw new Error("Palvelin vastasi virheellä: " + vastaus.status);
    }

    // Muutetaan JSON JavaScript-taulukoksi
    const kurssit = await vastaus.json();

    // Jos lista on tyhjä
    if (kurssit.length === 0) {
      viesti.textContent = "Ei kursseja.";
      return; // lopetetaan funktio
    }

    // Piirretään taulukko
    naytaTaulukko(kurssit);

  } catch (virhe) {
    viesti.textContent = "Tietojen haku epäonnistui: " + virhe.message;
    viesti.classList.add("virhe");
  }
}

// Rakentaa HTML-taulukon saadusta tiedosta
function naytaTaulukko(data) {
  // Otetaan ensimmäisen olion avaimet 
  const avaimet = Object.keys(data[0]);

  // Otsikkorivi
  const otsikkoRivi = document.createElement("tr");
  avaimet.forEach(avain => {
    const th = document.createElement("th"); 
    th.textContent = avain;
    otsikkoRivi.appendChild(th);
  });
  otsikot.appendChild(otsikkoRivi);

  // Tietorivi
  data.forEach(kurssi => {
    const tr = document.createElement("tr");
    avaimet.forEach(avain => {
      const td = document.createElement("td");
      td.textContent = kurssi[avain];
      tr.appendChild(td);
    });
    rivit.appendChild(tr);
  });
  
}

haeKurssit();