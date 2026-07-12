// local/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      de: {
        translation: {
          title: "Mitarbeiterverwaltung",
          subtitle: "Interne Benutzeroberfläche v2.0",
          searchPlaceholder: "Name suchen...",
          allDepartments: "Alle Abteilungen",
          allStatuses: "Alle Status",
          activeOnSite: "Aktiv vor Ort",
          homeOffice: "Home Office",
          name: "Name",
          email: "E-Mail",
          department: "Abteilung",
          position: "Position",
          status: "Status",
          actions: "Aktionen",
          edit: "Bearbeiten",
          delete: "Löschen",
          addEmployee: "Neuer Mitarbeiter",
          save: "Speichern",
          cancel: "Abbrechen",
          addBtn: "Mitarbeiter anlegen",
          noEmployees: "Keine Mitarbeiter gefunden.",
          page: "Seite",
          of: "von",
          next: "Weiter",
          prev: "Zurück",
          navDashboard: "Dashboard",
          navAnalytics: "Analytik",
          statsTitle: "Mitarbeiter-Statistiken",
          statsTotal: "Mitarbeiter gesamt",
          statsHomeOffice: "Im Home Office",
          statsOnSite: "Vor Ort aktiv",  
          exportData: "Daten exportieren",
          importData: "Daten importieren",
          importSuccess: "Mitarbeiter erfolgreich importiert!",
          importError: "Ungültiges JSON-Format oder fehlende Pflichtfelder.",                      
        }
      },
      en: {
        translation: {
          title: "Employee Management",
          subtitle: "Internal Interface v2.0",
          searchPlaceholder: "Search name...",
          allDepartments: "All Departments",
          allStatuses: "All Statuses",
          activeOnSite: "Active on Site",
          homeOffice: "Home Office",
          name: "Name",
          email: "Email",
          department: "Department",
          position: "Position",
          status: "Status",
          actions: "Actions",
          edit: "Edit",
          delete: "Delete",
          addEmployee: "New Employee",
          save: "Save",
          cancel: "Cancel",
          addBtn: "Add Employee",
          noEmployees: "No employees found.",
          page: "Page",
          of: "of",
          next: "Next",
          prev: "Previous",
          navDashboard: "Dashboard",
          navAnalytics: "Analytics",
          statsTitle: "Employee Statistics",
          statsTotal: "Total Employees",
          statsHomeOffice: "In Home Office",
          statsOnSite: "Active on Site", 
          exportData: "Export Data",
          importData: "Import Data",
          importSuccess: "Employees successfully imported!",
          importError: "Invalid JSON format or missing required fields.",            
        }
      }
    },
    fallbackLng: "de",
    interpolation: { escapeValue: false }
  });

export default i18n;
