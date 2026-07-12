# 🏢 Mitarbeiterverwaltung v2.0 (TypeScript Edition)

Eine moderne, dynamische und barrierefreie Single-Page-Applikation zur internen Mitarbeiterverwaltung im mittelständischen Unternehmen. Diese Software ersetzt das veraltete Altsystem vollständig und wurde nach modernen Software-Standards mit **React**, **TypeScript**, **Tailwind CSS (v4)** und **Axios** realisiert.

---

## ✨ Features (Funktionen)

*   **100% Typsicherheit:** Vollständige Migration auf TypeScript zur Vermeidung von Laufzeitfehlern bei Datentransfers.
*   **Deep Linking (Routing mit Params):** Das System unterstützt Parameter im Routing (z.B. `/department/IT`). Beim Aufruf wird das Dashboard sofort automatisch auf die entsprechende Abteilung vorgefiltert.
*   **Live-Suche & Filterung:** Echtzeit-Suche nach Namen sowie Filterung nach Abteilungen und Arbeitsstatus (Home Office / Vor Ort) direkt beim Tippen.
*   **Vollständiges CRUD-Handling:** Mitarbeiter hinzufügen, bearbeiten (via barrierefreiem Modal-Dialog) und löschen über ein einheitliches Datenmodell.
*   **JSON Datentransfer:** Globaler Import und Export der gesamten Mitarbeiterdatenbank als strukturierte JSON-Datei direkt im App-Header.
*   **Skalierbare Paginierung:** Listen-Performance-Optimierung durch eine ausgelagerte, numerische Seitensteuerung (`Pagination.tsx`).
*   **Stabiles Tabellen-Layout:** Keine visuellen Verschiebungen oder "Wackeln" bei langen Texten dank fixer Layouts (`table-fixed`) und automatischer Textkürzung (`truncate`).
*   **Persistenz-Layer:** Zustandssynchronisation über einen asynchronen Axios-API-Layer mit direkter `localStorage`-Spiegelung.
*   **Wartemaske (Loading Overlay):** Eine eigenständige, animierte Komponente schützt vor ungeduldigen Mehrfachklicks (Double-Submits) während asynchroner Speicherprozesse.
*   **Internationalisierung (i18n):** Vollständige, aus den Komponenten separierte Mehrsprachigkeit (Deutsch/Englisch) über getrennte JSON-Dateien.
*   **Barrierefreiheit (a11y):** Optimiert für Screenreader durch semantisches HTML5, ARIA-Attribute (`aria-current`, `aria-busy`, `role="dialog"`) und Tastaturbedienbarkeit.

---

## 📂 Ordnerstruktur (Project Architecture)

Das Projekt folgt den modernen Entwicklungs-Richtlinien (*Best Practices*) für modulare React- und TypeScript-Anwendungen:

```text
src/
├── api/
│   └── employeeApi.ts       # Axios-Wrapper & LocalStorage-Simulations-Layer
├── assets/                  # Bilder, Logos, SVGs
├── components/              # Wiederverwendbare UI-Komponenten (Dumb Components)
│   ├── DataInterface.tsx      # JSON Im- & Exportleiste im Header
│   ├── EditEmployeeModal.tsx  # Barrierefreies Bearbeitungs-Modal
│   ├── EmployeeFilters.tsx    # Live-Suche und Dropdown-Filter
│   ├── EmployeeForm.tsx       # Erfassungsformular für neue Profile
│   ├── EmployeeTable.tsx      # Stabilisierte Datentabelle mit Icon-Buttons
│   ├── LoadingOverlay.tsx     # Globale, asynchrone Wartemaske
│   └── Pagination.tsx         # Numerische Seitensteuerung
├── i18n/                    # Internationalisierung
│   ├── locales/
│   │   ├── de.json            # Deutsche Übersetzungsdaten (Reines JSON)
│   │   └── en.json            # Englische Übersetzungsdaten (Reines JSON)
│   └── config.js              # i18next Framework-Initialisierung
├── pages/                   # Seiten-Komponenten (Smart Components / Routen)
│   ├── Analytics.tsx          # Statistische Auswertungen (Home Office vs. Vor Ort)
│   └── Dashboard.tsx          # Hauptverwaltungsoberfläche mit Parameter-Handling
├── types/                   # Globale Typdefinitionen
│   └── employee.ts            # Zentrales Employee-Interface
├── App.tsx                  # Globales Layout, Navigation, Routing & State-Sync
├── index.css                # Globales Tailwind CSS v4 Setup inklusive @source Direktive
├── main.tsx                 # React-Anwendungseinstiegspunkt mit Typenprüfung
└── vite-env.d.ts            # Ambiente-Deklaration für CSS-Module und Vite-Typen
```

---

## 🛠️ Installation & Lokaler Start (Getting Started)

### Voraussetzungen
Stelle sicher, dass **Node.js** auf deinem System installiert ist.

### 1. Repository klonen & Ordner wechseln
```bash
git clone https://github.com
cd employee-admins
```

### 2. Abhängigkeiten installieren
```bash
npm install
```

### 3. Entwicklungsserver starten
```bash
npm run dev
```
Öffne anschließend [http://localhost:5173](http://localhost:5173) in deinem Browser.

---

## 💻 Entwickler-Konsole & Debugging

Die Anwendung nutzt automatische Konsolen-Logs, um den Datenfluss transparent zu machen. Bei jeder Datenänderung (Import, Hinzufügen, Editieren, Löschen) wird der aktuelle Zustand formatiert als interaktive `console.table()` ausgegeben.

Um den aktuellen Speicherstand manuell im Browser abzufragen, öffne die Konsole (**F12**) und tippe ein:
```javascript
JSON.parse(localStorage.getItem('mock_employees'))
```

---

## 📄 Lizenz
Interne Software der Firma – Alle Rechte vorbehalten.
