GymApp – Kuntosaliharjoittelun seurantasovellus

GymApp on Reactilla ja TypeScriptillä toteutettu frontend-sovellus kuntosaliharjoittelun suunnitteluun ja seurantaan.

Sovelluksen avulla käyttäjä voi valita harjoitusliikkeitä, kirjata harjoitusten painoja ja toistomääriä, tarkastella harjoitushistoriaansa sekä seurata harjoitteluaan kategorioittain.

Projekti on toteutettu osana frontend-kehityksen kurssia.

Ominaisuudet
Harjoitusliikkeet: Liikkeiden selaaminen, hakeminen ja suodattaminen lihasryhmän mukaan.
Liikeohjeet: Liikekohtaiset suoritusohjeet ja kuvat.
Harjoituksen kirjaaminen: Harjoitusten valinta sekä painojen ja toistomäärien tallentaminen.
Harjoitusyhteenveto: Suoritetun harjoituksen tarkastelu ja sarjojen muokkaaminen.
Harjoitushistoria: Aikaisempien harjoitusten tallentaminen ja tarkastelu.
Tilastot: Harjoittelun seuranta lihasryhmittäin.
Teknologiat
Teknologia	Käyttötarkoitus
React 19	Käyttöliittymän toteutus
TypeScript	Tyypitys ja koodin hallinta
Vite	Kehitysympäristö ja tuotantobuild
CSS	Käyttöliittymän tyylit
Local Storage	Harjoitushistorian paikallinen tallennus
ESLint	Koodin laadun tarkistus
GitHub Actions	Automaattinen laadunvarmistus
Projektin rakenne
text
GymApp/
├── public/                 # Julkiset kuvat ja muut resurssit
├── .github/
│   └── workflows/
│       └── ci.yml          # GitHub Actions CI
├── src/
│   ├── assets/             # Projektin resurssit
│   ├── components/         # Uudelleenkäytettävät komponentit
│   │   └── Glyph.tsx
│   ├── data/               # Harjoitusliikkeiden tiedot
│   │   └── movements.tsx
│   ├── screens/            # Sovelluksen eri näkymät
│   ├── types/              # TypeScript-tyypitykset
│   ├── App.tsx             # Sovelluksen pääkomponentti
│   ├── App.css
│   ├── index.css
│   └── main.tsx            # Sovelluksen käynnistyspiste
├── package.json
├── tsconfig.json
└── vite.config.ts

Asentaminen ja käynnistäminen

Projektin paikalliseen käynnistämiseen tarvitaan Node.js ja npm.

Kloonaa repositorio:
bash
git clone https://github.com/MikaK1994/GymApp.git

Siirry projektikansioon:
bash
cd GymApp

Asenna riippuvuudet:
bash
npm install

Käynnistä kehityspalvelin:
bash
npm run dev

Avaa terminaalissa ilmoitettu paikallinen osoite selaimessa.
Käytettävissä olevat komennot
Komento	Kuvaus
npm run dev	Käynnistää kehityspalvelimen
npm run build	Tarkistaa TypeScriptin ja rakentaa tuotantoversion
npm run lint	Suorittaa ESLint-tarkistuksen
npm run preview	Käynnistää tuotantobuildin esikatselun
Arkkitehtuuri ja tiedon tallennus

Sovelluksen tilanhallinta on keskitetty pääasiassa App.tsx-komponenttiin. Näkymät on erotettu omiksi komponenteikseen screens-kansioon.

Harjoitusliikkeiden tiedot on määritelty erikseen data-kansiossa. Sovelluksen tietorakenteet on tyypitetty TypeScriptillä types-kansiossa.

Harjoitushistoria tallennetaan selaimen Local Storageen. Sovelluksessa ei tällä hetkellä ole erillistä backend-palvelua tai ulkoista API-integraatiota.

Laadunvarmistus ja CI

Projektissa käytetään ESLintiä ja TypeScriptin tarkistuksia koodin laadun varmistamiseen.

GitHub Actions suorittaa automaattisesti seuraavat tarkistukset:

Riippuvuuksien asennus.
ESLint-tarkistus.
Tuotantoversion rakentaminen.

Workflow käynnistyy, kun muutoksia pushataan main-haaraan tai avataan pull request siihen.

Tunnetut rajoitukset ja jatkokehitys
Harjoitustiedot tallennetaan vain käytössä olevan selaimen Local Storageen.
Tietoja ei synkronoida eri laitteiden välillä.
Erillistä backend-palvelua tai käyttäjätunnistusta ei ole toteutettu.
Automaattista yksikkötestausta voidaan laajentaa jatkokehityksessä.
Local Storageen tallennetun datan ajonaikaista rakenteen validointia voidaan vahvistaa.
Projektin tila

GymAppin keskeiset toiminnallisuudet on toteutettu ja testattu manuaalisesti. TypeScript-tarkistus, tuotantobuild ja ESLint-tarkistus on suoritettu onnistuneesti.

Projektissa on lisäksi käytössä GitHub Actions -pohjainen CI-prosessi.

Projekti on toteutettu frontend-kehityksen kurssityönä.
  },
])

```
