# 🏢 Mitarbeiterverwaltung v2.0 (Enterprise TypeScript Edition)

Eine moderne, dynamische und barrierefreie Single-Page-Applikation zur internen Mitarbeiterverwaltung im mittelständischen Unternehmen. Diese Software ersetzt das veraltete Altsystem vollständig und wurde nach modernen Software-Standards mit **React**, **TypeScript**, **Tailwind CSS (v4)** und **Axios** realisiert.

---

## ✨ Features (Funktionen)

*   **100% Typsicherheit:** Vollständige Abdeckung aller Datenstrukturen mit TypeScript zur Vermeidung von Laufzeitfehlern bei Datentransfers.
*   **Architektur nach Clean Code (Custom Hook):** Die gesamte Filter-, Sortier- und Paginierungslogik wurde vollständig aus der UI extrahiert und in einen zentralen, wiederverwendbaren Custom React Hook (`useEmployeeFilterAndSort.ts`) ausgelagert.
*   **Duale Tabellen-Architektur (Umschaltbar):** Das System bietet im Dashboard eine Echtzeit-Umschaltung zwischen zwei völlig unterschiedlichen Tabellen-Engines:
    1.  *Eigenbau-Tabelle (Custom):* Eine maßgeschneiderte, schlanke React-Tabelle mit clientseitiger Sortierung über JavaScript und separater Paginierungskomponente.
    2.  *DataTables.net-Tabelle:* Integration der bewährten Industriebibliothek über den offiziellen React-Wrapper für performantes DOM-Sortieren und integriertes Paging.
*   **Deep Linking (Routing mit Params):** Das System unterstützt Parameter im Routing (z.B. `/department/IT`). Beim Aufruf wird das Dashboard sofort automatisch auf die entsprechende Abteilung vorgefiltert.
*   **Live-Suche & Filterung:** Echtzeit-Suche nach Namen sowie Filterung nach Abteilungen und Arbeitsstatus (Home Office / Vor Ort) direkt beim Tippen.
*   **Vollständiges CRUD-Handling:** Mitarbeiter hinzufügen, bearbeiten (via barrierefreiem Modal-Dialog) und löschen über ein einheitliches Datenmodell.
*   **JSON Datentransfer:** Globaler Import und Export der gesamten Mitarbeiterdatenbank als strukturierte JSON-Datei direkt im App-Header mit integrierter Datenvalidierung und Fehlertoleranz.
*   **Stabiles Tabellen-Layout:** Keine visuellen Verschiebungen oder "Wackeln" bei langen Texten dank fixer Spalten-Layouts (`table-fixed`) und automatischer Textkürzung (`truncate`).
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
│   ├── EmployeeTableCustom.tsx# Handgeschriebene React-Tabelle mit manuellem Sortier-Sync
│   ├── EmployeeTableDataTables.tsx # Tabelle basierend auf dem DataTables.net-Wrapper
│   ├── LoadingOverlay.tsx     # Globale, asynchrone Wartemaske
│   └── Pagination.tsx         # Numerische Seitensteuerung
├── hooks/                   # Custom React Hooks (Business-Logik)
│   └── useEmployeeFilterAndSort.ts # Zentrale Logik für Filter, Sortierung und Paging
├── i18n/                    # Internationalisierung
│   ├── locales/
│   │   ├── de.json            # Deutsche Übersetzungsdaten (Reines JSON)
│   │   └── en.json            # Englische Übersetzungsdaten (Reines JSON)
│   └── config.js              # i18next Framework-Initialisierung
├── pages/                   # Seiten-Komponenten (Smart Components / Routen)
│   ├── Analytics.tsx          # Statistische Auswertungen (Home Office vs. Vor Ort)
│   └── Dashboard.tsx          # Hauptverwaltungsoberfläche mit Tabellen-Umschalter
├── types/                   # Globale Typdefinitionen
│   └── employee.ts            # Zentrales Employee-Interface
├── App.tsx                  # Globales Layout, Navigation, Routing & State-Sync
├── index.css                # Globales Tailwind CSS v4 Setup inklusive Custom-Korrekturen
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

## Author

Roman Karas
