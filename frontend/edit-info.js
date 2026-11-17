
// TODO: python-koodi POST PUT ja DELETE

const API_PERUS = "http://127.0.0.1:8000";

// Jokaisen taulun asetukset: pääavain (Primary Key) ja lomakkeen kentät (nimi + input-tyyppi)
const TAULUT = {

  kurssit: { avain: "tunnus", kentat: [
    { nimi: "nimi", tyyppi: "text" }, { nimi: "kuvaus", tyyppi: "text" },
    { nimi: "alkupaiva", tyyppi: "date" }, { nimi: "loppupaiva", tyyppi: "date" },
    { nimi: "opettaja_id", tyyppi: "number" }, { nimi: "tila_id", tyyppi: "number" } ] },

  opettajat: { avain: "tunnusnumero", kentat: [
    { nimi: "etunimi", tyyppi: "text" }, { nimi: "sukunimi", tyyppi: "text" }, 
    { nimi: "aine", tyyppi: "text" }] },

  opiskelijat: { avain: "opiskelijanumero", kentat: [
    { nimi: "etunimi", tyyppi: "text" }, { nimi: "sukunimi", tyyppi: "text" }, 
    { nimi: "syntymapaiva", tyyppi: "date" }, { nimi: "vuosikurssi", tyyppi: "number" }] },

  kurssikirjautumiset: { avain: "tunnus", kentat: [
    { nimi: "opiskelija_id", tyyppi: "number" }, { nimi: "kurssi_id", tyyppi: "number" },
    { nimi: "kirjautumisaika", tyyppi: "datetime-local" } ] },
};

// Sivun elementit
const valinta = document.getElementById("valinta");
const lomake = document.getElementById("lomake");  
const lista = document.getElementById("lista");
const viesti = document.getElementById("viesti");

let nykyinen = "kurssit"; // mitä taulua muokataan (vakiona kurssit)
let muokattava = null;    // muokattavan rivin pääavain (null = lisätään uutta)

// Yleinen pyyntöfunktio kaikille metodeille (GET, POST, PUT, DELETE)
async function pyynto(polku, metodi = "GET", data) {
  const vastaus = await fetch(API_PERUS + polku, {
    method: metodi,
    headers: { "Content-Type": "application/json" },
    body: data ? JSON.stringify(data) : undefined, // data lähetetään JSON-muodossa
  });
  // Jos palvelin vastasi virheellä heitetään virhe
  if (!vastaus.ok) {
    const virhe = await vastaus.json().catch(() => ({}));
    throw new Error(typeof virhe.detail === "string" ? virhe.detail : "Virhe " + vastaus.status);
  }
  return vastaus.json().catch(() => null); // jos vastauksessa ei ole JSON palautetaan null
}

// Rakentaa lomakkeen valitun taulun kentistä (rivi = muokattavan rivin tiedot, tyhjä jos lisätään uutta)
function piirraLomake(rivi = {}) {
  const t = TAULUT[nykyinen];
  lomake.innerHTML = ""; // tyhjennetään vanha lomake
  t.kentat.forEach((k) => {
    const label = document.createElement("label");
    label.textContent = k.nimi + ": ";
    const input = document.createElement("input");
    input.name = k.nimi;
    input.type = k.tyyppi;
    let arvo = rivi[k.nimi] ?? "";
    if (k.tyyppi === "datetime-local") arvo = String(arvo).slice(0, 16);
    input.value = arvo;
    label.appendChild(input);
    lomake.appendChild(label);
    lomake.appendChild(document.createElement("br"));
  });

  // Tallennusnappi (lisätäänkö vai muokataanko)
  const tallenna = document.createElement("button");
  tallenna.type = "submit";
  tallenna.textContent = muokattava === null ? "Lisää" : "Tallenna muutokset";
  lomake.appendChild(tallenna);
  // Peruuta-nappi näytetään vain muokattaessa
  if (muokattava !== null) {
    const peru = document.createElement("button");
    peru.type = "button";
    peru.textContent = "Peruuta";
    peru.onclick = () => { muokattava = null; piirraLomake(); };
    lomake.appendChild(peru);
  }
}

