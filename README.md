# mobiiliohjelmointi-lopputyo
SongLyrics App on React Native -pohjainen mobiilisovellus, joka mahdollistaa käyttäjien etsiä kappaleiden sanoituksia ja tallentaa suosikkisanoituksiaan Firebaseen. Sovellus tarjoaa kirjautumis- ja uloskirjautumiskokemuksen sekä käyttöliittymän sanoitusten hallintaan.

Käytetyt teknologiat
1. React Native
Sovelluksen käyttöliittymä on rakennettu React Native -kirjastolla, joka mahdollistaa mobiilisovellusten kehittämisen yhdellä koodipohjalla iOS- ja Android-laitteille.
2. React Navigation
Navigointijärjestelmänä käytetään React Navigationia, joka tarjoaa käyttäjälle saumattoman siirtymisen eri näyttöjen, kuten kotisivun, haku-, suosikit- ja uloskirjautumissivujen välillä.
3. React Native Paper
Materiaalisuunnitteluun pohjautuvat komponentit, kuten painikkeet, kortit ja tekstitulot, on toteutettu React Native Paper -kirjastolla, joka parantaa sovelluksen visuaalista ilmettä ja käytettävyyttä.
4. Firebase Authentication
Firebase Authentication -kirjastoa käytetään käyttäjien kirjautumista varten. Se tarjoaa yksinkertaisen tavan hallita käyttäjätilien todennusta ja istuntoja.
5. Firebase Firestore
Firestore tallentaa käyttäjän suosikkikappaleet ja niiden sanoitukset. Se mahdollistaa reaaliaikaisen tietojen haun ja päivityksen.
6. Axios
Axios-kirjastoa käytetään suorittamaan HTTP-pyyntöjä Lyrics.ovh API:iin, jolla haetaan kappaleiden sanoituksia käyttäjän antamien artistin ja kappaleen nimen perusteella.
7. Expo
Expo-kehitysympäristö mahdollistaa nopean sovellusten kehityksen, testaamisen ja esikatselun ilman erillistä asennusta mobiililaitteille.

Ominaisuudet

Kirjautuminen ja uloskirjautuminen: Käyttäjät voivat kirjautua sisään sähköpostiosoitteellaan ja salasanallaan.

Kappaleiden sanoitusten haku: Käyttäjät voivat hakea sanoituksia artistin ja kappaleen nimen perusteella.

Suosikit: Mahdollisuus tallentaa suosikkikappaleiden sanoituksia ja selata niitä myöhemmin.

Suodatus ja lajittelu: Käyttäjät voivat etsiä suosikeistaan ja lajitella niitä kappaleen tai artistin mukaan.
