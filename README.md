# Nest – Schemaläggning för LSS/HVB-personal

Nest är en mobilapp byggd i React Native med Expo för att LSS/HVB-personal enkelt ska kunna planera aktiviteter för brukare och följa upp status i realtid. Appen använder Firebase för datalagring så att scheman, brukare och status uppdateras direkt mellan enheter.

## Teknisk översikt

- **Frontend**: React Native 0.81 + Expo 54.
  - UI-komponenter i `src/components` (DayPlanSection, ClientsSection, EditActivityModal osv.).
  - State och navigation hanteras i `App.js`.
  - Expo StatusBar och SafeArea används för anpassning till iOS/Android.
- **Backend**: Firebase Cloud Firestore (via `firebaseConfig.js`).
  - Samlingar `clients` och `activities` med realtidslyssning (`onSnapshot`).
  - CRUD-operationer med `addDoc`, `updateDoc`, `deleteDoc`.
- **Autentisering**: Lokal ”mock-login” just nu. `Logga ut` i hamburgermenyn återställer sessionen.
- **Teman/Design**:
  - Anpassningsbar färgpalett i `src/theme/themes.js`.
  - Dag- och veckovy, aktivitetskort med statusknappar (toggling sparas i Firestore).

## Funktioner

- [x] Login -> hemvy med datum-navigator, dag-/veckoknapp och aktivitetslista.
- [x] Brukarflik med lista samt detaljvy där aktiviteter kan redigeras, tas bort eller markeras ”klar/inte klar”.
- [x] Adminflik:
  - Lägg till brukare (initialer + namn).
  - Lägg till aktiviteter (engång/datum eller återkommande med valfria veckodagar, påminnelse i minuter, instruktioner).
  - Efter sparning nollställs fälten och en ”Aktivitet sparad”-toast visas (stänger sig efter 5 sek).
- [x] EditActivityModal stänger självt efter sparad uppdatering.
- [x] Sidomeny med tema-väljare och logga-ut-knapp.

## Projektstruktur

```
App.js                  # Huvudkomponent med state och routing
src/components/        # UI-delar (forms, cards, modaler, nav etc.)
src/data/initialData   # Nav-definitioner
src/theme/themes.js    # Säsongs-/ljus–mörk-teman
src/utils/dateUtils    # Datumformatterare och helper-funktioner
firebaseConfig.js      # Firebase-initiering och Firestore-export
```

## Komma igång

1. Installera beroenden:
   ```bash
   npm install
   ```
2. Konfigurera `firebaseConfig.js` med dina egna credentials (Firestore måste tillåta läs/skriv för testanvändare).
3. Starta Expo:
   ```bash
   npm run start
   ```
4. Skanna QR-koden i Expo Go (iOS/Android) eller öppna i emulator/simulator.

## Vidareutveckling

- Koppla på riktig Firebase Auth för e-postinloggning + regelstyrning (`request.auth`).
- Lägg till push-notiser via Expo Notifications för påminnelser.
- Exportera logg/tidigare aktiviteter och skapa rapportvy.

