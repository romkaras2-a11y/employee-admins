# 🏢 Mitarbeiterverwaltung v2.0 (Employee Management)

Eine moderne, dynamische und barrierefreie Single-Page-Applikation zur internen Mitarbeiterverwaltung. Diese Software ersetzt das veraltete Altsystem und wurde vollständig mit **React**, **Tailwind CSS (v4)** und **Axios** realisiert.

---

## ✨ Features (Funktionen)

*   **Live-Suche & Filterung:** Echtzeit-Suche nach Namen sowie Filterung nach Abteilungen und Arbeitsstatus (Home Office / Vor Ort) direkt beim Tippen.
*   **Vollständiges CRUD-Handling:** Mitarbeiter hinzufügen, bearbeiten (via barrierefreiem Modal-Dialog) und löschen.
*   **JSON Datentransfer:** Globaler Import und Export der gesamten Mitarbeiterdatenbank als strukturierte JSON-Datei im Header.
*   **Skalierbare Paginierung:** Listen-Performance-Optimierung durch eine ausgelagerte, numerische Seitennavigation (`Pagination.jsx`).
*   **Stabiles Layout:** Keine Tabellenverschiebungen (Wackeln) bei langen Texten dank fixer Layouts (`table-fixed`) und automatischer Textkürzung (`truncate`).
*   **Persistenz-Layer:** Zustandssynchronisation über einen simulierten Axios-API-Layer mit direkter `localStorage`-Spiegelung.
*   **Wartemaske (Loading Overlay):** Schutz vor ungeduldigen Mehrfachklicks während asynchroner Speicherprozesse.
*   **Internationalisierung (i18n):** Vollständige Mehrsprachigkeit (Deutsch/Englisch) über `i18next`.
*   **Barrierefreiheit (a11y):** Optimiert für Screenreader durch semantisches HTML5, ARIA-Attribute (`aria-current`, `aria-busy`, `role="dialog"`) und Tastaturbedienbarkeit.

---

## 📂 Ordnerstruktur (Project Architecture)

Das Projekt folgt den modernen Entwicklungs-Richtlinien (*Best Practices*) für modulare React-Anwendungen:

```text
src/
├── api/
│   └── employeeApi.js       # Axios-Wrapper & LocalStorage-Simulations-Layer
├── assets/                  # Bilder, Logos, SVGs
├── components/              # Wiederverwendbare UI-Komponenten (Dumb Components)
│   ├── DataInterface.jsx      # JSON Im- & Exportleiste
│   ├── EditEmployeeModal.jsx  # Barrierefreies Bearbeitungs-Modal
│   ├── EmployeeFilters.jsx    # Live-Suche und Dropdown-Filter
│   ├── EmployeeForm.jsx       # Erfassungsformular für neue Profile
│   ├── EmployeeTable.jsx      # Stabilisierte Datentabelle mit Icon-Buttons
│   ├── LoadingOverlay.jsx     # Globale, asynchrone Wartemaske
│   └── Pagination.jsx         # Numerische Seitensteuerung
├── i18n/                    # Internationalisierung
│   ├── locales/
│   │   ├── de.json            # Deutsche Übersetzungsdaten
│   │   └── en.json            # Englische Übersetzungsdaten
│   └── config.js              # i18next Framework-Initialisierung
├── pages/                   # Seiten-Komponenten (Smart Components / Routen)
│   ├── Analytics.jsx          # Statistische Auswertungen (Home Office vs. Vor Ort)
│   └── Dashboard.jsx          # Hauptverwaltungsoberfläche
├── App.jsx                  # Globales Layout, Navigation, Routing & State-Sync
├── index.css                # Globales Tailwind CSS v4 Setup
└── main.jsx                 # React-Anwendungseinstiegspunkt
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

Die Anwendung nutzt automatische Konsolen-Logs, um den Datenfluss transparent zu machen. Bei jeder Datenänderung (Import, Hinzufügen, Editieren, Löschen) wird der aktuelle Zustand formatiert als interaktive Tabelle ausgegeben.

Um den aktuellen Speicherstand manuell im Browser abzufragen, öffne die Konsole (**F12**) und tippe ein:
```javascript
JSON.parse(localStorage.getItem('mock_employees'))
```

---

## 📝 Lizenz

MIT License - Freie Nutzung für private und kommerzielle Zwecke.

## Author

Roman Karas
