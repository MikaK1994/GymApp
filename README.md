
# 🏋️ GymApp

### Kuntosaliharjoittelun seurantasovellus

GymApp on Reactilla ja TypeScriptillä toteutettu frontend-sovellus kuntosaliharjoittelun suunnitteluun ja seurantaan.

Sovelluksen avulla käyttäjä voi valita harjoitusliikkeitä, kirjata harjoitusten painoja ja toistomääriä, tarkastella harjoitushistoriaansa sekä seurata harjoitteluaan lihasryhmittäin.

*Projekti on toteutettu osana frontend-kehityksen kurssia.*

---

## ✨ Ominaisuudet

- 🔍 **Liikkeiden selaaminen:** Harjoitusliikkeiden hakeminen ja suodattaminen lihasryhmän mukaan.
- 📖 **Liikeohjeet:** Liikekohtaiset suoritusohjeet ja kuvat.
- 💪 **Harjoituksen kirjaaminen:** Painojen ja toistomäärien tallentaminen.
- 📊 **Harjoitusyhteenveto:** Suoritettujen harjoitusten ja sarjojen tarkastelu.
- 📅 **Harjoitushistoria:** Aikaisempien harjoitusten tallentaminen.
- 📈 **Tilastot:** Harjoittelun seuranta lihasryhmittäin.

---

## 🛠️ Teknologiat

| Teknologia | Käyttötarkoitus |
|---|---|
| React 19 | Käyttöliittymä |
| TypeScript | Tyypitys |
| Vite | Kehitysympäristö ja build |
| CSS | Käyttöliittymän tyylit |
| Local Storage | Paikallinen tiedontallennus |
| ESLint | Koodin laadun tarkistus |
| GitHub Actions | CI-automaatiot |

---

## 📁 Projektin rakenne

```text
GymApp/
├── public/
├── .github/
│   └── workflows/
│       └── ci.yml
├── src/
│   ├── assets/
│   ├── components/
│   │   └── Glyph.tsx
│   ├── data/
│   │   └── movements.tsx
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── MovementScreen.tsx
│   │   ├── MovementGuidesScreen.tsx
│   │   ├── SessionScreen.tsx
│   │   ├── StatisticsScreen.tsx
│   │   └── SummaryScreen.tsx
│   ├── types/
│   │   └── types.tsx
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Asentaminen ja käynnistäminen

### Vaatimukset

- Node.js
- npm

### 1. Kloonaa repositorio

```bash
git clone https://github.com/MikaK1994/GymApp.git
```

### 2. Siirry projektikansioon

```bash
cd GymApp
```

### 3. Asenna riippuvuudet

```bash
npm install
```

### 4. Käynnistä kehityspalvelin

```bash
npm run dev
```

Avaa terminaalissa ilmoitettu paikallinen osoite selaimessa.

---

## ⚙️ Käytettävissä olevat komennot

| Komento | Kuvaus |
|---|---|
| `npm run dev` | Käynnistää kehityspalvelimen |
| `npm run build` | Suorittaa TypeScript-tarkistuksen ja tuotantobuildin |
| `npm run lint` | Suorittaa ESLint-tarkistuksen |
| `npm run preview` | Käynnistää tuotantoversion esikatselun |

---

## 🏗️ Arkkitehtuuri

Sovelluksen tilanhallinta on keskitetty pääasiassa `App.tsx`-komponenttiin.

Käyttöliittymä on jaettu erillisiin näkymäkomponentteihin (`screens`), uudelleenkäytettäviin komponentteihin (`components`), staattiseen harjoitusdataan (`data`) sekä TypeScript-tyypityksiin (`types`).

Tietoa välitetään näkymille propsien ja callback-funktioiden avulla.

### Tiedon tallennus

Harjoitushistoria tallennetaan selaimen Local Storageen.

Sovelluksessa ei tällä hetkellä ole erillistä backend-palvelua tai ulkoista API-integraatiota.

---

## ✅ Laadunvarmistus ja CI

Projektissa käytetään ESLintiä ja TypeScriptin tarkistuksia koodin laadun varmistamiseen.

GitHub Actions suorittaa automaattisesti seuraavat vaiheet:

1. Lähdekoodin haku GitHubista.
2. Node.js-ympäristön käyttöönotto.
3. Riippuvuuksien asennus.
4. ESLint-tarkistus.
5. Tuotantoversion rakentaminen.

CI käynnistyy automaattisesti, kun muutoksia pushataan `main`-haaraan tai avataan pull request siihen.

---

## 🔧 Tunnetut rajoitukset ja jatkokehitys

- Harjoitustiedot tallennetaan selaimen Local Storageen.
- Tietoja ei synkronoida eri laitteiden välillä.
- Käyttäjätunnistusta tai backend-palvelua ei ole toteutettu.
- Automaattista yksikkötestausta voidaan laajentaa.
- Local Storage -datan ajonaikaista validointia voidaan vahvistaa.

---

## 📌 Projektin tila

GymAppin keskeiset toiminnallisuudet on toteutettu ja testattu manuaalisesti.

TypeScript-tarkistus, tuotantobuild ja ESLint-tarkistus on suoritettu onnistuneesti. GitHub Actions -pohjainen CI-prosessi on käytössä ja sen suoritus on testattu onnistuneesti.

---

**Tekijä:** MikaK1994

**Projektin lähdekoodi:** [GitHub – GymApp](https://github.com/MikaK1994/GymApp)