// Lomakkeen lähetys: POST jos lisätään, PUT jos muokataan
lomake.addEventListener("submit", async (e) => {
  e.preventDefault(); // estetään sivun uudelleenlataus
  const t = TAULUT[nykyinen];
  const data = {};
  // Kerätään lomakkeen arvot objektiksi ja muunnetaan ne oikeaan muotoon
  t.kentat.forEach((k) => {
    let arvo = lomake.elements[k.nimi].value;
    if (k.tyyppi === "number") arvo = Number(arvo);
    if (k.tyyppi === "datetime-local") arvo = arvo.replace("T", " ");
    data[k.nimi] = arvo;
  });
  try {
    if (muokattava === null) await pyynto("/" + nykyinen, "POST", data);              
    else await pyynto("/" + nykyinen + "/" + muokattava, "PUT", data);              
    muokattava = null;
    viesti.textContent = "Tallennettu.";
    piirraLomake();   // tyhjennetään lomake
    paivitaLista();   // päivitetään taulukko
  } catch (virhe) {
    viesti.textContent = "Tallennus epäonnistui: " + virhe.message;
  }
});

// Hakee rivit ja piirtää taulukon, jossa on Muokkaa- ja Poista-napit
async function paivitaLista() {
  const t = TAULUT[nykyinen];
  const sarakkeet = [t.avain, ...t.kentat.map((k) => k.nimi)]; // pääavain + kentät
  try {
    const rivit = await pyynto("/" + nykyinen);
    lista.innerHTML = ""; // tyhjennetään vanha taulukko
    // Otsikkorivi
    const otsikot = document.createElement("tr");
    [...sarakkeet, ""].forEach((nimi) => {
      const th = document.createElement("th");
      th.textContent = nimi;
      otsikot.appendChild(th);
    });
    lista.appendChild(otsikot);
    // Yksi taulukkorivi jokaista tietokannan riviä kohti
    rivit.forEach((rivi) => {
      const tr = document.createElement("tr");
      sarakkeet.forEach((kentta) => {
        const td = document.createElement("td");
        td.textContent = rivi[kentta] ?? "";
        tr.appendChild(td);
      });
      // Napit: Muokkaa täyttää lomakkeen rivin tiedoilla, Poista kysyy varmistuksen
      const toiminnot = document.createElement("td");
      const muokkaa = document.createElement("button");
      muokkaa.textContent = "Muokkaa";
      muokkaa.onclick = () => { muokattava = rivi[t.avain]; piirraLomake(rivi); };
      const poista = document.createElement("button");
      poista.textContent = "Poista";
      poista.onclick = () => poistaRivi(rivi[t.avain]);
      toiminnot.append(muokkaa, poista);
      tr.appendChild(toiminnot);
      lista.appendChild(tr);
    });
  } catch (virhe) {
    viesti.textContent = "Haku epäonnistui: " + virhe.message;
  }
}

// Poistaa rivin käyttäjän vahvistuksen jälkeen
async function poistaRivi(avain) {
  if (!confirm("Poistetaanko varmasti?")) return;
  try {
    await pyynto("/" + nykyinen + "/" + avain, "DELETE");
    viesti.textContent = "Poistettu.";
    paivitaLista();
  } catch (virhe) {
    viesti.textContent = "Poisto epäonnistui: " + virhe.message;
  }
}

// Taulun vaihto pudotusvalikosta: nollataan tila ja piirretään lomake ja lista uudelleen
valinta.addEventListener("change", () => {
  nykyinen = valinta.value;
  muokattava = null;
  viesti.textContent = "";
  piirraLomake();
  paivitaLista();
});

piirraLomake();
paivitaLista();